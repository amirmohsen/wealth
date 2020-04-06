import createCurrency from 'src/fp/currency/createCurrency';

const RSD = createCurrency('RSD', {
  code: 'RSD',
  symbol: 'Дин.',
  thousandsSeparator: '.',
  decimalSeparator: ',',
  decimalDigits: 2,
  pattern: '%ns%v %s',
});

export default RSD;
