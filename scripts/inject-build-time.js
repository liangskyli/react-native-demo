const fs = require('node:fs');
const { join } = require('node:path');

const filePath = join(__dirname, '../src/build-info.ts');

fs.writeFileSync(filePath, `export const BUILD_TIMESTAMP = ${Date.now()};`);
