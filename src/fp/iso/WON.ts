import createCurrency from 'src/fp/currency/create';

const WON = createCurrency('WON', {
  code: 'WON',
  symbol: '₩',
  thousandsSeparator: ',',
  decimalSeparator: '.',
  decimalDigits: 2,
  pattern: '%ns%s%v',
});

export default WON;
