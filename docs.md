# Wealth Documentation

## Money
`import {Money} from 'wealth';`

### Static Fields

#### ROUNDING_MODES
Rounding modes you can use in your operations. These map directly to `BigNumber`'s rounding modes.

- `ROUNDING_MODES.ROUND_UP`

- `ROUNDING_MODES.ROUND_DOWN`

- `ROUNDING_MODES.ROUND_CEIL`

- `ROUNDING_MODES.ROUND_FLOOR`

- `ROUNDING_MODES.ROUND_HALF_UP`

- `ROUNDING_MODES.ROUND_HALF_DOWN`

- `ROUNDING_MODES.ROUND_HALF_EVEN`

- `ROUNDING_MODES.ROUND_HALF_CEIL`

- `ROUNDING_MODES.ROUND_HALF_FLOOR`

```js
let
	price = new Money('7856', 'USD'), // $78.56
	discountedAndRoundedUp = price.multiply('0.70'), // $55.00
	discountedAndRoundedDown = price.multiply('0.70', Money.ROUNDING_MODES.ROUND_DOWN); // 54.99
```

### DEFAULT_SETTINGS
Default money settings

- `DEFAULT_SETTINGS.roundingMode`: this is by default `ROUNDING_MODES.ROUND_UP`.

### Instance Methods

### Static Methods

## Currency