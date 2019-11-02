describe('allocate (oo)', () => {
  const doMock = (): void => {
    class MockMoney {}
    const mockAction = jest.fn(() => 'return value');

    jest.resetModules();

    jest.doMock('../../../Money', () => ({
      __esModule: true,
      Money: MockMoney,
      default: MockMoney,
    }));

    jest.doMock('../../fn/allocate', () => ({
      __esModule: true,
      default: mockAction,
    }));
  };

  const dontMock = (): void => {
    jest.dontMock('../../../Money');
    jest.dontMock('../../fn/allocate');
  };

  beforeEach(doMock);

  afterEach(dontMock);

  test('should add allocate to the Money prototype', async () => {
    const { Money } = await import('../..');

    expect(Money.prototype.allocate).toBeUndefined();

    await import('.');

    expect(typeof Money.prototype.allocate).toBe('function');
  });

  test('should call the fn version', async () => {
    const { Money } = await import('../..');
    await import('.');

    const { default: allocate } = await import('../../fn/allocate');

    const money = new Money('15.60', 'USD');
    const returnVal = money.allocate([60, 40]);

    expect(returnVal).toBe('return value');
    expect(allocate).toHaveBeenCalledTimes(1);
    expect(allocate).toHaveBeenCalledWith(money, [60, 40]);
  });
});
