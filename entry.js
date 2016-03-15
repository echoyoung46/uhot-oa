require("./style.css");

var Vue = require('vue');

var example1 = new Vue({
  el: '#example-1',
  data: {
    items: [
      { message: 'Foo' , info: 'aaa'},
      { message: 'Bar' , info: 'bbb'}
    ]
  }
})