(function(e){function t(t){for(var r,s,u=t[0],o=t[1],c=t[2],h=0,f=[];h<u.length;h++)s=u[h],Object.prototype.hasOwnProperty.call(i,s)&&i[s]&&f.push(i[s][0]),i[s]=0;for(r in o)Object.prototype.hasOwnProperty.call(o,r)&&(e[r]=o[r]);l&&l(t);while(f.length)f.shift()();return a.push.apply(a,c||[]),n()}function n(){for(var e,t=0;t<a.length;t++){for(var n=a[t],r=!0,u=1;u<n.length;u++){var o=n[u];0!==i[o]&&(r=!1)}r&&(a.splice(t--,1),e=s(s.s=n[0]))}return e}var r={},i={app:0},a=[];function s(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,s),n.l=!0,n.exports}s.m=e,s.c=r,s.d=function(e,t,n){s.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},s.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},s.t=function(e,t){if(1&t&&(e=s(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(s.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)s.d(n,r,function(t){return e[t]}.bind(null,r));return n},s.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return s.d(t,"a",t),t},s.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},s.p="/";var u=window["webpackJsonp"]=window["webpackJsonp"]||[],o=u.push.bind(u);u.push=t,u=u.slice();for(var c=0;c<u.length;c++)t(u[c]);var l=o;a.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"034f":function(e,t,n){"use strict";var r=n("64a9"),i=n.n(r);i.a},5512:function(e,t,n){},"56d7":function(e,t,n){"use strict";n.r(t);n("cadf"),n("551c"),n("f751"),n("097d");var r=n("2b0e"),i=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"app"}},[n("div",[n("h2",[e._v("evaluate")]),n("p",{staticClass:"answer"},[e._v(e._s(e.answer))])]),n("InputText",{on:{input:e.pushText,clear:e.clearText,sure:e.sureText}}),n("ShowTokens",{attrs:{addTokens:e.addTokens},on:{output:e.tokenOutput}}),n("ShowAst",{attrs:{input:e.inputTokens},on:{output:e.outputAst}})],1)},a=[],s=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"input-text"},[n("input",{ref:"input",attrs:{type:"text"},on:{keydown:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"delete",[8,46],t.key,["Backspace","Delete","Del"])?null:e.prevent(t)},input:e.inputHandle}}),n("span",{staticClass:"input-text_button",on:{click:e.sureButtonClickHandle}},[e._v("sure")]),n("span",{staticClass:"input-text_button",on:{click:e.clearButtonClickHandle}},[e._v("clear")])])},u=[],o={name:"InputText",methods:{prevent:function(e){e.preventDefault()},clearButtonClickHandle:function(){this.$refs.input.value="",this.$emit("clear")},sureButtonClickHandle:function(){this.$emit("sure")},inputHandle:function(){var e=this.$refs.input.value.slice(-1);this.$emit("input",e)}}},c=o,l=(n("61af"),n("2877")),h=Object(l["a"])(c,s,u,!1,null,"fb5c9602",null),f=h.exports,p=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"show-tokens"},e._l(e.tokens,(function(t){return n("span",{key:t.id,staticClass:"fade-in",class:e.TOKEN_TYPE[t.type].className,on:{animationstart:e.animationstart,animationend:e.animationend,animationcancel:e.animationend}},[e._v(e._s(t.value===e.EOF?"EOF":t.value))])})),0)},d=[],k=n("75fc"),v=(n("673e"),n("c5f6"),n("ac6a"),n("96cf"),n("3b8d")),m=(n("28a5"),n("6762"),n("2fdb"),n("d225")),b=n("b0b4"),x=(n("ac4d"),n("8a81"),n("2e37"),function(){function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1;Object(m["a"])(this,e),this.vx=t,this.vy=n}return Object(b["a"])(e,null,[{key:"length",value:function(t){return!!e.is(t)&&Math.sqrt(t.vx*t.vx+t.vy*t.vy)}},{key:"lengthSquared",value:function(t){return!!e.is(t)&&t.vx*t.vx+t.vy*t.vy}},{key:"scale",value:function(t,n){if(!e.is(t))return!1;var r=t.vx*n,i=t.vy*n;return new e(r,i)}},{key:"add",value:function(t,n){if(!e.is(t)||!e.is(n))return!1;var r=t.vx+n.vx,i=t.vy+n.vy;return new e(r,i)}},{key:"sub",value:function(t,n){if(!e.is(t)||!e.is(n))return!1;var r=t.vx-n.vx,i=t.vy-n.vy;return new e(r,i)}},{key:"negate",value:function(t){if(!e.is(t))return!1;var n=-t.vx,r=-t.vy;return new e(n,r)}},{key:"normalize",value:function(t){if(!e.is(t))return!1;var n=Math.sqrt(t.vx*t.vx+t.vy*t.vy),r=0,i=0;return n&&(r=t.vx/n,i=t.vy/n),new e(r,i)}},{key:"rotate",value:function(t,n){if(!e.is(t))return!1;var r=Math.cos(n),i=Math.sin(n),a=t.vx*r-t.vy*i,s=t.vx*i+t.vy*r,u=Math.abs(a)<Number.EPSILON?0:a,o=Math.abs(s)<Number.EPSILON?0:s;return new e(u,o)}},{key:"dot",value:function(t,n){return!!e.is(t)&&(!!e.is(n)&&t.vx*n.vx+t.vy*n.vy)}},{key:"is",value:function(t){var n=t instanceof e;return n}}]),e}()),y=0;function w(){return"node-".concat(y++)}function g(){return{id:w(),type:"ROOT",name:"root",children:[],maxChildren:0}}function E(){return{id:w(),type:">",children:Array.prototype.slice.call(arguments),maxChildren:2,name:"bigger"}}function O(){return{id:w(),type:"<",children:Array.prototype.slice.call(arguments),maxChildren:2,name:"smaller"}}function N(){return{id:w(),type:"+",children:Array.prototype.slice.call(arguments),maxChildren:2,name:"add"}}function T(){return{id:w(),type:"-",children:Array.prototype.slice.call(arguments),maxChildren:2,name:"sub"}}function S(){return{id:w(),type:"*",children:Array.prototype.slice.call(arguments),maxChildren:2,name:"mul"}}function R(){return{id:w(),type:"/",children:Array.prototype.slice.call(arguments),maxChildren:2,name:"div"}}function C(){return{id:w(),type:"@dot",children:Array.prototype.slice.call(arguments),maxChildren:2,name:"dot"}}function _(){return{id:w(),type:"@rot",children:Array.prototype.slice.call(arguments),maxChildren:2,name:"rot"}}function A(){return{id:w(),type:"NEGATE",children:Array.prototype.slice.call(arguments),maxChildren:1,name:"neg"}}function j(){return{id:w(),type:"@len",children:Array.prototype.slice.call(arguments),maxChildren:1,name:"len"}}function P(){return{id:w(),type:"@lens",children:Array.prototype.slice.call(arguments),maxChildren:1,name:"lens"}}function z(){return{id:w(),type:"(",name:"par",children:[],maxChildren:0}}function M(){return{id:w(),type:"NUMBER",children:Array.prototype.slice.call(arguments),maxChildren:1,name:"number"}}function L(){return{id:w(),type:"@deg",children:Array.prototype.slice.call(arguments),maxChildren:1,name:"deg"}}function U(){return{id:w(),type:"[",name:"vec",children:[],maxChildren:0}}function B(){return{id:w(),type:",",name:"wall",children:[],maxChildren:0}}function I(e){return"+"===e?N:"-"===e?T:"*"===e?S:"/"===e?R:">"===e?E:"<"===e?O:"@dot"===e?C:"@rot"===e?_:"@len"===e?j:"@lens"===e?P:"NEGATE"===e?A:"NUMBER"===e?M:"@deg"===e?L:","===e?B:"["===e?U:"("===e?z:"ROOT"===e?g:void 0}var F={ROOT:0,"(":1,"[":1,"@dot":2,"<":3,">":3,"+":4,"-":4,"*":5,"/":5,"@rot":5,"@len":6,"@lens":6,NEGATE:6,"@deg":7,NUMBER:8,")":9,"]":9,ROOT_END:10},G={"(":")","[":"]",ROOT:"ROOT_END"};function V(e){return!D(e)&&(e&&e.children&&e.children.length>=e.maxChildren)}function $(e){return!D(e)&&(e&&e.children&&e.children.length<e.maxChildren)}function D(e){return 0===e.maxChildren}function H(e){if(void 0===e)throw new Error("node is undefined");return F[e.type]}var q=Symbol("EOF"),J=function(){function e(){Object(m["a"])(this,e),this.token=[],this.tokens=[],this.state=this.start,this.id=0}return Object(b["a"])(e,[{key:"start",value:function(e){return["0","1","2","3","4","5","6","7","8","9"].includes(e)?(this.token.push(e),this.inInt):"."===e?(this.token.push(e),this.inFloat):["+","-","*","/","(",")","[","]",",","<",">"].includes(e)?(this.emmitToken("SIGN",e),this.start):[" ","\r","\n"].includes(e)?this.start:e===q?(this.emmitToken("EOF",q),this.start):"@"===e?(this.token.push(e),this.sign):void 0}},{key:"sign",value:function(e){return"abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").includes(e)?(this.token.push(e),this.sign):(this.emmitToken("SIGN",this.token.join("")),this.token=[],this.start(e))}},{key:"inInt",value:function(e){return["0","1","2","3","4","5","6","7","8","9"].includes(e)?(this.token.push(e),this.inInt):"."===e?(this.token.push(e),this.inFloat):(this.emmitToken("NUMBER",this.token.join("")),this.token=[],this.start(e))}},{key:"inFloat",value:function(e){if(["0","1","2","3","4","5","6","7","8","9"].includes(e))return this.token.push(e),this.inFloat;if("."===e)throw new Error("不能出现`..`");if(1===this.token.length&&"."===this.token[0])throw new Error("不能单独出现`.`");return this.emmitToken("NUMBER",this.token.join("")),this.token=[],this.start(e)}},{key:"emmitToken",value:function(e,t){this.tokens.push({id:this.id++,type:e,value:t})}},{key:"push",value:function(e){return this.state=this.state(e),this.check()}},{key:"end",value:function(){return this.state(q),this.check()}},{key:"check",value:function(){var e=Object(k["a"])(this.tokens);return this.tokens=[],e}},{key:"clear",value:function(){this.token=[],this.tokens=[],this.state=this.start}}]),e}(),K=function(){function e(){Object(m["a"])(this,e),this.stack=[I("ROOT")()],this.tempStack=[],this.ParNodeSize=0,this.VecNodeSize=0}return Object(b["a"])(e,[{key:"push",value:function(){var e=Object(v["a"])(regeneratorRuntime.mark((function e(t){var n,r,i,a,s,u,o,c,l=this;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(n=this.stack[this.stack.length-1],r=function(e,t){var n=t.pop();l.stack.push(I(e)(n))},i=function(e){l.stack.push(I(e)(l.stack.pop()))},a=function(e){var t=F[e];while(V(l.stack[l.stack.length-1])&&$(l.stack[l.stack.length-2])&&t<=H(l.stack[l.stack.length-1])&&t<=H(l.stack[l.stack.length-2]))l.stack[l.stack.length-2].children.push(l.stack.pop())},s=function(e){a(e);while(l.stack.length>0&&(l.stack[l.stack.length-1].type!==e||l.stack[l.stack.length-1].children))l.tempStack.push(l.stack.pop());var t=l.stack[l.stack.length-1];if(t.type===e){t.type=G[e],t.children=[];while(l.tempStack.length>0)t.children.push(l.tempStack.pop());t.maxChildren=t.children.length}},u=function(e){l.stack.push(e)},o=function(e){n.children.push(e)},"EOF"!==t.type){e.next=13;break}if(!(this.ParNodeSize>0)){e.next=10;break}throw new Error("还有没有闭合的(");case 10:if(!(this.VecNodeSize>0)){e.next=12;break}throw new Error("还有没有闭合的[");case 12:return e.abrupt("return",s("ROOT"));case 13:if("["!==t.value){e.next=19;break}if(!V(n)){e.next=17;break}throw new Error("非顶端[前面不能有满项");case 17:return this.VecNodeSize++,e.abrupt("return",u(I("[")()));case 19:if(","!==t.value){e.next=26;break}if(!D(n)){e.next=22;break}throw new Error(",不能接在空符后面");case 22:if(!$(n)){e.next=24;break}throw new Error(",不能接在非满项后面");case 24:return a("["),e.abrupt("return",u(I(",")()));case 26:if("]"!==t.value){e.next=33;break}if(!(this.VecNodeSize<=0)){e.next=29;break}throw new Error("缺少匹配的[");case 29:if(!$(n)){e.next=31;break}throw new Error("]前不能有非满项");case 31:return this.VecNodeSize--,e.abrupt("return",s("["));case 33:if("("!==t.value){e.next=38;break}if(!V(n)){e.next=36;break}throw new Error("not a function");case 36:return this.ParNodeSize++,e.abrupt("return",u(I("(")()));case 38:if(")"!==t.value){e.next=47;break}if(!(this.ParNodeSize<=0)){e.next=41;break}throw new Error("Unexpected token )");case 41:if(this.ParNodeSize--,!D(n)){e.next=44;break}throw new Error("Unexpected token )");case 44:if(!$(n)){e.next=46;break}throw new Error("Unexpected token )");case 46:return e.abrupt("return",s("("));case 47:if("SIGN"!==t.type){e.next=69;break}if(!V(n)){e.next=59;break}if("@len"!==t.value){e.next=51;break}throw new Error(t.value+"符号是前置符");case 51:if("@lens"!==t.value){e.next=53;break}throw new Error(t.value+"符号是前置符");case 53:if(!(F[t.value]>F[n.type])){e.next=57;break}return e.abrupt("return",r(t.value,n.children));case 57:return a(t.value),e.abrupt("return",i(t.value));case 59:if(!D(n)&&!$(n)){e.next=69;break}if("-"!==t.value){e.next=62;break}return e.abrupt("return",u(I("NEGATE")()));case 62:if("@len"!==t.value){e.next=64;break}return e.abrupt("return",u(I("@len")()));case 64:if("@lens"!==t.value){e.next=66;break}return e.abrupt("return",u(I("@lens")()));case 66:if("+"!==t.value){e.next=68;break}return e.abrupt("return");case 68:throw new Error(t.value+"符号不能前置");case 69:if("NUMBER"!==t.type){e.next=78;break}if(!V(n)){e.next=72;break}throw new Error("数字前一项不能是满项");case 72:if(c=I(t.type)(t.value),!$(n)){e.next=77;break}return e.abrupt("return",o(c));case 77:return e.abrupt("return",u(c));case 78:case"end":return e.stop()}}),e,this)})));function t(t){return e.apply(this,arguments)}return t}()},{key:"clear",value:function(){this.stack=[I("ROOT")()],this.tempStack=[],this.ParNodeSize=0,this.VecNodeSize=0}},{key:"end",value:function(){return this.stack[0]}}]),e}();function Y(e){if(null===e)return null;if(void 0===e)return null;var t=e.type,n=e.children;if("NUMBER"===t)return Number(n[0]);if("ROOT_END"===t)return Y(n[0]);if(")"===t)return Y(n[0]);if("]"===t){var r=n.filter((function(e){return","!==e.type})),i=Y(r[0]),a=Y(r[1]),s="number"===typeof i,u="number"===typeof a;if(s&&u)return new x(i,a);throw new Error("只有两个数量才能生成向量")}if("+"===t){var o=Y(n[0]),c=Y(n[1]);return x.is(o)&&x.is(c)?x.add(o,c):o+c}if("-"===t){var l=Y(n[0]),h=Y(n[1]);return x.is(l)&&x.is(h)?x.sub(l,h):l-h}if(">"===t||"<"===t){var f=Y(n[0]),p=Y(n[1]),d=x.is(f),k=x.is(p),v="number"===typeof f,m="number"===typeof p;if(d&&m)throw new Error("向量与数字不能比较");if(k&&v)throw new Error("向量与数字不能比较");if(k&&d)throw new Error("向量与向量不能比较");if(">"===t)return f>p;if("<"===t)return f<p}if("*"===t||"/"===t){var b=Y(n[0]),y=Y(n[1]),w=x.is(b),g=x.is(y),E="number"===typeof b,O="number"===typeof y;if(E&&O){if("*"===t)return b*y;if("/"===t)return b/y}else if(w&&O){if("*"===t)return x.scale(b,y);if("/"===t)return x.scale(b,1/y)}else{if(!g||!E)throw new Error("两个向量不能相乘，请用@dot");if("*"===t)return x.scale(y,b);if("/"===t)return x.scale(y,1/b)}}if("NEGATE"===t){var N=Y(n[0]);return x.is(N)?x.scale(N,-1):-1*N}if("@dot"===t){var T=Y(n[0]),S=Y(n[1]),R=x.is(T),C=x.is(S);if(R&&C)return x.dot(T,S);throw new Error("只有向量和向量能点乘")}if("@rot"===t){var _=Y(n[0]),A=Y(n[1]),j=x.is(_),P=x.is(A),z="number"===typeof _,M="number"===typeof A;if(j&&M)return x.rotate(_,A);if(P&&z)return x.rotate(A,_);throw new Error("只有向量和数量能旋转")}if("@deg"===t){var L=Y(n[0]),U="number"===typeof L;if(U)return L/180*Math.PI;throw new Error("非数字不能转换deg")}if("@len"===t){var B=Y(n[0]),I=x.is(B);if(I)return x.length(B);throw new Error("非向量不能计算模")}if("@lens"===t){var F=Y(n[0]),G=x.is(F);if(G)return x.lengthSquared(F);throw new Error("非向量不能计算模平方")}}var Q={SIGN:{className:"sign"},NUMBER:{className:"number"},EOF:{className:"eof"}},W=Symbol("CLEAR"),X={name:"ShowTokens",props:{addTokens:Array},data:function(){return{EOF:q,TOKEN_TYPE:Q,tokens:[],orderList:[],inAnimation:null,isAnimation:!1}},watch:{addTokens:function(e){var t=Object(k["a"])(e);if(t[0]===W)return this.clear();while(t.length>0)this.orderList.push(t.shift());!1===this.isAnimation&&this.orderList.length>0&&e.length>0&&this.push()}},methods:{clear:function(){this.orderList=[],this.tokens=[],this.isAnimation=!1},animationstart:function(){this.isAnimation=!0},animationend:function(){this.$emit("output",this.inAnimation),this.orderList.length>0?this.push():this.isAnimation=!1},push:function(){this.inAnimation=this.orderList.shift(),this.tokens.push(this.inAnimation)}}},Z=X,ee=(n("b40c"),Object(l["a"])(Z,p,d,!1,null,"0d8a34fe",null)),te=ee.exports,ne=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"show-ast"},[n("div",{staticClass:"stack"},[n("h2",[e._v("stack")]),n("div",{staticClass:"stack_in"},e._l(e.stack,(function(e){return n("Node",{key:e.id,attrs:{node:e}})})),1)]),n("div",{staticClass:"stack"},[n("h2",[e._v("temp stack")]),n("div",{staticClass:"stack_in"},e._l(e.tempStack,(function(e){return n("Node",{key:e.id,attrs:{node:e}})})),1)])])},re=[],ie=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"node fade-in",class:e.node.name?e.node.name:"literal"},[n("span",[e._v(e._s(e.text))]),e.node.children&&e.node.children.length>0?n("div",{staticClass:"children"},e._l(e.node.children,(function(t,r){return n("Node",{key:t.id?t.id:t,style:e.rotate(r,e.node.children.length),attrs:{node:t}})})),1):e._e()])},ae=[],se=10,ue={name:"Node",components:{Node:le},props:{node:[Object,String]},computed:{level:function(e){return e.deep()},text:function(e){return e.node.type?e.shortName(e.node.type):e.node}},data:function(){return{}},watch:{},methods:{rotate:function(e,t){var n=(t-1)/2,r=n-e,i=r*se*this.level;return"transform: rotate(".concat(i,"deg);")},deep:function(){var e=0;function t(n){var r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;if(n.children&&n.children.length>0){var i=++r;return i>e&&(e=i),n.children.map((function(e){return t(e,i)}))}return r}return t(this.node),e},shortName:function(e){return"ROOT"===e?"RT":"ROOT_END"===e?"RE":"NUMBER"===e?"N":"NEGATE"===e?"NE":e}}},oe=ue,ce=(n("a440"),Object(l["a"])(oe,ie,ae,!1,null,"1832dfb2",null)),le=ce.exports;function he(e){return new Promise((function(t){setTimeout(t,e)}))}var fe={name:"ShowAst",components:{Node:le},props:{input:Array},data:function(){return{Parser:new K,stack:[I("ROOT")()],tempStack:[],ParNodeSize:0,VecNodeSize:0,orderList:[],isAnimation:!1}},watch:{input:function(e){var t=Object(k["a"])(e);if(console.log(JSON.stringify(t)),t[0]===W)return this.clear();while(t.length>0)this.orderList.push(t.shift());e.length>0&&null!==e[0]&&this.checkOrder()}},methods:{checkOrder:function(){var e=Object(v["a"])(regeneratorRuntime.mark((function e(){var t;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(!(!1===this.isAnimation&&this.orderList.length>0)){e.next=9;break}return this.isAnimation=!0,t=this.orderList.shift(),e.next=5,this.push(t);case 5:return this.isAnimation=!1,"EOF"===t.type&&this.end(),e.next=9,this.checkOrder();case 9:case"end":return e.stop()}}),e,this)})));function t(){return e.apply(this,arguments)}return t}(),push:function(){var e=Object(v["a"])(regeneratorRuntime.mark((function e(t){var n,r,i,a,s,u,o,c,l=this;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(n=this.stack[this.stack.length-1],r=function(){var e=Object(v["a"])(regeneratorRuntime.mark((function e(t,n){var r;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return console.log("rob"),e.next=3,he(1e3);case 3:r=n.pop(),l.stack.push(I(t)(r));case 5:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}(),i=function(){var e=Object(v["a"])(regeneratorRuntime.mark((function e(t){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return console.log("retire"),e.next=3,he(1e3);case 3:l.stack.push(I(t)(l.stack.pop()));case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),a=function(){var e=Object(v["a"])(regeneratorRuntime.mark((function e(t){var n;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:console.log("link"),n=F[t];case 2:if(!(V(l.stack[l.stack.length-1])&&$(l.stack[l.stack.length-2])&&n<=H(l.stack[l.stack.length-1])&&n<=H(l.stack[l.stack.length-2]))){e.next=8;break}return e.next=5,he(1e3);case 5:l.stack[l.stack.length-2].children.push(l.stack.pop()),e.next=2;break;case 8:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),s=function(){var e=Object(v["a"])(regeneratorRuntime.mark((function e(t){var n;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return console.log("remove"),e.next=3,a(t);case 3:if(!(l.stack.length>0)||l.stack[l.stack.length-1].type===t&&0===l.stack[l.stack.length-1].maxChildren){e.next=9;break}return e.next=6,he(1e3);case 6:l.tempStack.push(l.stack.pop()),e.next=3;break;case 9:if(n=l.stack[l.stack.length-1],n.type!==t){e.next=19;break}n.type=G[t];case 12:if(!(l.tempStack.length>0)){e.next=18;break}return e.next=15,he(1e3);case 15:n.children.push(l.tempStack.pop()),e.next=12;break;case 18:n.maxChildren=n.children.length;case 19:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),u=function(){var e=Object(v["a"])(regeneratorRuntime.mark((function e(t){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,he(1e3);case 2:l.stack.push(t);case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),o=function(){var e=Object(v["a"])(regeneratorRuntime.mark((function e(t){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,he(1e3);case 2:n.children.push(t);case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),"EOF"!==t.type){e.next=13;break}if(!(this.ParNodeSize>0)){e.next=10;break}throw new Error("还有没有闭合的(");case 10:if(!(this.VecNodeSize>0)){e.next=12;break}throw new Error("还有没有闭合的[");case 12:return e.abrupt("return",s("ROOT"));case 13:if("["!==t.value){e.next=19;break}if(!V(n)){e.next=17;break}throw new Error("非顶端[前面不能有满项");case 17:return this.VecNodeSize++,e.abrupt("return",u(I("[")()));case 19:if(","!==t.value){e.next=26;break}if(!D(n)){e.next=22;break}throw new Error(",不能接在空符后面");case 22:if(!$(n)){e.next=24;break}throw new Error(",不能接在非满项后面");case 24:return a("["),e.abrupt("return",u(I(",")()));case 26:if("]"!==t.value){e.next=33;break}if(!(this.VecNodeSize<=0)){e.next=29;break}throw new Error("缺少匹配的[");case 29:if(!$(n)){e.next=31;break}throw new Error("]前不能有非满项");case 31:return this.VecNodeSize--,e.abrupt("return",s("["));case 33:if("("!==t.value){e.next=38;break}if(!V(n)){e.next=36;break}throw new Error("not a function");case 36:return this.ParNodeSize++,e.abrupt("return",u(I("(")()));case 38:if(")"!==t.value){e.next=47;break}if(!(this.ParNodeSize<=0)){e.next=41;break}throw new Error("Unexpected token )");case 41:if(this.ParNodeSize--,!D(n)){e.next=44;break}throw new Error("Unexpected token )");case 44:if(!$(n)){e.next=46;break}throw new Error("Unexpected token )");case 46:return e.abrupt("return",s("("));case 47:if("SIGN"!==t.type){e.next=69;break}if(!V(n)){e.next=59;break}if("@len"!==t.value){e.next=51;break}throw new Error(t.value+"符号是前置符");case 51:if("@lens"!==t.value){e.next=53;break}throw new Error(t.value+"符号是前置符");case 53:if(!(F[t.value]>F[n.type])){e.next=57;break}return e.abrupt("return",r(t.value,n.children));case 57:return a(t.value),e.abrupt("return",i(t.value));case 59:if(!D(n)&&!$(n)){e.next=69;break}if("-"!==t.value){e.next=62;break}return e.abrupt("return",u(I("NEGATE")()));case 62:if("@len"!==t.value){e.next=64;break}return e.abrupt("return",u(I("@len")()));case 64:if("@lens"!==t.value){e.next=66;break}return e.abrupt("return",u(I("@lens")()));case 66:if("+"!==t.value){e.next=68;break}return e.abrupt("return");case 68:throw new Error(t.value+"符号不能前置");case 69:if("NUMBER"!==t.type){e.next=78;break}if(!V(n)){e.next=72;break}throw new Error("数字前一项不能是满项");case 72:if(c=I(t.type)(t.value),!$(n)){e.next=77;break}return e.abrupt("return",o(c));case 77:return e.abrupt("return",u(c));case 78:case"end":return e.stop()}}),e,this)})));function t(t){return e.apply(this,arguments)}return t}(),clear:function(){this.stack=[I("ROOT")()],this.tempStack=[],this.ParNodeSize=0,this.VecNodeSize=0},end:function(){this.$emit("output",this.stack[0])}}},pe=fe,de=(n("6de7"),Object(l["a"])(pe,ne,re,!1,null,"f890b312",null)),ke=de.exports,ve={name:"app",components:{InputText:f,ShowTokens:te,ShowAst:ke},data:function(){return{addTokens:[],inputTokens:[],Lexer:new J,answer:""}},mounted:function(){},methods:{outputAst:function(e){console.log(e),this.answer=Y(e)},tokenOutput:function(e){this.inputTokens=[e]},pushText:function(e){var t=this.Lexer.push(e);0!==t.length&&(this.addTokens=t)},clearText:function(){this.Lexer.clear(),this.addTokens=[W],this.inputTokens=[W]},sureText:function(){var e=this.Lexer.end();0!==e.length&&(this.addTokens=e)}}},me=ve,be=(n("034f"),Object(l["a"])(me,i,a,!1,null,null,null)),xe=be.exports;r["a"].config.productionTip=!1,new r["a"]({render:function(e){return e(xe)}}).$mount("#app")},"61af":function(e,t,n){"use strict";var r=n("846c"),i=n.n(r);i.a},"64a9":function(e,t,n){},6809:function(e,t,n){},"6de7":function(e,t,n){"use strict";var r=n("6809"),i=n.n(r);i.a},"846c":function(e,t,n){},a440:function(e,t,n){"use strict";var r=n("e759"),i=n.n(r);i.a},b40c:function(e,t,n){"use strict";var r=n("5512"),i=n.n(r);i.a},e759:function(e,t,n){}});
//# sourceMappingURL=app.b4d8427e.js.map