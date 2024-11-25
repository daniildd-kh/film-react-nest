import { ConsoleLogger } from "@nestjs/common";
import { DevLogger } from "./dev-logger.service";

describe('DevLogger', () => {
  it('должен быть определен', () => {

    expect(DevLogger).toBeDefined();

    const logger = new DevLogger();
    expect(logger).toBeInstanceOf(ConsoleLogger);
  });
});
