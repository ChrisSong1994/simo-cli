import Joi from 'joi';

const schema = Joi.object({
  publicPath: Joi.string(),
  staticPath: Joi.string(),
  target: Joi.string(),
  alias: Joi.object(),
  output: Joi.object({
    path: Joi.string(),
    filename: Joi.string(),
    library: Joi.string(),
    libraryTarget: Joi.string(),
  }),
  devtool: Joi.string(),
  parallel: Joi.boolean(),
  port: Joi.number().integer().min(0),
  host: Joi.string(),
  proxy: Joi.object(),
  externals: Joi.object(),
  pages: Joi.object(),
  browsersList: Joi.array(),
  chainWebpack: Joi.function(),
  extraBabelOptions: Joi.object(),
  ignoreMomentLocale: Joi.boolean(),
});

export default (value: any) => {
  return schema.validate(value);
};
