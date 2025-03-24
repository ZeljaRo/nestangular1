import { Injectable, UnauthorizedException, InternalServerErrorException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { UsersService } from '../services/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const validUser = await this.validateUser(user.email, user.password);
    if (!validUser) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { username: validUser.email, sub: validUser.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(userData: any) {
    try {
      const hashedPassword = await bcrypt.hash(userData.password, 10);

      console.log('✔️ Registracija korisnika:', {
        email: userData.email,
        korisnickoIme: userData.username,
      });

      const createdUser = await this.usersService.create({
        ...userData,
        password: hashedPassword,
      });

      const { password, ...result } = createdUser;

      return {
        message: 'User registered successfully',
        user: result,
      };
    } catch (error) {
      console.error('❌ Greška u register metodi:', error);
      throw new InternalServerErrorException('Registration failed');
    }
  }
}
