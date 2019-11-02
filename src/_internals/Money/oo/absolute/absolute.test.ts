describe('absolute (oo)', () => {
  const doMock = (): void => {
    class MockMoney {}
    const mockAction = jest.fn(() => 'return value');

    jest.resetModules();

    jest.doMock('../../../Money', () => ({
      __esModule: true,
      Money: MockMoney,
      default: MockMoney,
    }));

    jest.doMock('../../fn/absolute', () => ({
      __esModule: true,
      default: mockAction,
    }));
  };

  const dontMock = (): void => {
    jest.dontMock('../../../Money');
    jest.dontMock('../../fn/absolute');
  };

  beforeEach(doMock);

  afterEach(dontMock);

  test('should add absolute to the Money prototype', async () => {
    const { Money } = await import('../..');

    expect(Money.prototype.absolute).toBeUndefined();

    await import('.');

    expect(typeof Money.prototype.absolute).toBe('function');
  });

  test('should call the fn version', async () => {
    const { Money } = await import('../..');
    await import('.');

    const { default: absolute } = await import('../../fn/absolute');

    const money = new Money('15.60', 'USD');
    const returnVal = money.absolute();

    expect(returnVal).toBe('return value');
    expect(absolute).toHaveBeenCalledTimes(1);
    expect(absolute).toHaveBeenCalledWith(money);
  });
});
