(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{196:function(e,n,t){"use strict";t.r(n);var r=t(0),a=t.n(r),o=t(248),i=t(245),l=(t(192),t(209)),c=t(214),s=t(274),u=t(309),m=Object(c.withTheme)()(l.b.h1.withConfig({displayName:"guides__Header",componentId:"sc-73a3z7-0"})(["font-size:1.7rem;padding:30px 12px 20px 12px;margin:0;font-weight:500;color:",";"],function(e){return e.theme.palette.secondary.contrastText})),p=function(e){var n=e.children;return a.a.createElement(u.a,null,a.a.createElement(m,null,n))};n.default=function(){return a.a.createElement(o.a,null,a.a.createElement(i.a,{title:"Guides"}),a.a.createElement(p,null,"Money Calculation and Manipulation"),a.a.createElement(s.a,null,"\n        import { Money } from 'wealth';\n        import { add, subtract, multiply, divide } from 'wealth/fn';\n\n        const price = Money.init('80.78', 'USD'); // $80.78\n        const discountPercentage = 10; // 10% discount\n        let discount = multiply(price, discountPercentage);\n        discount = divide(discount, 100);\n        const discountedPrice = subtract(price, discount); // $72.70\n        const shipping = Money.init('15.50', 'USD'); // $15.50\n        const total = add(price, shipping); // $88.20\n      "),a.a.createElement(p,null,"Money Comparison"),a.a.createElement(s.a,null,"\n        import { Money } from 'wealth';\n        import { lessThan } from 'wealth/fn';\n\n        const overdraft = Money.init('1000.00', 'GBP'); // $1000.00\n        const debt = Money.init('9.00', 'GBP'); // $9.00\n        const canBorrowMore = lessThan(debt, overdraft); // true\n      "),a.a.createElement(p,null,"Money Allocation"),a.a.createElement(s.a,null,"\n        import { Money } from 'wealth';\n        import { allocate, allocateTo } from 'wealth/fn';\n\n        // Allocation by ratios\n        const inheritance = Money.init('5000.00', 'EUR');\n        const ratios = [63, 22, 15]; // ratios\n        const inheritedShares = allocate(inheritance, ratios);\n        // Equal Allocation\n        const expenses = Money.init('795.95', 'EUR');\n        const expenseShares = allocateTo(expenses, 10); // Equal (or nearly equal) shares of expenses\n      "),a.a.createElement(p,null,"Currency"),a.a.createElement(s.a,null,"\n        import { Money, Currency } from 'wealth';\n        import {\n          registerCurrency\n        } from 'wealth/store';\n        import {\n          GBP\n        } from 'wealth/iso';\n\n        registerCurrency(GBP);\n\n        registerCurrency({\n          code: 'XBT',\n          symbol: 'Ƀ'\n        });\n\n        const gbpCurrencyInstance = Currency.init('GBP');\n        const moneyA = Money.init('900.00', gbpCurrencyInstance);\n        const moneyB = Money.init('900.00', 'GBP');\n        const moneyC = Money.init('900.00', 'XBT');\n      "),a.a.createElement(p,null,"Formatting and Parsing"),a.a.createElement(s.a,null,"\n        import { Money } from 'wealth';\n        import { registerCurrency } from 'wealth/store';\n        import { USD } from 'wealth/iso';\n        import { format } from 'wealth/fn';\n\n        registerCurrency(USD);\n\n        const money = Money.init('5000.00', 'USD');\n        format(money) === '$5,000.00'\n        format(money, {\n          pattern: '%ns%s%v',\n          thousandsSeparator: ',',\n          decimalSeparator: '.'\n        }) === '5 000,00 $'\n      "),a.a.createElement(p,null,"Serialization"),a.a.createElement(s.a,null,"\n        import { Money } from 'wealth';\n\n        const money = Money.init('1.00', 'USD');\n        JSON.stringify(money) === '{ \"amount\": \"1.00\", \"currency\": \"USD\" }'\n      "),a.a.createElement(p,null,"Error Handling"),a.a.createElement(s.a,null,"\n        import {\n          WealthError,\n          CurrencyMismatchError,\n          InvalidCurrencyError,\n          WrongInputError\n        } from 'wealth/errors';\n\n        try {\n          console.log('Some Wealth operations');\n        }\n        catch(e) {\n          if(e instanceof CurrencyMismatchError) {\n            console.log('Thrown when the two sides of the operation use different currencies');\n          }\n          else if(e instanceof InvalidCurrencyError) {\n            console.log('Thrown when invalid or missing currency code provided');\n          }\n          else if(e instanceof WrongInputError) {\n            console.log('Thrown when bad input is provided to various methods');\n          }\n\n          if(e instanceof WealthError) {\n            console.log('All custom errors produced by Wealth inherit \"WealthError\"');\n          }\n          else {\n            console.log('All other errors');\n          }\n        }\n      "))}},246:function(e,n,t){"use strict";t.d(n,"a",function(){return y}),t.d(n,"b",function(){return f});t(29),t(30),t(15),t(51),t(23);var r=t(0),a=t.n(r),o=t(264),i=t.n(o),l=t(227),c=t.n(l),s=t(311),u=t.n(s),m=t(312),p=t.n(m);var d=t(209).b.div.withConfig({displayName:"Grid__GridWrapper",componentId:"ou1aws-0"})(["padding:12px;"]),y=function(e){var n=e.children;return a.a.createElement(i.a,{position:"static"},a.a.createElement(d,null,a.a.createElement(c.a,{container:!0,spacing:24},n)))},f=function(e){var n=e.children,t=function(e,n){if(null==e)return{};var t,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)t=o[r],n.indexOf(t)>=0||(a[t]=e[t]);return a}(e,["children"]);return a.a.createElement(c.a,Object.assign({item:!0},t),a.a.createElement(u.a,null,a.a.createElement(p.a,null,n)))}},274:function(e,n,t){"use strict";t(23),t(50);var r=t(0),a=t.n(r),o=t(754),i=t(339),l=t(246),c=t(313),s=t.n(c),u=t(315),m=t.n(u),p=t(314),d=t.n(p),y=t(319),f=t.n(y),h=t(227),g=t.n(h),v=t(214),b=t(209),E=Object(v.withTheme)()(Object(b.b)(g.a).withConfig({displayName:"CodeBlockOptions__FormControlWrapper",componentId:"vyozzy-0"})(["&&{display:flex;","}"],function(e){return"\n        "+e.theme.breakpoints.down("xs")+" {\n          margin-bottom: 30px;\n\n          &:last-child {\n            margin-bottom: 0;\n          }\n        }\n    "})),w=Object(b.b)(s.a).withConfig({displayName:"CodeBlockOptions__FormControl",componentId:"vyozzy-1"})(["&&{min-width:150px;margin:auto;}"]),C=function(e){var n=e.name,t=e.label,r=e.value,o=e.onChange,i=e.options;return a.a.createElement(E,{item:!0,xs:12,sm:4},a.a.createElement(w,null,a.a.createElement(d.a,{htmlFor:n},t),a.a.createElement(m.a,{value:r,onChange:o,inputProps:{name:n,id:n}},i.map(function(e){var n=e.value,t=e.label;return a.a.createElement(f.a,{value:n,key:n},t)}))))},M=function(e){var n=e.importType,t=e.usageParadigm,r=e.importModularity,o=e.onChange;return a.a.createElement(g.a,{container:!0},a.a.createElement(C,{label:"Import type",name:"importType",value:n,onChange:o,options:[{value:"esm",label:"ES Modules"},{value:"cjs",label:"Common JS"}]}),a.a.createElement(C,{label:"Usage paradigm",name:"usageParadigm",value:t,onChange:o,options:[{value:"fp",label:"Functional"},{value:"oo",label:"Object-oriented"}]}),"oo"===t&&a.a.createElement(C,{label:"Import modularity",name:"importModularity",value:r,onChange:o,options:[{value:"full",label:"Full import"},{value:"modular",label:"Module augmentation"}]}))};t(95),t(140),t(68),t(15),t(53),t(40),t(29),t(137),t(13);function x(e){return function(e){if(Array.isArray(e)){for(var n=0,t=new Array(e.length);n<e.length;n++)t[n]=e[n];return t}}(e)||function(e){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e))return Array.from(e)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}var I=t(320),T=t(322),O=t(323),S=["add","subtract","multiply","divide","absolute","ceil","floor","equals","greaterThan","greaterThanOrEqualTo","lessThan","lessThanOrEqualTo","allocate","allocateBy","format","parse"],P=function(e){var n=e.source,t=e.importType,r=e.usageParadigm,a=e.importModularity,o=I.parse(n,{sourceType:"module"});return function(e){var n=e.parsed,t=e.importType,r=e.usageParadigm,a=e.importModularity;T.ancestor(n,{ImportDeclaration:function(e,n){var o=e.source.value,i=n[0].body.indexOf(e);if(e.specifiers.length&&"ImportDefaultSpecifier"!==e.specifiers[0].type){var l=e.specifiers.map(function(e){return e.imported.name});if("oo"===r&&"wealth/fn"===o){var c,s=[];return"modular"===a&&(s="esm"===t?l.map(function(e){return{type:"ImportDeclaration",specifiers:[],source:{type:"Literal",value:"wealth/methods/"+e}}}):l.map(function(e){return{type:"ExpressionStatement",expression:{type:"CallExpression",callee:{type:"Identifier",name:"require"},arguments:[{type:"Literal",value:"wealth/node/methods/"+e}]}}})),void(c=n[0].body).splice.apply(c,[i,1].concat(x(s)))}"oo"===r&&"wealth"===o&&"full"===a&&(e.source.value=o="wealth/full"),"esm"!==t&&function(e){var n=e.importedNames,t=e.body,r=e.nodeIndex,a=e.source.replace("wealth","wealth/node"),o=n.map(function(e){return{type:"Property",shorthand:!0,key:{type:"Identifier",name:e},kind:"init",value:{type:"Identifier",name:e}}});t[r]={type:"VariableDeclaration",declarations:[{type:"VariableDeclarator",id:{type:"ObjectPattern",properties:o},init:{type:"CallExpression",callee:{type:"Identifier",name:"require"},arguments:[{type:"Literal",value:a}]}}],kind:"const"}}({body:n[0].body,importedNames:l,nodeIndex:i,source:o})}},CallExpression:function(e){"oo"===r&&"Identifier"===e.callee.type&&S.includes(e.callee.name)&&function(e){var n="Money";"parse"!==e.callee.name&&(n=e.arguments.shift().name),e.callee={type:"MemberExpression",object:{type:"Identifier",name:n},property:{type:"Identifier",name:e.callee.name}}}(e)}})}({parsed:o,importType:t,usageParadigm:r,importModularity:a}),O.generate(o,{format:{indent:{style:"  ",quotes:"single"}}}).replace(/\{(.+)\}/gm,"{ $1 }")},j=t(265);n.a=function(e){var n=e.children,t=Object(r.useContext)(j.a),c=t.value,s=t.onChange;return a.a.createElement(l.a,null,a.a.createElement(l.b,{xs:12},a.a.createElement(M,Object.assign({onChange:function(e){var n=e.target,t=n.name,r=n.value;return s({name:t,value:r})}},c)),a.a.createElement(o.a,{language:"javascript",style:i.tomorrow,showLineNumbers:!0},P(Object.assign({source:n},c)))))}}}]);
//# sourceMappingURL=component---src-pages-guides-js-9527b4286e8fb7546f11.js.map