import { BaseCurrencySettings } from 'src/fp/types';

const getDefaultCurrencySettings = (code: string): BaseCurrencySettings => ({
  symbol: code,
  thousandsSeparator: ',',
  decimalSeparator: '.',
  decimalDigits: 2,
  pattern: '%ns%s%v',
});

export default getDefaultCurrencySettings;
