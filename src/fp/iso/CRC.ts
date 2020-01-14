import createCurrency from 'src/fp/currency/create';

const CRC = createCurrency('CRC', {
  code: 'CRC',
  symbol: '₡',
  thousandsSeparator: '.',
  decimalSeparator: ',',
  decimalDigits: 2,
  pattern: '%ns%s%v',
});

export default CRC;
