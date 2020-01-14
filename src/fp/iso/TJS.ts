import createCurrency from 'src/fp/currency/create';

const TJS = createCurrency('TJS', {
  code: 'TJS',
  symbol: 'TJS',
  thousandsSeparator: ' ',
  decimalSeparator: ');

export default TJS;
