import { Test, TestingModule } from '@nestjs/testing';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { OrderDto, SessionDto } from './dto/order.dto';

describe('OrderController', () => {
  let orderController: OrderController;
  let orderService: OrderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderController],
      providers: [OrderService],
    })
      .overrideProvider(OrderService)
      .useValue({
        makeOrder: jest.fn().mockResolvedValue([{ id: '1', tickets: [1, 2] }]),
      })
      .compile();

    orderController = module.get<OrderController>(OrderController);
    orderService = module.get<OrderService>(OrderService);
  });

  it('должен возвращать заказ', async () => {
    const session: SessionDto = {
      film: '1',
      session: '1',
      daytime: '2024-01-01',
      row: 1,
      seat: 10,
      price: 350,
    };
    const order: OrderDto = {
      email: 'test@mail.test',
      phone: '+79000000000',
      tickets: [session],
    };
    const result = await orderController.makeOrder(order);
    expect(orderService.makeOrder).toHaveBeenCalledWith(order);
    expect(result).toEqual([{ id: '1', tickets: [1, 2] }]);
  });
});
