import { dirname } from 'path';
import { mergeConfig } from '@chrissong/simo-utils';

interface IImportPluginOpts {
  libraryName: string;
  libraryDirectory?: string;
  style?: boolean;
  camel2DashComponentName?: boolean;
}

export interface IOpts {
  typescript?: boolean;
  react?: object;
  debug?: boolean;
  env?: object;
  transformRuntime?: object;
  reactRemovePropTypes?: boolean;
  reactRequire?: boolean;
  dynamicImportNode?: boolean;
  importToAwaitRequire?: object;
  autoCSSModules?: boolean;
  svgr?: object;
  import?: IImportPluginOpts[];
  lockCoreJS3?: object;
  modify?: Function;
}

function toObject<T extends object>(obj: T | boolean): T | Partial<T> {
  return typeof obj === 'object' ? obj : {};
}

const defaultEnvConfig = {
  exclude: [
    'transform-typeof-symbol',
    'transform-unicode-regex',
    'transform-sticky-regex',
    'transform-new-target',
    'transform-modules-umd',
    'transform-modules-systemjs',
    'transform-modules-amd',
    'transform-literals',
  ],
};

export default (context: any, opts: IOpts = {}) => {
  const presets = [
    opts.env && [require('@babel/preset-env').default],
    opts.react && [require('@babel/preset-react').default],
    opts.typescript && [
      require('@babel/preset-typescript').default,
      {
        // https://babeljs.io/docs/en/babel-plugin-transform-typescript#impartial-namespace-support
        allowNamespaces: true,
      },
    ],
  ];
  // const presets = [require('@babel/preset-env').default, require('@babel/preset-react').default];
  const plugins = [
    require('@babel/plugin-syntax-dynamic-import').default,
    require('@chrissong/babel-auto-css-modules').default,
  ];
  return {
    presets,
    plugins,
  };
};
