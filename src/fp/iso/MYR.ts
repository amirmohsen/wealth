import createCurrency from 'src/fp/currency/create';

const MYR = createCurrency('MYR', {
  code: 'MYR',
  symbol: 'RM',
  thousandsSeparator: ',',
  decimalSeparator: '.',
  decimalDigits: 2,
  pattern: '%ns%s%v',
});

export default MYR;
