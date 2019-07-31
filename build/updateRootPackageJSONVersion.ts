import { resolve, join } from 'path';
import { readJson, writeJson, write } from 'fs-extra';

const ROOT = resolve(__dirname, '..');
const PACKAGE_JSON = 'package.json';
const LIB_DIR = 'lib';
const LIB_PACKAGE_JSON = join(ROOT, LIB_DIR, PACKAGE_JSON);
const ROOT_PACKAGE_JSON = join(ROOT, PACKAGE_JSON);

const updateVersion = async() => {
  const rootPackageJson = await readJson(ROOT_PACKAGE_JSON);
  const libPackageJson = await readJson(LIB_PACKAGE_JSON);

  rootPackageJson.version = libPackageJson.version;

  await writeJson(ROOT_PACKAGE_JSON, rootPackageJson, {
    spaces: 2,
  });
};

updateVersion();
