import { Injectable } from '@nestjs/common';
import { User } from '../../entities/user.entity';

@Injectable()
export class UserService {
  private users: User[] = [];

  async create(userData: { email: string; password: string }): Promise<User> {
    const newUser = new User();
    newUser.id = this.users.length + 1;
    newUser.email = userData.email;
    newUser.password = userData.password;
    this.users.push(newUser);
    return newUser;
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return this.users.find(user => user.email === email);
  }
}
