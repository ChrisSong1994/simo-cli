import { glob, pathToRegexp, bodyParser, multer } from '@chrissong/simo-utils';
import assert from 'assert';
import { existsSync } from 'fs';
import { join } from 'path';

const VALID_METHODS = ['get', 'post', 'put', 'patch', 'delete'];
const BODY_PARSED_METHODS = ['post', 'put', 'patch', 'delete'];

// 获取mock 文件和配置
export const getMockConfig = (files: string[]): object => {
  return files.reduce((memo, mockFile) => {
    try {
      const m = require(mockFile); // eslint-disable-line
      memo = {
        ...memo,
        ...(m.default || m),
      };
      return memo;
    } catch (e: any) {
      throw new Error(e.stack);
    }
  }, {});
};

// 解析mock 配置的key 值
export function parseKey(key: string) {
  let method = 'get';
  let path = key;
  if (/\s+/.test(key)) {
    const splited = key.split(/\s+/);
    method = splited[0].toLowerCase();
    path = splited[1]; // eslint-disable-line
  }
  assert(
    VALID_METHODS.includes(method),
    `Invalid method ${method} for path ${path}, please check your mock files.`,
  );
  return {
    method,
    path,
  };
}

function createHandler(method: any, path: any, handler: any) {
  return function (req: Request, res: any, next: any) {
    if (BODY_PARSED_METHODS.includes(method)) {
      // @ts-ignore
      bodyParser.json({ limit: '5mb', strict: false })(req, res, () => {
        // @ts-ignore
        bodyParser.urlencoded({ limit: '5mb', extended: true })(req, res as any, () => {
          sendData();
        });
      });
    } else {
      sendData();
    }

    function sendData() {
      if (typeof handler === 'function') {
        multer().any()(req, res, () => {
          handler(req, res, next);
        });
      } else {
        res.json(handler);
      }
    }
  };
}

export const normalizeConfig = (config: any) => {
  return Object.keys(config).reduce((memo: any, key) => {
    const handler = config[key];
    const type = typeof handler;
    assert(
      type === 'function' || type === 'object',
      `mock value of ${key} should be function or object, but got ${type}`,
    );
    const { method, path } = parseKey(key);
    const keys: any[] = [];
    const re = pathToRegexp(path, keys);
    memo.push({
      method,
      path,
      re,
      keys,
      handler: createHandler(method, path, handler),
    });
    return memo;
  }, []);
};

// 获取mock data
export const getMockData = (cwd: string, ignore: any[]) => {
  const mockPaths = [
    ...(glob.sync('mock/**/*.[jt]s', {
      cwd,
      ignore,
    }) || []),
  ]
    .map((path) => join(cwd, path))
    .filter((path) => path && existsSync(path));

  // get mock data
  const mockData = normalizeConfig(getMockConfig(mockPaths));

  const mockWatcherPaths = [...(mockPaths || []), join(cwd, 'mock')].filter(
    (path) => path && existsSync(path),
  );

  return {
    mockData,
    mockPaths,
    mockWatcherPaths,
  };
};

// 清理缓存
export const cleanRequireCache = (paths: string[]): void => {
  Object.keys(require.cache).forEach((file) => {
    if (
      paths.some((path) => {
        return file.indexOf(path) > -1;
      })
    ) {
      delete require.cache[file];
    }
  });
};
