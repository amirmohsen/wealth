import createCurrency from 'src/fp/currency/create';

const CZK = createCurrency('CZK', {
  code: 'CZK',
  symbol: 'Kč',
  thousandsSeparator: ' ',
  decimalSeparator: ',',
  decimalDigits: 2,
  pattern: '%ns%v %s',
});

export default CZK;
