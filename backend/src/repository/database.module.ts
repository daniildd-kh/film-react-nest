import { Module, DynamicModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getMongooseConfig, getPostgresConfig } from 'src/app.config.provider';

@Module({})
export class DatabaseModule {
  static forRoot(): DynamicModule {
    return {
      module: DatabaseModule,
      imports: [
        ConfigModule,
        process.env.DATABASE_DRIVER === 'postgres'
          ? TypeOrmModule.forRootAsync({
              imports: [ConfigModule],
              inject: [ConfigService],
              useFactory: getPostgresConfig,
            })
          : MongooseModule.forRootAsync({
              imports: [ConfigModule],
              inject: [ConfigService],
              useFactory: getMongooseConfig,
            }),
      ],
    };
  }
}
