import createCurrency from 'src/fp/currency/createCurrency';

const SOS = createCurrency('SOS', {
  code: 'SOS',
  symbol: 'S',
  thousandsSeparator: ',',
  decimalSeparator: '.',
  decimalDigits: 2,
  pattern: '%ns%s%v',
});

export default SOS;
