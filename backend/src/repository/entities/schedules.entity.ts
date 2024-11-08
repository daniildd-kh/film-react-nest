import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { FilmEntity } from './films.entity';

@Entity({ name: 'schedules' })
export class Schedule {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  daytime: string;

  @Column()
  hall: number;

  @Column()
  rows: number;

  @Column()
  seats: number;

  @Column('double precision', { nullable: true })
  price: number;

  @Column({ type: 'text' })
  taken: string;

  @ManyToOne(() => FilmEntity, (film) => film.schedule)
  @JoinColumn({ name: 'filmId' })
  film: FilmEntity;
}
