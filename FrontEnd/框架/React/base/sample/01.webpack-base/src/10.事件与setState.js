import React from 'react';
import ReactDom from 'react-dom';

class BindEvent extends React.Component {
  constructor() {
    super();

    this.state = {
      label: '我是按钮',
      msg: 'hello world',
    };
  }

  sayHello(msg) {
    this.setState({ msg });
  }

  render() {
    const { label, msg } = this.state;

    const handleClick = () => this.sayHello(new Date().toLocaleString());

    return <div>
      <button onClick={handleClick}>{label}</button>
      <p>{ msg }</p>
    </div>;
  }
}

const vnode = <div>
  <BindEvent></BindEvent>
</div>;

ReactDom.render(vnode, document.querySelector('#app'));
