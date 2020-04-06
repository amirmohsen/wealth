import createCurrency from 'src/fp/currency/createCurrency';

const VND = createCurrency('VND', {
  code: 'VND',
  symbol: '₫',
  thousandsSeparator: '.',
  decimalSeparator: ',',
  decimalDigits: 1,
  pattern: '%ns%v %s',
});

export default VND;
