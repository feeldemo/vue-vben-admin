/* eslint-disable unicorn/no-array-reduce */
import crypto from 'crypto-js';

export function md5(origin: string) {
  return crypto.MD5(origin).toString();
}

// 定义一个函数来过滤对象中的空值
export function removeEmptyKeys(obj: any = {}) {
  return Object.keys(obj).reduce((acc: any, key) => {
    // 这里你可以根据需要调整条件来排除不同的“空”值
    if (obj[key] !== null && obj[key] !== undefined && obj[key] !== '') {
      acc[key] = obj[key];
    }
    return acc;
  }, {});
}

function joint(obj: any = {}, ignoreSign = true) {
  return Object.keys(obj)
    .sort()
    .reduce((str, key) => {
      if (ignoreSign && key === 'sign') {
        return str;
      }

      str = str + (str.length > 0 ? '&' : '');
      const value = obj[key];

      if (Array.isArray(value)) {
        str = `${str}${key}=${value.join(',')}`;
      } else if (typeof value === 'object') {
        str = str + joint(value, false);
      } else {
        str = `${str}${key}=${value}`;
      }

      return str;
    }, '');
}

export function signature(
  obj: object,
  prefix = `QMG-xbUPyB2OmGQ`,
  suffix = `s#*5PA9mUK6xBd3`,
) {
  let string = joint(obj);
  string = prefix + string + suffix;
  return md5(string);
}
