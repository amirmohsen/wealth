import { FrozenBaseCurrency } from 'src/fp/types';
import isCurrency from '../isCurrency';

const isCodeAndDecimalDigitsTheSame = (currencyA: FrozenBaseCurrency, currencyB: FrozenBaseCurrency): boolean => {
  const { code: codeA, decimalDigits: decimalDigitsA } = currencyA;
  const { code: codeB, decimalDigits: decimalDigitsB } = currencyB;
  return codeA === codeB && decimalDigitsA === decimalDigitsB;
};

const isSameAs = (currencyA: FrozenBaseCurrency, currencyB: FrozenBaseCurrency): boolean =>
  isCurrency(currencyA) && isCurrency(currencyB) && isCodeAndDecimalDigitsTheSame(currencyA, currencyB);

export default isSameAs;
