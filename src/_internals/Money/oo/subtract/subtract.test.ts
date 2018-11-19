describe('subtract (oo)', () => {
  const doMock = () => {
    class MockMoney {}
    const mockAction = jest.fn(() => 'return value');

    jest.resetModules();

    jest.doMock('../../../Money', () => ({
      __esModule: true,
      Money: MockMoney,
      default: MockMoney,
    }));

    jest.doMock('../../fn/subtract', () => ({
      __esModule: true,
      default: mockAction,
    }));
  };

  const dontMock = () => {
    jest.dontMock('../../../Money');
    jest.dontMock('../../fn/subtract');
  };

  beforeEach(doMock);

  afterEach(dontMock);

  test('should add subtract to the Money prototype', async() => {
    const { Money } = await import('../../../Money');

    expect(Money.prototype.subtract).toBe(undefined);

    await import('../subtract');

    expect(typeof Money.prototype.subtract).toBe('function');
  });

  test('should call the fn version', async() => {
    const { Money } = await import('../../../Money');
    await import('../subtract');

    const { default: subtract } = await import('../../fn/subtract');

    const money = new Money('15.60', 'USD');
    const returnVal = money.subtract('56.20');

    expect(returnVal).toBe('return value');
    expect(subtract).toHaveBeenCalledTimes(1);
    expect(subtract).toHaveBeenCalledWith(money, '56.20');
  });
});
