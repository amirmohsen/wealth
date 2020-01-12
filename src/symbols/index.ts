import createSymbol, { WealthSymbolType } from '../utils/createSymbol';

export const CurrencySymbol: WealthSymbolType = createSymbol('Wealth.Currency');

export const MoneySymbol: WealthSymbolType = createSymbol('Wealth.Money');

export const WealthErrorSymbol: WealthSymbolType = createSymbol('Wealth.WealthError');

export const InvalidCurrencyErrorSymbol: WealthSymbolType = createSymbol('Wealth.InvalidCurrencyError');

export const InvalidMoneyErrorSymbol: WealthSymbolType = createSymbol('Wealth.InvalidMoneyError');

export const CurrencyMismatchErrorSymbol: WealthSymbolType = createSymbol('Wealth.CurrencyMismatchError');

export const InvalidOptionsErrorSymbol: WealthSymbolType = createSymbol('Wealth.InvalidOptionsError');
