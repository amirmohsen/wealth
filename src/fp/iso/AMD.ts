import createCurrency from 'src/fp/currency/createCurrency';

const AMD = createCurrency('AMD', {
  code: 'AMD',
  symbol: '֏',
  thousandsSeparator: ',',
  decimalSeparator: '.',
  decimalDigits: 2,
  pattern: '%ns%v %s',
});

export default AMD;
