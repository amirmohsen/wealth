import createCurrency from 'src/fp/currency/create';

const KYD = createCurrency('KYD', {
  code: 'KYD',
  symbol: '$',
  thousandsSeparator: ',',
  decimalSeparator: '.',
  decimalDigits: 2,
  pattern: '%ns%s%v',
});

export default KYD;
