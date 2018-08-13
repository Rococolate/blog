@@@@@@@@@@
layout: default
title: asyncReduce
@@@@@@@@@@

# {{ page.title }}

![我的手绘不可能这么萌](/blog/images/blog/abfbc34c30be57c03ea127a1c5887340.jpg)
[题图出处](https://www.duitang.com/blog/?id=605367212)


{{ page.date | date_to_string }}

Author:wuguanxi

***

## 0 问题

最近研究自动化截取完整的一个长条网站，发现chrome的Api Capture full size screenshot 在截取高度比较高的网页时会失效（推测是内存限制了）。然后想到一个曲线救国的方法：单独截一瓶，然后用JS将页面滚动到下一屏再截取，最后再将图片合并。
这种累加的想法很自然就会想去用reduce，但是截屏是一个异步的操作reduce里能用异步吗？答案当然可以。


## 1 举个栗子🌰


数组[1,2,3,4,5],我们需要依此在命令行依次打印前n项的和，每次相隔1000ms，用reduce实现的话，我们先考虑非异步的情况：


```js
const l = [1,2,3,4,5];

l.reduce((pre,cur)=>{
  const totle = pre + cur;
  console.log(totle);
  return totle;
},0);
  
```

输出：

```js
1
3
6
10
15
```

异步延迟1000ms：
这里我们需要借助Promise

```js
const l = [1,2,3,4,5]

l.reduce((pre,cur)=>{
  return pre.then((_pre)=>{
    return new Promise(resolve=>{
      const totle = _pre + cur;
      console.log(totle);
      setTimeout(() => {
        return resolve(totle);
      }, 1000);
    });
  });
},Promise.resolve(0));
  
```


输出：

```js
1 
(间隔1000ms)
3
(间隔1000ms)
6
(间隔1000ms)
10
(间隔1000ms)
15
```

成功是成功了但是总觉得很丑是不是😂

## 2 asyncReduce

我们可以尝试对Array封装一个asyncReduce函数，参数和reduce相同，把异步处理的细节都隐藏。

```js
;(()=>{
  // 定义 asyncReduce
  if (Array.prototype.asyncReduce === undefined) {
    Array.prototype.asyncReduce = function (fn,init) {
      return this.reduce((pre,cur)=>{
        return pre.then((_pre)=>{
          return fn(_pre,cur)
        })
      },Promise.resolve(init))
    }
  }
})()

const l = [1,2,3,4,5]

l.asyncReduce((pre,cur)=>{
  return new Promise(resolve=>{
    const totle = pre + cur;
    console.log(totle);
    setTimeout(() => {
      return resolve(totle);
    }, 1000);
  });
},0);
```


输出：

```js
1 
(间隔1000ms)
3
(间隔1000ms)
6
(间隔1000ms)
10
(间隔1000ms)
15
```

注意asyncReduce的第一个函数参数要返回一个Promise对象，才能链式下去。

## 3 配合 async/await 语法食用更佳

```js
;(()=>{
  if (Array.prototype.asyncReduce === undefined) {
    Array.prototype.asyncReduce = function (fn,init) {
      return this.reduce((pre,cur)=>{
        return pre.then((_pre)=>{
          return fn(_pre,cur)
        })
      },Promise.resolve(init))
    }
  }
})()

// async/await 的 setTimeout
async function sleep(time){
  await new Promise((resolve) => {
    setTimeout(resolve, time);
  });
}

const l = [1,2,3,4,5]

// asyncReduce 配合 async函数
l.asyncReduce(async (pre,cur)=>{
    const totle = pre + cur;
    console.log(totle);
    await sleep(1000);
    return totle；
},0);
```


输出：

```js
1 
(间隔1000ms)
3
(间隔1000ms)
6
(间隔1000ms)
10
(间隔1000ms)
15
```

验证成功。

配合 async/await 使代码看上去更加美观了🌹