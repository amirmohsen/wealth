import { FrozenBaseMoney } from 'src/fp/types';
import { moneySymbol } from 'src/fp/symbols';

const isMoney = (money: FrozenBaseMoney): boolean => money.$$typeof === moneySymbol;

export default isMoney;
