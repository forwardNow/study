import React from 'react';
import ReactDom from 'react-dom';

class Person extends React.Component {
  render() {
    const { name, age } = this.props;

    return <div>I'm { name }, { age } years old.</div>;
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
