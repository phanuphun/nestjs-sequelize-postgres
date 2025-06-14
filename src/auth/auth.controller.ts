import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller({
  path: 'auth', // http://localhost:4000/api/v1/auth/
  version: '1',
})
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @HttpCode(201)
  async register(@Body() registerDto: RegisterDto) {
    await this.authService.register(registerDto);
    return {
      msg: 'Register successfully',
    };
  }

  @Post('login')
  @HttpCode(200)
  async login(@Body() loginDto: LoginDto) {
    const { accessToken } = await this.authService.login(loginDto);
    return {
      token: accessToken,
      msg: 'Login successfully',
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile') // http://localhost:4000/api/v1/auth/profile
  async getProfile(@Request() req: any) {
    return await this.authService.getUserProfile(Number(req.user.user_id));
  }
}
