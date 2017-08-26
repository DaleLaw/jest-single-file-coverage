# jest-single-file-coverage
[![npm version](https://img.shields.io/npm/v/jest-single-file-coverage.svg?style=flat-square)](https://www.npmjs.com/package/jest-single-file-coverage)

A little helper to test a single file in [react-boilerplate](https://github.com/react-boilerplate/react-boilerplate), with coverage of the tested file.

### Usage
First, install the package
```
  npm install jest-single-file-coverage
```
Add this line to package.json `scripts` section
```json
    "test:1": "node ./node_modules/jest-single-file-coverage",
```
Finally, run with
```
  npm run test:1 app/yourfile.test.js
```