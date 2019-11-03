import BigNumber from 'bignumber.js';

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
  thousandsSeparator?: string;
  decimalSeparator?: string;
  decimalDigits?: number;
  pattern?: string;
  symbol?: string;
  formatter?: BaseCurrencyFormatter;
  parser?: BaseCurrencyParser;
  code: string;
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
}

export interface BaseMoney {
  currency: BaseCurrency;
  value: BigNumber;
}

export interface BaseSerializedMoney {
  currency: string;
  amount: string;
}

export type BaseMoneyInput = string | number | BaseMoney;

export type BaseCurrencyInput = string | BaseCurrencyInputSettings | BaseCurrency;
