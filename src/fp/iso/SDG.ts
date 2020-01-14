import createCurrency from 'src/fp/currency/create';

const SDG = createCurrency('SDG', {
  code: 'SDG',
  symbol: '£‏',
  thousandsSeparator: ',',
  decimalSeparator: '.',
  decimalDigits: 2,
  pattern: '%ns%s%v',
});

export default SDG;
