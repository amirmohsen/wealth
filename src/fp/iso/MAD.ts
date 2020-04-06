import createCurrency from 'src/fp/currency/createCurrency';

const MAD = createCurrency('MAD', {
  code: 'MAD',
  symbol: 'د.م.‏',
  thousandsSeparator: ',',
  decimalSeparator: '.',
  decimalDigits: 2,
  pattern: '%s %ns%v',
});

export default MAD;
