import createCurrency from 'src/fp/currency/createCurrency';

const BGN = createCurrency('BGN', {
  code: 'BGN',
  symbol: 'лв.',
  thousandsSeparator: ' ',
  decimalSeparator: ',',
  decimalDigits: 2,
  pattern: '%ns%v %s',
});

export default BGN;
