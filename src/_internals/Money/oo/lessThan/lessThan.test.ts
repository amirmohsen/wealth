describe('lessThan (oo)', () => {
  const doMock = (): void => {
    class MockMoney {}
    const mockAction = jest.fn(() => 'return value');

    jest.resetModules();

    jest.doMock('../../../Money', () => ({
      __esModule: true,
      Money: MockMoney,
      default: MockMoney,
    }));

    jest.doMock('../../fn/lessThan', () => ({
      __esModule: true,
      default: mockAction,
    }));
  };

  const dontMock = (): void => {
    jest.dontMock('../../../Money');
    jest.dontMock('../../fn/lessThan');
  };

  beforeEach(doMock);

  afterEach(dontMock);

  test('should add lessThan to the Money prototype', async () => {
    const { Money } = await import('../..');

    expect(Money.prototype.lessThan).toBeUndefined();

    await import('.');

    expect(typeof Money.prototype.lessThan).toBe('function');
  });

  test('should call the fn version', async () => {
    const { Money } = await import('../..');
    await import('.');

    const { default: lessThan } = await import('../../fn/lessThan');

    const money = new Money('15.60', 'USD');
    const returnVal = money.lessThan('56.20');

    expect(returnVal).toBe('return value');
    expect(lessThan).toHaveBeenCalledTimes(1);
    expect(lessThan).toHaveBeenCalledWith(money, '56.20');
  });
});
