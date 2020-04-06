import createCurrency from 'src/fp/currency/createCurrency';

const BBD = createCurrency('BBD', {
  code: 'BBD',
  symbol: '$',
  thousandsSeparator: ',',
  decimalSeparator: '.',
  decimalDigits: 2,
  pattern: '%ns%s%v',
});

export default BBD;
