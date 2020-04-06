import createCurrency from 'src/fp/currency/createCurrency';

const TWD = createCurrency('TWD', {
  code: 'TWD',
  symbol: 'NT$',
  thousandsSeparator: ',',
  decimalSeparator: '.',
  decimalDigits: 2,
  pattern: '%ns%s%v',
});

export default TWD;
