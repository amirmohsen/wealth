import createCurrency from 'src/fp/currency/createCurrency';

const MTL = createCurrency('MTL', {
  code: 'MTL',
  symbol: '₤',
  thousandsSeparator: ',',
  decimalSeparator: '.',
  decimalDigits: 2,
  pattern: '%ns%s%v',
});

export default MTL;
