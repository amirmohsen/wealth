import BigNumber from 'bignumber.js';
import { WealthSymbolType } from '../symbols';

export interface BaseSerializedMoney {
  currency: string;
  amount: string;
}

export interface BaseCurrencyFormatter {
  (settings: { money: FrozenBaseMoney; defaultFormatted: string }): string;
}

export interface BaseCurrencyParser {
  (settings: { value: string; defaultParsed: BaseMoney }): BaseMoney;
}

export interface BaseCurrencyStringifier {
  (currency: FrozenBaseCurrency): string;
}

export interface BaseCurrencySerializer<T = string> {
  (currency: FrozenBaseCurrency): T;
}

export interface BaseMoneyStringifier {
  (money: FrozenBaseMoney): string;
}

export interface BaseMoneySerializer<T = BaseSerializedMoney> {
  (money: FrozenBaseMoney): T;
}

export interface BaseCurrencyInputSettings<T = string> {
  code?: string;
  thousandsSeparator?: string;
  decimalSeparator?: string;
  decimalDigits?: number;
  pattern?: string;
  symbol?: string;
  formatter?: BaseCurrencyFormatter;
  parser?: BaseCurrencyParser;
  toString?: BaseCurrencyStringifier;
  toJSON?: BaseCurrencySerializer<T>;
}

export interface BaseCurrencyInputSettingsWithRequiredCode<T = string> extends BaseCurrencyInputSettings<T> {
  code: string;
}

export interface BaseCurrencySettings<T> {
  thousandsSeparator: string;
  decimalSeparator: string;
  decimalDigits: number;
  pattern: string;
  symbol: string;
  toString?: BaseCurrencyStringifier;
  toJSON?: BaseCurrencySerializer<T>;
  formatter?: BaseCurrencyFormatter;
  parser?: BaseCurrencyParser;
}

export interface BaseCurrency<T = string> {
  thousandsSeparator: string;
  decimalSeparator: string;
  decimalDigits: number;
  pattern: string;
  symbol: string;
  formatter?: BaseCurrencyFormatter;
  parser?: BaseCurrencyParser;
  toString?: BaseCurrencyStringifier;
  toJSON?: BaseCurrencySerializer<T>;
  code: string;
  $$typeof: WealthSymbolType;
}

export type FrozenBaseCurrency = Readonly<BaseCurrency>;

export interface BaseMoney {
  currency: FrozenBaseCurrency;
  value: BigNumber;
  options: BaseMoneyOptions;
  $$typeof: WealthSymbolType;
}

export type FrozenBaseMoney = Readonly<BaseMoney>;

export interface BaseMoneyOptions<T = BaseSerializedMoney> {
  toString?: BaseMoneyStringifier;
  toJSON?: BaseMoneySerializer<T>;
}
