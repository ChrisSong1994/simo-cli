"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = require("path");
var CSS_EXTNAMES = ['.css', '.less', '.sass', '.scss', '.stylus', '.styl'];
function default_1() {
    return {
        visitor: {
            ImportDeclaration: function (path, _a) {
                var opts = _a.opts;
                var _b = path.node, specifiers = _b.specifiers, source = _b.source;
                if (specifiers.length && CSS_EXTNAMES.includes((0, path_1.extname)(source.value))) {
                    source.value = "".concat(source.value, "?").concat(opts.flag || 'modules');
                }
            },
        },
    };
}
exports.default = default_1;
