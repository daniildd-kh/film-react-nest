// src/app.module.ts
import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigModule } from '@nestjs/config';
import { join } from 'path';
import { OrderModule } from './order/order.module';
import { FilmsModule } from './films/films.module';
import { RepositoryModule } from './repository/repository.module';
import { DatabaseModule } from './repository/database.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public/content/afisha'),
      serveRoot: '/content/afisha',
    }),
    DatabaseModule,
    OrderModule,
    FilmsModule,
    RepositoryModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
