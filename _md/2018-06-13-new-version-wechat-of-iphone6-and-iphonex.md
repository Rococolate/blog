@@@@@@@@@@
layout: default
title: 新版微信（6.6.7）在iPhone6和iPhoneX上的显示区域的改变
@@@@@@@@@@

# {{ page.title }}

![题图](/blog/images/blog/2018_06_13/iphones.jpg)


{{ page.date | date_to_string }}

Author:wuguanxi

***

## 0.微信6.6.7 ios 版本的改动

增加了右拉浮层，webview行为和safari一致（增加底部导航栏，顶部标题栏滑动时会变小）

这一改动直接令首屏显示区域减小，而且iphoneX和iphone6减少的高度是不一样的

## 1.导航栏出现逻辑

  首次进入webview是不会出现导航栏

  跳转到其他页面后就会出现导航栏（有前进后退两个按钮）


## 2.测量数据说明
  直接在页面用javascript测量，具体方法是令 html 和 body 的 height:100%;overflow:hidden
```css
  html,body{
      width: 100%;
      height: 100%;
      overflow: hidden;
    }
```
```js
  log("screen:"+window.screen.height); // 屏幕高度
  log("body:"+document.body.getBoundingClientRect().height) // 内容高度
```
  先测第一次进入时的 屏幕高度 减 内容高度 得到 标题栏高度

  ![题图](/blog/images/blog/2018_06_13/WechatIMG183.png)

  再测跳转页面后 出现导航栏时的页面内容导读 减上面测出 第一次进入时的内容高度 得到 导航栏高度

  ![题图](/blog/images/blog/2018_06_13/WechatIMG182.png)

## 3.顶部标题栏

  iPhone6 的标题栏高度是64

  iPhoneX 的标题栏高度是88

## 4.首次进入webview时（没有底部导航栏）

  iPhone6 的首屏高度是606

  iPhoneX 的首屏高度是724 

  iPhoneX 比 iPhone6 高 724 - 606 = 121

## 5.二次进入webview时（底部有导航栏）

  iPhone6 的导航栏高度是49 首屏高度是606 - 49 = 554

  iPhoneX 的导航栏高度是83 首屏高度是724 - 83 = 641

  iPhoneX 比 iPhone6 高 641 - 554 = 87

## 6.设计时要注意的地方

- 1.设计跨度大，从 724 ～ 641 ～ 606 ～ 554

- 2.保证主要内容在554内

- 3.问清楚需求方设计的页面的出现是否会直接进入，还是从其他地方跳转进入

## 7.一些适配案例

### 带货节--使用底部颜色过渡到背景色

![题图](/blog/images/blog/2018_06_13/WechatIMG67.jpeg)

![题图](/blog/images/blog/2018_06_13/WechatIMG185.png)

### 种草TV--主要内容居中，上下留空

![题图](/blog/images/blog/2018_06_13/WechatIMG64.jpeg)

![题图](/blog/images/blog/2018_06_13/WechatIMG186.png)





