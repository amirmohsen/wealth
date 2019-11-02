describe('format (oo)', () => {
  const doMock = (): void => {
    class MockMoney {}
    const mockAction = jest.fn(() => 'return value');

    jest.resetModules();

    jest.doMock('../../../Money', () => ({
      __esModule: true,
      Money: MockMoney,
      default: MockMoney,
    }));

    jest.doMock('../../fn/format', () => ({
      __esModule: true,
      default: mockAction,
    }));
  };

  const dontMock = (): void => {
    jest.dontMock('../../../Money');
    jest.dontMock('../../fn/format');
  };

  beforeEach(doMock);

  afterEach(dontMock);

  test('should add format to the Money prototype', async () => {
    const { Money } = await import('../..');

    expect(Money.prototype.format).toBeUndefined();

    await import('.');

    expect(typeof Money.prototype.format).toBe('function');
  });

  test('should call the fn version', async () => {
    const { Money } = await import('../..');
    await import('.');

    const { default: format } = await import('../../fn/format');

    const money = new Money('15.60', 'USD');
    const returnVal = money.format('USD');

    expect(returnVal).toBe('return value');
    expect(format).toHaveBeenCalledTimes(1);
    expect(format).toHaveBeenCalledWith(money, 'USD');
  });
});
