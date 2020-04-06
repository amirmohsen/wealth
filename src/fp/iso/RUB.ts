import createCurrency from 'src/fp/currency/createCurrency';

const RUB = createCurrency('RUB', {
  code: 'RUB',
  symbol: '₽',
  thousandsSeparator: ' ',
  decimalSeparator: ',',
  decimalDigits: 2,
  pattern: '%ns%v %s',
});

export default RUB;
