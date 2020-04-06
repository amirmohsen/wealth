import createCurrency from 'src/fp/currency/createCurrency';

const SDD = createCurrency('SDD', {
  code: 'SDD',
  symbol: 'LSd',
  thousandsSeparator: ',',
  decimalSeparator: '.',
  decimalDigits: 2,
  pattern: '%ns%v%s',
});

export default SDD;
