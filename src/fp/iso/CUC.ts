import createCurrency from 'src/fp/currency/createCurrency';

const CUC = createCurrency('CUC', {
  code: 'CUC',
  symbol: 'CUC',
  thousandsSeparator: ',',
  decimalSeparator: '.',
  decimalDigits: 2,
  pattern: '%ns%s%v',
});

export default CUC;
