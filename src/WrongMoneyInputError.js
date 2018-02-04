import WealthError from './WealthError';

export default class WrongMoneyInputError extends WealthError {

	constructor(message = 'Wrong "Money" input argument') {
		super(message);
	}
}
