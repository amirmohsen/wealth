import createCurrency from 'src/fp/currency/create';

const TZS = createCurrency('TZS', {
  code: 'TZS',
  symbol: 'TSh',
  thousandsSeparator: ',',
  decimalSeparator: '.',
  decimalDigits: 2,
  pattern: '%ns%s%v',
});

export default TZS;
