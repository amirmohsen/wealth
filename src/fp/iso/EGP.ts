import createCurrency from 'src/fp/currency/createCurrency';

const EGP = createCurrency('EGP', {
  code: 'EGP',
  symbol: 'ج.م.‏',
  thousandsSeparator: ',',
  decimalSeparator: '.',
  decimalDigits: 2,
  pattern: '%s %ns%v',
});

export default EGP;
