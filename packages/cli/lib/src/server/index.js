"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const simo_core_1 = require("@chrissong/simo-core");
exports.default = (cli) => {
    const { cmd, desc, builder } = simo_core_1.serverComd;
    cli.register(cmd, desc, builder, (argv) => {
        simo_core_1.server(cli);
    });
};
//# sourceMappingURL=index.js.map