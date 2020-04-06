import createCurrency from 'src/fp/currency/createCurrency';

const IRR = createCurrency('IRR', {
  code: 'IRR',
  symbol: '﷼',
  thousandsSeparator: ',',
  decimalSeparator: '/',
  decimalDigits: 2,
  pattern: '%s %ns%v',
});

export default IRR;
