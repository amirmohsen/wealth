import createCurrency from 'src/fp/currency/createCurrency';

const CVE = createCurrency('CVE', {
  code: 'CVE',
  symbol: '$',
  thousandsSeparator: ',',
  decimalSeparator: '.',
  decimalDigits: 2,
  pattern: '%ns%s%v',
});

export default CVE;
