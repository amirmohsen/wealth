import BigNumber from 'bignumber.js';

const generateBigNumberValue = (BN: typeof BigNumber) => (value: string): BigNumber => new BN(value);

export default generateBigNumberValue;
