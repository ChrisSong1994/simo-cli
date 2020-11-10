'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const path_1 = __importDefault(require('path'));
const fs_1 = __importDefault(require('fs'));
exports.default = (cwd) => {
  const configPath = path_1.default.resolve(cwd, './simo.config.js');
  if (fs_1.default.existsSync(configPath)) {
    throw new Error(`${cwd} 路径下没有 easy.config.js 配置文件`);
  } else {
    return require(configPath);
  }
};
//# sourceMappingURL=getSimoConfig.js.map
