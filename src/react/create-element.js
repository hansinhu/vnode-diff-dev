function createElement(tag, attrs, ...children) { // 返回一个虚拟DOM(内存中的json格式)
  // console.log(tag, attrs, ...children);
  attrs = attrs || {};
  return {
    tag,
    attrs,
    children,
    keys: attrs.key || null
  }
}

export default createElement;
