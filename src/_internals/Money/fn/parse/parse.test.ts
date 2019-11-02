import { Money } from '../..';
import { USD, GBP, EUR, OMR, JPY } from '../../../constants/ISO_CURRENCIES';
import getData from '../../../CurrencyStore/internals/getData';
import Currency from '../../../Currency';
import parse from '.';

jest.mock('../../../CurrencyStore/internals/getData');

describe('parse', () => {
  const formatted = [
    ['-120,99 €', 'EUR'],
    ['54,42 €', 'EUR'],
    ['100,00 €', 'EUR'],
    ['1 200 145 154,42 €', 'EUR'],
    ['-£120.99', 'GBP'],
    ['£54.42', 'GBP'],
    ['£100.00', 'GBP'],
    ['£1,200,145,154.42', 'GBP'],
    ['-¥121', 'JPY'],
    ['¥54', 'JPY'],
    ['¥100', 'JPY'],
    ['¥1,200,145,154', 'JPY'],
    ['﷼ -120.990', 'OMR'],
    ['﷼ 54.420', 'OMR'],
    ['﷼ 100.000', 'OMR'],
    ['﷼ 1,200,145,154.420', 'OMR'],
    ['-$120.99', 'USD'],
    ['$54.42', 'USD'],
    ['$100.00', 'USD'],
    ['$1,200,145,154.42', 'USD'],
  ];

  beforeAll(() => {
    getData.mockReturnValue({
      USD,
      GBP,
      EUR,
      OMR,
      JPY,
    });
  });

  for (const [value, currency] of formatted) {
    describe(`with "${currency}"`, () => {
      test(`should parse "${value}" given ${JSON.stringify(currency)} correctly`, () => {
        expect(parse(value, currency)).toMatchSnapshot();
      });
    });
  }

  describe('when given a currency as settings', () => {
    test('should merge it with the built-in currency to format', () => {
      const customEUR = new Currency({
        ...EUR,
        thousandsSeparator: ',',
        decimalSeparator: '.',
        decimalDigits: 2,
        pattern: '%ns%s%v',
      });

      expect(parse('45 680,90 €', 'EUR').toJSON()).toEqual({
        amount: '45680.90',
        currency: 'EUR',
      });
      expect(parse('€45,680.90', customEUR).toJSON()).toEqual({
        amount: '45680.90',
        currency: 'EUR',
      });
    });
  });

  describe('when given a settings object', () => {
    test('should merge it with the built-in currency to format', () => {
      expect(parse('-£45,680.90', 'GBP').toJSON()).toEqual({
        amount: '-45680.90',
        currency: 'GBP',
      });
      expect(
        parse('GBP -45,680.90', {
          code: 'GBP',
          pattern: '%c %ns%v',
        }).toJSON(),
      ).toEqual({
        amount: '-45680.90',
        currency: 'GBP',
      });
    });
  });

  describe('when given a custom parser', () => {
    const customParsedValue = Symbol('custom parsed');
    const customParser = jest.fn((args: object) => customParsedValue as unknown as Money);
    let parsedValue;

    beforeAll(() => {
      const customUSD = new Currency({
        ...USD,
        parser: (args: object) => customParser(args),
      });
      parsedValue = parse('$80.90', customUSD);
    });

    test('should use its return value for parsing', () => {
      expect(parsedValue).toBe(customParsedValue);
    });

    test('should call it once with the snapshotted arguments', () => {
      expect(customParser).toHaveBeenCalledTimes(1);
      expect(customParser.mock.calls[0]).toMatchSnapshot();
    });
  });
});
