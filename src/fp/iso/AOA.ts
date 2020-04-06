import createCurrency from 'src/fp/currency/createCurrency';

const AOA = createCurrency('AOA', {
  code: 'AOA',
  symbol: 'Kz',
  thousandsSeparator: ',',
  decimalSeparator: '.',
  decimalDigits: 2,
  pattern: '%ns%s%v',
});

export default AOA;
