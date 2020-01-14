import createCurrency from 'src/fp/currency/create';

const ARS = createCurrency('ARS', {
  code: 'ARS',
  symbol: '$',
  thousandsSeparator: '.',
  decimalSeparator: ',',
  decimalDigits: 2,
  pattern: '%s %ns%v',
});

export default ARS;
