var Vue = require('vue');
var ajaxData = {};
require('./js/plugin/jquery.js');

$(function(){
    var vm = new Vue({
        el: '#container',
        data: {
            index: 0,
            name: ""
        },
        methods: {
            toggle: function(i){
                this.index = i;
            }
        }
    });
    
    $('#clickme').bind('click', function(){
        vm.name = "yangwt";
    })
})




