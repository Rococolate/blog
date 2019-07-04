@@@@@@@@@@
layout: default
title: 碰撞检测的向量实现
@@@@@@@@@@

# {{ page.title }}

![rect_circle](/blog/images/blog/aabb/1.jpg)

{{ page.date | date_to_string }}

Author:wuguanxi

***

*注：1、本文只讨论2d图形碰撞检测。2、本文讨论圆形与圆形，矩形与矩形、圆形与矩形碰撞检测的向量实现*

## 前言

2D游戏中，通常使用矩形、圆形等来代替复杂图形的相交检测。因为这两种形状的碰撞检测速度是最快的。其中矩形包围盒又可以分为轴对齐包围盒（AABB, Axis Aligned Bounding Box）与转向包围盒（OBB, Oriented Bounding Box）。AABB与OBB的区别在于，AABB中的矩形的其中一条边和坐标轴平行。OBB的计算复杂度要高于AABB，所以游戏中会尽量只用AABB。
![rect_circle](/blog/images/blog/aabb/1.jpg)

## 向量

向量作为一种数学工具，在碰撞检测中发挥很大作用，所以先来复习一下向量。

### 向量的代数表示

代数表示指在指定了一个坐标系之后，用一个向量在该坐标系下的坐标来表示该向量，兼具了符号的抽象性和几何形象性，因而具有最高的实用性，被广泛采用于需要定量分析的情形。 对于自由向量，将向量的起点平移到坐标原点后，向量就可以用一个坐标系下的一个点来表示，该点的坐标值即向量的终点坐标。

```javascript
// 二维平面向量
class Vector2d{
  constructor(vx=1,vy=1){
    this.vx = vx;
    this.vy = vy;
  }
}
const vecA = new Vector2d(2,3);
const vecB = new Vector2d(3,1);
```
![act1](/blog/images/blog/aabb/act1.jpg)

### 向量运算

加法：向量的加法满足平行四边形法则和三角形法则。具体的，两向量相加还是一个向量，分别是x与y两个分量的相加。

![act2](/blog/images/blog/aabb/act2.png)

```javascript
// 向量的加法运算
static add(vec,vec2){
  const vx = vec.vx + vec2.vx;
  const vy = vec.vy + vec2.vy;
  return new Vector2d(vx,vy);
}
```

减法：两个向量a和b的相减得到的向量可以表示为a和b的起点重合后，从b的终点指向a的终点的向量：

![act3](/blog/images/blog/aabb/act3.png)

```javascript
// 向量的减法运算
static sub(vec,vec2){
  const vx = vec.vx - vec2.vx;
  const vy = vec.vy - vec2.vy;
  return new Vector2d(vx,vy);
}
```

大小：向量的大小，是其各个分量的平方和开方。

```javascript
// 获取向量长度
length(){
  return Math.sqrt(this.vx * this.vx + this.vy * this.vy);
}
```

点积：从代数角度看，先对两个数字序列中的每组对应元素求积，再对所有积求和，结果即为点积。

```javascript
// 向量的数量积
static dot(vec,vec2){
  return vec.vx * vec2.vx + vec.vy * vec2.vy;
}
```

旋转：向量的旋转可以用旋转矩阵求解

![act4](/blog/images/blog/aabb/act4.svg)

![act5](/blog/images/blog/aabb/act5.svg)

![act6](/blog/images/blog/aabb/act6.svg)

```javascript
//向量的旋转 
static rotate(vec,angle){
  const cosVal = Math.cos(angle);
  const sinVal = Math.sin(angle);
  const vx = vec.vx * cosVal - vec.vy * sinVal;
  const vy = vec.vx * sinVal + vec.vy * cosVal;
  return new Vector2d(vx,vy);
}
```

## 圆

圆形比较简单，只要确认圆心x,y和半径r就行了,然后推导出圆心向量。

```javascript
class Circle{
  // x,y是圆的圆心 r是半径
  constructor(x=0,y=0,r=1){
    this.x = x;
    this.y = y;
    this.r = r;
    this.init();
  }
  init(){
    const {x,y} = this;
    this.P = () => new Vector2d(x,y); // 圆心向量
  }
}
```

## 矩形

矩形就较为复杂，定义一个矩形需要中心坐标的x,y、两边长w和h，还有根据中心的旋转角度rotation

```javascript
export class Rect{
  // x,y是矩形中心的坐标 w是宽 h是高 rotation是角度单位deg
  constructor(x=0,y=0,w=1,h=1,rotation=0){
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.rotation = rotation;
    this.init();
  }
  init(){
    const {x,y,w,h,rotation} = this;
    ...
  }
}
```

## 两圆相交

两圆相交比较简单，只需判断两圆心之间的距离小于两圆的半径之和。

两圆心距离可以用圆心向量相减，然后求相减向量的长度。

![act7](/blog/images/blog/aabb/act7.jpg)

```javascript
circleCircleIntersect(circle1,circle2){
  const P1 = circle1.P();
  const P2 = circle2.P();
  const r1 = circle1.r;
  const r2 = circle2.r;
  const u = Vector2d.sub(P1,P2);
  return u.length() <= r1  + r2 ;
}
```

## 圆和矩形相交

涉及到矩形的相交问题都先要判断是否轴对称。

### 矩形轴对称

先看轴对称的情况，下面是来自知乎问题[怎样判断平面上一个矩形和一个圆形是否有重叠？](https://www.zhihu.com/question/24251545)「Milo Yip」的回答搬运：

设c为矩形中心，h为矩形半長，p为圆心，r为半径。

![act8](/blog/images/blog/aabb/act8.jpg)

方法是计算圆心与矩形的最短距离 u，若 u 的长度小于 r 则两者相交。

1. 首先利用绝对值把 p - c 转移到第一象限，下图显示不同象限的圆心也能映射至第一象限，这不影响相交测试的结果：

![act9](/blog/images/blog/aabb/act9.jpg)

2. 然后，把 v 减去 h，负数的分量设置为0，就得到圆心与矩形最短距离的矢量 u。下图展示了4种情况，红色的u是结果。

![act10](/blog/images/blog/aabb/act10.jpg)

3. 最后要比较 u 和 r 的长度，若距离少于 r，则两者相交。可以只求 u 的长度平方是否小于 r 的平方。


下面我用js实现一下：

其中矩形的四个顶点命名为A1，A2，A3，A4，矩形在第一象限的半長h等于CA3

```javascript
class Rect{
  // x,y是矩形中心的坐标 w是宽 h是高 rotation是角度单位deg
  constructor(x=0,y=0,w=1,h=1,rotation=0){
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.rotation = rotation;
    this.init();
  }
  init(){
    const {x,y,w,h,rotation} = this;
    this.C = () => new Vector2d(x,y); // 圆心向量
    this.A3 = () => new Vector2d(x+w/2,y+h/2); // 顶点A3向量
  }
}

rectCircleIntersect(rect,circle){
  const C = rect.C();
  const r = circle.r;
  const A3 = rect.A3();
  const P = circle.P();
  const h = Vector2d.sub(A3,C); // 矩形半长
  const v = new Vector2d(Math.abs(P.vx - C.vx),Math.abs(P.vy - C.vy));
  const u = new Vector2d(Math.max(v.vx - h.vx,0),Math.max(v.vy - h.vy,0));
  return u.lengthSquared() <= r * r;
}
```

### 矩形非是轴对称

这个问题其实也很好解决，将矩形中心视为旋转中心，将矩形和圆形一起反向旋转将矩形转为轴对称，然后就可以套用上面的解法。

![act11](/blog/images/blog/aabb/act11.jpg)

矩形中心到圆心向量为是CP

反向旋转θ度得向量CP'

然后根据向量得三角形定律得OP' = OC + CP'

后面就代入矩形是轴对称的公式进行计算

```javascript
class Rect{
  // x,y是矩形中心的坐标 w是宽 h是高 rotation是角度单位deg
  constructor(x=0,y=0,w=1,h=1,rotation=0){
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.rotation = rotation;
    this.init();
  }
  init(){
    const {x,y,w,h,rotation} = this;
    this.C = () => new Vector2d(x,y); // 圆心向量
    this.A3 = () => new Vector2d(x+w/2,y+h/2); // 顶点A3向量
    this._rotation = () => rotation / 180 * Math.PI; // 角度单位转换
  }
}

p(rect,circle){
  const rotation = rect.rotation;
  const C = rect.C();
  let P;
  if (rotation % 360 === 0) {
    P = circle.P(); // 轴对称直接输出P
  } else {
    P = Vector2d.add(C,Vector2d.rotate(Vector2d.sub(circle.P(),C),rect._rotation()*-1)); // 非轴对称，计算P‘
  }
  return P;
}

rectCircleIntersect(rect,circle){
  const rotation = rect.rotation;
  const C = rect.C();
  const r = circle.r;
  const A3 = rect.A3();
  const P = p(rect,circle);
  const h = Vector2d.sub(A3,C);
  const v = new Vector2d(Math.abs(P.vx - C.vx),Math.abs(P.vy - C.vy));
  const u = new Vector2d(Math.max(v.vx - h.vx,0),Math.max(v.vy - h.vy,0));
  return u.lengthSquared() <= r * r;
}
```

点击[=====> 这里 <=====](/blog/gom/test1.html)查看Demo1

## 两矩形相交

### 两矩形都轴对称AABB

想象一下两个矩形A和B，B贴着A的边走了一圈，B的矩形中心的轨迹是一个新的矩形，这样就简化成新矩形与B中心这一点的相交问题，又因为点可以看成是半径为0的圆，所以问题又转换为圆形和矩形相交。

![act12](/blog/images/blog/aabb/act12.jpg)

```javascript
class Rect{
  // x,y是矩形中心的坐标 w是宽 h是高 rotation是角度单位deg
  constructor(x=0,y=0,w=1,h=1,rotation=0){
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.rotation = rotation;
    this.init();
  }
  init(){
    const {x,y,w,h,rotation} = this;
    this.C = () => new Vector2d(x,y); // 圆心向量
    this.A3 = () => new Vector2d(x+w/2,y+h/2); // 顶点A3向量
    this._rotation = () => rotation / 180 * Math.PI; // 角度单位转换
  }
}

AABBrectRectIntersect(rect1,rect2){
  const P = rect2.C();
  const w2 = rect2.w; 
  const h2 = rect2.h; 
  const {w,h,x,y} = rect1;
  const C = rect1.C();
  const A3 = new Vector2d(x+w/2+w2/2,y+h/2+h2/2); // 新矩形的半长
  const H = Vector2d.sub(A3,C);
  const v = new Vector2d(Math.abs(P.vx - C.vx),Math.abs(P.vy - C.vy));
  const u = new Vector2d(Math.max(v.vx - H.vx,0),Math.max(v.vy - H.vy,0));
  return u.lengthSquared() === 0; // 点可以看成是半径为0的圆
} 
```

### 两矩形相交非轴对称OBB

两个矩形的OBB检测使用分离轴定理（Separating Axis Theorem）

分离轴定理：通过判断任意两个矩形 在任意角度下的投影是否均存在重叠，来判断是否发生碰撞。若在某一角度光源下，两物体的投影存在间隙，则为不碰撞，否则为发生碰撞。

因为矩形的对边平行，所以只要判断四条对称轴上的投影即可。

![act13](/blog/images/blog/aabb/act13.jpg)

如何投影？这里补充一下向量点积的几何意义。

![act15](/blog/images/blog/aabb/act15.gif)

在欧几里得空间中，点积可以直观地定义为 A·B = |A||B|cosθ ,其中|A|cosθ是A到B的投影，如果B是单位向量，那么A·B就是A到单位向量B的投影

回到矩形，将矩形4个顶点都投影到对称轴上，我们分别将其点乘即可。

![act14](/blog/images/blog/aabb/act14.jpg)


```javascript
class Rect{
  // x,y是矩形中心的坐标 w是宽 h是高 rotation是角度单位deg
  constructor(x=0,y=0,w=1,h=1,rotation=0){
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.rotation = rotation;
    this.init();
  }
  init(){
    const {x,y,w,h,rotation} = this;
    this.C = () => new Vector2d(x,y);
    this._A1 = () => new Vector2d(x-w/2,y-h/2);  // 4角顶点
    this._A2 = () => new Vector2d(x+w/2,y-h/2);
    this._A3 = () => new Vector2d(x+w/2,y+h/2);
    this._A4 = () => new Vector2d(x-w/2,y+h/2);
    this._axisX = () => new Vector2d(1,0);  // 未旋转时的对称轴X
    this._axisY = () => new Vector2d(0,1);  // 未旋转时的对称轴Y
    this._CA1 = () => Vector2d.sub(this._A1(),this.C());
    this._CA2 = () => Vector2d.sub(this._A2(),this.C());
    this._CA3 = () => Vector2d.sub(this._A3(),this.C());
    this._CA4 = () => Vector2d.sub(this._A4(),this.C());
    this._rotation = () => rotation / 180 * Math.PI;
    this.A1 = rotation % 360 === 0 ? () => this._A1() : () => Vector2d.add(this.C(),Vector2d.rotate(this._CA1(),this._rotation()));  // 计算上旋转后4角顶点
    this.A2 = rotation % 360 === 0 ? () => this._A2() : () => Vector2d.add(this.C(),Vector2d.rotate(this._CA2(),this._rotation()));
    this.A3 = rotation % 360 === 0 ? () => this._A3() : () => Vector2d.add(this.C(),Vector2d.rotate(this._CA3(),this._rotation()));
    this.A4 = rotation % 360 === 0 ? () => this._A4() : () => Vector2d.add(this.C(),Vector2d.rotate(this._CA4(),this._rotation()));
    this.axisX = rotation % 360 === 0 ? () => this._axisX() : () => Vector2d.rotate(this._axisX(),this._rotation());  // 计算上旋转后的对称轴X
    this.axisY = rotation % 360 === 0 ? () => this._axisY() : () => Vector2d.rotate(this._axisY(),this._rotation());  // 计算上旋转后的对称轴Y
    this._vertexs = () => [this._A1(),this._A2(),this._A3(),this._A4()]; 
    this.vertexs = () => [this.A1(),this.A2(),this.A3(),this.A4()];  // 4角顶点数组
  }
}

OBBrectRectIntersect(rect1,rect2){
  const rect1AxisX = rect1.axisX();
  const rect1AxisY = rect1.axisY();
  const rect2AxisX = rect2.axisX();
  const rect2AxisY = rect2.axisY();
  if (!cross(rect1,rect2,rect1AxisX)) return false;  // 一旦有不相交的轴就可以return false
  if (!cross(rect1,rect2,rect1AxisY)) return false;
  if (!cross(rect1,rect2,rect2AxisX)) return false;
  if (!cross(rect1,rect2,rect2AxisY)) return false;
  return true;  // 4轴投影都相交 return true
}
cross(rect1,rect2,axis){
  const vertexs1ScalarProjection = rect1.vertexs().map(vex => Vector2d.dot(vex,axis)).sort((a,b)=>a-b); // 矩形1的4个顶点投影并排序
  const vertexs2ScalarProjection = rect2.vertexs().map(vex => Vector2d.dot(vex,axis)).sort((a,b)=>a-b); // 矩形2的4个顶点投影并排序
  const rect1Min = vertexs1ScalarProjection[0]; // 矩形1最小长度
  const rect1Max = vertexs1ScalarProjection[vertexs1ScalarProjection.length - 1]; // 矩形1最大长度
  const rect2Min = vertexs2ScalarProjection[0]; // 矩形2最小长度
  const rect2Max = vertexs2ScalarProjection[vertexs1ScalarProjection.length - 1]; // 矩形2最大长度
  return rect1Max >= rect2Min && rect2Max >= rect1Min;  // 相交判断 
}
```

最后放上一个相交的应用[Demo](/blog/gom/test2.html),Demo里的形状都可以拖拽，当碰到其他形状时会变透明。

### 参考文章

[第十五章：碰撞检测](http://blog.jmecn.net/chapter-15-collision-detection/)

[方块的战争：浅谈格斗游戏的精髓](http://daily.zhihu.com/story/4761397)

[怎样判断平面上一个矩形和一个圆形是否有重叠？](https://www.zhihu.com/question/24251545)

[“等一下，我碰！”——常见的2D碰撞检测](https://aotu.io/notes/2017/02/16/2d-collision-detection/index.html)

[码农干货系列【1】--方向包围盒(OBB)碰撞检测](https://www.cnblogs.com/iamzhanglei/archive/2012/06/07/2539751.html)

[Rotation matrix](https://en.wikipedia.org/wiki/Rotation_matrix)

[数量积](https://zh.wikipedia.org/wiki/%E7%82%B9%E7%A7%AF)

[向量](https://zh.wikipedia.org/wiki/%E5%90%91%E9%87%8F)

