import createCurrency from 'src/fp/currency/createCurrency';

const QAR = createCurrency('QAR', {
  code: 'QAR',
  symbol: '﷼',
  thousandsSeparator: ',',
  decimalSeparator: '.',
  decimalDigits: 2,
  pattern: '%s %ns%v',
});

export default QAR;
