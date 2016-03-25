var Vue = require('vue');

var chosenId = null,
	selectNoArr = [],
    readymadeModel = null;

$(function() {
	readymadeModel = new Vue({
        el: "#menu",
        data: {
            currentIndex: 0,
            
            //入仓检验  
            checkin: [],
            
            
            
        },
        methods: {
            
            //显示或隐藏面板
            toggle: function(index, _statusArr, _dataArr) {
                this.currentIndex = index;
                this.getDress(_statusArr, _dataArr);
            },
            
            //提交dress新的状态值
            updateStatus: function(_status, _time){
            	updateDressStatus(_status, selectNoArr, _time);
            },
            
            //点击操作按钮获取衣服的id
            getChosenId: function(_id){
            	if($.inArray(_id, selectNoArr) < 0){
					selectNoArr.push(_id);
				}
            },
            
            //根据status获取dress列表，填充对应的model
            getDress: function(_statusArr, _dataArr){
                
            	$.each(_dataArr, function(i, val){
            		var data = getDressByStatus(_statusArr[i]);
                    console.log(val);
                    console.log(data);
                    readymadeModel[val] = data;
            	})
            }
        }
    })

	// initAction();
    
    //初始时获取第一项数据
    readymadeModel.toggle(0,[45],['checkin']);
    
	// initSave();
	bindEvent();
});

function bindEvent() {
	$('.page-menu').on('click', 'li', function () {
		var $this = $(this);
		$this.addClass('active').siblings().removeClass('active');
	});

	$('.list-title .checkAll').on('click', function () {
		var $this = $(this);
		var $list = $this.closest('.status-box').find('.list-detail input');
		if ($this.is(':checked')) {
			$list.each(function (i, el) {
				$(el).attr('checked', 'true');
			});
		} else {
			$list.each(function (i, el) {
				$(el).removeAttr('checked');
			});
		}
	});
}