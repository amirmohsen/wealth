import { FrozenBaseMoney } from 'src/fp/types';
import stringifyCurrency from 'src/fp/currency/stringifyCurrency';
import stringifyMoney from 'src/fp/money/stringifyMoney';

const serializeMoney = (money: FrozenBaseMoney): string =>
  money.options.toJSON
    ? money.options.toJSON(money)
    : Object.assign(Object.create(null), {
        currency: stringifyCurrency(money.currency),
        amount: stringifyMoney(money),
      });

export default serializeMoney;
