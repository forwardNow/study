import $ from 'jquery';

import 'bootstrap/dist/css/bootstrap.css';

import './css/main.css';
import './css/1.less';
import './css/2.scss';

$(() => {
  $('li:odd').css('backgroundColor', 'red');
  $('li:even').css('backgroundColor', 'pink');
});

class Person {
  static info
}
