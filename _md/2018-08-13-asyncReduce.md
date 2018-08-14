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

let timer = 0;
console.time(timer);
const l = [1,2,3,4,5];

l.reduce((pre,cur)=>{
  console.timeEnd(timer++); 
  console.time(timer); // 打点计时
  const totle = pre + cur;
  console.log(totle);
  return totle;
},0);

console.timeEnd(timer++);
```

输出：

```js
0: 0.051025390625ms
1
1: 0.269775390625ms
3
2: 0.132080078125ms
6
3: 0.122802734375ms
10
4: 0.133056640625ms
15
5: 0.199951171875ms
```

异步延迟1000ms：
这里我们需要借助Promise

```js

let timer = 0;
console.time(timer);
const l = [1,2,3,4,5]

l.reduce((pre,cur)=>{
  return pre.then((_pre)=>{
    return new Promise(resolve=>{
      console.timeEnd(timer++);
      console.time(timer);
      const totle = _pre + cur;
      console.log(totle);
      setTimeout(() => {
        return resolve(totle);
      }, 1000);
    });
  });
},Promise.resolve(0))
.then(value => console.log(value))
.catch(err=> console.log(err)) // 打印错误
.finally(()=> console.timeEnd(timer++));
```


输出：

```js
0: 0.39208984375ms
1
Promise {<pending>}
1: 1000.736083984375ms
3
2: 1000.81201171875ms
6
3: 1005.7060546875ms
10
4: 1003.97021484375ms
15
15
5: 1001.40283203125ms
```

成功是成功了但是总觉得很丑是不是😂

## 2 asyncReduce

我们可以尝试对Array封装一个asyncReduce函数，参数和reduce相同，把异步处理的细节都隐藏。

```js
;(()=>{
  // 定义 asyncReduce
  if (Array.prototype.asyncReduce === undefined) {
    Array.prototype.asyncReduce = function (fn,init) {
      return this.reduce((pre,cur,index,array)=>{
        return pre.then((_pre)=>{
          return fn(_pre,cur,index,array);
        })
      },Promise.resolve(init));
    }
  }
})()

let timer = 0;
console.time(timer);
const l = [1,2,3,4,5];

l.asyncReduce((pre,cur)=>{
  return new Promise(resolve=>{
    console.timeEnd(timer++);
    console.time(timer);
    const totle = pre + cur;
    console.log(totle);
    setTimeout(() => {
      return resolve(totle);
    }, 1000);
  });
},0)
.then(value => console.log(value))
.catch(err=> console.log(err)) // 打印错误
.finally(()=> console.timeEnd(timer++));
```


输出：

```js

0: 0.249755859375ms
1
Promise {<pending>}
1: 1000.81103515625ms
3
2: 1001.095947265625ms
6
3: 1001.85693359375ms
10
4: 1000.755126953125ms
15
15
5: 1001.309814453125ms
```

注意asyncReduce的第一个函数参数要返回一个Promise对象，才能链式下去。

## 3 配合 async/await 语法食用更佳

```js
;(()=>{
  if (Array.prototype.asyncReduce === undefined) {
    Array.prototype.asyncReduce = function (fn,init) {
      return this.reduce((pre,cur,index,array)=>{
        return pre.then((_pre)=>{
          return fn(_pre,cur,index,array);
        })
      },Promise.resolve(init));
    }
  }
})()

// async/await 的 setTimeout
async function sleep(time){
  await new Promise((resolve) => {
    setTimeout(resolve, time);
  });
}

let timer = 0;
console.time(timer);
const l = [1,2,3,4,5];

// asyncReduce 配合 async函数
l.asyncReduce(async (pre,cur)=>{
  console.timeEnd(timer++);
  console.time(timer);
  const totle = pre + cur;
  console.log(totle);
  await sleep(1000);
  return totle;
},0)
.then(value => console.log(value))
.catch(err=> console.log(err)) // 打印错误
.finally(()=> console.timeEnd(timer++));
```


输出：

```js

0: 0.229248046875ms
1
Promise {<pending>}
1: 1002.343994140625ms
3
2: 1001.373046875ms
6
3: 1001.5048828125ms
10
4: 1001.1259765625ms
15
15
5: 1001.636962890625ms
```

验证成功。

配合 async/await 使代码看上去更加美观了🌹

## 4 错误处理


在错误处理上，我想的是一旦出现错误就忘外抛，处理一下asyncReduce函数
```js
  ;(()=>{
    if (Array.prototype.asyncReduce === undefined) {
      Array.prototype.asyncReduce = function (fn,init) {
        return this.reduce((pre,cur,index,array)=>{
          return pre.then(
            _pre => fn(_pre,cur,index,array),
            err => {throw err}  // 一旦出现错误就往外抛
          )
        },Promise.resolve(init));
      }
    }
  })()

  async function sleep(time){
    await new Promise((resolve) => {
      setTimeout(resolve, time);
    });
  }

  let timer = 0;
  console.time(timer);
  const l = [1,2,3,4,5];

  l.asyncReduce(async (pre,cur,index,array)=>{
    console.timeEnd(timer++);
    console.time(timer);
    const totle = pre + cur;
    console.log(totle);
    if (index >= 2) console.log(ww); // 模拟出错
    await sleep(1000);
    return totle; 
  },0)
  .then(value => console.log(value))
  .catch(err=> console.log(err)) // 打印错误
  .finally(()=> console.timeEnd(timer++));
```

输出：
```js
0: 0.257080078125ms
1
1: 1003.989990234375ms
3
2: 1002.5830078125ms
6
ReferenceError: ww is not defined
    at l.asyncReduce (<anonymous>:28:33)
    at pre.then._pre (<anonymous>:6:21)
3: 1.505126953125ms // finally打印出来的事件
```

可以看出,抛出错误后都是同步操作然后直接到finally()