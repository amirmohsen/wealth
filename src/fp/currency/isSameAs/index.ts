import { FrozenBaseCurrency } from 'src/fp/types';
import assertCurrency from '../assertCurrency';

const isCodeAndDecimalDigitsTheSame = (currencyA: FrozenBaseCurrency, currencyB: FrozenBaseCurrency): boolean => {
  const { code: codeA, decimalDigits: decimalDigitsA } = currencyA;
  const { code: codeB, decimalDigits: decimalDigitsB } = currencyB;
  return codeA === codeB && decimalDigitsA === decimalDigitsB;
};

const isSameAs = (currencyA: FrozenBaseCurrency, currencyB: FrozenBaseCurrency): boolean =>
  assertCurrency(currencyA) && assertCurrency(currencyB) && isCodeAndDecimalDigitsTheSame(currencyA, currencyB);

export default isSameAs;
