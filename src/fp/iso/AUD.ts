import createCurrency from 'src/fp/currency/create';

const AUD = createCurrency('AUD', {
  code: 'AUD',
  symbol: '$',
  thousandsSeparator: ',',
  decimalSeparator: '.',
  decimalDigits: 2,
  pattern: '%ns%s%v',
});

export default AUD;
