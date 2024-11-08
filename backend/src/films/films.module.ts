import { Module } from '@nestjs/common';
import { FilmsService } from './films.service';
import { FilmsController } from './films.controller';

@Module({
  imports: [],
  controllers: [FilmsController],
  providers: [FilmsService],
})
export class FilmsModule {}
