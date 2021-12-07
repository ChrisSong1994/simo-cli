import Joi from 'joi';

const schema = Joi.object({
  alias: Joi.object(),
  browsersList: Joi.array(),
  buildNotifier: Joi.alternatives(Joi.boolean(), Joi.string(), Joi.object()),
  copyPath: Joi.alternatives(Joi.string(), Joi.array()),
  chainWebpack: Joi.function(),
  cssExtract: Joi.boolean(),
  define: Joi.object(),
  devtool: Joi.string(),
  externals: Joi.alternatives(Joi.string(), Joi.function(), Joi.object()),
  extraBabelOptions: Joi.object(),
  fastRefresh: Joi.boolean(),
  host: Joi.string(),
  inlineLimit: Joi.number(),
  pages: Joi.object().required(),
  parallel: Joi.boolean(),
  port: Joi.number().integer().min(0),
  proxy: Joi.object(),
  publicPath: Joi.string(),
  open: Joi.boolean(),
  output: Joi.object({
    path: Joi.string().required(),
    filename: Joi.string(),
    chunkFilename: Joi.string(),
    library: Joi.alternatives(Joi.string(), Joi.array(), Joi.object()),
  }).required(),
  outputEnvironment: Joi.object(),
  target: Joi.alternatives(Joi.string(), Joi.boolean(), Joi.array()),
  tsTypeCheck: Joi.boolean(),
  watchFiles: Joi.array(),
});

export default (value: any) => {
  return schema.validate(value);
};
