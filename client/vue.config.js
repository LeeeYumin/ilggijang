const { defineConfig } = require('@vue/cli-service')
const target = "http://localhost:3000"; // Origin : http + IP + port
var path = require('path');

module.exports = defineConfig({
  chainWebpack: config => {
    config.plugins.delete('prefetch');//perfetch삭제

  },
  outputDir : path.resolve("../myserver/public"),

  transpileDependencies: true,
  devServer: {
    proxy: {
      '^/api': {
        target,
        changOrigin: true,
        ws: false, // 웹소켓 막기
        pathRewrite: { '^/api' : '/' }// Path 덮어쓰기
      },
      '^/oauth2.0':{
        target: 'https://nid.naver.com'
      }
      
    }
  }


})