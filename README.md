# Wealth

Wealth is a JavaScript library for handling money calculation, allocation, formatting, serialization, and currency handling.

There are many libraries out there that handle money or currency, but there's not one that offers a complete feature set.
This library provides a uniform interface for various money-related operations.

Under the hood, it uses [bignumber.js](https://github.com/MikeMcl/bignumber.js/) for calculations.

## Installation
`npm install wealth`

or

`yarn add wealth`

## API Reference
See the [API Reference](http://amirmohsen.github.io/wealth) for a better understanding of the available features.

## Immutability
All `Money` and `Currency` instances are immutable and each of the operations return a new instance.
This makes `Wealth` perfect for react/redux applications.

## Examples

- [Money Calculation and Manipulation](#money-calculation-and-manipulation)
- [Money Comparison](#money-comparison)
- [Money Allocation](#money-allocation)
- [Currency](#currency)
- [Formatting and Parsing](#formatting-and-parsing)
- [Serialization](#serialization)
- [Error Handling](#error-handling)

### Money Calculation and Manipulation
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
	debt = new Money('900', 'GBP'), // $9.00
	canBorrowMore = debt.lessThan(overdraft); // true
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

### Formatting and Parsing
```js
import {Money, Formatter} from 'wealth';

let money = new Money('500000', 'EUR');
money.format(); // 5 000,00 €
money.format({
	pattern: '%ns%s%v',
	thousandsSeparator: ',',
	decimalSeparator: '.'
}); // €5,000.00

money.format({
	formatter: () => {} // custom formatter
});

// Using money.format() is the same as
Formatter.format(money);

// Using money.format(settings) is the same as
Formatter.format(money, settings);
```

```js
import {Money, Formatter} from 'wealth';

let money = Money.parse('5 000,00 €', 'EUR'); // alias for Formatter.parse

money = Money.parse('€5,000.00', {
	code: 'EUR',
	thousandsSeparator: ',',
	decimalSeparator: '.'
});


money = Money.parse('€5,000.00', {
	parser: () => {} // custom parser
});
```

### Serialization

```js
import {Money} from 'wealth';

let money = new Money('100', 'USD');
money.toJSON(); // {amount: '100', currency: 'USD'}
JSON.stringify(money); // {amount: '100', currency: 'USD'}
```

### Error Handling
```js
import {
	WealthError,
	CurrencyMismatchError,
	InvalidCurrencyError,
	WrongInputError
} from 'wealth';

try {
	// operations
}
catch(e) {
	if(e instanceof CurrencyMismatchError) {
		// Thrown when the two sides of the operation use different currencies
	}
	else if(e instanceof InvalidCurrencyError) {
		// Thrown when invalid or missing currency code provided
	}
	else if(e instanceof WrongInputError) {
		// Thrown when bad input is provided to various methods
	}
	
	if(e instanceof WealthError) {
		// All custom errors produced by Wealth inherit `WealthError`
	}
	else {
		// All other errors
	}
}
```

