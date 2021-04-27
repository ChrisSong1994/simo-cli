import path from 'path';

const resolvePath = (base: string, target: string) => path.resolve(base, target);

const getPaths = (base: string) => {
  return {
    appPkgPath: resolvePath(base, './package.json'),
    appTsConfigPath: resolvePath(base, './tsconfig.json'),
    appSimoConfigPath: resolvePath(base, './simo.config.js'),
  };
};

export default getPaths;
