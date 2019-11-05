import { DeepReadonly } from 'deep-freeze';
import BigNumber from 'bignumber.js';
import { WealthSymbolType } from './symbols';

export interface BaseCurrencyFormatter {
  (settings: {
    value: BaseMoney;
    defaultFormatted: string;
    symbol: string;
    code: string;
    decimalDigits: number;
    thousandsSeparator: string;
    decimalSeparator: string;
    pattern: string;
  }): string;
}

export interface BaseCurrencyParser {
  (settings: {
    symbol: string;
    code: string;
    thousandsSeparator: string;
    decimalSeparator: string;
    decimalDigits: number;
    pattern: string;
    value: string;
    defaultParsed: BaseMoney;
  }): BaseMoney;
}

export interface BaseCurrencyInputSettings {
  code?: string;
  thousandsSeparator?: string;
  decimalSeparator?: string;
  decimalDigits?: number;
  pattern?: string;
  symbol?: string;
  formatter?: BaseCurrencyFormatter;
  parser?: BaseCurrencyParser;
}

export interface BaseCurrencyInputSettingsWithRequiredCode extends BaseCurrencyInputSettings {
  code: string;
}

export interface BaseCurrencySettings {
  thousandsSeparator: string;
  decimalSeparator: string;
  decimalDigits: number;
  pattern: string;
  symbol: string;
  formatter?: BaseCurrencyFormatter;
  parser?: BaseCurrencyParser;
}

export interface BaseCurrency {
  thousandsSeparator: string;
  decimalSeparator: string;
  decimalDigits: number;
  pattern: string;
  symbol: string;
  formatter?: BaseCurrencyFormatter;
  parser?: BaseCurrencyParser;
  code: string;
  $$typeof: WealthSymbolType;
}

export type FrozenBaseCurrency = DeepReadonly<BaseCurrency>;

export interface BaseMoney {
  currency: FrozenBaseCurrency;
  value: BigNumber;
  $$typeof: WealthSymbolType;
}

export type FrozenBaseMoney = DeepReadonly<BaseMoney>;

export interface BaseSerializedMoney {
  currency: string;
  amount: string;
}
