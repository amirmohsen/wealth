import createCurrency from 'src/fp/currency/createCurrency';

const TRY = createCurrency('TRY', {
  code: 'TRY',
  symbol: 'TL',
  thousandsSeparator: '.',
  decimalSeparator: ',',
  decimalDigits: 2,
  pattern: '%ns%v %s',
});

export default TRY;
