describe('add (oo)', () => {
  const doMock = (): void => {
    class MockMoney {}
    const mockAction = jest.fn(() => 'return value');

    jest.resetModules();

    jest.doMock('../../../Money', () => ({
      __esModule: true,
      Money: MockMoney,
      default: MockMoney,
    }));

    jest.doMock('../../fn/add', () => ({
      __esModule: true,
      default: mockAction,
    }));
  };

  const dontMock = (): void => {
    jest.dontMock('../../../Money');
    jest.dontMock('../../fn/add');
  };

  beforeEach(doMock);

  afterEach(dontMock);

  test('should add add to the Money prototype', async () => {
    const { Money } = await import('../..');

    expect(Money.prototype.add).toBeUndefined();

    await import('.');

    expect(typeof Money.prototype.add).toBe('function');
  });

  test('should call the fn version', async () => {
    const { Money } = await import('../..');
    await import('.');

    const { default: add } = await import('../../fn/add');

    const money = new Money('15.60', 'USD');
    const returnVal = money.add('56.20');

    expect(returnVal).toBe('return value');
    expect(add).toHaveBeenCalledTimes(1);
    expect(add).toHaveBeenCalledWith(money, '56.20');
  });
});
