const fs = require('node:fs');
const { join } = require('node:path');

const filePath = join(__dirname, '../src/build-info.ts');

const data = `
export const BUILD_TIMESTAMP = ${Date.now()};
export const BUILD_envEnumType = ${process.env.envEnumType ? JSON.stringify(process.env.envEnumType) : undefined};
`;
console.log('构建环境:', process.env.envEnumType);

fs.writeFileSync(filePath, data);
