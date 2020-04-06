import createCurrency from 'src/fp/currency/createCurrency';

const UAH = createCurrency('UAH', {
  code: 'UAH',
  symbol: '₴',
  thousandsSeparator: ' ',
  decimalSeparator: ',',
  decimalDigits: 2,
  pattern: '%ns%v%s',
});

export default UAH;
