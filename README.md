<!--
 * @Author: = dengyy
 * @Date: 2024-08-12 10:37:21
 * @LastEditors: = dengyy
 * @LastEditTime: 2024-08-13 09:14:43
 * @FilePath: \first-extension-project\README.md
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
# 项目背景
1. 完成一个侧边栏的插件项目搭建


# 参考文档
1. 微信公众号文章：2023新春版：React+Antd开发Chrome插件教程（Manifest V3）
2. https://doc.yilijishu.info/chrome/getstarted.html    (貌似已经访问不了)


# 其他配置可以参考官网
    manifest
    https://developer.chrome.com/docs/extensions/mv3/manifest/
    manifest_version
    https://developer.chrome.com/docs/extensions/mv3/manifest/manifest_version/
    content_script
    https://developer.chrome.com/docs/extensions/mv3/content_script/
    permissions
    https://developer.chrome.com/docs/extensions/mv3/declare_permissions/

    注：sidePanel的相关知识智能在官网上看或者用GPT来搜

# 组件通信
1. 插件的通信方式是用的chrome自带的通信，类似于消息订阅与发布pubsubJs
2. sidePanel页面是使用rematch来管理状态，并且使用redux-persist来持久化数据，rematch是react-redux的的简单版

# 参考项目
1. yjj的项目：https://github.com/995854654/forty-extension


# 扩展程序的结构
1. 插件的后台脚本入口文件是background/index.js
2. 插件的内容入口脚本文件是content/index.js
3. 插件的小窗口入口文件是popup/index.js
4. 插件的侧边栏入口文件是sidePanel/index.js

# 如何调试
1. sidePanel页面可访问 `http://localhost:3000/sidePanel.html` 注意 若sidePanel中存在chrome代码，则需要先屏蔽，否则会报错
2. popup页面可访问 `http://localhost:3000/popup.html`
3. 其余模块代码调试需要打包build加载到浏览器扩展才能调试（较麻烦，但没有办法）


# 文件结构解释
```txt
// src文件夹下的目录树
├─api     // 项目所有的接口路由配置
│      index.js  // 总接口配置，后端接口，以及插件监听目标页面的api接口
│
│      
├─background  // 后台代码
│      index.js
│      
├─common  // 通用包
│  ├─css  // 通用css
│  │      frame.css  
│  │      global.css
│  │      reset.css
│  │      
│  ├─js
│  │      CommonConstants.js  // 常量配置
│  │      subsidyConfig.js  // 补贴相关配置
│  │      
│  └─utils
│          common.js  // 通用工具
│          DateUtils.js  // 日期工具
│          Logger.js  // 日志工具
│          xpathAction.js  // xpath操作工具
│          
├─content  // content_script注入脚本
│  │  content.less
│  │  ContentMain.jsx  // content_script主组件。
│  │  index.js   // content_script入口文件
│  │  
│  ├─columns
│  │      columnsTotal.js
│  │      
│  └─components
│      ├─FloatWindow  // 悬浮窗口
│      └─ floatWindow.less
│           index.jsx
│         
├─sidePanel  // 侧边栏
│    │ 
│    └─components
│       └─sidePanel.jsx // 侧边栏主组件
│              
└─popup  // 插件小窗口
    │  index.js  // 入口文件
    │  popup.css  // 入口样式
    │  
    ├─components
    ├─pages  // 页面
    │  ├─Home  // 主页
    │  └─Login  // 登录页面
    │          index.jsx
    │          login.less
    │          
    └─router // 小窗口的路由配置
            index.js
            
```