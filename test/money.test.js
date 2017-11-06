import {Money} from '../dist/wealth.esm';

const add = (numA, numB) => {
	let
		moneyA = new Money(numA),
		moneyB = new Money(numB);

	return moneyA.add(moneyB).toString();
};

const subtract = (numA, numB) => {
	let
		moneyA = new Money(numA),
		moneyB = new Money(numB);

	return moneyA.subtract(moneyB).toString();
};

const multiply = (numA, numB) => {
	let	moneyA = new Money(numA);

	return moneyA.multiply(numB).toString();
};

const divide = (numA, numB) => {
	let moneyA = new Money(numA);

	return moneyA.divide(numB).toString();
};

describe('The "Money" class: ', () => {
	test('$10.38 + $8404.97 = $8415.35', () => {
		expect(add('1038', '840497')).toBe('841535');
	});

	test('$840 + $78.62 = $761.38', () => {
		expect(subtract('84000', '7862')).toBe('76138');
	});

	test('$0.05 * 4.05 = $0.21', () => {
		expect(multiply('5', '4.05')).toBe('21');
	});

	test('$1096.37 / 80.47 = $13.63', () => {
		expect(divide('109637', '80.47')).toBe('1363');
	});
});