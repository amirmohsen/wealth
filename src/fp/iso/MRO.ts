import createCurrency from 'src/fp/currency/createCurrency';

const MRO = createCurrency('MRO', {
  code: 'MRO',
  symbol: 'UM',
  thousandsSeparator: ',',
  decimalSeparator: '.',
  decimalDigits: 2,
  pattern: '%ns%v%s',
});

export default MRO;
