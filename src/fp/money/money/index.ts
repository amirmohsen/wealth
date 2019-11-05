import deepFreeze from 'deep-freeze';
import pipe from 'lodash/fp/pipe';
import { FrozenBaseCurrency, FrozenBaseMoney } from 'src/fp/types';
import assertMoneyInput from './assertMoneyInput';
import generateBigNumberValue from './generateBigNumberValue';
import generateBigNumberConstructor from './generateBigNumberConstructor';
import mergeFields from './mergeFields';

const money = (value: string, currency: FrozenBaseCurrency): FrozenBaseMoney =>
  pipe(
    assertMoneyInput,
    pipe(
      generateBigNumberConstructor,
      generateBigNumberValue,
    )(currency),
    mergeFields(currency),
    deepFreeze,
  )(value, currency) as FrozenBaseMoney;

export default money;
