describe('equals (oo)', () => {
  const doMock = (): void => {
    class MockMoney {}
    const mockAction = jest.fn(() => 'return value');

    jest.resetModules();

    jest.doMock('../../../Money', () => ({
      __esModule: true,
      Money: MockMoney,
      default: MockMoney,
    }));

    jest.doMock('../../fn/equals', () => ({
      __esModule: true,
      default: mockAction,
    }));
  };

  const dontMock = (): void => {
    jest.dontMock('../../../Money');
    jest.dontMock('../../fn/equals');
  };

  beforeEach(doMock);

  afterEach(dontMock);

  test('should add equals to the Money prototype', async () => {
    const { Money } = await import('../..');

    expect(Money.prototype.equals).toBeUndefined();

    await import('.');

    expect(typeof Money.prototype.equals).toBe('function');
  });

  test('should call the fn version', async () => {
    const { Money } = await import('../..');
    await import('.');

    const { default: equals } = await import('../../fn/equals');

    const money = new Money('15.60', 'USD');
    const returnVal = money.equals('56.20');

    expect(returnVal).toBe('return value');
    expect(equals).toHaveBeenCalledTimes(1);
    expect(equals).toHaveBeenCalledWith(money, '56.20');
  });
});
