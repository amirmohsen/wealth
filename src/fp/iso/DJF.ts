import createCurrency from 'src/fp/currency/createCurrency';

const DJF = createCurrency('DJF', {
  code: 'DJF',
  symbol: 'Fdj',
  thousandsSeparator: ',',
  decimalSeparator: '.',
  decimalDigits: 0,
  pattern: '%ns%v%s',
});

export default DJF;
