export function setAttribute(dom, name, value) {  // 判断是那种事属性
  if (name === 'className') name= 'class';
  if (/on\w+/.test(name)) {
    name = name.toLowerCase();
    dom[name] = value || '';
  } else if (name === 'style') {
    if (!value || typeof value === 'string') {
      dom.style.cssText = value; // 把一个css字符串变成样式
    } else if (value && typeof value === 'object') {
      for (let name in value) {
        // fontSize 驼峰式
        dom.style[name] = typeof value[name] === 'number' ? value[name] + 'px': value[name];
      }
    }
  } else {
    if (name in dom) {
      dom[name] = value || '';
    }
    if (value) {
      dom.setAttribute(name, value);
    } else {
      dom.removeAttribute(name, value);
    }
  }
}