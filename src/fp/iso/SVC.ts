import createCurrency from 'src/fp/currency/create';

const SVC = createCurrency('SVC', {
  code: 'SVC',
  symbol: '₡',
  thousandsSeparator: ',',
  decimalSeparator: '.',
  decimalDigits: 2,
  pattern: '%ns%s%v',
});

export default SVC;
