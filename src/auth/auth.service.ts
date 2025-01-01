import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './entities/auth.entity';
import { RegisterDto } from './dto/register.dto';
import { hash, genSalt, compare } from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User) // inject model *sqlize
    private readonly userModel: typeof User,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    const userExist = await this.userModel.findOne({
      where: { email: registerDto.email },
    });

    if (userExist) {
      throw new HttpException('This Email aready exist', HttpStatus.CONFLICT);
    }

    // hash password
    const salt = await genSalt(10);
    const hashPassword = await hash(registerDto.password, salt);

    const newUser = await this.userModel.create({
      fullName: registerDto.fullName,
      email: registerDto.email,
      password: hashPassword,
    });

    return newUser;
  }

  async login(loginDto: LoginDto) {
    try {
      const findUser = await this.userModel.findOne({
        where: { email: loginDto.email },
      });
      if (!findUser) {
        throw new UnauthorizedException('Email or password invalid.');
      }

      const isValid = await compare(loginDto.password, findUser.password);

      if (!isValid) {
        throw new UnauthorizedException('Email or password invalid.');
      }

      const payLoad = { user_id: findUser.id };
      const token = await this.jwtService.signAsync(payLoad, {
        secret: process.env.JWT_SECRET,
      });

      return { accessToken: token };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }

      throw new HttpException('Something wrong', 500);
    }
  }

  // get use profile
  async getUserProfile(id: number) {
    return await this.userModel.findByPk(id, {
      attributes: ['id', 'fullName', 'email'],
    });
  }
}
