import createCurrency from 'src/fp/currency/create';

const VEF = createCurrency('VEF', {
  code: 'VEF',
  symbol: 'Bs. F.',
  thousandsSeparator: '.',
  decimalSeparator: ',',
  decimalDigits: 2,
  pattern: '%s %ns%v',
});

export default VEF;
