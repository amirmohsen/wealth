import { FrozenBaseMoney } from 'src/fp/types';
import { WrongInputError } from 'src/shared/errors';
import isMoney from '../isMoney';

const assertMoney = (money: FrozenBaseMoney): void => {
  if (!isMoney(money)) {
    throw new WrongInputError(`Invalid money input: ${money}`);
  }
};

export default assertMoney;
