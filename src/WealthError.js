import ExtendableError from 'es6-error';

export default class WealthError extends ExtendableError {

	constructor(message = 'Wealth Error') {
		super(message);
	}
}
