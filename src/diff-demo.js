import React from './react';
import ReactDOM, { createElement, _render } from './react-dom';
import { diff } from './diff'
import { patch } from './diff/patch'

let VDom1 = createElement(
    'ul',
    { class: 'list' },
    createElement(
      'li',
      { class: 'item' },
      createElement('a', { href: '#' }, 'link'),
    ),
    createElement('li', { class: 'item', style: "color:red" }, 'b'),
    createElement('li', { class: 'item' }, 'c'),
)

let VDom2 = createElement(
    'ul',
    { class: 'lists', style: "color:red" }, 
    createElement('li', { class: 'item' }, 'a'),
    createElement('li', { class: 'item' }, 'b'),
    createElement('li', { class: 'item' }, 'c'),
)

let VDom3 = createElement(
    'ul',
    { class: 'lists', 'data-key': 'aaa' },
    createElement('li', { class: 'item', style: "color:black" }, 'aa'),
    createElement('li', { class: 'item' }, '1'),
    createElement('li', { class: 'item' }, 'bb')
)

const el = _render(VDom1)

document.querySelector('#root').appendChild(el)

// ReactDOM.render(VDom1, document.getElementById('root'))

// diff start
let patchs = diff(VDom1, VDom2);
console.log('diff结果=>', patchs)

// 更新 dom
patch(el, patchs);
