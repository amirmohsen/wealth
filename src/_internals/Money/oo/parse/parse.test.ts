import ROUNDING from '../../../constants/ROUNDING';

describe('parse (oo)', () => {
  const doMock = () => {
    class MockMoney {}
    const mockAction = jest.fn(() => 'return value');

    jest.resetModules();

    jest.doMock('../../../Money', () => ({
      __esModule: true,
      Money: MockMoney,
      default: MockMoney,
    }));

    jest.doMock('../../fn/parse', () => ({
      __esModule: true,
      default: mockAction,
    }));
  };

  const dontMock = () => {
    jest.dontMock('../../../Money');
    jest.dontMock('../../fn/parse');
  };

  beforeEach(doMock);

  afterEach(dontMock);

  test('should add parse to the Money class', async() => {
    const { Money } = await import('../../../Money');
    const { default: parse } = await import('../../fn/parse');

    expect(Money.parse).toBe(undefined);

    await import('.');

    expect(Money.parse).toBe(parse);
  });
});
