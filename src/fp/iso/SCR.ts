import createCurrency from 'src/fp/currency/createCurrency';

const SCR = createCurrency('SCR', {
  code: 'SCR',
  symbol: '₨',
  thousandsSeparator: ',',
  decimalSeparator: '.',
  decimalDigits: 2,
  pattern: '%ns%s%v',
});

export default SCR;
