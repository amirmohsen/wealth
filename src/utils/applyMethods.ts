import Money from '../Money';

interface Methods {
  [name: string]: Function;
}

const applyMethods = (classConstructor: any, methods: Methods) => {
  const CustomMoney = class extends classConstructor {};
  for (const [name, method] of Object.entries(methods)) {
    CustomMoney.prototype[name] = function (...args: any[]) {
      return method(this, ...args);
    };
  }
  return CustomMoney;
};

export default applyMethods;
