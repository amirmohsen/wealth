#!/usr/bin/env node
/// <reference path="declarations.d.ts"/>

import yargs from 'yargs';
import { join } from 'path';
import { emptyDir, readJson, writeJSON } from 'fs-extra';
import { spawn } from 'child_process';
import ora from 'ora';
import * as spinners from 'cli-spinners';

interface Argv {
  dev: boolean;
  d: boolean;
}

const root = process.cwd();

const getArgv = () => yargs
  .option('dev', {
    alias: 'd',
    type: 'boolean',
    default: false,
  })
  .argv;

const startChildProcess = (command: string) => {
  const childProcess = spawn(command, [], {
    stdio: 'inherit',
    shell: true,
  });
  return new Promise((resolve, reject) => {
    childProcess.on('close', code => code === 0 ? resolve({ code }) : reject({ code }));
  });
};

const runStep = async(name: string, action?: Function) => {
  const spinner = ora({
    text: name,
    spinner: spinners['growHorizontal'],
  }).start();
  try {
    if (action) {
      await action();
    }
  } catch {
    spinner.fail();
    return;
  }
  spinner.succeed();
};

const copyPackageJSON = async() => {
  const packageJSON = await readJson(join(root, 'package.json'));

  packageJSON.sideEffects = [
    './methods/*.js',
  ];
  packageJSON.main = 'node/index.js';
  packageJSON.module = 'index.js';
  packageJSON.jsdelivr = 'umd.js';
  packageJSON.types = 'index.d.ts';
  delete packageJSON['jest-stare'];
  delete packageJSON.scripts;

  await writeJSON(
    join(root, 'lib/package.json'),
    packageJSON,
    {
      spaces: 2,
    },
  );
};

const run = async () => {
  const argv = getArgv() as unknown as Argv;
  const { dev } = argv;

  await runStep('emptying lib directory', () => emptyDir(join(root, 'lib')));
  await runStep('copying package.json', () => copyPackageJSON());

  if (dev) {
    runStep('dev esm build with watch');
    await startChildProcess('npx tsc --watch');
  } else {
    await runStep('esm build', () => startChildProcess('npx tsc'));

    await runStep('csj build', () => startChildProcess(
      'npx tsc --module "commonjs" --outDir "lib/node"',
    ));

    await runStep('umd build', () => startChildProcess('npx rollup --config --silent'));
  }
};

run();
