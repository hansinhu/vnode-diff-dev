import { createElement, render, renderDOM } from './element'
// import ReactDOM from '../react-dom';
import { diff } from './diff'
import { patch } from './patch'

let VDom1 = createElement('ul', { class: 'list' }, [
    createElement('li', { class: 'item' }, [
        createElement('a', { href: '#' }, ['link']),
    ]),
    createElement('li', { class: 'item', style: "color:red" }, ['b']),
    createElement('li', { class: 'item' }, ['c']),
])

let VDom2 = createElement('ul', { class: 'lists', style: "color:red" }, [
    createElement('li', { class: 'item' }, ['a']),
    createElement('li', { class: 'item' }, ['b']),
    createElement('li', { class: 'item' }, ['c']),
])

let VDom3 = createElement('ul', { class: 'lists', 'data-key': 'aaa' }, [
    createElement('li', { class: 'item', style: "color:black" }, ['aa']),
    createElement('li', { class: 'item' }, ['1']),
    createElement('li', { class: 'item' }, ['bb'])
])


let el = render(VDom2)
console.log(VDom2)

// ReactDOM.render(el, document.getElementById('root'))
renderDOM(el, '#root')
let patchs = diff(VDom2, VDom3);
console.log('patchs=>', patchs)
patch(el, patchs);

