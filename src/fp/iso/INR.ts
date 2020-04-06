import createCurrency from 'src/fp/currency/createCurrency';

const INR = createCurrency('INR', {
  code: 'INR',
  symbol: '₹',
  thousandsSeparator: ',',
  decimalSeparator: '.',
  decimalDigits: 2,
  pattern: '%ns%s%v',
});

export default INR;
