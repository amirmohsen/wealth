import createCurrency from 'src/fp/currency/createCurrency';

const MKD = createCurrency('MKD', {
  code: 'MKD',
  symbol: 'ден.',
  thousandsSeparator: '.',
  decimalSeparator: ',',
  decimalDigits: 2,
  pattern: '%ns%v %s',
});

export default MKD;
