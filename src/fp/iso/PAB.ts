import createCurrency from 'src/fp/currency/createCurrency';

const PAB = createCurrency('PAB', {
  code: 'PAB',
  symbol: 'B/.',
  thousandsSeparator: ',',
  decimalSeparator: '.',
  decimalDigits: 2,
  pattern: '%s %ns%v',
});

export default PAB;
