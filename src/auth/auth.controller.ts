import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

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
}
