import { FrozenBaseMoney } from 'src/fp/types';

const amountAsStringFloat = (money: FrozenBaseMoney): string => money.value.toFixed(money.currency.decimalDigits);

export default amountAsStringFloat;
