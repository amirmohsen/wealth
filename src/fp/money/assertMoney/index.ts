import { WrongInputError } from 'src/shared/errors';
import { FrozenBaseMoney } from '../../types';
import isMoney from '../isMoney';

const assertMoney = (money: FrozenBaseMoney): true => {
  if (!isMoney(money)) {
    throw new WrongInputError(`Invalid money input: ${money}`);
  }
  return true;
};

export default assertMoney;
