import createCurrency from 'src/fp/currency/create';

const AED = createCurrency('AED', {
  code: 'AED',
  symbol: 'د.إ.‏',
  thousandsSeparator: ',',
  decimalSeparator: '.',
  decimalDigits: 2,
  pattern: '%s %ns%v',
});

export default AED;
