import { FrozenBaseCurrency } from 'src/fp/types';
import assertValidity from '../assertCurrency';

const isCodeAndDecimalDigitsTheSame = (currencyA: FrozenBaseCurrency, currencyB: FrozenBaseCurrency): boolean => {
  const { code: codeA, decimalDigits: decimalDigitsA } = currencyA;
  const { code: codeB, decimalDigits: decimalDigitsB } = currencyB;
  return codeA === codeB && decimalDigitsA === decimalDigitsB;
};

const isCurrencySameAs = (currencyA: FrozenBaseCurrency, currencyB: FrozenBaseCurrency): boolean =>
  assertValidity(currencyA) && assertValidity(currencyB) && isCodeAndDecimalDigitsTheSame(currencyA, currencyB);

export default isCurrencySameAs;
