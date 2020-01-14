import createCurrency from 'src/fp/currency/create';

const RON = createCurrency('RON', {
  code: 'RON',
  symbol: 'lei',
  thousandsSeparator: '.',
  decimalSeparator: ',',
  decimalDigits: 2,
  pattern: '%ns%v %s',
});

export default RON;
