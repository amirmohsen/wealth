import createCurrency from 'src/fp/currency/createCurrency';

const RWF = createCurrency('RWF', {
  code: 'RWF',
  symbol: 'RWF',
  thousandsSeparator: ' ',
  decimalSeparator: ',',
  decimalDigits: 2,
  pattern: '%s %ns%v',
});

export default RWF;
