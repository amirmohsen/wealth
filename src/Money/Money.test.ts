import Money from './Money';
import CurrencyMismatchError from '../errors/CurrencyMismatchError';
import WrongInputError from '../errors/WrongInputError';

describe('The "Money" class: ', () => {
  test('$10.38 + $8404.97 = $8415.35', () => {
    const
      moneyA = new Money('10.38', 'USD'),
      moneyB = new Money('8404.97', 'USD');

    expect(moneyA.add(moneyB).toString()).toBe('8415.35');
  });

  test('$840.00 - $78.62 = $761.38', () => {
    const
      moneyA = new Money('840.00', 'USD'),
      moneyB = new Money('78.62', 'USD');

    expect(moneyA.subtract(moneyB).toString()).toBe('761.38');
  });

  test('$0.05 * 4.05 = $0.20', () => {
    const	moneyA = new Money('5', 'USD');

    expect(moneyA.multiply('4.05').toString()).toBe('0.20');
  });

  test('$1096.37 / 80.47 = $13.62', () => {
    const moneyA = new Money('1096.37', 'USD');

    expect(moneyA.divide('80.47').toString()).toBe('13.62');
  });

  test('OMR10.381 + OMR8404.977 = OMR8415.358', () => {
    const
      moneyA = new Money('10.381', 'OMR'),
      moneyB = new Money('8404.977', 'OMR');

    expect(moneyA.add(moneyB).toString()).toBe('8415.358');
  });

  test('OMR840.001 - OMR78.672 = OMR761.329', () => {
    const
      moneyA = new Money('840.001', 'OMR'),
      moneyB = new Money('78.672', 'OMR');

    expect(moneyA.subtract(moneyB).toString()).toBe('761.329');
  });

  test('OMR1.705 * 4.05 = OMR6.905', () => {
    const	moneyA = new Money('1.705', 'OMR');

    expect(moneyA.multiply('4.05').toString()).toBe('6.905');
  });

  test('OMR1096.347 / 80 = OMR13.704', () => {
    const moneyA = new Money('1096.347', 'OMR');

    expect(moneyA.divide('80').toString()).toBe('13.704');
  });

  test('¥10 + ¥8404 = ¥8414', () => {
    const
      moneyA = new Money('10', 'JPY'),
      moneyB = new Money('8404', 'JPY');

    expect(moneyA.add(moneyB).toString()).toBe('8414');
  });

  test('¥840 - ¥78 = ¥762', () => {
    const
      moneyA = new Money('840', 'JPY'),
      moneyB = new Money('78', 'JPY');

    expect(moneyA.subtract(moneyB).toString()).toBe('762');
  });

  test('¥13 * 4 = ¥52', () => {
    const	moneyA = new Money('13', 'JPY');

    expect(moneyA.multiply('4').toString()).toBe('52');
  });

  test('¥1096 / 80 = ¥14', () => {
    const moneyA = new Money('1096', 'JPY');

    expect(moneyA.divide('80').toString()).toBe('14');
  });

  test('new Money("10.38", "USD") === Money.init("10.38", "USD")', () => {
    const
      moneyA = new Money('10.38', 'USD'),
      moneyB = Money.init('10.38', 'USD');

    expect(moneyA.equals(moneyB)).toBe(true);
  });

  test('new Money(1.15, "GBP") must throw a WrongInputError.', () => {
    expect(() => new Money(1.15, 'GBP')).toThrow(WrongInputError);
  });

  test('new Money("invalid", "USD") must throw a WrongInputError.', () => {
    expect(() => new Money('invalid', 'USD')).toThrow(WrongInputError);
  });

  describe('when provided anything other than a Money instance', () => {
    test('Money#hasSameCurrency must throw a WrongInputError.', () => {
      const money = new Money('10.96', 'USD');
      expect(() => money.hasSameCurrency('Invalid')).toThrow(WrongInputError);
      expect(() => money.hasSameCurrency('10.96')).toThrow(WrongInputError);
      expect(() => money.hasSameCurrency('$10.96')).toThrow(WrongInputError);
      expect(() => money.hasSameCurrency('1096')).toThrow(WrongInputError);
      expect(() => money.hasSameCurrency(1096)).toThrow(WrongInputError);
    });
  });

  test('(new Money("10000", "USD")).equals(new Money(10000, "USD"))', () => {
    const
      moneyA = new Money('10000', 'USD'),
      moneyB = new Money(10000, 'USD');

    expect(moneyA.equals(moneyB)).toBe(true);
  });

  test('(new Money("100.00", "USD")).equals(new Money(10000, "USD"))', () => {
    const
      moneyA = new Money('100.00', 'USD'),
      moneyB = new Money(10000, 'USD');

    expect(moneyA.equals(moneyB)).toBe(true);
  });

  test('$0.10 != $0.11', () => {
    const
      moneyA = new Money('10', 'USD'),
      moneyB = new Money(11, 'USD');

    expect(moneyA.equals(moneyB)).toBe(false);
  });

  test('$1.00 > $0.10', () => {
    const
      moneyA = new Money('100', 'USD'),
      moneyB = new Money('10', 'USD');

    expect(moneyA.greaterThan(moneyB)).toBe(true);
  });

  test('$1.00 >= $0.10', () => {
    const
      moneyA = new Money('100', 'USD'),
      moneyB = new Money('10', 'USD');

    expect(moneyA.greaterThanOrEqualTo(moneyB)).toBe(true);
  });

  test('$1.00 >= $1.00', () => {
    const
      moneyA = new Money('100', 'USD'),
      moneyB = new Money('100', 'USD');

    expect(moneyA.greaterThanOrEqualTo(moneyB)).toBe(true);
  });

  test('$0.10 < $1.00', () => {
    const
      moneyA = new Money('10', 'USD'),
      moneyB = new Money('100', 'USD');

    expect(moneyA.lessThan(moneyB)).toBe(true);
  });

  test('$0.10 <= $1.00', () => {
    const
      moneyA = new Money('10', 'USD'),
      moneyB = new Money('100', 'USD');

    expect(moneyA.lessThanOrEqualTo(moneyB)).toBe(true);
  });

  test('$1.00 <= $1.00', () => {
    const
      moneyA = new Money('100', 'USD'),
      moneyB = new Money('100', 'USD');

    expect(moneyA.lessThanOrEqualTo(moneyB)).toBe(true);
  });

  test('abs(-$1.00) == $1.00', () => {
    const
      moneyA = new Money('-100', 'USD'),
      moneyB = new Money('100', 'USD');

    expect(moneyA.absolute().equals(moneyB)).toBe(true);
  });

  test('floor($1.18) == $1.00', () => {
    const
      moneyA = new Money('118', 'USD'),
      moneyB = new Money('100', 'USD');

    expect(moneyA.floor().equals(moneyB)).toBe(true);
  });

  test('ceil($1.18) == $2.00', () => {
    const
      moneyA = new Money('118', 'USD'),
      moneyB = new Money('200', 'USD');

    expect(moneyA.ceil().equals(moneyB)).toBe(true);
  });

  test('"£1.00 == $1.00" must throw a "CurrencyMismatchError"', () => {
    const
      moneyA = new Money('100', 'GBP'),
      moneyB = new Money('100', 'USD');

    expect(() => moneyA.equals(moneyB)).toThrow(CurrencyMismatchError);
  });

  test('$10.38 + £8404.97 must throw a "CurrencyMismatchError"', () => {
    const
      moneyA = new Money('1038', 'USD'),
      moneyB = new Money('840497', 'GBP');

    expect(() => moneyA.add(moneyB)).toThrow(CurrencyMismatchError);
  });

  test('"$89.67".allocate([70, 24, 6]) === ["$62.77", "$21.52", "$5.38"]', () => {
    const money = new Money('89.67', 'USD');

    expect(money.allocate([70, 24, 6])
    .map(allocation => allocation.toString())).toEqual(['62.77', '21.52', '5.38']);
  });

  test('"$483.41".allocateTo(3) === ["$161.14", "$161.14", "$161.13"]', () => {
    const money = new Money('483.41', 'USD');

    expect(money.allocateTo(3)
    .map(allocation => allocation.toString())).toEqual(['161.14', '161.14', '161.13']);
  });

  test('(new Money(10.38, "USD")).hasSameCurrency(new Money(8404.97, "USD")) === true', () => {
    const
      moneyA = new Money('10.38', 'USD'),
      moneyB = new Money('8404.97', 'USD');

    expect(moneyA.hasSameCurrency(moneyB)).toBe(true);
  });

  test('new Money(5442, "USD").format() == "$54.42"', () => {
    const	moneyA = new Money('5442', 'USD');
    expect(moneyA.format()).toBe('$54.42');
  });

  test('new Money(-45497, "USD").format() == "-$454.97"', () => {
    const	moneyA = new Money('-45497', 'USD');
    expect(moneyA.format()).toBe('-$454.97');
  });

  test('new Money(120014515442, "USD").format() == "$1,200,145,154.42"', () => {
    const	moneyA = new Money('120014515442', 'USD');
    expect(moneyA.format()).toBe('$1,200,145,154.42');
  });

  test('new Money(45497, "USD").format() == "$454.97"', () => {
    const	moneyA = new Money('45497', 'USD');
    expect(moneyA.format()).toBe('$454.97');
  });

  test('new Money(45497, "EUR").format() == "454,97 €"', () => {
    const	moneyA = new Money('45497', 'EUR');
    expect(moneyA.format()).toBe('454,97 €');
  });

  test('new Money(45400, "USD").format({ pattern: "%ns%s%i" }) == "$454"', () => {
    const	moneyA = new Money('45400', 'USD');
    expect(moneyA.format({ pattern: '%ns%s%i' })).toBe('$454');
  });

  test('new Money(45401, "USD").format({ pattern: "%ns%s%i" }) == "$454.01"', () => {
    const	moneyA = new Money('45401', 'USD');
    expect(moneyA.format({ pattern: '%ns%s%i' })).toBe('$454.01');
  });

  test('new Money(120014515442, "EUR").format() == "1 200 145 154,42 €"', () => {
    const	moneyA = new Money('120014515442', 'EUR');
    expect(moneyA.format()).toBe('1 200 145 154,42 €');
  });

  test('Money.parse($54.42).amount == "5442"', () => {
    expect(Money.parse('$54.42', 'USD').amount).toBe('54.42');
  });

  test('Money.parse(-$454.97).amount == "-45497"', () => {
    expect(Money.parse('-$454.97', 'USD').amount).toBe('-454.97');
  });

  test('Money.parse($1,200,145,154.42).amount == "120014515442"', () => {
    expect(Money.parse('$1,200,145,154.42', 'USD').amount).toBe('1200145154.42');
  });

  test('Money.parse(£454.97).amount == "45497"', () => {
    expect(Money.parse('£454.97', 'GBP').amount).toBe('454.97');
  });

  test('Money.parse(454,97 €).amount == "45497"', () => {
    expect(Money.parse('454,97 €', 'EUR').amount).toBe('454.97');
  });

  test('Money.parse(1 200 145 154,42 €).amount == "120014515442"', () => {
    expect(Money.parse('1 200 145 154,42 €', 'EUR').amount).toBe('1200145154.42');
  });

  test('Money#amount is an alias for Money#amountAsStringFloat', () => {
    const money = new Money('56.00', 'GBP');
    expect(money.amountAsStringFloat).toBe(money.amount);
  });

  test('Money#toString() uses Money#amount', () => {
    const money = new Money('56.00', 'GBP');
    expect(money.toString()).toBe(money.amount);
  });

  test('Money.parse($54.42).amountAsStringInteger == "5442"', () => {
    expect(Money.parse('$54.42', 'USD').amountAsStringInteger).toBe('5442');
  });

  test('Money.parse(-$454.97).amountAsStringInteger == "-45497"', () => {
    expect(Money.parse('-$454.97', 'USD').amountAsStringInteger).toBe('-45497');
  });

  test('Money.parse($1,200,145,154.42).amountAsStringInteger == "120014515442"', () => {
    expect(Money.parse('$1,200,145,154.42', 'USD').amountAsStringInteger).toBe('120014515442');
  });

  test('Money.parse(£454.97).amountAsStringInteger == "45497"', () => {
    expect(Money.parse('£454.97', 'GBP').amountAsStringInteger).toBe('45497');
  });

  test('Money.parse(454,97 €).amountAsStringInteger == "45497"', () => {
    expect(Money.parse('454,97 €', 'EUR').amountAsStringInteger).toBe('45497');
  });

  test('Money.parse(1 200 145 154,42 €).amountAsStringInteger == "120014515442"', () => {
    expect(Money.parse('1 200 145 154,42 €', 'EUR').amountAsStringInteger).toBe('120014515442');
  });

  test(
    'Money#bigNumberConstructor returns the constructor of the internal BigNumber value',
    () => {
      const money = new Money('13.30', 'USD');
      expect(money.amountAsBigNumber instanceof money.bigNumberConstructor).toBe(true);
    });

  test('Money#toJSON returns an object with the amount and currency', () => {
    const money = new Money('13.30', 'USD');
    expect(money.toJSON()).toEqual({
      amount: '13.30',
      currency: 'USD',
    });
  });
});
