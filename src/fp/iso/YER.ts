import createCurrency from 'src/fp/currency/createCurrency';

const YER = createCurrency('YER', {
  code: 'YER',
  symbol: '﷼',
  thousandsSeparator: ',',
  decimalSeparator: '.',
  decimalDigits: 2,
  pattern: '%s %ns%v',
});

export default YER;
