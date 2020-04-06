import createCurrency from 'src/fp/currency/createCurrency';

const TJS = createCurrency('TJS', {
  code: 'TJS',
  symbol: 'TJS',
  thousandsSeparator: ' ',
  decimalSeparator: ';',
  decimalDigits: 2,
  pattern: '%ns%v %s',
});

export default TJS;
