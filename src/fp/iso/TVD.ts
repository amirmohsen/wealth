import createCurrency from 'src/fp/currency/create';

const TVD = createCurrency('TVD', {
  code: 'TVD',
  symbol: '$',
  thousandsSeparator: ',',
  decimalSeparator: '.',
  decimalDigits: 2,
  pattern: '%ns%s%v',
});

export default TVD;
