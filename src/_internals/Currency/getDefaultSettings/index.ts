import { CurrencySettings } from '..';

const getDefaultSettings = (code: string): CurrencySettings => ({
  code,
  symbol: code,
  thousandsSeparator: ',',
  decimalSeparator: '.',
  decimalDigits: 2,
  pattern: '%ns%s%v',
});

export default getDefaultSettings;
