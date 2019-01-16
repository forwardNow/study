import React from 'react';
import ReactDom from 'react-dom';

/**
 * 通过构造函数创建组件
 * @param props {object} 接收外界传递过来的数据，props 是只读的
 * @returns {JSX | string | null} 返回模板
 */
function Hello(props) {
  return <p>Hello, { props.name }{ props.gender ? '先生' : '女士'} !</p>;
}

const data = {
  name: '张三',
  gender: 1,
};

const div = <div>
  <Hello { ...data }></Hello>
</div>;

ReactDom.render(div, document.querySelector('#app'));
