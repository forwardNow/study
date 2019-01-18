import React from 'react';
import ReactDom from 'react-dom';

class Clock extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      msg: 123,
    };
  }

  // created
  componentWillMount() {
    this.setState({ msg: 456 });
    console.log('componentWillMount()');
  }

  // mounted
  componentDidMount() {
    console.log('componentDidMount()');
  }

  // beforeDestroy
  componentWillUnmount() {
    console.log('componentWillUnmount()', this.state.msg);
  }


  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>{this.state.msg}.</h2>
      </div>
    );
  }
}

const vnode = <div>
  <Clock></Clock>
</div>;

ReactDom.render(vnode, document.querySelector('#app'));
