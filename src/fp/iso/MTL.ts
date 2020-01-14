import createCurrency from 'src/fp/currency/create';

const MTL = createCurrency('MTL', {
  code: 'MTL',
  symbol: '₤',
  thousandsSeparator: ',',
  decimalSeparator: '.',
  decimalDigits: 2,
  pattern: '%ns%s%v',
});

export default MTL;
