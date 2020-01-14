import createCurrency from 'src/fp/currency/create';

const AWG = createCurrency('AWG', {
  code: 'AWG',
  symbol: 'ƒ',
  thousandsSeparator: ',',
  decimalSeparator: '.',
  decimalDigits: 2,
  pattern: '%ns%s%v',
});

export default AWG;
