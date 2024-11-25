import { TskvLogger } from "./tskv-logger.service";

describe('TskvLogger', () => {
  let logger: TskvLogger;

  beforeEach(() => {
    logger = new TskvLogger();
    jest.spyOn(Date.prototype, 'toISOString').mockReturnValue('2000-01-01T00:00:00.000Z');
    jest.spyOn(console, 'log').mockImplementation(() => {});
    jest.spyOn(console, 'error').mockImplementation(() => {});
    jest.spyOn(console, 'warn').mockImplementation(() => {});
    jest.spyOn(console, 'debug').mockImplementation(() => {});
    jest.spyOn(console, 'info').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('форматирует и возвращает log в TSKV формате', () => {
    const message = 'Test message';
    const optionalParams = ['param1', 'param2'];

    const timestamp = new Date().toISOString();
    const expectedLog = `time=${timestamp}\tlevel=log\tmessage=Test message\tparam1,param2`;

    logger.log(message, optionalParams);

    expect(console.log).toHaveBeenCalledWith(expectedLog);
  });

  it('форматирует и возвращает error в TSKV формате', () => {
    const message = 'Error occurred';
    const optionalParams = ['param1'];

    const timestamp = new Date().toISOString();
    const expectedLog = `time=${timestamp}\tlevel=error\tmessage=Error occurred\tparam1`;

    logger.error(message, ...optionalParams);

    expect(console.error).toHaveBeenCalledWith(expectedLog);
  });

  it('форматирует и возвращает warn в TSKV формате', () => {
    const message = 'Warning';
    const optionalParams = ['param1'];

    const timestamp = new Date().toISOString();
    const expectedLog = `time=${timestamp}\tlevel=warn\tmessage=Warning\tparam1`;

    logger.warn(message, ...optionalParams);

    expect(console.warn).toHaveBeenCalledWith(expectedLog);
  });

  it('форматирует и возвращает debug в TSKV формате', () => {
    const message = 'Debug message';
    const optionalParams = ['param1'];

    const timestamp = new Date().toISOString();
    const expectedLog = `time=${timestamp}\tlevel=debug\tmessage=Debug message\tparam1`;

    logger.debug(message, ...optionalParams);

    expect(console.debug).toHaveBeenCalledWith(expectedLog);
  });

  it('форматирует и возвращает verbose в TSKV формате', () => {
    const message = 'Verbose message';
    const optionalParams = ['param1'];

    const timestamp = new Date().toISOString();
    const expectedLog = `time=${timestamp}\tlevel=verbose\tmessage=Verbose message\tparam1`;

    logger.verbose(message, ...optionalParams);

    expect(console.info).toHaveBeenCalledWith(expectedLog);
  });
});
