import WealthError from './WealthError';

export default class CurrencyMismatchError extends WealthError {

	constructor(message = 'Currency mismatch between input values') {
		super(message);
	}
}
