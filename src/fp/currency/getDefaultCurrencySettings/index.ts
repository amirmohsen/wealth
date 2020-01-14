import { BaseCurrencySettings } from 'src/fp/types';

const getDefaultCurrencySettings = (code: string): BaseCurrencySettings<string> => ({
  symbol: code,
  thousandsSeparator: ',',
  decimalSeparator: '.',
  decimalDigits: 2,
  pattern: '%ns%s%v',
  toString: (): string => code,
  toJSON: (): string => code,
});

export default getDefaultCurrencySettings;
