import { FrozenBaseMoney } from 'src/fp/types';

const format = (money: FrozenBaseMoney): string => {
  const {
    value,
    currency: { decimalDigits, pattern, symbol, code, formatter },
  } = money;
  const formattedValue = value.absoluteValue().toFormat(decimalDigits);
  const defaultFormatted = pattern
    .replace('%v', formattedValue)
    .replace('%ns', value.isNegative() ? '-' : '')
    .replace('%i', value.isInteger() ? value.toFormat(0) : formattedValue)
    .replace('%s', symbol)
    .replace('%c', code);

  if (typeof formatter === 'function') {
    return formatter({
      money,
      defaultFormatted,
    });
  }

  return defaultFormatted;
};

export default format;
