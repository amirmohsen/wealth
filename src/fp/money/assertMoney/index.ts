import { InvalidMoneyError } from 'src/errors';
import { FrozenBaseMoney } from '../../types';
import isMoney from '../isMoney';

const assertMoney = (money: FrozenBaseMoney): true => {
  if (!isMoney(money)) {
    throw new InvalidMoneyError(money);
  }
  return true;
};

export default assertMoney;
