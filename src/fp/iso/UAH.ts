import createCurrency from 'src/fp/currency/create';

const UAH = createCurrency('UAH', {
  code: 'UAH',
  symbol: '₴',
  thousandsSeparator: ' ',
  decimalSeparator: ',',
  decimalDigits: 2,
  pattern: '%ns%v%s',
});

export default UAH;
