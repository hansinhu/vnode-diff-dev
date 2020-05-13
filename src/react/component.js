import { renderComponent } from '../react-dom/render'
class Component {
  constructor (props = {}) {
    this.isReactComponent = true;
    this.state = {};
    this.props = props;
  }
  setState(stateChange) { // state的设置
    Object.assign(this.state, stateChange);
    renderComponent(this);
    // 设置完state后更新dom    
  }
}

export default Component;