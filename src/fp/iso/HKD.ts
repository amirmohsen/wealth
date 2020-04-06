import createCurrency from 'src/fp/currency/createCurrency';

const HKD = createCurrency('HKD', {
  code: 'HKD',
  symbol: 'HK$',
  thousandsSeparator: ',',
  decimalSeparator: '.',
  decimalDigits: 2,
  pattern: '%ns%s%v',
});

export default HKD;
