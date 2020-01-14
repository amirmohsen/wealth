import createCurrency from 'src/fp/currency/create';

const ERN = createCurrency('ERN', {
  code: 'ERN',
  symbol: 'Nfk',
  thousandsSeparator: ',',
  decimalSeparator: '.',
  decimalDigits: 2,
  pattern: '%ns%v%s',
});

export default ERN;
