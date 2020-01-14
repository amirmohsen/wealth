import { FrozenBaseMoney } from 'src/fp/types';
import amountAsStringFloat from '../amountAsStringFloat';

const stringifyMoney = (money: FrozenBaseMoney): string =>
  money.options.toString ? money.options.toString(money) : amountAsStringFloat(money);

export default stringifyMoney;
