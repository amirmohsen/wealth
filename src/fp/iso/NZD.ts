import createCurrency from 'src/fp/currency/createCurrency';

const NZD = createCurrency('NZD', {
  code: 'NZD',
  symbol: '$',
  thousandsSeparator: ',',
  decimalSeparator: '.',
  decimalDigits: 2,
  pattern: '%ns%s%v',
});

export default NZD;
