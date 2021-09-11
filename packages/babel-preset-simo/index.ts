import path from 'path';
export interface IOpts {
  typescript?: boolean;
  targets?: string[];
  refresh?: boolean;
  isDev?: boolean;
}

export default (_context: any, opts: IOpts = {}) => {
  const presets = [
    [
      require('@babel/preset-env').default,
      {
        // targets: opts.targets,
        modules: false,
      },
    ],
    [require('@babel/preset-react').default],
    opts.typescript && [
      require('@babel/preset-typescript'),
      {
        // https://babeljs.io/docs/en/babel-plugin-transform-typescript#impartial-namespace-support
        allowNamespaces: true,
      },
    ],
  ].filter(Boolean);


  const plugins = [
    opts.refresh && opts.isDev && [require('react-refresh/babel')],
    [require('@chrissong/babel-auto-css-modules').default],
    [require('@babel/plugin-proposal-decorators').default, { legacy: true }],
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
  ].filter(Boolean);

  return {
    presets,
    plugins,
  };
};
