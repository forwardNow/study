import React from 'react';

function Hello(props) {
  return <p>Hello, { props.name }{ props.gender ? '先生' : '女士'} !</p>;
}

export default Hello;