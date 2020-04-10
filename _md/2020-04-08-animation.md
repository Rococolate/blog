@@@@@@@@@@
layout: default
title: 漫谈复杂CSS动画
@@@@@@@@@@

# {{ page.title }}

![pic](/blog/images/blog/animation/ani_show_3.gif)

{{ page.date | date_to_string }}

Author:wuguanxi

***

## 0 契机与背景

今年Q1参与了京喜工厂的前端开发，其中使用大量 CSS 动画，本文是其中对 CSS 动画使用的一些思考记录。

## 1 CSS 能做多复杂的动画？

### 1.1 动画展示

京喜工厂小人走路动画（4倍速播放）

![京喜工厂小人走路动画（4倍速播放）](/blog/images/blog/animation/ani_show_1.gif)

### 1.2 动画描述与分析

整个动画大体上就是小人按照从右侧进入工厂，绕着工厂内一圈的方式最后从右侧出去;

![京喜工厂小人路径](/blog/images/blog/animation/4.jpeg)

走路过程中会有走路的动作；

![走路的动作](/blog/images/blog/animation/ani_show_2.gif)

注意从右走到左时吗，小人朝向右；从左走到右时，小人朝向左。

![朝向](/blog/images/blog/animation/5.jpg)

路径过程中会有几个驻留点，每个点驻留一小段时间，做工作中的动作。

![工作中的动作](/blog/images/blog/animation/ani_show_3.gif)

## 2 为什么要用 CSS 做复杂动画？（竞品对比 SVG 、Javascript 、CSS）

先对比一下

### 2.1 SVG

SVG 原生支持 SMIL(Synchronized Multimedia Integration Language), SMIL允许你：
- 1. 变动一个元素的数字属性（x、y……）
- 2. 变动变形属性（translation或rotation）
- 3. 变动颜色属性
- 4. 物件方向与运动路径方向同步(路径动画)

其实都算是常规的动画能力，真正

### 2.2 Javascript

### 2.3 CSS

## 3 如何做一个复杂的 CSS 动画

### 3.1 拆分

小人走路的帧动画、小人工作中的帧动画、小人走路的路径动画

### 3.2 帧动画

<animation-timing-function> = <step-timing-function>

### 3.3 路径动画( CSS 怎么做曲线路径动画？)

#### 3.3.1 CSS offset-path

[offset-path-css-animation](https://www.zhangxinxu.com/wordpress/2017/03/offset-path-css-animation/)

#### 3.3.2 模拟的贝塞尔曲线

插播 啥是贝塞尔曲线？

[CSS 路径动画工具的诞生](https://cloud.tencent.com/developer/article/1005913)

#### 3.3.3 利用时间函数用贝塞尔曲线的副作用

animation-timing-function = cubic-bezier-timing-function

[CSS分层动画可以让元素沿弧形路径运动](https://jinlong.github.io/2016/01/14/moving-along-a-curved-path-in-css-with-layered-animation/)

### 3.4 组合起来

引入非线性动画的概念

### 3.5 写个可视化工具，提升效率

用 VUE 写一个专门的动画工具
属性：x、y、转向、工作时间

## 4 其他 

### 4.1 加个 mask 实现伪 3D 效果

### 4.2 解决层级不正确的问题（translateZ）

### 4.3 解决帧动画抖动问题

### 4.4 更好用的工具
