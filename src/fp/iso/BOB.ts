import createCurrency from 'src/fp/currency/createCurrency';

const BOB = createCurrency('BOB', {
  code: 'BOB',
  symbol: 'Bs',
  thousandsSeparator: '.',
  decimalSeparator: ',',
  decimalDigits: 2,
  pattern: '%s %ns%v',
});

export default BOB;
