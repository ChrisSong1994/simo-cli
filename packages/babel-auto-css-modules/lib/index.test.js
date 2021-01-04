"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@babel/core");
function transformWithPlugin(code, opts) {
    const filename = 'file.js';
    return core_1.transform(code, {
        filename,
        plugins: [[require.resolve('./index.ts'), opts]],
    }).code;
}
test('css modules', () => {
    expect(transformWithPlugin(`import styles from 'a.css';`, {})).toEqual(`import styles from "a.css?modules";`);
    expect(transformWithPlugin(`import styles from 'a.less';`, {})).toEqual(`import styles from "a.less?modules";`);
    expect(transformWithPlugin(`import styles from 'a.scss';`, {})).toEqual(`import styles from "a.scss?modules";`);
    expect(transformWithPlugin(`import styles from 'a.sass';`, {})).toEqual(`import styles from "a.sass?modules";`);
    expect(transformWithPlugin(`import styles from 'a.stylus';`, {})).toEqual(`import styles from "a.stylus?modules";`);
    expect(transformWithPlugin(`import styles from 'a.styl';`, {})).toEqual(`import styles from "a.styl?modules";`);
});
//# sourceMappingURL=index.test.js.map