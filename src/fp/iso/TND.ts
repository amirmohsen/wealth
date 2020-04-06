import createCurrency from 'src/fp/currency/createCurrency';

const TND = createCurrency('TND', {
  code: 'TND',
  symbol: 'د.ت.‏',
  thousandsSeparator: ',',
  decimalSeparator: '.',
  decimalDigits: 3,
  pattern: '%s %ns%v',
});

export default TND;
