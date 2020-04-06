import { MoneySymbol } from 'src/symbols';
import { FrozenBaseMoney } from '../../types';

const isMoney = (money: FrozenBaseMoney): boolean => Boolean(money) && money.$$typeof === MoneySymbol;

export default isMoney;
