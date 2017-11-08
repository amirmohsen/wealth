import {Money} from '../dist/wealth.esm';

describe('The "Money" class: ', () => {
	test('$10.38 + $8404.97 = $8415.35', () => {
		let
			moneyA = new Money('1038'),
			moneyB = new Money('840497');

		expect(moneyA.add(moneyB).toString()).toBe('841535');
	});

	test('$840 + $78.62 = $761.38', () => {
		let
			moneyA = new Money('84000'),
			moneyB = new Money('7862');

		expect(moneyA.subtract(moneyB).toString()).toBe('76138');
	});

	test('$0.05 * 4.05 = $0.21', () => {
		let	moneyA = new Money('5');

		expect(moneyA.multiply('4.05').toString()).toBe('21');
	});

	test('$1096.37 / 80.47 = $13.63', () => {
		let moneyA = new Money('109637');

		expect(moneyA.divide('80.47').toString()).toBe('1363');
	});

	test('"10000" == 10000', () => {
		let
			moneyA = new Money('10000'),
			moneyB = new Money(10000);

		expect(moneyA.equals(moneyB)).toBe(true);
	});

	test('"10" != 11', () => {
		let
			moneyA = new Money('10'),
			moneyB = new Money(11);

		expect(moneyA.equals(moneyB)).toBe(false);
	});

	test('"100" > "10"', () => {
		let
			moneyA = new Money('100'),
			moneyB = new Money('10');

		expect(moneyA.greaterThan(moneyB)).toBe(true);
	});

	test('"100" >= "10"', () => {
		let
			moneyA = new Money('100'),
			moneyB = new Money('10');

		expect(moneyA.greaterThanOrEqualTo(moneyB)).toBe(true);
	});

	test('"100" >= "100"', () => {
		let
			moneyA = new Money('100'),
			moneyB = new Money('100');

		expect(moneyA.greaterThanOrEqualTo(moneyB)).toBe(true);
	});

	test('"10" < "100"', () => {
		let
			moneyA = new Money('10'),
			moneyB = new Money('100');

		expect(moneyA.lessThan(moneyB)).toBe(true);
	});

	test('"10" <= "100"', () => {
		let
			moneyA = new Money('10'),
			moneyB = new Money('100');

		expect(moneyA.lessThanOrEqualTo(moneyB)).toBe(true);
	});

	test('"100" <= "100"', () => {
		let
			moneyA = new Money('100'),
			moneyB = new Money('100');

		expect(moneyA.lessThanOrEqualTo(moneyB)).toBe(true);
	});

	test('"1" == abs("-1")', () => {
		let
			moneyA = new Money('100'),
			moneyB = new Money('100');

		expect(moneyA.lessThanOrEqualTo(moneyB)).toBe(true);
	});

	test('floor("118") == "100"', () => {
		let
			moneyA = new Money('118'),
			moneyB = new Money('100');

		expect(moneyA.floor().equals(moneyB)).toBe(true);
	});

	test('ceil("118") == "200"', () => {
		let
			moneyA = new Money('118'),
			moneyB = new Money('200');

		expect(moneyA.ceil().equals(moneyB)).toBe(true);
	});

	test('"$89.67".allocate([70, 24, 6]) === []', () => {
		let money = new Money('8967', 'USD');

		expect(money.allocate([70, 24, 6]).map(allocation => allocation.toString())).toBe(['6300', '2200', '500']);
	});

	test('format(5442) == "$54.42"', () => {
		let	moneyA = new Money('5442', 'USD');
		expect(moneyA.format()).toBe('$54.42');
	});

	test('format(-45497) == "-$454.97"', () => {
		let	moneyA = new Money('-45497', 'USD');
		expect(moneyA.format()).toBe('-$454.97');
	});

	test('format(120014515442) == "$1,200,145,154.42"', () => {
		let	moneyA = new Money('120014515442', 'USD');
		expect(moneyA.format()).toBe('$1,200,145,154.42');
	});

	test('format(45497) == "£454.97"', () => {
		let	moneyA = new Money('45497', 'GBP');
		expect(moneyA.format()).toBe('£454.97');
	});

	test('format(45497) == "454,97 €"', () => {
		let	moneyA = new Money('45497', 'EUR');
		expect(moneyA.format()).toBe('454,97 €');
	});

	test('format(120014515442) == "1 200 145 154,42 €"', () => {
		let	moneyA = new Money('120014515442', 'EUR');
		expect(moneyA.format()).toBe('1 200 145 154,42 €');
	});

	test('parse($54.42) == "5442"', () => {
		expect(Money.parse('$54.42', 'USD').getAmount()).toBe('5442');
	});

	test('parse(-$454.97) == "-45497"', () => {
		expect(Money.parse('-$454.97', 'USD').getAmount()).toBe('-45497');
	});

	test('parse($1,200,145,154.42) == "120014515442"', () => {
		expect(Money.parse('$1,200,145,154.42', 'USD').getAmount()).toBe('120014515442');
	});

	test('parse(£454.97) == "45497"', () => {
		expect(Money.parse('£454.97', 'GBP').getAmount()).toBe('45497');
	});

	test('parse(454,97 €) == "45497"', () => {
		expect(Money.parse('454,97 €', 'EUR').getAmount()).toBe('45497');
	});

	test('parse(1 200 145 154,42 €) == "120014515442"', () => {
		expect(Money.parse('1 200 145 154,42 €', 'EUR').getAmount()).toBe('120014515442');
	});
});