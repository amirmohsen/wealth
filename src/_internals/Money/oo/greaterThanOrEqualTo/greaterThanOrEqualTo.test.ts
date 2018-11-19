describe('greaterThanOrEqualTo (oo)', () => {
  const doMock = () => {
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

  const dontMock = () => {
    jest.dontMock('../../../Money');
    jest.dontMock('../../fn/greaterThanOrEqualTo');
  };

  beforeEach(doMock);

  afterEach(dontMock);

  test('should add greaterThanOrEqualTo to the Money prototype', async() => {
    const { Money } = await import('../../../Money');

    expect(Money.prototype.greaterThanOrEqualTo).toBe(undefined);

    await import('../greaterThanOrEqualTo');

    expect(typeof Money.prototype.greaterThanOrEqualTo).toBe('function');
  });

  test('should call the fn version', async() => {
    const { Money } = await import('../../../Money');
    await import('../greaterThanOrEqualTo');

    const { default: greaterThanOrEqualTo } = await import('../../fn/greaterThanOrEqualTo');

    const money = new Money('15.60', 'USD');
    const returnVal = money.greaterThanOrEqualTo('56.20');

    expect(returnVal).toBe('return value');
    expect(greaterThanOrEqualTo).toHaveBeenCalledTimes(1);
    expect(greaterThanOrEqualTo).toHaveBeenCalledWith(money, '56.20');
  });
});
