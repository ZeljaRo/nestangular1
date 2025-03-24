import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';

export const databaseConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5433,
  username: 'nest_user',
  password: 'lozinka123',
  database: 'mydb',
  entities: [User],
  synchronize: true,
};
