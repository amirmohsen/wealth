import createCurrency from 'src/fp/currency/create';

const PLN = createCurrency('PLN', {
  code: 'PLN',
  symbol: 'zł',
  thousandsSeparator: ' ',
  decimalSeparator: ',',
  decimalDigits: 2,
  pattern: '%ns%v %s',
});

export default PLN;
