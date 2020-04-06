import createCurrency from 'src/fp/currency/createCurrency';

const XPF = createCurrency('XPF', {
  code: 'XPF',
  symbol: 'F',
  thousandsSeparator: ',',
  decimalSeparator: '.',
  decimalDigits: 2,
  pattern: '%ns%v%s',
});

export default XPF;
