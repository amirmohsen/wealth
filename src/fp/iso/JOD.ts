import createCurrency from 'src/fp/currency/create';

const JOD = createCurrency('JOD', {
  code: 'JOD',
  symbol: 'د.ا.‏',
  thousandsSeparator: ',',
  decimalSeparator: '.',
  decimalDigits: 3,
  pattern: '%s %ns%v',
});

export default JOD;
