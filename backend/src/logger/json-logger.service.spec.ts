import { Test, TestingModule } from '@nestjs/testing';
import { DevLogger } from './dev-logger.service';
import { JsonLogger } from './json-logger.service';

describe('JsonLogger', () => {
  let logger: JsonLogger;

  beforeEach(() => {
    logger = new JsonLogger();
    jest.spyOn(console, 'log').mockImplementation(() => {});
    jest.spyOn(console, 'error').mockImplementation(() => {});
    jest.spyOn(console, 'warn').mockImplementation(() => {});
    jest.spyOn(console, 'debug').mockImplementation(() => {});
    jest.spyOn(console, 'info').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('форматирует и возвращает log в JSON формате', () => {
    const message = 'Test message';
    const optionalParams = ['param1', 123];

    logger.log(message, ...optionalParams);

    expect(console.log).toHaveBeenCalledWith(
      '{"level":"log","message":"Test message","optionalParams":[["param1",123]]}'
    );
  });

  it('форматирует и возвращает error в JSON формате', () => {
    const message = 'Error occurred';
    const optionalParams = ['param1'];

    logger.error(message, ...optionalParams);

    expect(console.error).toHaveBeenCalledWith(
      '{"level":"error","message":"Error occurred","optionalParams":[["param1"]]}'
    );
  });

  it('форматирует и возвращает warn в JSON формате', () => {
    const message = 'Warning';
    const optionalParams = ['param1'];

    logger.warn(message, ...optionalParams);

    expect(console.warn).toHaveBeenCalledWith(
      '{"level":"warn","message":"Warning","optionalParams":[["param1"]]}'
    );
  });

  it('форматирует и возвращает debug в JSON формате', () => {
    const message = 'Debug message';
    const optionalParams = ['param1'];

    logger.debug(message, ...optionalParams);

    expect(console.debug).toHaveBeenCalledWith(
      '{"level":"debug","message":"Debug message","optionalParams":[["param1"]]}'
    );
  });

  it('форматирует и возвращает verbose в JSON формате', () => {
    const message = 'Verbose message';
    const optionalParams = ['param1'];

    logger.verbose(message, ...optionalParams);

    expect(console.info).toHaveBeenCalledWith(
      '{"level":"verbose","message":"Verbose message","optionalParams":[["param1"]]}'
    );
  });
});
