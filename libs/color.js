var Color = (function () {
  'use strict';

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();
  }

  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
  }

  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) {
      for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

      return arr2;
    }
  }

  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }

  function _iterableToArray(iter) {
    if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
  }

  function _iterableToArrayLimit(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"] != null) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance");
  }

  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance");
  }

  function charCodeHex(str) {
    var charCode = str.toUpperCase().charCodeAt();
    var charCode_0 = "0".charCodeAt();
    var charCode_9 = "9".charCodeAt();
    var charCode_A = "A".charCodeAt();
    var charCode_F = "F".charCodeAt();
    if (charCode_0 <= charCode && charCode <= charCode_9) return charCode - charCode_0;
    if (charCode_A <= charCode && charCode <= charCode_F) return charCode - charCode_A + 10;
    return 0;
  } // https://en.wikipedia.org/wiki/HSL_and_HSV

  function rgb2hsl(R, G, B) {
    var r = R / 0xff;
    var g = G / 0xff;
    var b = B / 0xff;
    var max = Math.max(r, g, b);
    var min = Math.min(r, g, b);
    var c = max - min;

    var _hue;

    if (c === 0) {
      _hue = null;
    } else if (max === r) {
      _hue = (g - b) / c % 6;
    } else if (max === g) {
      _hue = (b - r) / c + 2;
    } else {
      _hue = (r - g) / c + 4;
    }

    var hue = _hue === null ? 0 : _hue * 60 % 360;
    var lightness = (max + min) / 2;
    var saturation = lightness === 1 || lightness === 0 ? 0 : c / (1 - Math.abs(2 * lightness - 1));
    return {
      H: hue >= 0 ? hue : 360 + hue,
      S: saturation,
      L: lightness
    };
  } // https://en.wikipedia.org/wiki/HSL_and_HSV

  function hsl2rgb(H, S, L) {
    var saturation = S;
    var lightness = L;
    var c = (1 - Math.abs(2 * lightness - 1)) * saturation;

    var _hue = H % 360 / 60;

    var x = c * (1 - Math.abs(_hue % 2 - 1));
    var r, g, b;

    if (_hue >= 0 && _hue < 1) {
      r = c;
      g = x;
      b = 0;
    } else if (_hue >= 1 && _hue <= 2) {
      r = x;
      g = c;
      b = 0;
    } else if (_hue >= 2 && _hue <= 3) {
      r = 0;
      g = c;
      b = x;
    } else if (_hue > 3 && _hue <= 4) {
      r = 0;
      g = x;
      b = c;
    } else if (_hue > 4 && _hue <= 5) {
      r = x;
      g = 0;
      b = c;
    } else if (_hue > 5 && _hue <= 6) {
      r = c;
      g = 0;
      b = x;
    }

    var m = lightness - c / 2;
    var _ref = [Math.abs(r + m), Math.abs(g + m), Math.abs(b + m)],
        R = _ref[0],
        G = _ref[1],
        B = _ref[2];
    return {
      R: R * 0xff,
      G: G * 0xff,
      B: B * 0xff
    };
  }
  function num2per(num) {
    var fix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;
    return (num * 100).toFixed(fix) + "%";
  }
  function isString(a) {
    return Object.prototype.toString.call(a).slice(8, -1) === "String";
  }
  function keywordColorValues(str) {
    var color = KeywordColorValue[str];
    return color ? color : "#000000";
  }
  var KeywordColorValue = {
    black: "#000000",
    silver: "#c0c0c0",
    gray: "#808080",
    white: "#ffffff",
    maroon: "#800000",
    red: "#ff0000",
    purple: "#800080",
    fuchsia: "#ff00ff",
    green: "#008000",
    lime: "#00ff00",
    olive: "#808000",
    yellow: "#ffff00",
    navy: "#000080",
    blue: "#0000ff",
    teal: "#008080",
    aqua: "#00ffff",
    orange: "#ffa500",
    aliceblue: "#f0f8ff",
    antiquewhite: "#faebd7",
    aquamarine: "#7fffd4",
    azure: "#f0ffff",
    beige: "#f5f5dc",
    bisque: "#ffe4c4",
    blanchedalmond: "#ffebcd",
    blueviolet: "#8a2be2",
    brown: "#a52a2a",
    burlywood: "#deb887",
    cadetblue: "#5f9ea0",
    chartreuse: "#7fff00",
    chocolate: "#d2691e",
    coral: "#ff7f50",
    cornflowerblue: "#6495ed",
    cornsilk: "#fff8dc",
    crimson: "#dc143c",
    cyan: "#00ffff",
    darkblue: "#00008b",
    darkcyan: "#008b8b",
    darkgoldenrod: "#b8860b",
    darkgray: "#a9a9a9",
    darkgreen: "#006400",
    darkgrey: "#a9a9a9",
    darkkhaki: "#bdb76b",
    darkmagenta: "#8b008b",
    darkolivegreen: "#556b2f",
    darkorange: "#ff8c00",
    darkorchid: "#9932cc",
    darkred: "#8b0000",
    darksalmon: "#e9967a",
    darkseagreen: "#8fbc8f",
    darkslateblue: "#483d8b",
    darkslategray: "#2f4f4f",
    darkslategrey: "#2f4f4f",
    darkturquoise: "#00ced1",
    darkviolet: "#9400d3",
    deeppink: "#ff1493",
    deepskyblue: "#00bfff",
    dimgray: "#696969",
    dimgrey: "#696969",
    dodgerblue: "#1e90ff",
    firebrick: "#b22222",
    floralwhite: "#fffaf0",
    forestgreen: "#228b22",
    gainsboro: "#dcdcdc",
    ghostwhite: "#f8f8ff",
    gold: "#ffd700",
    goldenrod: "#daa520",
    greenyellow: "#adff2f",
    grey: "#808080",
    honeydew: "#f0fff0",
    hotpink: "#ff69b4",
    indianred: "#cd5c5c",
    indigo: "#4b0082",
    ivory: "#fffff0",
    khaki: "#f0e68c",
    lavender: "#e6e6fa",
    lavenderblush: "#fff0f5",
    lawngreen: "#7cfc00",
    lemonchiffon: "#fffacd",
    lightblue: "#add8e6",
    lightcoral: "#f08080",
    lightcyan: "#e0ffff",
    lightgoldenrodyellow: "#fafad2",
    lightgray: "#d3d3d3",
    lightgreen: "#90ee90",
    lightgrey: "#d3d3d3",
    lightpink: "#ffb6c1",
    lightsalmon: "#ffa07a",
    lightseagreen: "#20b2aa",
    lightskyblue: "#87cefa",
    lightslategray: "#778899",
    lightslategrey: "#778899",
    lightsteelblue: "#b0c4de",
    lightyellow: "#ffffe0",
    limegreen: "#32cd32",
    linen: "#faf0e6",
    magenta: "#ff00ff",
    mediumaquamarine: "#66cdaa",
    mediumblue: "#0000cd",
    mediumorchid: "#ba55d3",
    mediumpurple: "#9370db",
    mediumseagreen: "#3cb371",
    mediumslateblue: "#7b68ee",
    mediumspringgreen: "#00fa9a",
    mediumturquoise: "#48d1cc",
    mediumvioletred: "#c71585",
    midnightblue: "#191970",
    mintcream: "#f5fffa",
    mistyrose: "#ffe4e1",
    moccasin: "#ffe4b5",
    navajowhite: "#ffdead",
    oldlace: "#fdf5e6",
    olivedrab: "#6b8e23",
    orangered: "#ff4500",
    orchid: "#da70d6",
    palegoldenrod: "#eee8aa",
    palegreen: "#98fb98",
    paleturquoise: "#afeeee",
    palevioletred: "#db7093",
    papayawhip: "#ffefd5",
    peachpuff: "#ffdab9",
    peru: "#cd853f",
    pink: "#ffc0cb",
    plum: "#dda0dd",
    powderblue: "#b0e0e6",
    rosybrown: "#bc8f8f",
    royalblue: "#4169e1",
    saddlebrown: "#8b4513",
    salmon: "#fa8072",
    sandybrown: "#f4a460",
    seagreen: "#2e8b57",
    seashell: "#fff5ee",
    sienna: "#a0522d",
    skyblue: "#87ceeb",
    slateblue: "#6a5acd",
    slategray: "#708090",
    slategrey: "#708090",
    snow: "#fffafa",
    springgreen: "#00ff7f",
    steelblue: "#4682b4",
    tan: "#d2b48c",
    thistle: "#d8bfd8",
    tomato: "#ff6347",
    turquoise: "#40e0d0",
    violet: "#ee82ee",
    wheat: "#f5deb3",
    whitesmoke: "#f5f5f5",
    yellowgreen: "#9acd32",
    rebeccapurple: "#663399"
  };

  var Color =
  /*#__PURE__*/
  function () {
    function Color(str) {
      _classCallCheck(this, Color);

      this.A = 1;
      this.R = 0;
      this.G = 0;
      this.B = 0;
      this.H = 0;
      this.S = 0;
      this.L = 0;
      this.init(str);
    }

    _createClass(Color, [{
      key: "init",
      value: function init(str) {
        var colorStr = String(str).toLowerCase();
        if (colorStr.slice(0, 1) === "#" && colorStr.length === 9) return this.hex(colorStr, 8);
        if (colorStr.slice(0, 1) === "#" && colorStr.length === 7) return this.hex(colorStr, 6);
        if (colorStr.slice(0, 1) === "#" && colorStr.length === 5) return this.hex(colorStr, 4);
        if (colorStr.slice(0, 1) === "#" && colorStr.length === 4) return this.hex(colorStr, 3);
        if (colorStr.slice(0, 5) === "rgba(") return this.rgba(colorStr, true);
        if (colorStr.slice(0, 4) === "rgb(") return this.rgba(colorStr);
        if (colorStr.slice(0, 5) === "hsla(") return this.hsla(colorStr, true);
        if (colorStr.slice(0, 4) === "hsl(") return this.hsla(colorStr);
        return this.hex(keywordColorValues(colorStr), 6);
      }
    }, {
      key: "check",
      value: function check(_ref) {
        var R = _ref.R,
            G = _ref.G,
            B = _ref.B,
            A = _ref.A,
            H = _ref.H,
            S = _ref.S,
            L = _ref.L;
        if (R !== undefined) if (this.R < 0) this.R = 0;
        if (this.R > 255) this.R = 255;
        if (G !== undefined) if (this.G < 0) this.G = 0;
        if (this.G > 255) this.G = 255;
        if (B !== undefined) if (this.B < 0) this.B = 0;
        if (this.B > 255) this.B = 255;
        if (A !== undefined) if (this.A < 0) this.A = 0;
        if (this.A > 1) this.A = 1;
        if (H !== undefined) if (this.H < 0) this.H = 0;
        if (this.H > 360) this.H = 360;
        if (S !== undefined) if (this.S < 0) this.S = 0;
        if (this.S > 1) this.S = 1;
        if (L !== undefined) if (this.L < 0) this.L = 0;
        if (this.L > 1) this.L = 1;
      }
    }, {
      key: "hex",
      value: function hex(colorStr, size) {
        var arr = _toConsumableArray(colorStr);

        var r1, r2, g1, g2, b1, b2, a1, a2;

        if (size === 3) {
          r1 = charCodeHex(arr[1]);
          r2 = charCodeHex(arr[1]);
          g1 = charCodeHex(arr[2]);
          g2 = charCodeHex(arr[2]);
          b1 = charCodeHex(arr[3]);
          b2 = charCodeHex(arr[3]);
          a1 = 0xf;
          a2 = 0xf;
        }

        if (size === 6) {
          r1 = charCodeHex(arr[1]);
          r2 = charCodeHex(arr[2]);
          g1 = charCodeHex(arr[3]);
          g2 = charCodeHex(arr[4]);
          b1 = charCodeHex(arr[5]);
          b2 = charCodeHex(arr[6]);
          a1 = 0xf;
          a2 = 0xf;
        }

        if (size === 4) {
          r1 = charCodeHex(arr[1]);
          r2 = charCodeHex(arr[1]);
          g1 = charCodeHex(arr[2]);
          g2 = charCodeHex(arr[2]);
          b1 = charCodeHex(arr[3]);
          b2 = charCodeHex(arr[3]);
          a1 = charCodeHex(arr[4]);
          a2 = charCodeHex(arr[4]);
        }

        if (size === 8) {
          r1 = charCodeHex(arr[1]);
          r2 = charCodeHex(arr[2]);
          g1 = charCodeHex(arr[3]);
          g2 = charCodeHex(arr[4]);
          b1 = charCodeHex(arr[5]);
          b2 = charCodeHex(arr[6]);
          a1 = charCodeHex(arr[7]);
          a2 = charCodeHex(arr[8]);
        }

        this.R = r1 * 0x10 + r2;
        this.G = g1 * 0x10 + g2;
        this.B = b1 * 0x10 + b2;
        this.A = (a1 * 0x10 + a2) / 0xff;
        this.check({
          R: this.R,
          G: this.G,
          B: this.B,
          A: this.A
        });

        var _rgb2hsl = rgb2hsl(this.R, this.G, this.B),
            H = _rgb2hsl.H,
            S = _rgb2hsl.S,
            L = _rgb2hsl.L;

        this.H = H;
        this.S = S;
        this.L = L;
      }
    }, {
      key: "rgba",
      value: function rgba(colorStr, hasAlpha) {
        var _checkArguments = checkArguments(colorStr, hasAlpha ? "rgba" : "rgb"),
            _checkArguments2 = _slicedToArray(_checkArguments, 4),
            r = _checkArguments2[0],
            g = _checkArguments2[1],
            b = _checkArguments2[2],
            a = _checkArguments2[3];

        var _checkPer = checkPer(r),
            _checkPer2 = _slicedToArray(_checkPer, 2),
            Rb = _checkPer2[0],
            R = _checkPer2[1];

        var _checkPer3 = checkPer(g),
            _checkPer4 = _slicedToArray(_checkPer3, 2),
            Gb = _checkPer4[0],
            G = _checkPer4[1];

        var _checkPer5 = checkPer(b),
            _checkPer6 = _slicedToArray(_checkPer5, 2),
            Bb = _checkPer6[0],
            B = _checkPer6[1];

        var _checkPer7 = checkPer(a),
            _checkPer8 = _slicedToArray(_checkPer7, 2),
            Ab = _checkPer8[0],
            A = _checkPer8[1];

        this.R = Rb ? R * 0xff : Number(R);
        this.G = Gb ? G * 0xff : Number(G);
        this.B = Bb ? B * 0xff : Number(B);
        this.A = Ab ? A * 1 : Number(A);
        this.check({
          R: this.R,
          G: this.G,
          B: this.B,
          A: this.A
        });

        var _rgb2hsl2 = rgb2hsl(this.R, this.G, this.B),
            H = _rgb2hsl2.H,
            S = _rgb2hsl2.S,
            L = _rgb2hsl2.L;

        this.H = H;
        this.S = S;
        this.L = L;
      }
    }, {
      key: "hsla",
      value: function hsla(colorStr, hasAlpha) {
        var _checkArguments3 = checkArguments(colorStr, hasAlpha ? "hsla" : "hsl"),
            _checkArguments4 = _slicedToArray(_checkArguments3, 4),
            h = _checkArguments4[0],
            s = _checkArguments4[1],
            l = _checkArguments4[2],
            a = _checkArguments4[3];

        var _checkPer9 = checkPer(h),
            _checkPer10 = _slicedToArray(_checkPer9, 2),
            Hb = _checkPer10[0],
            H = _checkPer10[1];

        var _checkPer11 = checkPer(s),
            _checkPer12 = _slicedToArray(_checkPer11, 2),
            Sb = _checkPer12[0],
            S = _checkPer12[1];

        var _checkPer13 = checkPer(l),
            _checkPer14 = _slicedToArray(_checkPer13, 2),
            Lb = _checkPer14[0],
            L = _checkPer14[1];

        var _checkPer15 = checkPer(a),
            _checkPer16 = _slicedToArray(_checkPer15, 2),
            Ab = _checkPer16[0],
            A = _checkPer16[1];

        this.H = Hb ? H * 360 % 360 : Number(H) % 360;
        this.S = Sb ? S * 1 : Number(S);
        this.L = Lb ? L * 1 : Number(L);
        this.A = Ab ? A * 1 : Number(A);
        this.check({
          H: this.H,
          S: this.S,
          L: this.L,
          A: this.A
        });

        var _hsl2rgb = hsl2rgb(this.H, this.S, this.L),
            R = _hsl2rgb.R,
            G = _hsl2rgb.G,
            B = _hsl2rgb.B;

        this.R = R;
        this.G = G;
        this.B = B;
      }
    }, {
      key: "toRgb",
      value: function toRgb() {
        return this._toRgba(false);
      }
    }, {
      key: "toRgba",
      value: function toRgba() {
        return this._toRgba(true);
      }
    }, {
      key: "_toRgba",
      value: function _toRgba(hasAlpha) {
        return "rgb".concat(hasAlpha ? "a" : "", "(").concat(parseInt(this.R), ",").concat(parseInt(this.G), ",").concat(parseInt(this.B)).concat(hasAlpha ? "," + this.A.toFixed(2) : "", ")");
      }
    }, {
      key: "toHsl",
      value: function toHsl() {
        var fix = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
        return this._toHsla(false, fix);
      }
    }, {
      key: "toHsla",
      value: function toHsla() {
        var fix = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
        return this._toHsla(true, fix);
      }
    }, {
      key: "_toHsla",
      value: function _toHsla(hasAlpha) {
        var fix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
        return "hsl".concat(hasAlpha ? "a" : "", "(").concat(this.H.toFixed(fix), ",").concat(num2per(this.S, fix), ",").concat(num2per(this.L, fix)).concat(hasAlpha ? "," + this.A.toFixed(2) : "", ")");
      }
    }, {
      key: "toHex",
      value: function toHex() {
        return this._toHexa(false);
      }
    }, {
      key: "toHexa",
      value: function toHexa() {
        return this._toHexa(true);
      }
    }, {
      key: "_toHexa",
      value: function _toHexa(hasAlpha) {
        var r = parseInt(this.R).toString(16).toUpperCase();
        var g = parseInt(this.G).toString(16).toUpperCase();
        var b = parseInt(this.B).toString(16).toUpperCase();
        var a = parseInt(this.A * 0xff).toString(16).toUpperCase();
        return "#".concat(r.length === 1 ? "0" + r : r).concat(g.length === 1 ? "0" + g : g).concat(b.length === 1 ? "0" + b : b).concat(hasAlpha ? a.length === 1 ? "0" + a : a : "");
      }
    }, {
      key: "changeHSL",
      value: function changeHSL(_ref2) {
        var _ref3 = _slicedToArray(_ref2, 3),
            H = _ref3[0],
            S = _ref3[1],
            L = _ref3[2];

        this.H = H;
        this.S = S;
        this.L = L;
        this.check({
          H: H,
          S: S,
          L: L
        });

        var _hsl2rgb2 = hsl2rgb(this.H, this.S, this.L),
            R = _hsl2rgb2.R,
            G = _hsl2rgb2.G,
            B = _hsl2rgb2.B;

        this.R = R;
        this.G = G;
        this.B = B;
      }
    }, {
      key: "changeRGB",
      value: function changeRGB(_ref4) {
        var _ref5 = _slicedToArray(_ref4, 3),
            R = _ref5[0],
            G = _ref5[1],
            B = _ref5[2];

        this.R = R;
        this.G = G;
        this.B = B;
        this.check({
          R: R,
          G: G,
          B: B
        });

        var _rgb2hsl3 = rgb2hsl(this.R, this.G, this.B),
            H = _rgb2hsl3.H,
            S = _rgb2hsl3.S,
            L = _rgb2hsl3.L;

        this.H = H;
        this.S = S;
        this.L = L;
      }
    }]);

    return Color;
  }();

  function checkArguments(str, type) {
    var afterReplace = str.replace("".concat(type, "("), "").replace(")", "");

    if (str.indexOf(",") !== -1) {
      return afterReplace.replace(/\s/g, "").split(",");
    } else if (str.indexOf("/") !== -1) {
      var _afterReplace$split = afterReplace.split("/"),
          _afterReplace$split2 = _slicedToArray(_afterReplace$split, 2),
          afterSplit = _afterReplace$split2[0],
          alpha = _afterReplace$split2[1];

      return [].concat(_toConsumableArray(afterSplit.trim().split(/\s+/)), [alpha]);
    } else {
      return afterReplace.split(/\s+/);
    }
  }

  function checkPer(str) {
    if (!isString(str)) return [null, 1];
    if (str.slice(-1) !== "%") return [false, str];
    return [true, str.slice(0, -1) / 100];
  }

  return Color;

}());
