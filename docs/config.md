# simoConfig 配置项

## 配置方式

支持 `simo.config.js`、`simo.config.ts` 、`.simorc.ts` 、`.simorc.js`配置文件，支持对象或者函数。使用导出函数时将会提供一个`env`对象作为参数；

```js
module.exports = (env) => {
  const { NODE_ENV } = env;
  const isProd = NODE_ENV === 'production';

  return {
    output: {
      path: 'dist',
      filename: isProd ? '[name].bundle.js' : '[name].js',
    },
  };
};
```

默认`env`对象将包含项目本身设置的环境变量和一个内部配置环境变量`NODE_ENV = development|production`,

## alias

- Type: `object`
- Default:`{}`

配置别名，对引用路径进行映射。

```js
module.exports = {
  alias: {
    ROOT: './src',
  },
};

// 示例
import App from 'ROOT/app';
```

## browsersList

- Type:`array`
- Default:`['> 1%', 'last 2 versions', 'not ie <= 10']`

配置需要兼容的浏览器最低版本，会自动引入 polyfill 和做语法转换

## buildNotifier

- Type:`boolean | string | object`
- Defaults:`true`

通过[webpack-build-notifier](https://github.com/RoccoC/webpack-build-notifier)实现系统级别的 notifications，当 buildNotifier 参数为字符串时将作为通知的标题使用，参数为对象将合并默认配置。

## copyPath

- Type:`string | array`

需要拷贝到打包目录的文件夹

## chainWebpack

- Type:`Function`

通过 [webpack-chain](https://github.com/mozilla-neutrino/webpack-chain) 的 API 修改 webpack 配置。

比如：

```js
module.exports = {
  chainWebpack: (config) => {
    // 设置 alias
    config.resolve.alias.set('@', './src');

    // 删除 umi 内置插件
    config.plugins.delete('copy');
  },
};
```

## cssExtract

- Type: `boolean`
- Default: true

默认打包的时候将 CSS 提取到单独的文件中，为每个包含 CSS 的 JS 文件创建一个 CSS 文件，并且支持 CSS 和 SourceMaps 的按需加载。

## define

- Type: `object`
- Default: {}

允许在 编译时 创建配置的全局常量。

```js
module.exports = {
  define: {
    PRODUCTION: JSON.stringify(true),
  },
};
```

在代码中直接使用

```js
if (PRODUCTION) {
  console.log('this is production environment');
}
```

更多类型详见 [webpack#define-plugin 配置](https://webpack.docschina.org/plugins/define-plugin)。

## devtool

- Type: `string`
- Default: `cheap-module-source-map` in dev, `false` in build

用户配置 sourcemap 类型。

常见的可选类型有：

- eval，最快的类型，但不支持低版本浏览器，如果编译慢，可以试试
- source-map，最慢最全的类型

更多类型详见 [webpack#devtool 配置](hhttps://webpack.docschina.org/configuration/devtool/)。

## externals

- Type: `string | function | object`
- Default: `{}`

设置哪些模块可以不被打包，通过 `<script>` 或其他方式引入，通常需要和 scripts 或 headScripts 配置同时使用。

比如，

```js
module.exports = {
  externals: {
    react: 'window.React',
  },
};
```

简单理解的话，可以理解为 `import react from 'react'` 会被替换为 `const react = window.React`。

## extraBabelOptions

- Type: `object`
- Default: `{}`

配置额外的 babel 配置。

```js
module.exports = {
  extraBabelOptions: {
    presets: [],
    plugins: [],
  },
};
```

## fastRefresh

- Type:`boolean`
- Default: `true`

快速刷新（Fast Refresh），开发时可以保持组件状态，同时编辑提供即时反馈。

## host

- Type:`string`
- Default:`0.0.0.0`

静态服务域名

## inlineLimit

- Type:`boolean`
- Default: `10000(10k)`

配置图片文件是否走 base64 编译的阈值。默认是 10000 字节，少于他会被编译为 base64 编码，否则会生成单独的文件。

## pages

- Type:`object`
- Default:`{}`

配置静态页面模版入口

```js
module.exports = {
  pages: {
    // 必选：页面的入口和模版配置
    index: {
      // 配置chunk 名称
      entry: './src/index.js', // 页面入口文件
      template: './public/index.html', // 页面html模板文件
      htmlWebpackPluginOptions: {
        // 可选：配置html内变量
        __param: '111',
      },
    },
    test: {
      entry: ['./src/test.js', './src/assets/js/common.js'], //页面入口文件
      template: './public/test.html', // 页面html模板文件
    },
  },
};
```

pages 配置内 key 将被作为一个 chunkName，entry 属性值作为该 chunk 的入口文件

## parallel

- Type:`bool`
- Default:`true`

是否开启多进程，默认 thread-loader 对于 babel 编译 和 terser-webpack-plugin 打包

## port

- Type:`number`
- Default:`8080`

开发静态服务端口号

## proxy

- Type:`object`
- Default:`{}`

配置本地服务代理

```js
module.exports = {
  proxy: {
    '/api': {
      target: 'http://www.xxx.com/',
      changeOrigin: true,
      pathRewrite: { '^/api': '' },
    },
    '/edge': 'http://www.xxx.com/',
  },
};
```

## publicPath

- Type:`string`
- Default:`./`

配置 webpack 的 publicPath。当打包的时候，webpack 会在静态文件路径前面添加 publicPath 的值，当你需要修改静态文件地址时，比如使用 CDN 部署，把 publicPath 的值设为 CDN 的值就可以。

```js
module.exports = (env) => {
  const { NODE_ENV } = env;
  const isProd = NODE_ENV === 'production';

  return {
    publicPath: isProd ? '/cdn/' : './',
  };
};
```

打包后的静态文件访问路径将会是`服务域名/cdn/xxx.js`

## output

- Type: `object`
- Default:`{ path: 'dist'}`

```js
module.exports =  (env) => {
  const { NODE_ENV } = env;
  const isProd = NODE_ENV === 'production';

  return {
    output: ：{
      path: 'dist',
      filename: isProd ? '[name].[hash].js' : '[name].js'}
  };
};

```

## outputEnvironment

注意配置是用来告诉 webpack 有些环境的 es x 功能是否可用的查看 [output.environment](https://webpack.js.org/configuration/output/#outputenvironment)

- Type: `object`
- Default:

```json
{
    // 注意这个是用来告诉webpack 有些环境的 es x 功能是否可用的
    // The environment supports arrow functions ('() => { ... }').
    arrowFunction: false,
    // The environment supports BigInt as literal (123n).
    bigIntLiteral: false,
    // The environment supports const and let for variable declarations.
    const: false,
    // The environment supports destructuring ('{ a, b } = obj').
    destructuring: false,
    // The environment supports an async import() function to import EcmaScript modules.
    dynamicImport: false,
    // The environment supports 'for of' iteration ('for (const x of array) { ... }').
    forOf: false,
    // The environment supports ECMAScript Module syntax to import ECMAScript modules (import ... from '...').
    module: false,
  },

```

## target

- Type: `string | [string] | boolean`
- Default:`['web', 'es5']`

项目部署环境

```js
module.exports = {
  target: ['web', 'es5'],
};
```

在上述示例中，target 设置为 node，webpack 将在类 Node.js 环境编译代码。(使用 Node.js 的 require 加载 chunk，而不加载任何内置模块，如 fs 或 path),默认 ['web', 'es5']。 **注意：** web 环境会默认编译成`esm` 代码。

## tsTypeCheck

- Type:`boolean`
- Dedfault:`true`

是否开启 ts 类型检查

## watchFiles

- Type:`array`
- Default:`[ '.env', '.eslintrc', '.eslintrc.js','.eslintignore','tsconfig.json', 'simo.config.js', 'simo.config.ts' ]`

监听配置文件修改将会重启本地开发服务器
