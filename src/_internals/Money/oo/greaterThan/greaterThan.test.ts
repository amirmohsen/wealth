describe('greaterThan (oo)', () => {
  const doMock = () => {
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

  const dontMock = () => {
    jest.dontMock('../../../Money');
    jest.dontMock('../../fn/greaterThan');
  };

  beforeEach(doMock);

  afterEach(dontMock);

  test('should add greaterThan to the Money prototype', async() => {
    const { Money } = await import('../../../Money');

    expect(Money.prototype.greaterThan).toBe(undefined);

    await import('../greaterThan');

    expect(typeof Money.prototype.greaterThan).toBe('function');
  });

  test('should call the fn version', async() => {
    const { Money } = await import('../../../Money');
    await import('../greaterThan');

    const { default: greaterThan } = await import('../../fn/greaterThan');

    const money = new Money('15.60', 'USD');
    const returnVal = money.greaterThan('56.20');

    expect(returnVal).toBe('return value');
    expect(greaterThan).toHaveBeenCalledTimes(1);
    expect(greaterThan).toHaveBeenCalledWith(money, '56.20');
  });
});
