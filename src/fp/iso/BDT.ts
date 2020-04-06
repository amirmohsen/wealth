import createCurrency from 'src/fp/currency/createCurrency';

const BDT = createCurrency('BDT', {
  code: 'BDT',
  symbol: '৳',
  thousandsSeparator: ',',
  decimalSeparator: '.',
  decimalDigits: 0,
  pattern: '%s %ns%v',
});

export default BDT;
