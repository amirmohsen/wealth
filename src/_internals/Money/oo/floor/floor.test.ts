describe('floor (oo)', () => {
  const doMock = (): void => {
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

  const dontMock = (): void => {
    jest.dontMock('../../../Money');
    jest.dontMock('../../fn/floor');
  };

  beforeEach(doMock);

  afterEach(dontMock);

  test('should add floor to the Money prototype', async () => {
    const { Money } = await import('../..');

    expect(Money.prototype.floor).toBeUndefined();

    await import('.');

    expect(typeof Money.prototype.floor).toBe('function');
  });

  test('should call the fn version', async () => {
    const { Money } = await import('../..');
    await import('.');

    const { default: floor } = await import('../../fn/floor');

    const money = new Money('15.60', 'USD');
    const returnVal = money.floor();

    expect(returnVal).toBe('return value');
    expect(floor).toHaveBeenCalledTimes(1);
    expect(floor).toHaveBeenCalledWith(money);
  });
});
