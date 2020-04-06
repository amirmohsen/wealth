import createCurrency from 'src/fp/currency/createCurrency';

const BTN = createCurrency('BTN', {
  code: 'BTN',
  symbol: 'Nu.',
  thousandsSeparator: ',',
  decimalSeparator: '.',
  decimalDigits: 1,
  pattern: '%s %ns%v',
});

export default BTN;
