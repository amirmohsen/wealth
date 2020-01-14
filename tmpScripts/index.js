const { readFileSync, writeFile } = require('fs-extra');
const { join, resolve } = require('path');

const ROOT = resolve(__dirname, '..');

const data = readFileSync(join(ROOT, 'src/constants/ISO_CURRENCIES.ts'), {
  encoding: 'utf8',
});

const matches = data.matchAll(/export const ([A-Z]{3}) = ([\s\S]+?);/gm);

const run = async () => {
  const promises = [];
  let indexText = '';
  for (const [, code, settings] of matches) {
    const text = `import createCurrency from 'src/fp/currency/create';\n\nconst ${code} = createCurrency('${code}', ${settings});\n\nexport default ${code};\n`;
    promises.push(writeFile(join(ROOT, 'src/fp/iso', `${code}.ts`), text));
    indexText += `export { default as ${code} } from './${code}';\n`;
  }
  promises.push(writeFile(join(ROOT, 'src/fp/iso/index.ts'), indexText));
};

run();
