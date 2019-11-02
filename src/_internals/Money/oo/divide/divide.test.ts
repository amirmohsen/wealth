import ROUNDING from '../../../constants/ROUNDING';

describe('divide (oo)', () => {
  const doMock = (): void => {
    class MockMoney {}
    const mockAction = jest.fn(() => 'return value');

    jest.resetModules();

    jest.doMock('../../../Money', () => ({
      __esModule: true,
      Money: MockMoney,
      default: MockMoney,
    }));

    jest.doMock('../../fn/divide', () => ({
      __esModule: true,
      default: mockAction,
    }));
  };

  const dontMock = (): void => {
    jest.dontMock('../../../Money');
    jest.dontMock('../../fn/divide');
  };

  beforeEach(doMock);

  afterEach(dontMock);

  test('should add divide to the Money prototype', async () => {
    const { Money } = await import('../..');

    expect(Money.prototype.divide).toBeUndefined();

    await import('.');

    expect(typeof Money.prototype.divide).toBe('function');
  });

  test('should call the fn version', async () => {
    const { Money } = await import('../..');
    await import('.');

    const { default: divide } = await import('../../fn/divide');

    const money = new Money('15.60', 'USD');
    const returnVal = money.divide('56.20', ROUNDING.CEIL);

    expect(returnVal).toBe('return value');
    expect(divide).toHaveBeenCalledTimes(1);
    expect(divide).toHaveBeenCalledWith(money, '56.20', ROUNDING.CEIL);
  });
});
