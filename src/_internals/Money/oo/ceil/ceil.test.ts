describe('ceil (oo)', () => {
  const doMock = (): void => {
    class MockMoney {}
    const mockAction = jest.fn(() => 'return value');

    jest.resetModules();

    jest.doMock('../../../Money', () => ({
      __esModule: true,
      Money: MockMoney,
      default: MockMoney,
    }));

    jest.doMock('../../fn/ceil', () => ({
      __esModule: true,
      default: mockAction,
    }));
  };

  const dontMock = (): void => {
    jest.dontMock('../../../Money');
    jest.dontMock('../../fn/ceil');
  };

  beforeEach(doMock);

  afterEach(dontMock);

  test('should add ceil to the Money prototype', async () => {
    const { Money } = await import('../..');

    expect(Money.prototype.ceil).toBeUndefined();

    await import('.');

    expect(typeof Money.prototype.ceil).toBe('function');
  });

  test('should call the fn version', async () => {
    const { Money } = await import('../..');
    await import('.');

    const { default: ceil } = await import('../../fn/ceil');

    const money = new Money('15.60', 'USD');
    const returnVal = money.ceil();

    expect(returnVal).toBe('return value');
    expect(ceil).toHaveBeenCalledTimes(1);
    expect(ceil).toHaveBeenCalledWith(money);
  });
});
