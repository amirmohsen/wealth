import createCurrency from 'src/fp/currency/createCurrency';

const AFN = createCurrency('AFN', {
  code: 'AFN',
  symbol: '؋',
  thousandsSeparator: ',',
  decimalSeparator: '.',
  decimalDigits: 2,
  pattern: '%ns%s%v',
});

export default AFN;
