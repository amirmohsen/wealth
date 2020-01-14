import createCurrency from 'src/fp/currency/create';

const TMT = createCurrency('TMT', {
  code: 'TMT',
  symbol: 'm',
  thousandsSeparator: ' ',
  decimalSeparator: ',',
  decimalDigits: 0,
  pattern: '%ns%v%s',
});

export default TMT;
