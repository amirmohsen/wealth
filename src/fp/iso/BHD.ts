import createCurrency from 'src/fp/currency/create';

const BHD = createCurrency('BHD', {
  code: 'BHD',
  symbol: 'د.ب.‏',
  thousandsSeparator: ',',
  decimalSeparator: '.',
  decimalDigits: 3,
  pattern: '%s %ns%v',
});

export default BHD;
