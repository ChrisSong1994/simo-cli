<<<<<<< HEAD
'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.loadEnv = exports.updateNotifier = exports.logger = void 0;
const logger_1 = __importDefault(require('./src/logger'));
=======
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadEnv = exports.updateNotifier = exports.logger = void 0;
const logger_1 = __importDefault(require("./src/logger"));
>>>>>>> bb47201f42e3a2c211b98b37780175c73d9a1d35
exports.logger = logger_1.default;
const updateNotifier_1 = __importDefault(require('./src/updateNotifier'));
exports.updateNotifier = updateNotifier_1.default;
<<<<<<< HEAD
const loadEnv_1 = __importDefault(require('./src/loadEnv'));
exports.loadEnv = loadEnv_1.default;
//# sourceMappingURL=index.js.map
=======
const loadEnv_1 = __importDefault(require("./src/loadEnv"));
exports.loadEnv = loadEnv_1.default;
//# sourceMappingURL=index.js.map
>>>>>>> bb47201f42e3a2c211b98b37780175c73d9a1d35
