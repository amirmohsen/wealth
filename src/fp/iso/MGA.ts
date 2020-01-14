import createCurrency from 'src/fp/currency/create';

const MGA = createCurrency('MGA', {
  code: 'MGA',
  symbol: 'Ar',
  thousandsSeparator: ',',
  decimalSeparator: '.',
  decimalDigits: 0,
  pattern: '%ns%s%v',
});

export default MGA;
