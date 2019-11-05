const hasSymbol = typeof Symbol === 'function' && Symbol.for;

export type WealthSymbolType = symbol | string;

const createSymbol = (description: string): WealthSymbolType => (hasSymbol ? Symbol.for(description) : description);

export const currencySymbol: WealthSymbolType = createSymbol('wealth.currency');

export const moneySymbol: WealthSymbolType = createSymbol('wealth.money');
