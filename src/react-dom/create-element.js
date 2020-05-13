class VNode {
  constructor(tag, props, children) {
      if (!props) {
        props = {}
      }
      this.tag = tag
      this.props = props
      this.children = children
      this.key = props.key || null
  }
}

function createElement(tag, props, ...children) {
  return new VNode(tag, props, children)
}

export { VNode }

export default createElement;
