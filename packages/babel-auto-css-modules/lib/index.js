"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const CSS_EXTNAMES = ['.css', '.less', '.sass', '.scss', '.stylus', '.styl'];
function default_1() {
    return {
        visitor: {
            ImportDeclaration(path, { opts }) {
                const { specifiers, source } = path.node;
                if (specifiers.length && CSS_EXTNAMES.includes(path_1.extname(source.value))) {
                    source.value = `${source.value}?${opts.flag || 'modules'}`;
                }
            },
        },
    };
}
exports.default = default_1;
//# sourceMappingURL=index.js.map