import { FrozenBaseMoney, FrozenBaseCurrency } from 'src/fp/types';
import amountAsStringFloat from '../amountAsStringFloat';
import createMoney from '../createMoney';

const adjustDecimalDigits = (money: FrozenBaseMoney, currency: FrozenBaseCurrency): string =>
  money.currency.decimalDigits !== currency.decimalDigits
    ? money.value.toFixed(currency.decimalDigits)
    : amountAsStringFloat(money);

const changeCurrency = (money: FrozenBaseMoney, currency: FrozenBaseCurrency): FrozenBaseMoney =>
  createMoney(adjustDecimalDigits(money, currency), currency);

export default changeCurrency;
