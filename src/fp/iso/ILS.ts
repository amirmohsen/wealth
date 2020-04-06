import createCurrency from 'src/fp/currency/createCurrency';

const ILS = createCurrency('ILS', {
  code: 'ILS',
  symbol: '₪',
  thousandsSeparator: ',',
  decimalSeparator: '.',
  decimalDigits: 2,
  pattern: '%s %ns%v',
});

export default ILS;
