import createCurrency from 'src/fp/currency/create';

const BAM = createCurrency('BAM', {
  code: 'BAM',
  symbol: 'КМ',
  thousandsSeparator: '.',
  decimalSeparator: ',',
  decimalDigits: 2,
  pattern: '%ns%v %s',
});

export default BAM;
