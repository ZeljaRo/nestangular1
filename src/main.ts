import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';
import { Client } from 'pg'; // PostgreSQL konekcija izvan TypeORM-a

async function testPgConnection() {
  const client = new Client({
    host: 'localhost',
    port: 5433,
    user: 'nest_user',
    password: 'lozinka123',
    database: 'mydb',
  });

  try {
    await client.connect();
    console.log('✅ PostgreSQL konekcija uspješna!');
  } catch (err) {
    console.error('❌ PostgreSQL konekcija neuspješna:', err.message);
  } finally {
    await client.end();
  }
}

async function bootstrap() {
  await testPgConnection(); // Pokrećemo test prije aplikacije

  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'http://localhost:4200', // Dozvoljavamo frontend pristup
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  await app.listen(3005);
}
bootstrap();
