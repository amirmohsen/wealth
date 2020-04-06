import createCurrency from 'src/fp/currency/createCurrency';

const KPW = createCurrency('KPW', {
  code: 'KPW',
  symbol: '₩',
  thousandsSeparator: ',',
  decimalSeparator: '.',
  decimalDigits: 0,
  pattern: '%ns%s%v',
});

export default KPW;
