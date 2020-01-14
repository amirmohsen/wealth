import createCurrency from 'src/fp/currency/create';

const DZD = createCurrency('DZD', {
  code: 'DZD',
  symbol: 'د.ج.‏',
  thousandsSeparator: ',',
  decimalSeparator: '.',
  decimalDigits: 2,
  pattern: '%s %ns%v',
});

export default DZD;
