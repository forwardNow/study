import React from 'react';
import ReactDom from 'react-dom';

class Person extends React.Component {
  render() {
    return <div>Hello world!</div>;
  }
}

const vnode = <div>
  <Person></Person>
</div>;

ReactDom.render(vnode, document.querySelector('#app'));
