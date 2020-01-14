import createCurrency from 'src/fp/currency/create';

const SYP = createCurrency('SYP', {
  code: 'SYP',
  symbol: '£',
  thousandsSeparator: ',',
  decimalSeparator: '.',
  decimalDigits: 2,
  pattern: '%s %ns%v',
});

export default SYP;
