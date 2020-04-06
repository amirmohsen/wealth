import createCurrency from 'src/fp/currency/createCurrency';

const SLL = createCurrency('SLL', {
  code: 'SLL',
  symbol: 'Le',
  thousandsSeparator: ',',
  decimalSeparator: '.',
  decimalDigits: 2,
  pattern: '%ns%s%v',
});

export default SLL;
