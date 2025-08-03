const path = require('path');

const buildEslintCommand = (filenames) =>
  `next lint --fix ${filenames
    .map((f) => `--file "${path.relative(process.cwd(), f)}"`)
    .join(' ')}`;

const buildPrettierCommand = (filenames) =>
  `prettier --write ${filenames.map((f) => `"${f}"`).join(' ')}`;

module.exports = {
  '*.{js,jsx,ts,tsx}': [buildEslintCommand, buildPrettierCommand],
  '*.{json,css,scss,md}': [buildPrettierCommand],
};
