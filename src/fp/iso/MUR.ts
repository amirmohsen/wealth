import createCurrency from 'src/fp/currency/create';

const MUR = createCurrency('MUR', {
  code: 'MUR',
  symbol: '₨',
  thousandsSeparator: ',',
  decimalSeparator: '.',
  decimalDigits: 2,
  pattern: '%ns%s%v',
});

export default MUR;
