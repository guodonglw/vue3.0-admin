# vue3-admin

## 简介
vue3-admin是一个后台管理系统的前端页面展示，是由vue-cli4和elemnet-ui搭建实现的。使用了最新的vue框架，内部采用了组件化开发模式，尽可能使得每个组件都遵循单一
功能原则。虽然刚开始看起来可能略感疲惫（由于子组件功能单一，所以内部通信较多），但是对后期的维护有着非常大的好处。希望该项目可以给有需要的朋友帮助。<br />

## 演示(由于作者自己买的低配版阿里云服务器，所以可能导致请求时间略长)
[在线demo](http://39.105.222.188/vue3.0-admin/#/login)

## 对浏览器的支持
对主流浏览器chrome,firefox,Safari等浏览器有着较好的支持，对ie浏览器未兼容

## 开发
```bash
# 克隆项目
git clone git@github.com:guodonglw/vue3.0-admin.git

# 进入项目目录
cd vue3.0-admin

# 安装依赖
npm install

# 建议不要用 cnpm 安装 会有各种诡异的bug 可以通过如下操作解决 npm 下载速度慢的问题
npm install --registry=https://registry.npm.taobao.org

# 启动服务
npm run serve
```

浏览器访问 http://localhost:8080

## 发布

```bash
# 构建生产环境
npm run build
```

打包会出现dist文件夹，用Chrome浏览器打开index.html页面即可