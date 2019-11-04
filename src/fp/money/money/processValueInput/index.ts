const processValueInput = (value: number | string | Money, BN: typeof BigNumber): BigNumber => {
  if (value instanceof Money) {
    this.checkValueCurrency(value);
    return value.amountAsBigNumber;
  }

  const divisor = getSmallestUnitDivisor(this);

  if (divisor.isGreaterThan(1) && ((typeof value === 'string' && isInt(value)) || Number.isInteger(value as number))) {
    const bignumber = new BN(value);

    return bignumber.dividedBy(divisor).decimalPlaces(this.currency.decimalDigits);
  }

  if (typeof value === 'string' && isFloat(value)) {
    return new BN(value);
  }

  throw new WrongInputError(
    oneLine`
    The input value must be either an integer,
    an integer-like string, a float-like string or a "Money" instance.
    `,
  );
};

export default processValueInput;
