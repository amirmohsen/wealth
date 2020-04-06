import createCurrency from 'src/fp/currency/createCurrency';

const ZMW = createCurrency('ZMW', {
  code: 'ZMW',
  symbol: 'ZK',
  thousandsSeparator: ',',
  decimalSeparator: '.',
  decimalDigits: 2,
  pattern: '%ns%s%v',
});

export default ZMW;
