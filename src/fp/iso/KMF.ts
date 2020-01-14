import createCurrency from 'src/fp/currency/create';

const KMF = createCurrency('KMF', {
  code: 'KMF',
  symbol: 'CF',
  thousandsSeparator: ',',
  decimalSeparator: '.',
  decimalDigits: 2,
  pattern: '%ns%v%s',
});

export default KMF;
