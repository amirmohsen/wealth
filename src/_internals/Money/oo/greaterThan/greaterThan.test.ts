describe('greaterThan (oo)', () => {
  const doMock = (): void => {
    class MockMoney {}
    const mockAction = jest.fn(() => 'return value');

    jest.resetModules();

    jest.doMock('../../../Money', () => ({
      __esModule: true,
      Money: MockMoney,
      default: MockMoney,
    }));

    jest.doMock('../../fn/greaterThan', () => ({
      __esModule: true,
      default: mockAction,
    }));
  };

  const dontMock = (): void => {
    jest.dontMock('../../../Money');
    jest.dontMock('../../fn/greaterThan');
  };

  beforeEach(doMock);

  afterEach(dontMock);

  test('should add greaterThan to the Money prototype', async () => {
    const { Money } = await import('../..');

    expect(Money.prototype.greaterThan).toBeUndefined();

    await import('.');

    expect(typeof Money.prototype.greaterThan).toBe('function');
  });

  test('should call the fn version', async () => {
    const { Money } = await import('../..');
    await import('.');

    const { default: greaterThan } = await import('../../fn/greaterThan');

    const money = new Money('15.60', 'USD');
    const returnVal = money.greaterThan('56.20');

    expect(returnVal).toBe('return value');
    expect(greaterThan).toHaveBeenCalledTimes(1);
    expect(greaterThan).toHaveBeenCalledWith(money, '56.20');
  });
});
