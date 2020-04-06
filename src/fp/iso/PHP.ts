import createCurrency from 'src/fp/currency/createCurrency';

const PHP = createCurrency('PHP', {
  code: 'PHP',
  symbol: '₱',
  thousandsSeparator: ',',
  decimalSeparator: '.',
  decimalDigits: 2,
  pattern: '%ns%s%v',
});

export default PHP;
