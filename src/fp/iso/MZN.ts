import createCurrency from 'src/fp/currency/create';

const MZN = createCurrency('MZN', {
  code: 'MZN',
  symbol: 'MT',
  thousandsSeparator: ',',
  decimalSeparator: '.',
  decimalDigits: 0,
  pattern: '%ns%s%v',
});

export default MZN;
