export default () => {
  const presets = [require('@babel/preset-env').default, require('@babel/preset-react').default];

  const plugins = [require('@babel/plugin-syntax-dynamic-import')];
  return {
    presets,
    plugins,
  };
};
