import createCurrency from 'src/fp/currency/create';

const BDT = createCurrency('BDT', {
  code: 'BDT',
  symbol: '৳',
  thousandsSeparator: ',',
  decimalSeparator: '.',
  decimalDigits: 0,
  pattern: '%s %ns%v',
});

export default BDT;
