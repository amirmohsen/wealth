import createCurrency from 'src/fp/currency/create';

const MXN = createCurrency('MXN', {
  code: 'MXN',
  symbol: '$',
  thousandsSeparator: ',',
  decimalSeparator: '.',
  decimalDigits: 2,
  pattern: '%ns%s%v',
});

export default MXN;
