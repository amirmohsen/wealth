describe('allocateBy (oo)', () => {
  const doMock = (): void => {
    class MockMoney {}
    const mockAction = jest.fn(() => 'return value');

    jest.resetModules();

    jest.doMock('../../../Money', () => ({
      __esModule: true,
      Money: MockMoney,
      default: MockMoney,
    }));

    jest.doMock('../../fn/allocateBy', () => ({
      __esModule: true,
      default: mockAction,
    }));
  };

  const dontMock = (): void => {
    jest.dontMock('../../../Money');
    jest.dontMock('../../fn/allocateBy');
  };

  beforeEach(doMock);

  afterEach(dontMock);

  test('should add allocateBy to the Money prototype', async () => {
    const { Money } = await import('../..');

    expect(Money.prototype.allocateBy).toBeUndefined();

    await import('.');

    expect(typeof Money.prototype.allocateBy).toBe('function');
  });

  test('should call the fn version', async () => {
    const { Money } = await import('../..');
    await import('.');

    const { default: allocateBy } = await import('../../fn/allocateBy');

    const money = new Money('15.60', 'USD');
    const returnVal = money.allocateBy(5);

    expect(returnVal).toBe('return value');
    expect(allocateBy).toHaveBeenCalledTimes(1);
    expect(allocateBy).toHaveBeenCalledWith(money, 5);
  });
});
