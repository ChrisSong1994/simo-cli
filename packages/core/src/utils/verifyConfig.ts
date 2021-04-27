import Joi from 'joi';

const schema = Joi.object({
  alias: Joi.object(),
  browsersList: Joi.array(),
  copyPath: Joi.alternatives(Joi.string(), Joi.array()),
  chainWebpack: Joi.function(),
  define: Joi.object(),
  devtool: Joi.string(),
  externals: Joi.object(),
  extraBabelOptions: Joi.object(),
  fastRefresh: Joi.boolean(),
  host: Joi.string(),
  pages: Joi.object(),
  parallel: Joi.boolean(),
  port: Joi.number().integer().min(0),
  proxy: Joi.object(),
  publicPath: Joi.string(),
  output: Joi.object({
    path: Joi.string().required(),
    filename: Joi.string(),
    chunkFilename: Joi.string(),
    library: Joi.string(),
    libraryTarget: Joi.string(),
  }),
  target: Joi.string(),
  tsTypeCheck: Joi.boolean(),
});

export default (value: any) => {
  return schema.validate(value);
};
