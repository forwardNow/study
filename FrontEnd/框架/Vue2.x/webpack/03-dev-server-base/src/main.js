import $ from 'jquery';

$(() => {
  $('li:odd').css('backgroundColor', 'red');
  $('li:even').css('backgroundColor', 'pink');
});
