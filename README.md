# simo-cli

react 项目开发脚手架

[快速上手](./docs/guide.md)

[API 文档指南](./docs/config.md) 
### 安装

支持 **Node.js** 版本>= **v10.13.0**

```sh
npm install @chrissong/simo-cli -g
&
yarn global add  @chrissong/simo-cli
```

### 功能

- 内置 babel-typescript 支持 ts 项目开发，内置 ts 类型检查
- 基于 webpack-chain 实现灵活配置
- 会自动识别 CSS Modules 的使用
- 配置项修改后本地服务热重启
- 多进程编译
- 灵活的多页面打包方式
- 默认针对 lodash 和 moment 库的优化

### TODO
- [x] 使用react-refresh 进行react组件模块热更新
- [x] 调整css modules 生成的类名值
- [x] mock功能
- [ ] 增加一些后台模版的使用
- [ ] 做一个微服务平台  



