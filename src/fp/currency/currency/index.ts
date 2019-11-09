import pipe from 'lodash/fp/pipe';
import { BaseCurrencyInputSettings, FrozenBaseCurrency } from 'src/fp/types';
import assertCurrencyCode from './assertCurrencyInput';
import mergeCurrencyInput from './mergeCurrencyInput';

const currency = (code: string, settings?: BaseCurrencyInputSettings): FrozenBaseCurrency =>
  pipe(
    assertCurrencyCode,
    mergeCurrencyInput,
    Object.freeze,
  )(code, settings) as FrozenBaseCurrency;

export default currency;
