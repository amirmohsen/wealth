import createCurrency from 'src/fp/currency/create';

const TND = createCurrency('TND', {
  code: 'TND',
  symbol: 'د.ت.‏',
  thousandsSeparator: ',',
  decimalSeparator: '.',
  decimalDigits: 3,
  pattern: '%s %ns%v',
});

export default TND;
