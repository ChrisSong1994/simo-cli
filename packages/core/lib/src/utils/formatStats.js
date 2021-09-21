"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var simo_utils_1 = require("@chrissong/simo-utils");
var ui = (0, simo_utils_1.cliui)({ width: process.stdout.columns || 80 });
var formatStats = function (stats, dir, api) {
    var json = stats.toJson({
        hash: false,
        modules: false,
        chunks: false,
    });
    var assets = json.assets
        ? json.assets
        : json.children.reduce(function (acc, child) { return acc.concat(child.assets); }, []);
    var seenNames = new Map();
    var isJS = function (val) { return /\.js$/.test(val); };
    var isCSS = function (val) { return /\.css$/.test(val); };
    var isMinJS = function (val) { return /\.min\.js$/.test(val); };
    assets = assets
        .map(function (a) {
        a.name = a.name.split('?')[0];
        return a;
    })
        .filter(function (a) {
        if (seenNames.has(a.name)) {
            return false;
        }
        seenNames.set(a.name, true);
        return isJS(a.name) || isCSS(a.name);
    })
        .sort(function (a, b) {
        if (isJS(a.name) && isCSS(b.name))
            return -1;
        if (isCSS(a.name) && isJS(b.name))
            return 1;
        if (isMinJS(a.name) && !isMinJS(b.name))
            return -1;
        if (!isMinJS(a.name) && isMinJS(b.name))
            return 1;
        return b.size - a.size;
    });
    function formatSize(size) {
        return (size / 1024).toFixed(2) + ' KiB';
    }
    function makeRow(a, b, c) {
        return "  " + a + "\t  " + b + "\t " + c;
    }
    function formatChunks(chunks) {
        return chunks.join(',');
    }
    ui.div(makeRow(simo_utils_1.chalk.cyan.bold("File"), simo_utils_1.chalk.cyan.bold("Size"), simo_utils_1.chalk.cyan.bold("Chunks")) +
        "\n" +
        assets
            .map(function (asset) {
            return makeRow(/js$/.test(asset.name)
                ? simo_utils_1.chalk.green(dir + "/" + asset.name)
                : simo_utils_1.chalk.blue(dir + "/" + asset.name), formatSize(asset.size), formatChunks(Array.from(asset.chunkNames)));
        })
            .join("\n"));
    return "\n" + ui.toString() + "\n";
};
exports.default = formatStats;
