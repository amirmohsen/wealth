import createCurrency from 'src/fp/currency/createCurrency';

const BZD = createCurrency('BZD', {
  code: 'BZD',
  symbol: 'BZ$',
  thousandsSeparator: ',',
  decimalSeparator: '.',
  decimalDigits: 2,
  pattern: '%ns%s%v',
});

export default BZD;
