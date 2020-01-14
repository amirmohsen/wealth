import createCurrency from 'src/fp/currency/create';

const HTG = createCurrency('HTG', {
  code: 'HTG',
  symbol: 'G',
  thousandsSeparator: ',',
  decimalSeparator: '.',
  decimalDigits: 2,
  pattern: '%ns%s%v',
});

export default HTG;
