import createCurrency from 'src/fp/currency/create';

const BND = createCurrency('BND', {
  code: 'BND',
  symbol: '$',
  thousandsSeparator: '.',
  decimalSeparator: ',',
  decimalDigits: 0,
  pattern: '%ns%s%v',
});

export default BND;
