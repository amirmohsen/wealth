import createCurrency from 'src/fp/currency/create';

const KGS = createCurrency('KGS', {
  code: 'KGS',
  symbol: 'сом',
  thousandsSeparator: ' ',
  decimalSeparator: '-',
  decimalDigits: 2,
  pattern: '%ns%v %s',
});

export default KGS;
