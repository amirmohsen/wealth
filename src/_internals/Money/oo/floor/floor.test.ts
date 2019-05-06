describe('floor (oo)', () => {
  const doMock = () => {
    class MockMoney {}
    const mockAction = jest.fn(() => 'return value');

    jest.resetModules();

    jest.doMock('../../../Money', () => ({
      __esModule: true,
      Money: MockMoney,
      default: MockMoney,
    }));

    jest.doMock('../../fn/floor', () => ({
      __esModule: true,
      default: mockAction,
    }));
  };

  const dontMock = () => {
    jest.dontMock('../../../Money');
    jest.dontMock('../../fn/floor');
  };

  beforeEach(doMock);

  afterEach(dontMock);

  test('should add floor to the Money prototype', async() => {
    const { Money } = await import('../../../Money');

    expect(Money.prototype.floor).toBe(undefined);

    await import('../floor');

    expect(typeof Money.prototype.floor).toBe('function');
  });

  test('should call the fn version', async() => {
    const { Money } = await import('../../../Money');
    await import('../floor');

    const { default: floor } = await import('../../fn/floor');

    const money = new Money('15.60', 'USD');
    const returnVal = money.floor();

    expect(returnVal).toBe('return value');
    expect(floor).toHaveBeenCalledTimes(1);
    expect(floor).toHaveBeenCalledWith(money);
  });
});
