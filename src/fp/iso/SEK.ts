import createCurrency from 'src/fp/currency/create';

const SEK = createCurrency('SEK', {
  code: 'SEK',
  symbol: 'kr',
  thousandsSeparator: '.',
  decimalSeparator: ',',
  decimalDigits: 2,
  pattern: '%ns%v %s',
});

export default SEK;
