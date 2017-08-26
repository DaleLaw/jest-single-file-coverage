#! /usr/bin/env node
/* eslint-disable no-console */
const path = require('path');
const chalk = require('chalk');
const fs = require('fs');
const childProcess = require('child_process');
const args = process.argv.slice(2);

const showUsage = () => {
  console.log(chalk.yellow('Usage:'));
  console.log(chalk.yellow('--------------------------------------------------------------'));
  console.log(chalk.yellow('[**/*.test.js]                # test file with coverage report'));
  console.log(chalk.yellow('--nowatch                     # turn off watcher'));
  console.log(chalk.yellow('--help                        # display this message'));
  console.log(chalk.yellow('--------------------------------------------------------------'));
}

let command = 'jest --watch';
if (args.length === 0) {
  showUsage();
  return;
}
args.forEach((entry) => {
  if (entry === '-h' || entry === '--help') {
    showUsage();
  } else if (entry === '--nowatch') {
    command = command.replace('--watch', '');
  } else {
    if (!fs.existsSync(entry)) {
      console.log(chalk.red(`Error!! Test file: ${entry} doesn't exist.`));
      process.exit();
      return;
    }
    command += ` ${entry}`;

    const { dir, name, ext } = path.parse(entry);
    const oriDir = path.dirname(dir).replace('./', ''); // navigate one layer backwards //have to trunc ./, otherwise it won't work
    const filename = name.replace('.test', '') + ext;
    const searchPath = `${oriDir}/${filename}`;
    const exists = fs.existsSync(searchPath);
    if (!exists) {
      console.log(chalk.red(`Error!! Original file: ${searchPath} doesn't exist.`));
    } else {
      command += ` --coverage --collectCoverageFrom=${searchPath}`;
    }
  }
});

command += ' --color always';
try {
  childProcess.execSync(command, { stdio: 'inherit' });
} catch (e) {} // eslint-disable-line no-empty
