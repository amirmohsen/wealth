import createCurrency from 'src/fp/currency/createCurrency';

const FKP = createCurrency('FKP', {
  code: 'FKP',
  symbol: '£',
  thousandsSeparator: ',',
  decimalSeparator: '.',
  decimalDigits: 2,
  pattern: '%ns%s%v',
});

export default FKP;
