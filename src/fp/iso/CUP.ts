import createCurrency from 'src/fp/currency/create';

const CUP = createCurrency('CUP', {
  code: 'CUP',
  symbol: '$MN',
  thousandsSeparator: ',',
  decimalSeparator: '.',
  decimalDigits: 2,
  pattern: '%ns%s%v',
});

export default CUP;
