import ROUNDING from '../../../constants/ROUNDING';

describe('multiply (oo)', () => {
  const doMock = () => {
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

  const dontMock = () => {
    jest.dontMock('../../../Money');
    jest.dontMock('../../fn/multiply');
  };

  beforeEach(doMock);

  afterEach(dontMock);

  test('should add multiply to the Money prototype', async() => {
    const { Money } = await import('../../../Money');

    expect(Money.prototype.multiply).toBe(undefined);

    await import('.');

    expect(typeof Money.prototype.multiply).toBe('function');
  });

  test('should call the fn version', async() => {
    const { Money } = await import('../../../Money');
    await import('.');

    const { default: multiply } = await import('../../fn/multiply');

    const money = new Money('15.60', 'USD');
    const returnVal = money.multiply('56.20', ROUNDING.CEIL);

    expect(returnVal).toBe('return value');
    expect(multiply).toHaveBeenCalledTimes(1);
    expect(multiply).toHaveBeenCalledWith(money, '56.20', ROUNDING.CEIL);
  });
});
