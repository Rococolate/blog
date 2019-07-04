@@@@@@@@@@
layout: default
title: UTF-16与emoji
@@@@@@@@@@

# {{ page.title }}

![emoji](/blog/images/blog/emoji.jpg)


{{ page.date | date_to_string }}

Author:wuguanxi

***

## 0 问题

先来看一段代码

```javascript
  // 逢3换行
  function wordBreak3(str) {
    return str.split("").reduce((pre,cur,index) => {
      const isBreak = (index % 3 === 0 && index !== 0) ? "\n" : "";
      return pre + isBreak + cur;
    },"");
  }
  wordBreak3("abcdef");
  /*···
  * "abc
  * def"
  */
  wordBreak3("123456");
  /*
  * "123
  * 456"
  */
  wordBreak3("一二三四五六");
  /*
  * "一二三
  * 四五六"
  */
```

简单的一段代码，逢3换行。试了几个例子都没有问题，然后我试着把我的微信名字复制进去看看...

```javascript
wordBreak3("💨💨禧🐳");
/*
* "💨�
* �禧�
* �"
*/
// WTF!?
```

WTF?

很明显，`wordBreak3`这段代码有bug，不能正确识别emoji。

## 1 背景知识Unicode与UTF-16与UCS-2

在解决问题的过程中我搜索了大量的网站，发现了以前不知道的大量JS字符串相关的知识，从unicode到UTF-16到UCS-2。其中就阮一峰老师的这篇博客[“Unicode与JavaScript详解”](http://www.ruanyifeng.com/blog/2014/12/unicode.html)讲得最彻底。

简单来说就是由于JavaScript只能处理UCS-2编码，造成所有字符在这门语言中都是2个字节，如果是4个字节的字符，会当作两个双字节的字符处理。JavaScript的字符函数都受到这一点的影响，无法返回正确结果。

以emoji💨为例，它的UTF-16编码是4个字节的0xD83D 0xDCA8。问题就来了，4个字节的编码不属于UCS-2，JavaScript不认识，只会把它看作单独的两个字符U+D83D和U+DCA8。所以`"💨".length === 2;`上面的`wordBreak3`函数没有正确处理，就把"💨"截开成两半。

## 2 解决方法

### ES6版本
大幅增强了Unicode支持，基本上解决了这个问题。

```javascript
  for  of 
  Array.from
  [...]
  都能正确识别
````

```javascript
function stringToArrayReal(str){
  return [...str];
}
```

### ES5版本

```javascript
function stringToArrayReal(str){
  var index = 0;
  var length = str.length;
  var output = [];
  var character;
  var characterNext;
  var charCode;
  var charNextCode;
  while (index < length){
    charCode = str.charCodeAt(index);
    charNextCode = str.charCodeAt(index + 1);
    character = str.charAt(index);
    characterNext = str.charAt(index + 1);
    if(charCode >= 0xD800 
    && charCode <= 0xDBFF 
    && charNextCode >= 0xDC00 
    && charNextCode <= 0xDFFF) {
      output.push(character + characterNext);
      index += 2;
    } else {
      output.push(character);
      index ++;
    }
  }
  return output;
}
```

有几个神奇的数字0xD800、0xDBFF、0xDC00、0xDFFF，是来自UTF-16的编码规范。WIKI里有详细解析[UTF-16](https://zh.wikipedia.org/wiki/UTF-16)

Unicode常用的字符集叫做BMP，包含U+0000 到 U+FFFF部分，这里有65536个位置算作一个Plane，看起来很多，但是对于要含括全世界的文字是远远不够的。于是后面又增加到了17个Plane。

在BMP里UTF-16 可以用一个字 (2字节）表示一个码点。除了BMP以外的Plane需要用的4字节组成的代理对（surrogate pair）表示。对于Unicode，U+D800 到 U+DFFF 这个区段是不存在的专门用于实现 UTF-16中的surrogate pair。

U+D800到U+DBFF留出了1024个位置，也就是10bitU+DC00到U+DFFF也是10bit这20bit刚好能表示BMP外的16个Plane。


## SP 其他好玩的emoji
### 链接符
可以使用U+200D零宽连字(ZWJ)将两个emoji连起来，使其看起来像是一个emoji。（不支持的系统会忽略零宽连字）

例如U+1F468男人、U+200D ZWJ、U+1F469女人、U+200D ZWJ、U+1F467女孩(👨‍👩‍👧)在系统支持的情况下会显示为一个男人一个女人和一个女孩组成的家庭emoji，而不支持的系统则会顺序显示这三个emoji(👨👩👧)。

查看所有的[emoji-zwj-sequences](http://www.unicode.org/Public/emoji/12.0/emoji-zwj-sequences.txt)

### 修饰符
Unicode 8.0中加入了5个修饰符，用来调节人形表情的肤色。这些叫做emoji菲茨帕特里克修饰符（EMOJI MODIFIER FITZPATRICK）类型-1-2、-3、-4、-5和-6（U+1F3FB ~ U+1F3FF）：🏻 🏼 🏽 🏾 🏿。对应了菲茨帕特里克度量对人类肤色的分类。没有后缀肤色代码的emoji会显示非真实的通用肤色。非人形表情则不受修饰符影响。在Unicode 9.0中菲茨帕特里克修饰符可以和86个人形emoji一起使用。



|代码位	| 默认	| U+1F3FB | U+1F3FC | U+1F3FD | U+1F3FE | U+1F3FF |
|---|---|---|---|---|---|---|---|
|U+1F466: 男孩|👦|👦🏻|👦🏼|👦🏽|👦🏾|👦🏿|
|U+1F467: 女孩|👧|👧🏻|👧🏼|👧🏽|👧🏾|👧🏿|
|U+1F468: 男人|👨|👨🏻|👨🏼|👨🏽|👨🏾|👨🏿|
|U+1F469: 女人|👩|👩🏻|👩🏼|👩🏽|👩🏾|👩🏿|
|U+1F385: Santa|🎅|🎅🏻|🎅🏼|🎅🏽|🎅🏾|🎅🏿|


查看所有的[emoji-sequences](http://www.unicode.org/Public/emoji/12.0/emoji-sequences.txt)


#### 参考文章

[Windows 下 UTF-16 的坑](https://blog.codingnow.com/2019/05/windows_utf16.html)

[UTF-16](https://zh.wikipedia.org/wiki/UTF-16)

[“Unicode与JavaScript详解”](http://www.ruanyifeng.com/blog/2014/12/unicode.html)



