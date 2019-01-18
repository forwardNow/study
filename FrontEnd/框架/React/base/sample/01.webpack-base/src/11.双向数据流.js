import React from 'react';
import ReactDom from 'react-dom';

class BindEvent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      label: '我是按钮',
      msg: 'hello world',
    };
  }

  changeMsg(msg) {
    this.setState({ msg });
  }

  render() {
    const { label, msg } = this.state;

    const handleBtnClick = () => this.changeMsg(new Date().toLocaleString());

    const handleTextChange1 = event => this.changeMsg(event.target.value);

    const handleTextChange2 = () => this.changeMsg(this.refs.input.value);

    return <div>
      <button onClick={ handleBtnClick }>{ label }</button>
      <p>{ msg }</p>

      <p>通过事件对象传递输入域的值：
        <input type="text" value={ msg } onChange={ handleTextChange1 }/>
      </p>
      <p>通过 DOM 引用传递输入域的值：
        <input type="text" value={ msg } onChange={ handleTextChange2 } ref='input'/>
      </p>
    </div>;
  }
}

const vnode = <div>
  <BindEvent></BindEvent>
</div>;

ReactDom.render(vnode, document.querySelector('#app'));
