import Money from '../Money/Money';

interface Methods {
  [name: string]: Function;
}

class A {

}

const random = (message: string): number => {
  return Math.random();
};

const applyMethods = (methods: Methods) => {
  for (const [name, method] of Object.entries(methods)) {
    Money.prototype[name] = function (...args: any[]) {
      return method(this, ...args);
    };
  }
};

applyMethods({
  random,
});

const a = new A();
a.random('hello');

export default (methods: Methods) => {
  for (const [name, method] of Object.entries(methods)) {
    A.prototype[name] = function (...args: any[]) {
      return method(this, ...args);
    };
  }
};
