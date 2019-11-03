import { BaseCurrency, BaseCurrencyInput } from '../../types';
import processCurrencyInput from './processCurrencyInput';

const currency = (input: BaseCurrencyInput): BaseCurrency => processCurrencyInput(input);

export default currency;
