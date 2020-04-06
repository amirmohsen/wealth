import createCurrency from 'src/fp/currency/createCurrency';

const BRL = createCurrency('BRL', {
  code: 'BRL',
  symbol: 'R$',
  thousandsSeparator: '.',
  decimalSeparator: ',',
  decimalDigits: 2,
  pattern: '%s %ns%v',
});

export default BRL;
