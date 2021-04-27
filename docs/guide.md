# simo-cli 命令


### simo

查看@chrissong/simo-cli 版本

```bash
simo -v    #0.0.5
```

查看命令

```bash
simo -h
```
### simo create

创建项目

```bash
simo create my-app
```

### simo template

模版管理

查看模版列表

```bash
simo template ls
```

增加外部模版

```bash
simo template add --name=new-simo-template --repository=remote-git-url --description=新的模版

```

删除模版，内置模版不可删除（`isBuiltIn：true`是内置模版）

```bash
simo template delete --name=template-name
```

### simo serve

开启本地服务

```bash
simo serve
```

默认不会打开浏览器，打开浏览器需要配置`open`参数

```bash
simo serve --open
```

### simo build

打包

```bash
simo build
```

### simo inspect

检出配置项，默认在控制台打印，增加`filename`参数默认在项目根目录生成`filename.json`文件

```
simo inspect --filename=webpack-config
```
