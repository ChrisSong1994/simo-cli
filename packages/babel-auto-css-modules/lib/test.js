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
const transformCode = transformWithPlugin(`import styles from 'a.css';`, {});
console.log(transformCode);
//# sourceMappingURL=test.js.map