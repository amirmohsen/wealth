import createCurrency from 'src/fp/currency/createCurrency';

const CAD = createCurrency('CAD', {
  code: 'CAD',
  symbol: '$',
  thousandsSeparator: ',',
  decimalSeparator: '.',
  decimalDigits: 2,
  pattern: '%ns%s%v',
});

export default CAD;
