@@@@@@@@@@
layout: default
title: 关灯游戏 Lights Out (game) 首行枚举破解法  React实现GUI
@@@@@@@@@@

# {{ page.title }}

![docker](/blog/images/blog/abfbc34c30be57c03ea127a1c5887340.jpg)

{{ page.date | date_to_string }}

Author:wuguanxi

***

## 0.light out 
**关灯游戏light out (game)[wikipedia](https://en.wikipedia.org/wiki/Lights_Out_(game))**。
关灯游戏是Tiger Electronics在1995年发行的一款电子游戏，Parker Brothers在上世纪70年代发布过一款规则与此类似的3×3的游戏， Vulcan Electronics在1983年也生产过与此类似的游戏，名称为XL-25。

游戏规则非常简单：

A. 在一个N * N 的网格里，每一小格只有两种状态（灯亮(light on) 或 灯灭(light off）)

B. 点击任意一个格子，其相接的四个方向的格子（上下左右）和 其自身 都会切换状态（on <=> off）

C. 目标是所有格子都灯灭


![light out](https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/LightsOutIllustration.svg/1460px-LightsOutIllustration.svg.png)

## 1.体验
点击体验：（默认5阶，可随意选择初始开灯数字，点击sure按钮开始游戏）

# [=> DEMO <=](/blog/light_out)

## 2.首行枚举破解法
破解方法有很多，这里我用的是首行枚举破解法

### 2.1 先看一些规律

规律1:每个格子点击次数 > 1 都是没有意义的（ on => off => on => off => on ... ）

规律2:从第二行开始，都只能选择点击对应上一行灯开的格子 （只有这样才能关上方的灯）

根据这两条规律，得出只要枚举出第一行点击的格子，对应下面的操作都是确定了的，操作到最后，如果灯全灭就能得出结果了

思路清晰，代码也很简单，下面全贴出来

[=> Github <=](https://github.com/Rococolate/checkio/blob/master/Wall_Keeper/index.js)

```js

'use strict';

function wallKeeper(on_panels,level=5){
  // 输入转换成二维数组
  const matrix = translate(on_panels,level)
  // 枚举首行 
  const firstRow = firstRowFactory(matrix[0].length);
  const answer = [];
  // 搜索所有解
  firstRow.forEach(item => {
    let a = check(item,matrix);
    if ( a.count === 0 ) answer.push(a.list);
  });
  // console.log(JSON.stringify(answer));
  return answer;
}

function translate(on_panels,level){
  const matrix = [];
  for(var i = 0 ; i < level ; i ++ ){
    matrix[i] = []
    for(var j = 0 ; j < level ; j ++ ){
      matrix[i][j] = 0;
    }
  }
  on_panels.forEach(item => {
    let i = ~~ ((item - 1) / level);
    let j = (item - 1) % level;
    matrix[i][j] = 1;
  });

  return matrix;
}

function firstRowFactory(level){
  const firstRow = [
    [...(Array(level).join(',').split(',').map(()=>0))]
  ];

  let max = level;
  function loop() {
    for(let i = 0 ; i < max ; i ++ ){
      let row = [];
      for(let j = 0 ; j < level ; j ++ ){
        let num = 0;
        if ( j >= i && j <= (level - max + i) ) num = 1;
        row.push(num);
      }
      firstRow.push(row);
    } 
    max --;
    if ( max === 0 ) return;
    loop();
  }
  loop();
  return firstRow;
}

function check(firstRow,input){
  const array = input.map(ele => ele.map(item => item));
  const l = [];
  firstRow.forEach((ele,index) => {
    if (ele === 1) {click(array,0,index) ; l.push(index + 1);}
  });
  
  for(let i = 0 ; i < array.length - 1 ; i ++){
    array[i].forEach((ele,index)=>{
      if (ele === 1) {click(array,i+1,index) ; l.push(array[i].length * (i + 1) + index + 1);}
    });
  }

  return {
    count:counter(array),
    list:[...l]
  }
}

function click (array,i,j) {
  if (array[i] && typeof(array[i][j]) === 'number' ) array[i][j] = Number(!array[i][j]);
  if (array[i] && typeof(array[i][j - 1]) === 'number' ) array[i][j - 1] = Number(!array[i][j - 1]);
  if (array[i] && typeof(array[i][j + 1]) === 'number' ) array[i][j + 1] = Number(!array[i][j + 1]);
  if (array[i - 1] && typeof(array[i - 1][j]) === 'number' ) array[i - 1][j] = Number(!array[i - 1][j]);
  if (array[i + 1] && typeof(array[i + 1][j]) === 'number' ) array[i + 1][j] = Number(!array[i + 1][j]);
}

function counter(array){
  var count = 0;
  for(var i = 0 ; i < array.length ; i ++ ){
    for(var j = 0 ; j < array[i].length ; j ++ ){
      count += array[i][j];
    }
  }
  return count;
}
export default wallKeeper;

```

### React实现GUI的完整Demo
[=> Github <=](https://github.com/Rococolate/checkio/tree/master/Wall_Keeper)

#### 参考文章

[ 关灯游戏 Lights out (二)(首行枚举+位运算，搜索全部解)](http://blog.csdn.net/mhl_1208980380/article/details/54618002)



