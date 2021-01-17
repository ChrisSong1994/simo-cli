import path from 'path';

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
  ].filter(Boolean);

  const plugins = [
    [require('@chrissong/babel-auto-css-modules').default],
    [require('@babel/plugin-proposal-decorators').default, { legacy: true }],
    [require('@babel/plugin-proposal-class-properties').default, { loose: true }],
    [require('@babel/plugin-proposal-export-default-from').default, { loose: true }],
    [require('@babel/plugin-syntax-dynamic-import').default],
    [
      require('@babel/plugin-transform-runtime').default,
      {
        version: require('@babel/runtime/package.json').version,
        // https://babeljs.io/docs/en/babel-plugin-transform-runtime#absoluteruntime
        // lock the version of @babel/runtime
        // make sure we are using the correct version
        absoluteRuntime: path.dirname(require.resolve('@babel/runtime/package.json')),
        // https://babeljs.io/docs/en/babel-plugin-transform-runtime#useesmodules
        useESModules: true,
      },
    ],
  ];
  return {
    presets,
    plugins,
  };
};
