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

## 0.0 计算机动画原理

动画是指由许多帧静止的画面，以一定的速度（如每秒16张）连续播放时，肉眼因 `视觉暂留` 产生错觉。
要达成最基本的视觉暂留效果至少需要 10帧/秒 ，普通电影是 24帧/秒 ， 普通显示器刷新频率是 60帧/秒。

![Animexample](/blog/images/blog/2018_12_24/Animexample.gif)

![Animexample2](/blog/images/blog/2018_12_24/Animexample2.gif)

## 1 CSS 能做多复杂的动画？

### 1.1 动画展示

京喜工厂小人走路动画（4倍速播放）

![京喜工厂小人走路动画（4倍速播放）](/blog/images/blog/animation/ani_show_1.gif)

### 1.2 动画描述与分析

整个动画大体上就是小人按照从右侧进入工厂，绕着工厂内一圈的方式最后从右侧出去;

![京喜工厂小人路径](/blog/images/blog/animation/path.jpeg)

走路过程中会有走路的动作；

![走路的动作](/blog/images/blog/animation/anim-walk.gif)

注意从右走到左时吗，小人朝向右；从左走到右时，小人朝向左。

![朝向](/blog/images/blog/animation/turn.jpg)

路径过程中会有几个驻留点，每个点驻留一小段时间，做工作中的动作。

![工作中的动作](/blog/images/blog/animation/anim-work.gif)

## 2 为什么要用 CSS 做复杂动画？（竞品对比 SVG 、Javascript 、CSS）

先对比一下

### 2.1 SVG

SVG 原生支持 SMIL(Synchronized Multimedia Integration Language), SMIL 允许你：
- 1. 变动一个元素的数字属性（x、y……）`<animate>`
- 2. 变动变形属性（translation或rotation）`<animateTransform>`
- 3. 变动颜色属性 `<animate>` || `<animateColor>(已废弃)`
- 4. 物件方向与运动路径方向同步(路径动画) `<animateMotion>`

其实都算是常规的动画能力，但是配合一些 SVG 专有的特性会产生一些奇妙和效果，例如 描边动画 就是利用 `stroke-dasharray` 和 `stroke-dashoffset` 实现的。另外，同为路径动画 SMIL 的 `<animateMotion>` 就比 CSS 的 `offset-path` 兼容性好很多。

微信小程序：微信小程序不支持 SVG 及 SMIL 。

### 2.2 Javascript

理论上， Javascript 能做任何动画。
一般来说 Javascript 动画可以分为 `操纵 DOM 属性的动画` 和 `操纵 canvas api 的动画`，这两种都的原理都是通过 `window.requestAnimationFrame()` 或者 `window.setTimeout()` 这类时间控制函数实现每 16.7ms 显示一帧画面，从而达成 60帧/秒 的动画。
另外，还有 `Web Animations API`，将浏览器动画引擎向开发者打开，并由JavaScript进行操作。它是未来对网络上动画化的支持最有效的方式之一，它使浏览器可以进行自己的内部优化。但是兼容性较差。

微信小程序：微信小程序实现了自己的一套 `WX Ainmation API`， 不兼容 web 标准。

### 2.3 CSS

CSS 动画都是声明式，使用 `@keyframe` 创建关键帧，浏览器就会自动计算出每 16.7ms 内的画面变化，这些计算不是用 JS ，从而避免 GC 。CSS 动画还有一个好处是可以利用 `translateZ` 开启 GPU 硬件加速，而且在 2020 年的当下，CSS 动画的兼容性可以说是非常好了。

有点遗憾的是 CSS 在路径动画 `offset-path` 上的兼容性还是比较差。

微信小程序：微信小程序支持 CSS 动画。

### 选择

考虑到项目主要运行在 H5 和 微信小程序平台上，综合兼容性和自己的熟练度，最后还是选择用 CSS 动画。

## 3 CSS 动画的分类

按照 `animation-timing-function`（时间函数） 的不同，将 CSS 动画分成 「线性变化动画」 和「非线性变化动」

「线性变化动画」 是指 `animation-timing-function = linear(直线) || cubic-bezier-timing-function(贝塞尔曲线)` 

「非线性变化动画」 是指 `animation-timing-function = step-timing-function(分段)`

### 3.1 线性变化动画

推荐一个贝塞尔曲线的可视化网址[✿ cubic-bezier.com](https://cubic-bezier.com/)

### 3.2 非线性变化动画

非线性变化动画，通常用来做 「帧动画」。通常是设计师输出一组序列帧图片作背景图，动画时控制 `background-position` 属性，并通过 `step-timing-function` 实现跃迁效果。

什么意思？我来举个小人走路的例子：

![double](/blog/images/blog/animation/double.jpeg)

其实就两张图，分别是抬左脚和抬右脚（120 X 160），用工具将它们合成在一张图里（120 X 320）。

![spirit](/blog/images/blog/animation/spirit.png)

```html
<div class="anim linear"></div>
<div class="anim steps"></div>
```

```css
.anim{
  width:120px;
  height:160px;
  background-image:url(./spirit.png); /* 合成图 */
  background-position:0 0;
  background-size:100% auto;
}

.liear{
  animation:anim-walk 0.4s linear 0s infinite;
}

.steps{
  animation:anim-walk 0.4s steps(1) 0s infinite;
}

@keyframes anim-walk{
  0% {background-position:0px 0px;}
  50% {background-position:0px  60px;}
  100% {background-position:0px 0px;}
}
```

效果：

| linear: | steps: |
|  ----  |  ---- |
| ![anim-linear](/blog/images/blog/animation/anim-linear.gif) | ![anim-steps](/blog/images/blog/animation/anim-walk.gif) |

在 CSS 代码里，我们定义了一个 叫 `anim-walk` 的一组关键帧，关键帧 0% 时 `background-position-y` 是 0， 50% 时 为  -160 ，100% 时又回到 0。
从效果图里可以看出，不同的 `animation-timing-function` 设置对动画效果的影响。

`linear` 因为是线性变化，所以 0 ～  -160 ～ 0 之间的数据计算出来就是 0 ～ -40 ～ -80 ～  20 ～ -160 ～ -120 ～ -80 ～ -40 ～ 0

`steps` 因为是非线性变化， 所以 0 ～ -160 ～ 0 之间的数据计算出来就是 0 ～ 0 ～ 0 ～ 0 ～ -160 ～ -160 ～ -160 ～ -160 ～ 0

### 3.3 路径动画( CSS 怎么做曲线路径动画？)

在京喜工厂项目了，小人是要在工厂的几个点内移动

#### 3.3.1 CSS offset-path

最简单的方法是用 `offset-path`，用法在张鑫旭的这篇文章写得非常详细了，[offset-path-css-animation](https://www.zhangxinxu.com/wordpress/2017/03/offset-path-css-animation/)。

缺点是兼容性较差，这里就不详细说明了。

#### 3.3.2 利用时间函数为贝塞尔曲线的副作用

在京喜工厂项目里小人移动的路径可以从下面这个设定图，标注的圆点都是要停留工作的。

![path-all](/blog/images/blog/animation/path-all.jpg)

可以确定的是，这些标注的圆点位置在 CSS 动画里肯定是一个关键帧，而圆点与圆点之间的直线路径还好办，曲线呢？

这里我用到「CSS分层动画」和「时间函数为贝塞尔曲线的副作用」。
简单来说，就是通过使用两个或多个元素实现动画效果（分层），我们可以更加细粒度地控制某个元素的路径，沿着 X 轴运动使用一种 timing-function ，沿着 Y 轴运动使用另一种 timing-function 。

假设有 `A[0,0]、B[100,100]` 两点。从 A 移动 到 B ，我们可以分拆成 X轴 的变化量，和 Y轴 的变化量。直线移动时，就是 X轴 与 Y轴 的累计变化量是一样的。

```html
<div class="anim-x">
  <div class="anim-y">
  </div>
</div>
```
```css
.anim-x{
  animation: anim-x 1000ms 0s linear infinite;
}
.anim-y{
  animation: anim-y 1000ms 0s linear infinite;
}
@keyframes anim-x {
  0%{ transform:translate3d(0 , 0 , 0) }
  100%{ transform:translate3d(100px , 0 , 0) }
}
@keyframes anim-y {
  0%{ transform:translate3d(0 , 0 , 0) }
  100%{ transform:translate3d(0 , 100px , 0) }
}
```

![exp2](/blog/images/blog/animation/exp2.gif)

反过来，如果 X轴 与 Y轴 的累计变化量不一样，就会走出曲线。

```html
<div class="anim-x">
  <div class="anim-y">
  </div>
</div>
```
```css
.anim-x{
  animation: anim-x 1000ms 0s ease-in infinite;
}
.anim-y{
  animation: anim-y 1000ms 0s ease-out infinite;
}
@keyframes anim-x {
  0%{ transform:translate3d(0 , 0 , 0) }
  100%{ transform:translate3d(100px , 0 , 0) }
}
@keyframes anim-y {
  0%{ transform:translate3d(0 , 0 , 0) }
  100%{ transform:translate3d(0 , 100px , 0) }
}
```

![exp3](/blog/images/blog/animation/exp3.gif)

这篇文章把原理写得很详细，[CSS分层动画可以让元素沿弧形路径运动](https://jinlong.github.io/2016/01/14/moving-along-a-curved-path-in-css-with-layered-animation/)

### 3.4 组合起来

路径动画的问题解决了，小人走路和工作的帧动画也准备好，下面还有两个小问题。

- 1. 小人走路和工作的帧动画不能同时出现
- 2. 路径动画从左走到右时小人的朝向，应该与从右走到左时相反

这里的解决方法也是「CSS分层动画」和 「非线性动画」，大概的代码可以这样写：

```html
<div class="anim-turn">
  <div class="anim-walk"></div>
  <div class="anim-work"></div>
</div>
```
```css
.anim-turn{
  animation: anim-turn ${allTime}ms 0s steps(1) infinite;
}
.anim-walk{
  animation: anim-walk-opacity ${allTime}ms 0s steps(1) infinite,anim-walk 0.4s steps(1) 0s infinite;
}
.anim-work{
  animation: anim-work-opacity ${allTime}ms 0s steps(1) infinite,anim-working 0.4s steps(1) 0s infinite;
}

@keyframes anim-turn {
  0% {transform:scale(1,1)} // 正向
  50% {transform:scale(-1,1)} // 反向
  100% {transform:scale(1,1)} // 正向
}

@keyframes anim-walk-opacity {
  0% {opacity:1} 
  50% {opacity:0} 
  100% {opacity:1} 
}

@keyframes anim-work-opacity {
  0% {opacity:0} 
  50% {opacity:1} 
  100% {opacity:0} 
}
```

再加上 X轴 和 Y轴 的分层 CSS：

```html
<div class="anim-x">
  <div class="anim-y">
    <div class="anim-turn">
      <div class="anim-walk"></div>
      <div class="anim-work"></div>
    </div>
  </div>
</div>
```
```css
.anim-x{
  animation: anim-x ${allTime}ms 0s linear infinite;
}
.anim-y{
  animation: anim-y ${allTime}ms 0s linear infinite;
}
.anim-turn{
  animation: anim-turn ${allTime}ms 0s steps(1) infinite;
}
.anim-walk{
  animation: anim-walk-opacity ${allTime}ms 0s steps(1) infinite,anim-walk 0.4s steps(1) 0s infinite;
}
.anim-work{
  animation: anim-work-opacity ${allTime}ms 0s steps(1) infinite,anim-working 0.4s steps(1) 0s infinite;
}

@keyframes ...
```

### 3.5 写个可视化工具，提升效率

上面只是简单的写了这个动画的简单架构，而具体的动画数据 `@keyframes` 才是重点，而且这些关键帧肯定不是手写。

> 工欲善其事，必先利其器。

所以我们来用 Vue 打造一个可视化工具[doge]。

===== 大概用一整天时间写工具 =====

大概长这样子：

基本操作是「添加关键帧」、「跳转每个关键帧的属性」、「生成测试动画」、「输出动画CSS」

具体实现就不细说了，这里说一些细节。

- 1. 如何画出动画路径？
- 2. 动画时间怎么算？
- 3. 一些优缺点


## 4 其他 

### 4.1 加个 -mask 实现伪 3D 效果

### 4.2 解决层级不正确的问题（translateZ）

### 4.3 解决帧动画抖动问题

### 4.4 更好用的工具
