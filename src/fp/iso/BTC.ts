import createCurrency from 'src/fp/currency/createCurrency';

const BTC = createCurrency('BTC', {
  code: 'BTC',
  symbol: 'Ƀ',
  thousandsSeparator: ',',
  decimalSeparator: '.',
  decimalDigits: 2,
  pattern: '%ns%v%s',
});

export default BTC;
