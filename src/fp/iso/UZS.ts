import createCurrency from 'src/fp/currency/createCurrency';

const UZS = createCurrency('UZS', {
  code: 'UZS',
  symbol: 'сўм',
  thousandsSeparator: ' ',
  decimalSeparator: ',',
  decimalDigits: 2,
  pattern: '%ns%v %s',
});

export default UZS;
