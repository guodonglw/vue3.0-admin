const CompressionWebpackPlugin = require('compression-webpack-plugin')

module.exports = {
  // 基本路径
  publicPath: './',
  // 输出文件目录
  outputDir: 'dist',
  // eslint-loader 是否在保存的时候检查
  lintOnSave: false,
  // webpack配置
  // see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
  chainWebpack: (config) => {
    // 关于打包后包资源各部分占比的配置相关
    // config
    // .plugin('webpack-bundle-analyzer')
    // .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
  },
  configureWebpack: (config) => {
    if (process.env.NODE_ENV === 'production') {//GZIP压缩
      return {
        plugins: [new CompressionWebpackPlugin({
          test: /\.(js|css)(\?.*)?$/i,  //需要压缩的文件正则
          threshold: 10240,  //文件大小大于这个值时启用压缩
          deleteOriginalAssets: false  //压缩后保留原文件
        })]
      }
    }
  },
  // 生产环境是否生成 sourceMap 文件
  productionSourceMap: false,
  devServer: {
    overlay:{
      warning:false,
      errors:false
    },
    open: process.platform === 'darwin',
    host: '0.0.0.0',
    port: 8080,
    https: false,
    hotOnly: false,
    proxy: null, // 设置代理
    before: app => {}
  },
  // 第三方插件配置
  pluginOptions: {
  // ...
  }
}