import pipe from 'lodash/fp/pipe';
import { FrozenBaseCurrency, FrozenBaseMoney, BaseMoneyOptions } from 'src/fp/types';
import assertMoneyInput from './assertMoneyInput';
import generateBigNumberValue from './generateBigNumberValue';
import generateBigNumberConstructor from './generateBigNumberConstructor';
import mergeFields from './mergeFields';

const createMoney = (value: string, currency: FrozenBaseCurrency, options: BaseMoneyOptions = {}): FrozenBaseMoney =>
  pipe(
    assertMoneyInput,
    pipe(
      generateBigNumberConstructor,
      generateBigNumberValue,
    )(currency),
    mergeFields(currency, options),
    Object.freeze,
  )(value, currency) as FrozenBaseMoney;

export default createMoney;
