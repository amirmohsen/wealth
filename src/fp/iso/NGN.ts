import createCurrency from 'src/fp/currency/createCurrency';

const NGN = createCurrency('NGN', {
  code: 'NGN',
  symbol: '₦',
  thousandsSeparator: ',',
  decimalSeparator: '.',
  decimalDigits: 2,
  pattern: '%ns%s%v',
});

export default NGN;
