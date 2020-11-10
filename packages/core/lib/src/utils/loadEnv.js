<<<<<<< HEAD
'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const path_1 = __importDefault(require('path'));
const dotenv_1 = __importDefault(require('dotenv'));
const dotenv_expand_1 = __importDefault(require('dotenv-expand'));
=======
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
const dotenv_expand_1 = __importDefault(require("dotenv-expand"));
>>>>>>> bb47201f42e3a2c211b98b37780175c73d9a1d35
/**
 * 加载项目环境变量
 * @param{string} cwd  项目目录
 */
const loadEnv = (cwd) => {
<<<<<<< HEAD
  const basePath = path_1.default.resolve(cwd, '.env');
  try {
    const env = dotenv_1.default.config({ path: basePath });
    dotenv_expand_1.default(env);
  } catch (err) {
    if (err.toString().indexOf('ENOENT') < 0) {
      throw err;
    }
  }
};
exports.default = loadEnv;
//# sourceMappingURL=loadEnv.js.map
=======
    const basePath = path_1.default.resolve(cwd, '.env');
    try {
        const env = dotenv_1.default.config({ path: basePath });
        dotenv_expand_1.default(env);
    }
    catch (err) {
        if (err.toString().indexOf('ENOENT') < 0) {
            throw err;
        }
    }
};
exports.default = loadEnv;
//# sourceMappingURL=loadEnv.js.map
>>>>>>> bb47201f42e3a2c211b98b37780175c73d9a1d35
