import createCurrency from 'src/fp/currency/create';

const KES = createCurrency('KES', {
  code: 'KES',
  symbol: 'KSh',
  thousandsSeparator: ',',
  decimalSeparator: '.',
  decimalDigits: 2,
  pattern: '%ns%s%v',
});

export default KES;
