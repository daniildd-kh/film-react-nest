import { BadRequestException, Injectable } from '@nestjs/common';
import { OrderDto } from './dto/order.dto';
import { FilmsMongoDbRepository } from 'src/repository/films.repository';

@Injectable()
export class OrderService {
  constructor(private readonly filmsRepository: FilmsMongoDbRepository) {}

  async makeOrder(orderDto: OrderDto) {
    const { tickets } = orderDto;
    for (const ticket of tickets) {
      const { film, session, row, seat } = ticket;

      const document = await this.filmsRepository.findOneAsDocument(film);

      if (!document) {
        throw new BadRequestException('Фильм не найден');
      }
      const selectedSession = document.schedule.find((s) => s.id === session);

      if (!selectedSession) {
        throw new BadRequestException('Сеанс не найден');
      }
      const seatIdentifier = `${row}:${seat}`;
      if (selectedSession.taken.includes(seatIdentifier)) {
        throw new BadRequestException('Это место уже занято');
      }
      selectedSession.taken.push(seatIdentifier);

      await document.save();
    }

    return { items: orderDto.tickets.map((tiket) => ({ ...tiket })) };
  }
}
