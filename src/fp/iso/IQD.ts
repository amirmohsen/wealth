import createCurrency from 'src/fp/currency/create';

const IQD = createCurrency('IQD', {
  code: 'IQD',
  symbol: 'د.ع.‏',
  thousandsSeparator: ',',
  decimalSeparator: '.',
  decimalDigits: 2,
  pattern: '%s %ns%v',
});

export default IQD;
