import createCurrency from 'src/fp/currency/create';

const JMD = createCurrency('JMD', {
  code: 'JMD',
  symbol: 'J$',
  thousandsSeparator: ',',
  decimalSeparator: '.',
  decimalDigits: 2,
  pattern: '%ns%s%v',
});

export default JMD;
