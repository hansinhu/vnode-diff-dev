import { setAttribute } from './dom.js';
import Component from '../react/component.js'
/**
 * render将虚拟dom变真实dom
 * @params vnode 虚拟dom
 * @return 返回DOM
 */

// 1.递归children(有很多层)  将节点转成dom， 子节点递归  
// 递归的出口就是只有文本节点

// 2. 节点类型  有三种:
//     1.文本节点  return createTextNode() 结束
//     2.标签节点   createElement()  props  children设置(递归_render)
//     3.Component 组件   render(return jsx)  组件返回的是个jsx, 然后就调用render(),挂载到组件的父节点上
// render => _render => createElement || (createComponent => renderComponent)

export function _render (vnode) {
  console.log('heihei', vnode)
  if (vnode === undefined || vnode === null || typeof vnode === 'boolean')
  vnode = '';

  // 文本节点
  if (typeof vnode === 'string') { 
    let textNode = document.createTextNode(vnode);
    return textNode;
  }

  if (typeof vnode === 'number') {
    vnode = String(vnode); // 强制转化为string
    let textNode = document.createTextNode(vnode);
    return textNode;
  }
  // 组件<Counter />会被解析成 vnode.tag = function Counter() {}
  if (typeof vnode.tag === 'function') {
    // return document.createTextNode('你你你你你好');
    const component = createComponent(vnode.tag, vnode.props); // 组件实例化 再将组件中的render解析
    setComponentProps(component, vnode.props);
    return component.base; // 组件的dom节点
  }

 // 标签节点
  const dom = document.createElement(vnode.tag); // 第一重递归
  if (vnode.props) {
    Object.keys(vnode.props).forEach(key => {
      const value = vnode.props[key];
      setAttribute(dom, key, value);
    })
  }
  if (vnode.children) {
    console.log('----------', vnode.children)
    vnode.children.forEach(child => renderChildren(child, dom));
  }
  return dom;
}

function setComponentProps (component, props) {
  component.props = props;
  renderComponent(component);
}

// 将component里的jsx转为DOM 他还会在setState是调用
export function renderComponent (component) { // 渲染组件
  let base; //jsx => DOM
  const renderer = component.render(); //调用组件里面的render返回jsx
  // console.log('renderer', renderer)
  base = _render(renderer);
  if (component.base && component.base.parentNode) {// state里面改变，再次渲染
    component.base.parentNode.replaceChild(base, component.base); // 替换掉改变的dom(整个替换)
  }
  component.base = base; // 组件的dom节点
  base._component = component;
  // console.log(base)
}

function createComponent (component, props) { // 组件实例化
  let inst;
  if (component.prototype && component.prototype.render) { // 组件被解析成一个函数，上面还要有render方法
    inst = new component(props); // 任何一个已存在的组件
  } else {
    inst = new Component(props); //当component不存在，就创建一个
    inst.constructor = component;
    inst.render = function () {
      return this.constructor(props);
    }
  }
  return inst;
}

function renderChildren (vnode, container) {
  return container.appendChild(_render(vnode))
}

export function render (vnode, container) {
  console.log('--------', vnode)
  container.innerHTML = null
  return container.appendChild(_render(vnode))
}
