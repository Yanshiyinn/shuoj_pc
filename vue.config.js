module.exports = {
  transpileDependencies: [
    'vue-echarts',
    'resize-detector'
  ],
  publicPath: process.env.NODE_ENV === 'production'
    ? '/shuoj_pc/'
    : '/',
  devServer: {
    // host:'192.168.43.245',
    // port:'8080',
    proxy: 'http://115.29.177.136:8080'
  }
}