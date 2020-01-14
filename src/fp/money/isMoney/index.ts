import { MoneySymbol } from '../createMoney/mergeFields/node_modules/src/symbols';
import { FrozenBaseMoney } from '../../types';

const isMoney = (money: FrozenBaseMoney): boolean => Boolean(money) && money.$$typeof === MoneySymbol;

export default isMoney;
