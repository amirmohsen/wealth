import createCurrency from 'src/fp/currency/create';

const CLP = createCurrency('CLP', {
  code: 'CLP',
  symbol: '$',
  thousandsSeparator: '.',
  decimalSeparator: ',',
  decimalDigits: 2,
  pattern: '%s %ns%v',
});

export default CLP;
