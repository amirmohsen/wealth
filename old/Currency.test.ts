import Currency from './Currency';
import Money from '../Money/Money';
import WrongInputError from '../src/errors/WrongInputError';
import InvalidCurrencyError from '../src/errors/InvalidCurrencyError';

describe('The "Currency" class: ', () => {
  test('(new Currency("USD")).toString() === "USD"', () => {
    expect((new Currency('USD')).toString()).toBe('USD');
  });

  test('(new Currency("GBP")).decimalDigits === 2', () => {
    expect((new Currency('GBP')).decimalDigits).toBe(2);
  });

  test('(new Currency("EUR")).symbol === "€"', () => {
    expect((new Currency('EUR')).symbol).toBe('€');
  });

  test('(new Currency("EUR")).pattern === "%ns%s%v"', () => {
    expect((new Currency('CAD')).pattern).toBe('%ns%s%v');
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
    // wrapping the mock as the customFormmater gets frozen once passed in
    const customFormatterInnerMock = jest.fn(() => 'custom format');
    const customFormatter = (...args: any[]) => customFormatterInnerMock(...args);
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
    } = customGBP.settings;

    expect(formattedValue).toBe('custom format');
    expect(customFormatterInnerMock).toHaveBeenCalledTimes(1);
    expect(customFormatterInnerMock).toHaveBeenCalledWith({
      ...currencySettings,
      value: customGBPMoney,
      defaultFormatted: '£10.00',
    });
  });

  test('"parser" option should do custom parsing', () => {
    // wrapping the mock as the customParser gets frozen once passed in
    const customParserInnerMock = jest.fn(() => 'custom parsed');
    const customParser = (...args: any[]) => customParserInnerMock(...args);
    const customGBP = new Currency({
      ...Currency.getSettings('GBP'),
      parser: customParser,
    });
    const parsedValue = customGBP.parse('£10.00');
    const {
      parser,
      formatter,
      ...currencySettings
    } = customGBP.settings;

    expect(parsedValue).toBe('custom parsed');
    expect(customParserInnerMock).toHaveBeenCalledTimes(1);

    // "toHaveBeenCalledWith" cannot be used to the equality check on the "Money" instance
    const call = customParserInnerMock.mock.calls[0];

    expect(call.length).toBe(1);
    expect(call[0]).toMatchObject({
      ...currencySettings,
      value: '£10.00',
    });
    expect(call[0].defaultParsed.equals(new Money('10.00', customGBP))).toBe(true);
  });

  test('new Currency("USD") === Currency.init("USD")', () => {
    const
      currencyA = new Currency('USD'),
      currencyB = Currency.init('USD');
    expect(currencyA.is(currencyB)).toBe(true);
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
