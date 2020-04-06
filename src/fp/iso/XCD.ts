import createCurrency from 'src/fp/currency/createCurrency';

const XCD = createCurrency('XCD', {
  code: 'XCD',
  symbol: '$',
  thousandsSeparator: ',',
  decimalSeparator: '.',
  decimalDigits: 2,
  pattern: '%ns%s%v',
});

export default XCD;
