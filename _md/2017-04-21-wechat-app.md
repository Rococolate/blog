@@@@@@@@@@
layout: default
title: 微信小程序开发几点心得
@@@@@@@@@@

# {{ page.title }}

![wechat](/blog/images/blog/wechat.jpg)

{{ page.date | date_to_string }}

Author:wuguanxi

***

最近忙着开发微信小程序，小程序的语法大概借鉴了Vue 、 React 这些主流框架，支持大部分css 和 ES6语法，但也会有一些坑。

### Promise 
最新版的小程序支持[Promise](https://mp.weixin.qq.com/debug/wxadoc/dev/devtools/details.html),但真机实测时发现系统为IOS8.3的iPhone5c Promise无法使用而且没有报错，尝试使用第三方Promise库[bluebird](http://bluebirdjs.com/docs/getting-started.html),结果掉进另外一个坑。
### bluebird
bluebird代码中包含有DOM操作，与小程序**不兼容**。
可以用[es6-promise](https://www.npmjs.com/package/es6-promise)代替。替换后IOS8.3的iPhone5c实测Promise可用。
### 布局
请放心使用flex布局，然后记得在微信开发者工具里勾选 **开启 上传代码时样式文件自动保存**
### 小图标
小体积的图标可以转换成base64,作为背景图引入，放在app.wxss里面全局可用。
### 组件化
微信小程序不提供组件化的API，但可以有方法hack类似的组件。
#### 1.对Page的分析
小程序的Page其实是一个普通的js对象，然后有一些自带的属性和方法，而且可以随意添加自定义的属性和方法，有个关键的方法是setData,小程序就是靠它实现数据和视图的同步。
而我们组件的一个思路就是获取到Page这个Object ,然后与组件提供的属性和方法进行合并
#### 2.组件
我的组件loading为例子
```bash
组件结构
loading--
  loading.js
  loading.wxml
  loading.wxss
```
loading.js
```javascript
// loading.js loading组件的js

// 组件的属性
const __data__ = {
  show:false
}
// 组件的方法
const __fn__ = {
  ComponentLoadingShow(){
    this.data.ComponentLoadingData.show = true;
    const ComponentLoadingData = this.data.ComponentLoadingData;
    this.setData({
      ComponentLoadingData
    })
  },
  ComponentLoadingHide(){
    this.data.ComponentLoadingData.show = false;
    const ComponentLoadingData = this.data.ComponentLoadingData;
    this.setData({
      ComponentLoadingData
    })
  },
}

module.exports = function ComponentLoading(pageContext) {
   // 获得page 合并属性与方法
  const ComponentLoadingData = Object.assign({},__data__);
  pageContext.setData({
  // 在组件data里的名字
    ComponentLoadingData
  });
  Object.assign(pageContext,__fn__);
}
```

```javascript
// 在Page index里使用

const ComponentLoading = require('../component/loading/loading.js');

Page({
  data: {
    
  },
  onLoad(){
    // onload的时候注入
    ComponentLoading(this);
  },
 
})

```
loading.wxml
wxml文件是对应的结构，使用小程序提供的[模板（template）](https://mp.weixin.qq.com/debug/wxadoc/dev/framework/view/wxml/template.html)
```html
<!-- loading.wxml-->
<template name="ComponentLoading">
  <view wx:if="{{show}}" class='ComponentLoading-loading' bindtap="{{ComponentLoadingEvent}}">
    <view class="ComponentLoading-loading-icon"></view>
  </view>
</template>
```
使用时在Page对应的wxml引入
```html
<!-- index.wxml-->
<import src='../component/loading/loading.wxml' />
...
<template is="ComponentLoading" data="{{...ComponentLoadingData}}"/>
```

loading.wxss
```css
.....
```
直接在app.wxss里面引入，全局可用
```css
/**app.wxss**/
import './pages/component/loading/loading.wxss';
...
```

[完整demo挫这里](https://github.com/Rococolate/wechat_app_loading)

### 最后说说授权的坑
小程序有些API是需要用户授权才能用，但是，一旦用户第一次手误按了拒绝，程序在一个不短的时间内是无法再次调起授权API的。
而且这个坑貌似在小程序1.1.0前是无解的，1.1.0的解决方法是用[wx.openSetting](https://mp.weixin.qq.com/debug/wxadoc/dev/api/setting.html#opensettingobject)处理
低版本需要兼容处理（提示用户升级吧😂）。
