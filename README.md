# 自建webpack脚手架 stage2

## 启动流程

``` bash
# 安装项目依赖
npm install

# 启动开发环境服务器
npm run dev 

#启动webpack-dev-server
npm run start:dev

#生产环境打包
npm run prod
```

# 相比stage1有以下优化
+ 抽离webpack核心运行时为inline script，减少一个请求，同时缩减了main chunk的大小
+ 使用yargs-parser区分开发和上线环境，分别使用webpack.development.js和webpack.production.js对线上和开发环境分别配置
+ 线上打包优化，抽离公共模块为common.js
+ 使用image-webpack-loader对各种图片做优化
+ 加入构建结果提示plugins，加入打包进度plugins
+ 首页载入加入loading效果，可搭配css doodle使用