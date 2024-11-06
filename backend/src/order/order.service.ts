import { BadRequestException, Injectable } from '@nestjs/common';
import { OrderDto } from './dto/order.dto';
import { FilmsDbRepository } from '../repository/films.repository';

@Injectable()
export class OrderService {
  constructor(private readonly filmsRepository: FilmsDbRepository) {}

  async makeOrder(orderDto: OrderDto) {
    const { tickets } = orderDto;

    for (const ticket of tickets) {
      const { film, session, row, seat } = ticket;

      const filmInDB = await this.filmsRepository.findOneRaw(film);
      if (!filmInDB) throw new BadRequestException('Фильм не найден');

      const selectedSession = filmInDB.schedules.find((s) => s.id === session);
      if (!selectedSession) throw new BadRequestException('Сеанс не найден');

      const seatPicked = `${row}:${seat}`;
      const isSeatTaken = selectedSession.taken
        ?.split(',')
        .includes(seatPicked);

      if (isSeatTaken) throw new BadRequestException('Это место уже занято');

      selectedSession.taken = selectedSession.taken
        ? `${selectedSession.taken},${seatPicked}`
        : seatPicked;

      await this.filmsRepository.updateFilm(filmInDB);
    }

    return { items: tickets.map((ticket) => ({ ...ticket })) };
  }
}
