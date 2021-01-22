const path = require('path')
function resolve(dir) {
  return path.join(__dirname, dir)
}
// 项目的主要配置文件
module.exports = {
  publicPath: './', //打包相对路径
  runtimeCompiler: true, //一种模式
  //是否开启eslint校验
  lintOnSave: false,
  chainWebpack: (config) => {
    //修改文件引入自定义路径
    config.resolve.alias
      .set('@', resolve('src'))
      .set('@styles', resolve('src/assets/styles'))
      .set('@images', resolve('src/assets/images'))
      .set('@utils', resolve('src/utils'))
  },
  // devServer: {
  //   disableHostCheck: true,
  //   host: '0.0.0.0',
  //   proxy: {
  //     //配置代理，解决跨域请求后台数据的问题
  //     '/v1': {
  //       target: 'http://localhost:3000/v1', //后台接口，连接本地服务
  //       ws: true, //是否跨域
  //       changeOrigin: true,
  //       pathRewrite: {
  //         '^/v1': '/',
  //       },
  //     },
  //   },
  // },
}
