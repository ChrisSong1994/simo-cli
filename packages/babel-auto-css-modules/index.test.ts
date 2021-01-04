import { transform } from '@babel/core';
import { IOpts } from './index';

function transformWithPlugin(code: string, opts: IOpts) {
  const filename = 'file.js';
  return transform(code, {
    filename,
    plugins: [[require.resolve('./index.ts'), opts]],
  })!.code;
}

test('css modules', () => {
  expect(transformWithPlugin(`import styles from 'a.css';`, {})).toEqual(
    `import styles from "a.css?modules";`,
  );
  expect(transformWithPlugin(`import styles from 'a.less';`, {})).toEqual(
    `import styles from "a.less?modules";`,
  );
  expect(transformWithPlugin(`import styles from 'a.scss';`, {})).toEqual(
    `import styles from "a.scss?modules";`,
  );
  expect(transformWithPlugin(`import styles from 'a.sass';`, {})).toEqual(
    `import styles from "a.sass?modules";`,
  );
  expect(transformWithPlugin(`import styles from 'a.stylus';`, {})).toEqual(
    `import styles from "a.stylus?modules";`,
  );
  expect(transformWithPlugin(`import styles from 'a.styl';`, {})).toEqual(
    `import styles from "a.styl?modules";`,
  );
});
