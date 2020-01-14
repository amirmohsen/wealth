import createCurrency from 'src/fp/currency/create';

const HRK = createCurrency('HRK', {
  code: 'HRK',
  symbol: 'kn',
  thousandsSeparator: '.',
  decimalSeparator: ',',
  decimalDigits: 2,
  pattern: '%ns%v %s',
});

export default HRK;
