/*获取网址参数*/
function getURL(name: string) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  var r = window.location.search.substr(1).match(reg);
  if (r != null) return r[2];
  return null;
}

/*获取全部url参数,并转换成json对象*/
function getUrlAllParams(url: string) {
  var url = url ? url : window.location.href;
  var _pa = url.substring(url.indexOf("?") + 1),
    _arrS = _pa.split("&"),
    _rs = {};
  for (var i = 0, _len = _arrS.length; i < _len; i++) {
    var pos = _arrS[i].indexOf("=");
    if (pos == -1) {
      continue;
    }
    // var name = _arrS[i].substring(0, pos),
    //   value = window.decodeURIComponent(_arrS[i].substring(pos + 1));
    // _rs[name] = value;
  }
  return _rs;
}

/*删除url指定参数，返回url*/
function delParamsUrl(url: string, name: string | number) {
  var baseUrl = url.split("?")[0] + "?";
  var query = url.split("?")[1];
  // if (query.indexOf(name) > -1) {
  //   var obj = {};
  //   var arr = query.split("&");
  //   for (var i = 0; i < arr.length; i++) {
  //     arr[i] = arr[i].split("=");
  //     obj[arr[i][0]] = arr[i][1];
  //   }
  //   delete obj[name];
  //   var url =
  //     baseUrl +
  //     JSON.stringify(obj)
  //       .replace(/[\"\{\}]/g, "")
  //       .replace(/\:/g, "=")
  //       .replace(/\,/g, "&");
  //   return url;
  // } else {
  //   return url;
  // }
}

/*
    判断对象是否相等 ??
 */
export const diff_obj = (obj1: { [x: string]: any }, obj2: { [x: string]: any }): boolean => {
  let o1 = obj1 instanceof Object;
  let o2 = obj2 instanceof Object;
  if (!o1 || !o2) {
    return obj1 === obj2;
  }
  if (Object.keys(obj1).length !== Object.keys(obj2).length) return false;

  for (let attr in obj1) {
    let t1 = obj1[attr] instanceof Object;
    let t2 = obj2[attr] instanceof Object;
    if (t1 && t2) {
      return diff_obj(obj1[attr], obj2[attr]);
    } else if (obj1[attr] !== obj2[attr]) {
      return false;
    }
  }
  return true;
};
const obj1 = { name: "zhangsan", age: 18, info: { eat: "吃", do: "do" } };
const obj2 = { name: "zhangsan", age: 18, info: { eat: "吃", do: "do" } };

/*获取十六进制随机颜色*/
function getRandomColor() {
  return (
    "#" +
    (function (h) {
      return new Array(7 - h.length).join("0") + h;
    })(((Math.random() * 0x1000000) << 0).toString(16))
  );
}

/*图片加载*/
function imgLoadAll(arr: string | any[], callback: () => any) {
  var arrImg = [];
  for (var i = 0; i < arr.length; i++) {
    var img = new Image();
    img.src = arr[i];
    img.onload = function () {
      arrImg.push(this);
      if (arrImg.length == arr.length) {
        callback && callback();
      }
    };
  }
}

/*音频加载*/
function loadAudio(src: string | undefined, callback: ((this: GlobalEventHandlers, ev: Event) => any) | null) {
  var audio = new Audio(src);
  audio.onloadedmetadata = callback;
  audio.src = src!;
}

/*DOM转字符串*/
function domToStirng(htmlDOM: any) {
  var div = document.createElement("div");
  div.appendChild(htmlDOM);
  return div.innerHTML;
}

/*字符串转DOM*/
function stringToDom(htmlString: string) {
  var div = document.createElement("div");
  div.innerHTML = htmlString;
  return div.children[0];
}

/**
 * 光标所在位置插入字符，并设置光标位置
 *
 * @param {dom} 输入框
 * @param {val} 插入的值
 * @param {posLen} 光标位置处在 插入的值的哪个位置
 */
function setCursorPosition(
  this: any,
  dom: { selectionStart: number; focus: () => void; setSelectionRange: (arg0: any, arg1: any) => void; value: string | any[] },
  val: string | any[],
  posLen: any
) {
  var cursorPosition = 0;
  if (dom.selectionStart) {
    cursorPosition = dom.selectionStart;
  }
  this.insertAtCursor(dom, val);
  dom.focus();
  console.log(posLen);
  dom.setSelectionRange(dom.value.length, cursorPosition + (posLen || val.length));
}

/*光标所在位置插入字符*/
function insertAtCursor(
  dom: { focus: () => void; selectionStart: string; selectionEnd: any; scrollTop: any; value: string },
  val: string | any[]
) {
  if (document.getSelection!) {
    dom.focus();
    // self = document.getSelection.createRange();
    // self.text = val;
    // self.select();
  } else if (dom.selectionStart || dom.selectionStart == "0") {
    let startPos = dom.selectionStart;
    let endPos = dom.selectionEnd;
    let restoreTop = dom.scrollTop;
    dom.value = dom.value.substring(0, Number(startPos)) + val + dom.value.substring(endPos, dom.value.length);
    if (restoreTop > 0) {
      dom.scrollTop = restoreTop;
    }
    dom.focus();
    dom.selectionStart = startPos + val.length;
    dom.selectionEnd = startPos + val.length;
  } else {
    dom.value += val;
    dom.focus();
  }
}
