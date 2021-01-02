"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const webpack_1 = __importDefault(require("webpack"));
const webpack_dev_server_1 = __importDefault(require("webpack-dev-server"));
const api_1 = __importDefault(require("../api"));
// 服务启动
const server = async (options) => {
    const api = new api_1.default('development', options);
    const config = await api.resolveWebpackConfig();
    return new Promise((resolve, reject) => {
        const compiler = webpack_1.default(config);
        const server = new webpack_dev_server_1.default(compiler, config.devServer);
        server.listen(config.devServer.port, config.devServer.host, (err) => {
            if (err)
                return reject(err);
            resolve(null);
            if (api.argv.open) {
                open(`http://localhost:${config.devServer.port}/${api.simoConfig.baseURL}`);
            }
        });
    });
};
exports.default = server;
//# sourceMappingURL=exec.js.map