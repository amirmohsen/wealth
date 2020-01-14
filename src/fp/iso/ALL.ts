import createCurrency from 'src/fp/currency/create';

const ALL = createCurrency('ALL', {
  code: 'ALL',
  symbol: 'Lek',
  thousandsSeparator: '.',
  decimalSeparator: ',',
  decimalDigits: 2,
  pattern: '%ns%v%s',
});

export default ALL;
