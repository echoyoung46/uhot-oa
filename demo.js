var Vue = require('vue');
var ajaxData = {};
require('./js/plugin/jquery.js');

$(function(){
    $.ajax({
        url: './js/dress.json',
        // url: 'include/schedule/get_dress_by_status.php',
        type: 'GET',
        dataType: 'JSON',
        async: false,
        // data: reqData
    })
    .done(function(data) {
        if(data.ret==0){
            ajaxData = data;
        }else{
            console.log("没有款式建档完成");
        }	
    })
    .fail(function() {
        console.log("error");
    })
    .always(function() {
        console.log("complete");
    });
    
    $('.test').bind('click', function(){
        console.log(ajaxData);
        var order1 = new Vue({
            el: '#order',
            data: {
                items: ajaxData.list
            }
        })
    })
})


