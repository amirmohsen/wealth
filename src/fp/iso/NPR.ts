import createCurrency from 'src/fp/currency/createCurrency';

const NPR = createCurrency('NPR', {
  code: 'NPR',
  symbol: '₨',
  thousandsSeparator: ',',
  decimalSeparator: '.',
  decimalDigits: 2,
  pattern: '%ns%s%v',
});

export default NPR;
