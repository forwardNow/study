// 1.导入包
import React from 'react';
import ReactDom from 'react-dom';

/**
 * 2.创建虚拟 DOM 元素
 * @param-1 {string} 元素的类型
 * @param-2 {object} 元素的属性
 * @param-3 {object|string} 子节点（其他虚拟 DOM 或者文本子节点）
 * @param-n {object} 其他子节点
 *
 * @example
 * <h1 id='myh1' title='标题'>我是大标题</h1>
 */
const myh1 = React.createElement(
  'h1',
  {
    id: 'myh1',
    title: '标题',
  },
  '我是大标题',
);

/**
 * 3.将虚拟 DOM 渲染到页面的 DOM 元素
 * @param-1 {object} 虚拟 DOM 对象
 * @param-2 {HTMLElement} DOM 容器
 */
ReactDom.render(myh1, document.querySelector('#app'));
