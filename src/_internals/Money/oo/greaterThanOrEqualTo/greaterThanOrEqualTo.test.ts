describe('greaterThanOrEqualTo (oo)', () => {
  const doMock = (): void => {
    class MockMoney {}
    const mockAction = jest.fn(() => 'return value');

    jest.resetModules();

    jest.doMock('../../../Money', () => ({
      __esModule: true,
      Money: MockMoney,
      default: MockMoney,
    }));

    jest.doMock('../../fn/greaterThanOrEqualTo', () => ({
      __esModule: true,
      default: mockAction,
    }));
  };

  const dontMock = (): void => {
    jest.dontMock('../../../Money');
    jest.dontMock('../../fn/greaterThanOrEqualTo');
  };

  beforeEach(doMock);

  afterEach(dontMock);

  test('should add greaterThanOrEqualTo to the Money prototype', async () => {
    const { Money } = await import('../..');

    expect(Money.prototype.greaterThanOrEqualTo).toBeUndefined();

    await import('.');

    expect(typeof Money.prototype.greaterThanOrEqualTo).toBe('function');
  });

  test('should call the fn version', async () => {
    const { Money } = await import('../..');
    await import('.');

    const { default: greaterThanOrEqualTo } = await import('../../fn/greaterThanOrEqualTo');

    const money = new Money('15.60', 'USD');
    const returnVal = money.greaterThanOrEqualTo('56.20');

    expect(returnVal).toBe('return value');
    expect(greaterThanOrEqualTo).toHaveBeenCalledTimes(1);
    expect(greaterThanOrEqualTo).toHaveBeenCalledWith(money, '56.20');
  });
});
