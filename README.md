# 项目启动及构建
## 安装依赖
```
npm install
```

## 启动开发服务器
```
npm run dev
```

## 打包生产代码
```
npm run build
```

## 源代码校验及修复
```
npm run lint
```

# 项目目录结构说明
```
.
├── README.md // 项目启动及目录结构说明
├── babel.config.js // babel配置文件
├── package-lock.json
├── package.json
├── postcss.config.js // postcss-loader的配置文件
├── proxy.config.js // webpack-dev-server代理配置，修改该文件后需要重新执行`npm run dev`重启开发服务器
├── public // 静态资源目录，放在此处的文件可以直接被访问，vue-cli@2.0-中static目录中的文件应该放在此处
│   ├── favicon.ico
│   └── index.html // 项目html模板
├── src
│   ├── App.vue
│   ├── api // api目录，各个模块应在其下创建单独的目录存放接口定义，并通过各模块下的index.js文件作为导出的唯一出口
│   ├── assets // 静态资源目录，放在此处的文件在webpack打包时会分析其被引用的依赖关系并注入正确的路径值
│   │   ├── icon // 字体图标文件
│   │   ├── img // 图片文件
│   │   └── svg // svg文件
│   ├── components // 独立组件，可被该项目中任何页面引用的公共组件
│   │   └── layout // 项目布局组件，其包含了项目的整体布局组成
│   │       ├── components // 项目布局组件所依赖的更细粒度的组件(如果需要)
│   │       │   ├── footer // 项目布局-头部(如果需要)
│   │       │   └── header // 项目布局-脚注(如果需要)
│   │       ├── index.js // 组件导出的唯一出口
│   │       └── layout.vue
│   ├── config // 项目生产相关的配置文件
│   │   └── white-list.js // 响应白名单配置文件
│   ├── filter // 过滤器
│   ├── lib // 自定义库
│   │   ├── auth.js // 判定当前路由是否有效
│   │   ├── download.js // 下载
│   │   └── request.js // 请求
│   │   └── routes.js // 生成动态路由
│   ├── main.js // 项目打包入口点
│   ├── router // 路由配置
│   │   ├── index.js // 路由器配置导出的唯一出口
│   │   ├── limited // 需要鉴权的路由，如果项目包含多个子系统，请将各个子系统中需要鉴权的路由配置在modules目录下
│   │   │   └── index.js // 需要鉴权的路由导出的唯一出口
│   │   └── public // 不需要鉴权的路由，如果项目包含多个子系统，请将各个子系统中不需要鉴权的路由配置在modules目录下
│   │       └── modules // 各个子系统不需要鉴权的路由的配置
│   │       |   └── anytime-exam.js // 随时考项目不需要鉴权的路由配置，使用基于顶层路由的嵌套路由作为各个子项目的路由入口
│   │       └── index.js // 不需要鉴权的路由导出的唯一出口
│   ├── store // 状态管理
│   │   ├── index.js // 整个状态管理导出的唯一出口，包含全局和各个模块的状态管理
│   │   ├── modules // 功能模块，其下包含各个功能模块所对应的目录，目录结构与store目录类似，其下的index.js作为该模块导出的唯一出口
│   │   ├── mutations.js // 全局mutations
│   │   └── state.js // 全局state
│   ├── style // 样式定义
│   │   ├── base.scss // 基础样式定义(应包含全局样式定义等)
│   │   ├── icon.scss // 字体图标样式定义
│   │   ├── index.scss // 样式定义导出的唯一出口
│   │   ├── mixin.scss // 样式混合
│   │   └── vars.scss // 样式全局变量定义，只能被style目录下的其他文件引用，不应该在某个页面的样式中导入
│   ├── util // 工具方法，index.js是工具方法导出的唯一出口，不应该在某个页面的脚本中导入其下除index.js外的文件
│   │   ├── date.js
│   │   ├── index.js
│   │   ├── local-storage.js
│   │   ├── query.js
│   │   ├── session-storage.js
│   │   └── string.js
│   ├── vendor // 存放项目需要使用的但无法通过npm安装的第三方库文件或第三方库的配置文件，一版只应该在main.js中导入(使用)其下的文件
│   │   └── vant.js // vant组件按需引用配置文件
│   └── views // 子系统或公用页面，各个子系统的页面使用各自独立的目录管理
│       ├── anytime-exam // 随时考项目的页面
│       ├── home // 如果该页面存在子页面(比如: 详情页)，则放入其下的modules目录中
|       |        // 如果该页面及其子页面存在需要公用的组件，则放入其下的components目录中
|       |        // 如果该页面及其子页面存在需要公用的mixins，则放入其下的mixins目录中
│       │   ├── components
│       │   ├── mixins
│       │   ├── modules
│       │   ├── home.vue
│       │   └── index.js // 页面导出的唯一出口
│       └── login
│           ├── index.js
│           └── login.vue
└── vue.config.js
```

# 适配方案
> 采用`lib-flexible.js`和`rem`作为本项目的布局适配方案，并使用postcss插件`postcss-px2rem`实现`px->rem`的自动转换

引用的第三方UI组件库`vant`是基于*@1X*图定义的像素尺寸，需要将其转换为rem，否则对于视网膜屏不兼容(显示很小)，但设计稿是*@2X*的，
这将导致`postcss-px2rem`的配置项`remUnit`无法配置，本项目采用的是基于@1X图的**37.5px**，这意味着各位小伙伴在编写样式时需要将
设计稿上的像素值除以2作为样式定义的像素值，可以通过自己编写postcss插件实现对指定目录中的px值以对应的remUnit比例转换为相应的rem

> **ATTENTION: 为兼容第三方UI组件库及@2X的设计稿，各位小伙伴在编写样式时需要将设计稿上的像素值除以2作为样式定义的像素值**

# 样式定义范例
1. 对于字体大小，一般在样式定义后添加注释/\*px\*/，在转换时将根据dpr自动生成相应的字体定义
2. 对于边框和阴影，一般在样式定义后添加注释/\*no\*/,在转换时不会做任何改动
3. 对于其他样式定义，使用@1X设计图对于的px像素值定义即可

```scss
.demo{
  width: 300px; // 将被转换为8rem
  border: solid 1px #f00; /*no*/ // 不会做转换
  font-size: 14px; /*px*/ // 将根据dpr生成相应的像素值，@1X -> 14px, @2X -> 28px, @3X -> 42px
}
```

