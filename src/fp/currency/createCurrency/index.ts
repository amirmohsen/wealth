import pipe from 'lodash/fp/pipe';
import { BaseCurrencyInputSettings, FrozenBaseCurrency } from '../cloneCurrency/node_modules/src/fp/types';
import assertCurrencyInput from './assertCurrencyInput';
import mergeCurrencyInput from './mergeCurrencyInput';

const createCurrency = <T = string>(code: string, settings?: BaseCurrencyInputSettings<T>): FrozenBaseCurrency =>
  pipe(
    assertCurrencyInput,
    mergeCurrencyInput,
    Object.freeze,
  )(code, settings) as FrozenBaseCurrency;

export default createCurrency;
