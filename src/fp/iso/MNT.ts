import createCurrency from 'src/fp/currency/createCurrency';

const MNT = createCurrency('MNT', {
  code: 'MNT',
  symbol: '₮',
  thousandsSeparator: ' ',
  decimalSeparator: ',',
  decimalDigits: 2,
  pattern: '%ns%s%v',
});

export default MNT;
