import createCurrency from 'src/fp/currency/createCurrency';

const CDF = createCurrency('CDF', {
  code: 'CDF',
  symbol: 'FC',
  thousandsSeparator: ',',
  decimalSeparator: '.',
  decimalDigits: 2,
  pattern: '%ns%v%s',
});

export default CDF;
