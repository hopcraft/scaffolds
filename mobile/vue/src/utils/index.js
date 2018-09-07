export function isPromise(value) {
  if (value !== null && typeof value === 'object') {
    return value.promise && typeof value.promise.then === 'function';
  }
}

export function getCookie(name) {
  var value = "; " + document.cookie;
  var parts = value.split("; " + name + "=");
  if (parts.length == 2) return parts.pop().split(";").shift();
}


/**
 * 日期时间格式转换
 */
export function formatDate(date, format) {


  var date = new Date(date);

  // 时区偏移量，作修正用
  var offsetTimezone = 0; //date.getTimezoneOffset() / 60;


  var paddNum = function (num) {
    num += "";
    return num.replace(/^(\d)$/, "0$1");
  }
  //指定格式字符
  var cfg = {
    yyyy: date.getFullYear() //年 : 4位
    ,
    yy: date.getFullYear().toString().substring(2) //年 : 2位
    ,
    M: date.getMonth() + 1 //月 : 如果1位的时候不补0
    ,
    MM: paddNum(date.getMonth() + 1) //月 : 如果1位的时候补0
    ,
    d: date.getDate() //日 : 如果1位的时候不补0
    ,
    dd: paddNum(date.getDate()) //日 : 如果1位的时候补0
    ,
    hh: paddNum(date.getHours() - offsetTimezone) //时
    ,
    mm: paddNum(date.getMinutes()) //分
    ,
    ss: paddNum(date.getSeconds()) //秒
  }
  format || (format = "yyyy-MM-dd hh:mm:ss");
  return format.replace(/([a-z])(\1)*/ig, function (m) {
    return cfg[m];
  });
}

export function trim(str) {
  if (!str) {
    return ''
  }
  
  let string  = (str + '') || ''
  return string.replace(/(^\s*)|(\s*$)/g, '');
}

export function isArray(param) {
  return Object.prototype.toString.call(param) === "[object Array]";
}

export function parseHtmlToTextArea(content) {
  return content
    ? content.replace(/<br\s*\/>/ig, '\n')
    : ''
}

export function parseTextAreaToHtml(content) {
  return content
    ? content.replace(/\r/ig, "").replace(/\n/ig, "<br/>")
    : ''
}

export default {
  isPromise: isPromise,
  getCookie: getCookie,
  formatDate: formatDate,
  trim: trim,
  isArray: isArray,
  parseHtmlToTextArea,
  parseTextAreaToHtml
}
