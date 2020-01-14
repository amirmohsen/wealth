import createCurrency from 'src/fp/currency/create';

const VND = createCurrency('VND', {
  code: 'VND',
  symbol: '₫',
  thousandsSeparator: '.',
  decimalSeparator: ',',
  decimalDigits: 1,
  pattern: '%ns%v %s',
});

export default VND;
