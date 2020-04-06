import createCurrency from 'src/fp/currency/createCurrency';

const VEB = createCurrency('VEB', {
  code: 'VEB',
  symbol: 'Bs.',
  thousandsSeparator: ',',
  decimalSeparator: '.',
  decimalDigits: 2,
  pattern: '%ns%s%v',
});

export default VEB;
