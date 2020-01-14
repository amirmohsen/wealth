import createCurrency from 'src/fp/currency/create';

const BWP = createCurrency('BWP', {
  code: 'BWP',
  symbol: 'P',
  thousandsSeparator: ',',
  decimalSeparator: '.',
  decimalDigits: 2,
  pattern: '%ns%s%v',
});

export default BWP;
