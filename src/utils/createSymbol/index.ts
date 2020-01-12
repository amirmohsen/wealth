const hasSymbol = typeof Symbol === 'function' && Symbol.for;

export type WealthSymbolType = symbol | string;

const createSymbol = (description: string): WealthSymbolType => (hasSymbol ? Symbol.for(description) : description);

export default createSymbol;
