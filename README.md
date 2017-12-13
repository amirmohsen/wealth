# Wealth

Wealth is a JavaScript library for handling money calculation, allocation, formatting, serialization, and currency handling.

There are many libraries out there that handle money or currency, but there's not one that offers a complete feature set.
This library provides a uniform interface for various money-related operations. It utilizes existing libraries to avoid
reinventing the wheel.

Under the hood, it uses [bignumber.js](https://github.com/MikeMcl/bignumber.js/) for calculations
and [Currency Formatter](https://github.com/smirzaei/currency-formatter) for formatting.

# Installation
`npm install wealth`

or

`yarn add wealth`

# Basic Example
```js
import {Money, Currency} from 'wealth';

let
	price = new Money('8078', 'USD'), // $80.78
	discountedPercentage = 0.82, // 82% ($18 discount)
	discountedPrice = price.multiply(discountedPercentage), // $66.24
	dollarCurrency = price.getCurrency(), // instanceof Currency
	dollarSign = price.getCurrency().getSymbol(); // $
```

# Documentation
See the [documentation](http://amirmohsen.github.io/wealth) for a complete API reference with examples.