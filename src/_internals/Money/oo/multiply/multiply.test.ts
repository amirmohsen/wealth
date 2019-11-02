import ROUNDING from '../../../constants/ROUNDING';

describe('multiply (oo)', () => {
  const doMock = (): void => {
    class MockMoney {}
    const mockAction = jest.fn(() => 'return value');

    jest.resetModules();

    jest.doMock('../../../Money', () => ({
      __esModule: true,
      Money: MockMoney,
      default: MockMoney,
    }));

    jest.doMock('../../fn/multiply', () => ({
      __esModule: true,
      default: mockAction,
    }));
  };

  const dontMock = (): void => {
    jest.dontMock('../../../Money');
    jest.dontMock('../../fn/multiply');
  };

  beforeEach(doMock);

  afterEach(dontMock);

  test('should add multiply to the Money prototype', async () => {
    const { Money } = await import('../..');

    expect(Money.prototype.multiply).toBeUndefined();

    await import('.');

    expect(typeof Money.prototype.multiply).toBe('function');
  });

  test('should call the fn version', async () => {
    const { Money } = await import('../..');
    await import('.');

    const { default: multiply } = await import('../../fn/multiply');

    const money = new Money('15.60', 'USD');
    const returnVal = money.multiply('56.20', ROUNDING.CEIL);

    expect(returnVal).toBe('return value');
    expect(multiply).toHaveBeenCalledTimes(1);
    expect(multiply).toHaveBeenCalledWith(money, '56.20', ROUNDING.CEIL);
  });
});
