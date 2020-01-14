import createCurrency from 'src/fp/currency/create';

const ISK = createCurrency('ISK', {
  code: 'ISK',
  symbol: 'kr.',
  thousandsSeparator: '.',
  decimalSeparator: ',',
  decimalDigits: 0,
  pattern: '%ns%v %s',
});

export default ISK;
