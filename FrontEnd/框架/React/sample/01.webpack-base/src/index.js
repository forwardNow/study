import React from 'react';
import ReactDom from 'react-dom';

/**
 * 通过构造函数创建组件
 * @param proops {object} 接收外界传递过来的数据，props 是只读的
 * @returns {JSX | string | null} 返回模板
 */
function Hello(proops) {
  return <p>Hello, { proops.name } !</p>;
}

const div = <div>
  <Hello name='张三'></Hello>
</div>;

ReactDom.render(div, document.querySelector('#app'));
