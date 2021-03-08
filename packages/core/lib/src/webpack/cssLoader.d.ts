import WebpackChain from 'webpack-chain';
import { StyleLoaderOption } from 'packages/core/type';
declare const _default: (config: WebpackChain, { isProd, sourceMap, filename, chunkFilename, browsersList }: StyleLoaderOption) => void;
/**
 * @param {*} webpackConfig webpack-chain配置对象
 * @param {*} param
 * isProd  是否生产环境关联分离css为单独文件
 * sourceMap 是否生成sourceMap
 * filename 生成文件路径
 * chunkFilename  生成文件路径
 * publicPath 资源文件路径publicPath，以output文件夹为根路径
 */
export default _default;
