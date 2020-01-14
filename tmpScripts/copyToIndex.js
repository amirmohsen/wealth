const { readdirSync, writeFileSync } = require('fs-extra');
const { resolve, join } = require('path');

const ROOT = resolve(__dirname, '..');

const run = () => {
  const files = readdirSync(join(ROOT, 'src/fp/money'));
  const text = files.reduce((contents, file) => {
    if (file === 'index.ts') {
      return contents;
    }
    return (contents += `export { default as ${file} } from './${file}';\n`);
  }, '');
  writeFileSync(join(ROOT, 'src/fp/money/index.ts'), text);
};

run();
