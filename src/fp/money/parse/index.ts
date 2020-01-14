import { FrozenBaseCurrency, FrozenBaseMoney } from 'src/fp/types';
import replaceMultipleStrings from './replaceMultipleStrings';
import createMoney from '../createMoney';

const parse = (value: string, currency: FrozenBaseCurrency): FrozenBaseMoney => {
  const { symbol, code, thousandsSeparator, decimalSeparator, parser } = currency;

  const numberValue = replaceMultipleStrings(value, {
    [thousandsSeparator]: '',
    [symbol]: '',
    [code]: '',
    [decimalSeparator]: '',
  }).replace(/\s/g, '');
  const defaultParsed = createMoney(numberValue, currency);

  if (typeof parser === 'function') {
    return parser({
      value,
      defaultParsed,
    });
  }

  return defaultParsed;
};

export default parse;
