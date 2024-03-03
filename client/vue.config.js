const { defineConfig } = require('@vue/cli-service')
const target = "http://localhost:3000"; // Origin : http + IP + port

module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      '^/api': {
        target,
        changOrigin: true,
        ws: false, // 웹소켓 막기
        pathRewrite: { '^/api' : '/' }// Path 덮어쓰기
      }
    }
  }
})