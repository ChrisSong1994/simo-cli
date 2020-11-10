<<<<<<< HEAD
'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const simo_core_1 = require('@chrissong/simo-core');
exports.default = (cli) => {
  const { cmd, desc, builder } = simo_core_1.serverComd;
  cli.register(cmd, desc, builder, (argv) => {
    debugger;
    simo_core_1.server(cli);
  });
};
//# sourceMappingURL=index.js.map
=======
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const simo_core_1 = require("@chrissong/simo-core");
exports.default = (cli) => {
    const { cmd, desc, builder } = simo_core_1.serverComd;
    cli.register(cmd, desc, builder, (argv) => {
        debugger;
        simo_core_1.server(cli);
    });
};
//# sourceMappingURL=index.js.map
>>>>>>> bb47201f42e3a2c211b98b37780175c73d9a1d35
