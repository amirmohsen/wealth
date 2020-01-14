import createCurrency from 'src/fp/currency/create';

const MNT = createCurrency('MNT', {
  code: 'MNT',
  symbol: '₮',
  thousandsSeparator: ' ',
  decimalSeparator: ',',
  decimalDigits: 2,
  pattern: '%ns%s%v',
});

export default MNT;
