import { Test, TestingModule } from '@nestjs/testing';
import { DevLogger } from './dev-logger.service';

describe('UserLoggerService', () => {
  let service: DevLogger;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DevLogger],
    }).compile();

    service = module.get<DevLogger>(DevLogger);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
