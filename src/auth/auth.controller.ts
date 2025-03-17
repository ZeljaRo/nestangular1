import { Controller, Post, Body, Get, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() userData: { username: string; password: string }) {
    return this.authService.register(userData);
  }

  @Post('login')
  async login(@Body() userData: { username: string; password: string }) {
    return this.authService.login(userData);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Request() req) {
    return { message: 'Access granted!', user: req.user };
  }
}
