import React from 'react';
import ReactDom from 'react-dom';

class Person extends React.Component {
  constructor() {
    super();

    // this.state <==> Vue 选项中的 data 属性
    this.state = {
      msg: 'hello world',
    };
  }

  render() {
    const { name, age } = this.props;
    const { msg } = this.state;

    return <div>
      <h1>{ msg }</h1>
      I'm { name }, { age } years old.
    </div>;
  }
}

const data = {
  name: '张三',
  age: 22,
};

const vnode = <div>
  <Person { ...data }></Person>
</div>;

ReactDom.render(vnode, document.querySelector('#app'));
