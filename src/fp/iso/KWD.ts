import createCurrency from 'src/fp/currency/createCurrency';

const KWD = createCurrency('KWD', {
  code: 'KWD',
  symbol: 'د.ك.‏',
  thousandsSeparator: ',',
  decimalSeparator: '.',
  decimalDigits: 3,
  pattern: '%s %ns%v',
});

export default KWD;
