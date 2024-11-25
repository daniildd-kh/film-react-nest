import { Controller, Post, Body, Logger } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderDto } from './dto/order.dto';

@Controller('/order')
export class OrderController {
  private readonly logger = new Logger(OrderController.name);
  
  constructor(
    private readonly orderService: OrderService,
  ) {}

  @Post()
  async makeOrder(@Body() orderDto: OrderDto) {
    this.logger.log('Запрос на создание нового заказа');
    const result = await this.orderService.makeOrder(orderDto);
    this.logger.log('Заказ успешно создан');
    return result;
  }
}