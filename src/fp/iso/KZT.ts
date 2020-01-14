import createCurrency from 'src/fp/currency/create';

const KZT = createCurrency('KZT', {
  code: 'KZT',
  symbol: '₸',
  thousandsSeparator: ' ',
  decimalSeparator: '-',
  decimalDigits: 2,
  pattern: '%ns%s%v',
});

export default KZT;
