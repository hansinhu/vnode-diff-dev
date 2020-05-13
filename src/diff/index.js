import * as patchType from './patchType'
let Index = 0;

function diff(oldDOM, newDOM) {
  console.log(oldDOM, )
  console.log(newDOM)
  let patchs = {}
  let index = 0
  // 遍历dom树
  TreeWalker(oldDOM, newDOM, patchs, index)
  return patchs;
}

function TreeWalker(oldNode, newNode, patchs, index) {
  let curPatch = []
  // 节点被移除
  if (!newNode) {
    console.log('节点被移除 =>', oldNode)
    curPatch.push({ type: patchType.REMOVE })
  // 标签相同，则比较属性和子节点
  } else if (oldNode.tag === newNode.tag) {
    let props = diffProps(oldNode.props, newNode.props)
    if (Object.keys(props).length > 0) {
      curPatch.push({ type: patchType.ATTR, props })
    }
    //子节点为文本内容
    if (isString(oldNode) && isString(newNode)) {
      if (oldNode !== newNode) {
        curPatch.push({ type: patchType.TEXT, text: newNode })
      }
    } else {
      // 遍历子节点
      oldNode.children.forEach((item, i) => {
        TreeWalker(item, newNode.children[i], patchs, ++Index)
      })
    }
  // 节点被替换
  } else {
    curPatch.push({ type: patchType.REPLACE, newNode })
  }

  if (curPatch.length > 0) {
    patchs[index] = curPatch
  }
}

function diffProps(oldProps, newProps) {
  let patch = {}
  //比较属性是否改变
  for (let key in oldProps) {
    if (oldProps[key] !== newProps[key]) {
      patch[key] = newProps[key]
    }
  }
  //比较属性是否新增
  for (let key in newProps) {
    if (!oldProps.hasOwnProperty(key)) {
      patch[key] = newProps[key]
    }
  }
  return patch;
}

function isString(node) {
  return Object.prototype.toString.call(node) === '[object String]'
}

export { diff }