import createCurrency from 'src/fp/currency/createCurrency';

const NIO = createCurrency('NIO', {
  code: 'NIO',
  symbol: 'C$',
  thousandsSeparator: ',',
  decimalSeparator: '.',
  decimalDigits: 2,
  pattern: '%s %ns%v',
});

export default NIO;
