import createCurrency from 'src/fp/currency/createCurrency';

const HUF = createCurrency('HUF', {
  code: 'HUF',
  symbol: 'Ft',
  thousandsSeparator: ' ',
  decimalSeparator: ',',
  decimalDigits: 2,
  pattern: '%ns%v %s',
});

export default HUF;
