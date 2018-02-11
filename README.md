# Wealth

Wealth is a JavaScript library for handling money calculation, allocation, formatting, serialization, and currency handling.

There are many libraries out there that handle money or currency, but there's not one that offers a complete feature set.
This library provides a uniform interface for various money-related operations.

Under the hood, it uses [bignumber.js](https://github.com/MikeMcl/bignumber.js/) for calculations.

## Installation
`npm install wealth`

or

`yarn add wealth`

## Documentation
See the [documentation](http://amirmohsen.github.io/wealth) for a complete API reference with examples.

## Immutability
All `Money` and `Currency` instances are immutable and each of the operations return a new instance.

## Examples

- [Money Calculation & Manipulation](#money-calculation-&-manipulation)
- [Money Comparison](#money-comparison)
- [Money Allocation](#money-allocation)
- [Currency](#currency)
- [Formatting](#formatting)
- [Error Handling](#error-handling)

### Money Calculation & Manipulation
```js
import {Money} from 'wealth';

let
	price = new Money('8078', 'USD'), // $80.78
	discountedPercentage = 10, // 10% discount
	discountedPrice = price.subtract(price.multiply(10).divide(100)), // $72.70
	shipping = new Money('1550', 'USD'), // $15.50
	total = price.add(shipping); // $88.20
```

### Money Comparison
```js
import {Money} from 'wealth';

let
	overdraft = new Money('100000', 'GBP'), // $1000.00
	debt = new Money('900', 'GBP'),
	canBorrowMore = debt.lessThan(overdraft);
```

### Money Allocation
```js
import {Money} from 'wealth';

let
	inheritance = new Money('5000000', 'EUR'),
	ratios = [63, 22, 15], // ratios
	inheritedShares = inheritance.allocate(ratios);

let
	expenses = new Money('79595', 'EUR'),
	expenseShares = expenses.allocateTo(10); // Equal (or nearly equal) shares of expenses
```

### Currency
```js
import {CurrencyStore, Currency} from 'wealth';

/**
* All ISO currencies are already registered in the `CurrencyStore`.
* You can find a currency by its code:
**/
let gbp = new Currency('GBP'); // Create a new currency instance
let gbpSettings = gbp.getSettings();
// or you can get the settings directly from the `CurrencyStore`
gbpSettings = CurrencyStore.get('GBP'); // alias: Currency.getSettings()

/**
* You may wish to create a currency without registering it in the store for one-off use.
*/

let bitcoin = new Currency({
	code: 'XBT',
	symbol: 'Ƀ'
});

/**
* Or you can register a new currency for re-use
**/

CurrencyStore.set('ETH', {
	symbol: 'Ξ'
});

// Getting all registered currencies
let allCurrencies = CurrencyStore.getAll(); // alias: Currency.getAllSettings()
``` 

### Formatting
```js
import {CurrencyStore, Currency, Formatter} from 'wealth';

```

### Error Handling
```js
import {
	WealthError,
    CurrencyMismatchError,
    InvalidCurrencyError,
    WrongInputError
} from 'wealth';


```

