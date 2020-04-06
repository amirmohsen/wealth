import MoneyOptionsMismatchError from 'src/errors/MoneyOptionsMismatchError';
import { FrozenBaseMoney } from '../../types';

const assertMoneyOptionsMatch = (moneyA: FrozenBaseMoney, moneyB: FrozenBaseMoney): true => {
  let result = Object.keys(moneyA.options).length === Object.keys(moneyB.options).length;

  if (result) {
    result = Object.entries(moneyA.options).every(
      ([optionName, optionValue]) => optionValue === moneyB.options[optionName],
    );
  }

  if (result) {
    return result;
  }

  throw new MoneyOptionsMismatchError(moneyA, moneyB);
};

export default assertMoneyOptionsMatch;
