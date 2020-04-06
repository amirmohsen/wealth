import createCurrency from 'src/fp/currency/createCurrency';

const STD = createCurrency('STD', {
  code: 'STD',
  symbol: 'Db',
  thousandsSeparator: ',',
  decimalSeparator: '.',
  decimalDigits: 2,
  pattern: '%ns%s%v',
});

export default STD;
