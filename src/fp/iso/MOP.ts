import createCurrency from 'src/fp/currency/createCurrency';

const MOP = createCurrency('MOP', {
  code: 'MOP',
  symbol: 'MOP$',
  thousandsSeparator: ',',
  decimalSeparator: '.',
  decimalDigits: 2,
  pattern: '%ns%s%v',
});

export default MOP;
