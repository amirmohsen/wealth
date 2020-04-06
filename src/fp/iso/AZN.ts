import createCurrency from 'src/fp/currency/createCurrency';

const AZN = createCurrency('AZN', {
  code: 'AZN',
  symbol: '₼',
  thousandsSeparator: ' ',
  decimalSeparator: ',',
  decimalDigits: 2,
  pattern: '%ns%v %s',
});

export default AZN;
