import createCurrency from 'src/fp/currency/create';

const BSD = createCurrency('BSD', {
  code: 'BSD',
  symbol: '$',
  thousandsSeparator: ',',
  decimalSeparator: '.',
  decimalDigits: 2,
  pattern: '%ns%s%v',
});

export default BSD;
