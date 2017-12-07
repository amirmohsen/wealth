# Wealth Documentation

## Money
`import {Money} from 'wealth';`

### Static Fields

#### ROUNDING
Rounding modes you can use in your operations. These map directly to `BigNumber`'s rounding modes.

- `ROUNDING.UP`

- `ROUNDING.DOWN`

- `ROUNDING.CEIL`

- `ROUNDING.FLOOR`

- `ROUNDING.HALF_UP`

- `ROUNDING.HALF_DOWN`

- `ROUNDING.HALF_EVEN`

- `ROUNDING.HALF_CEIL`

- `ROUNDING.HALF_FLOOR`

```js
let
	price = new Money('7856', 'USD'), // $78.56
	discountedAndRoundedUp = price.multiply('0.70'), // $55.00
	discountedAndRoundedDown = price.multiply('0.70', Money.ROUNDING.DOWN); // $54.99
```

### Constructor
`constructor(value, currency)`

### Instance Methods

- `add(value)`

- `subtract(value)`

- `multiply(value, rounding = this.constructor.ROUNDING.HALF_UP)`

- `divide(value, rounding = this.constructor.ROUNDING.HALF_UP)`

- `equals(value)`

- `greaterThan(value)`

- `greaterThanOrEqualTo(value)`

- `lessThan(value)`

- `lessThanOrEqualTo(value)`

- `absolute()`

- `floor()`

- `ceil()`

- `allocate(ratios)`

- `allocateTo(count)`

- `clone()`

- `format()`

- `getAmountAsBigNumber()`

- `getAmountAsStringInteger()`

- `getAmountAsStringFloat()`

- `getAmount()`

- `toString()`

- `getCurrency()`

- `getSmallestUnit()`

- `toJSON()`


### Static Methods

- `parse(value, currency)`

## Currency

`import {Currency} from 'wealth';`

### Constructor

`constructor(currency)`

### Instance Methods

- `getSettings()`

- `toString()`

- `toJSON()`

- `clone()`

- `getCode()`

- `getSymbol()`

- `getThousandsSeparator()`

- `getDecimalSeparator()`

- `getSymbolOnLeft()`

- `getSpaceBetweenAmountAndSymbol()`

- `getDecimalDigits()`

- `format(value)`

- `unformat(value)`

### Static Methods

- `getCurrencySettings(code)`

- `getAllCurrenciesSettings()`
