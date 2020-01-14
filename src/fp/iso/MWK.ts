import createCurrency from 'src/fp/currency/create';

const MWK = createCurrency('MWK', {
  code: 'MWK',
  symbol: 'MK',
  thousandsSeparator: ',',
  decimalSeparator: '.',
  decimalDigits: 2,
  pattern: '%ns%s%v',
});

export default MWK;
