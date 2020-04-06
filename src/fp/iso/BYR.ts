import createCurrency from 'src/fp/currency/createCurrency';

const BYR = createCurrency('BYR', {
  code: 'BYR',
  symbol: 'р.',
  thousandsSeparator: ' ',
  decimalSeparator: ',',
  decimalDigits: 2,
  pattern: '%ns%v %s',
});

export default BYR;
