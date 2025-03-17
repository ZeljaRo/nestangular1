import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async register(userData: { username: string; password: string }) {
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    return {
      message: 'User registered successfully',
      user: { id: 1, password: hashedPassword },
    };
  }

  async login(userData: { username: string; password: string }) {
    // Ovdje bi inače trebala biti provjera u bazi podataka
    const isPasswordValid = await bcrypt.compare(userData.password, '$2b$10$KRCbUocXZdJUAfEdTFs32ubNhmKXD6UgQrHoz7iR3QKicoHUNmjSi');

    if (!isPasswordValid) {
      throw new Error('Invalid credentials');
    }

    const payload = { sub: 1 };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
