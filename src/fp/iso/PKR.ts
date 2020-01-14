import createCurrency from 'src/fp/currency/create';

const PKR = createCurrency('PKR', {
  code: 'PKR',
  symbol: '₨',
  thousandsSeparator: ',',
  decimalSeparator: '.',
  decimalDigits: 2,
  pattern: '%ns%s%v',
});

export default PKR;
