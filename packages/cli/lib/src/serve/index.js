"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var simo_core_1 = require("@chrissong/simo-core");
exports.default = (function (cli) {
    var cmd = simo_core_1.serveCmd.cmd, desc = simo_core_1.serveCmd.desc, builder = simo_core_1.serveCmd.builder;
    cli.register(cmd, desc, builder, function (argv) {
        simo_core_1.serve(cli, argv);
    });
});
//# sourceMappingURL=index.js.map