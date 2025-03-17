import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const databaseConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'nest_user',
  password: '197374',
  database: 'nestapp', // Ovdje koristimo novu bazu!
  entities: [__dirname + '/../entities/*.entity.{ts,js}'],
  synchronize: true, // Automatski kreira tablice (samo za razvoj)
};
