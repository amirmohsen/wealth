import Currency from './Currency';
import Money from '../Money/Money';
import WrongInputError from '../errors/WrongInputError';
import InvalidCurrencyError from '../errors/InvalidCurrencyError';

describe('The "Currency" class: ', () => {
  test('(new Currency("USD")).toString() === "USD"', () => {
    expect((new Currency('USD')).toString()).toBe('USD');
  });

  test('(new Currency("GBP")).getDecimalDigits() === 2', () => {
    expect((new Currency('GBP')).getDecimalDigits()).toBe(2);
  });

  test('(new Currency("EUR")).getSymbol() === "€"', () => {
    expect((new Currency('EUR')).getSymbol()).toBe('€');
  });

  test('(new Currency("EUR")).getSymbol() === "€"', () => {
    expect((new Currency('CAD')).getPattern()).toBe('%ns%s%v');
  });

  test('(new Currency("GBP")).is(new Currency("GBP")) === true', () => {
    expect((new Currency('GBP')).is(new Currency('GBP'))).toBe(true);
  });

  test('(new Currency("GBP")).is(new Currency("USD")) === false', () => {
    expect((new Currency('GBP')).is(new Currency('USD'))).toBe(false);
  });

  test('clone should create a duplicate copy of a currency', () => {
    const gbp = new Currency('GBP');
    const gbpClone = gbp.clone();
    expect(gbp).toEqual(gbpClone);
  });

  test('"formatter" option should do custom formatting', () => {
    const customFormatter = jest.fn(() => 'custom format');
    const customGBP = new Currency({
      ...Currency.getSettings('GBP'),
      formatter: customFormatter,
    });
    const customGBPMoney = new Money('10.00', customGBP);
    const formattedValue = customGBPMoney.format();
    const {
      formatter,
      parser,
      ...currencySettings
    } = customGBP.getSettings();

    expect(formattedValue).toBe('custom format');
    expect(customFormatter).toHaveBeenCalledTimes(1);
    expect(customFormatter).toHaveBeenCalledWith({
      ...currencySettings,
      value: customGBPMoney,
      defaultFormatted: '£10.00',
    });
  });

  test('"parser" option should do custom parsing', () => {
    const customParser = jest.fn(() => 'custom parsed');
    const customGBP = new Currency({
      ...Currency.getSettings('GBP'),
      parser: customParser,
    });
    const parsedValue = customGBP.parse('£10.00');
    const {
      parser,
      formatter,
      ...currencySettings
    } = customGBP.getSettings();

    expect(parsedValue).toBe('custom parsed');
    expect(customParser).toHaveBeenCalledTimes(1);

    const call = customParser.mock.calls[0];

    expect(call.length).toBe(1);
    expect(call[0]).toMatchObject({
      ...currencySettings,
      value: '£10.00',
    });
    expect(call[0].defaultParsed.equals(new Money('10.00', customGBP))).toBe(true);
  });

  describe('when "code" is not provided', () => {
    test('should throw an "InvalidCurrencyError"', () => {
      expect(() => new Currency({
        symbol: '£',
      })).toThrow(new InvalidCurrencyError('Invalid currency settings; code is required.'));
    });
  });

  describe('when invalid input is provided', () => {
    test('should throw an "WrongInputError"', () => {
      expect(() => new Currency(undefined as unknown as Currency))
      .toThrow(new WrongInputError('Invalid currency provided.'));
    });
  });
});
