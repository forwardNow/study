import React from 'react';
import ReactDom from 'react-dom';

import './assets/css/commentList.css';

function CommentItem(props) {
  return <div>{ props.user } : { props.content }</div>;
}

class CommentList extends React.Component {
  constructor() {
    super();

    this.state = {
      msg: '评论列表',
      list: [
        { id: 1, user: '张三1', content: '哇哈哈1' },
        { id: 2, user: '张三2', content: '哇哈哈2' },
        { id: 3, user: '张三3', content: '哇哈哈3' },
      ],
    };
  }

  render() {
    const { msg } = this.state;

    return <div>
      <h1 className="title">{ msg }</h1>

      { this.state.list.map(item => <CommentItem key={item.id} {...item}></CommentItem>) }
    </div>;
  }
}

const vnode = <div>
  <CommentList></CommentList>
</div>;

ReactDom.render(vnode, document.querySelector('#app'));
