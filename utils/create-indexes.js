const fs = require('fs');
const TypeScritIndexWriter = require('create-ts-index/dist/TypeScritIndexWriter')
  .TypeScritIndexWriter;

const tsiw = new TypeScritIndexWriter();
const option = {
  ...tsiw.getDefaultOption('./src/components/svgs'),
  fileExcludePatterns: ['web.ts', 'native.ts']
  // excludes: ['@types', 'typings', '__test__', '__tests__', 'src'], // doesn't seem to work on src folder
  // verbose: true,
  // useTimestamp: true
};

(async () => {
  await tsiw.create(option);
  // fs.unlinkSync('./src/index.ts');
})();
