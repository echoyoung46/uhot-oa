var Vue = require('vue');

var chosenId = null,
	selectNoArr = [],
	designModel = null;

$(function() {
	designModel = new Vue({
        el: "#menu",
        data: {
            currentIndex: 0,
            
            //档案
            basicFile: [],
            
            //调料
            season1: [],
            season2: [],
            
            //头版样衣制作 
            sample1: [],
            sample2: [],
            
            //审版
            viewer: [],
            
            //复版
            dubviewer1: [],
            dubviewer2: [],
            
            //设计助理预采单
            repurchase1: [],
            repurchase2: [],
            
            //设计师预采单 
            repurchaseD1: [],
            repurchaseD2: [],
            repurchaseD3: [],
            
            //设计主管预采单 
            repurchaseM1: [],
            repurchaseM2: [],
            repurchaseM3: []
            
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
                    console.log(data);
                    designModel[val] = data;
            	})
            }
        }
    })

    //初始时获取第一项数据
    designModel.toggle(0, [1], ['basicFile']);
    
    bindEvent();
});

function bindEvent(){
	$('.page-menu').on('click','li',function(){
		var $this = $(this);
		$this.addClass('active').siblings().removeClass('active');
	});
	
	$('.list-title .checkAll').on('click', function(){
		var $this = $(this);
		var $list = $this.closest('.status-box').find('.list-detail input');
		if($this.is(':checked')){
			$list.each(function(i, el){
				$(el).attr('checked','true');
			});
		}else{
			$list.each(function(i, el){
				$(el).removeAttr('checked');
			});
		}
	});
}

/**
 * Vue 时间格式转换
 */
Vue.filter('transTime', function (_time) {
    //时间格式转换
    var t = _time,
        _year = t.getFullYear(),
        _month = t.getMonth() + 1,
        _day = t.getDate(),
        _hour = t.getHours(),
        _min = t.getMinutes(),
        _sec = t.getSeconds(),
        timeResult = _year + '-' + _month + '-' + _day + ' ' + _hour + ':' + _min + ':' + _sec; 
    return timeResult;
})

/**
 * 时间格式转换过滤器
 */
Vue.filter('transTime', function (_time) {
    var t = new Date(parseInt(_time)),
        _year = t.getFullYear(),
        _month = t.getMonth() + 1,
        _day = t.getDate(),
        _hour = t.getHours(),
        _min = t.getMinutes(),
        _sec = t.getSeconds(),
        timeResult = _year + '-' + _month + '-' + _day + ' ' + _hour + ':' + _min + ':' + _sec; 
    return timeResult;
})

/**
 * 男女装过滤器
 */
Vue.filter('getGender', function (value) {
    if(value == '1'){
        return '男装'
    }else if(value == '2'){
        return '女装'
    }else {
        return '其他'
    }
})

/**
 * 系列过滤器
 */
Vue.filter('getSeries', function (value) {
    if(value == '1'){
        return '贵尚'
    }else if(value == '2'){
        return '雅尚'
    }else if(value == '3'){
        return '器尚'
    }else if(value == '4'){
        return '风尚'
    }else if(value == '5'){
        return '外采'
    }else {
        return '其他'
    }
})

/**
 * 生产方式过滤器
 */
Vue.filter('getSource', function (value) {
    if(value == '1'){
        return '自产'
    }else if(value == '2'){
        return '外采'
    }else {
        return '其他'
    }
})

function initSave(){
	
	$('#season-save-button').on('click', function(){
		selectNoArr = [];
		var carversionName = $('.sampler-select').val();
		$('#season .list-checkbox input:checked').each(function(i, el){
			var $el = $(el);
			var dressId = $el.closest('dl').find('.design-no').html();
			selectNoArr.push(parseInt(dressId));
		});
		if(selectNoArr.length == 0) {
			selectNoArr.push(parseInt(chosenId));
		}
		adoptSampler(selectNoArr, samplerName);
		updateDressStatus(4, selectNoArr, "apply_makefront_time");
	});

	//样衣审版通过
	$('#sample-pass-button').on('click', function(){
		selectNoArr = [];
		var checkOption = $('.check-option').val();
		$('#sample2 .list-checkbox input:checked').each(function(i, el){
			var $el = $(el);
			var dressId = $el.closest('dl').find('.design-no').html();
			selectNoArr.push(parseInt(dressId));
		});
		if(selectNoArr.length == 0) {
			selectNoArr.push(parseInt(chosenId));
		}
		updateDressStatus(10, selectNoArr, "passversion_time");
	});

	//样衣申请复版
	$('#sample-dubview-button').on('click', function(){
		selectNoArr = [];
		var checkOption = $('.check-opinion').val();
		$('#sample .list-checkbox input:checked').each(function(i, el){
			var $el = $(el);
			var dressId = $el.closest('dl').find('.design-no').html();
			selectNoArr.push(parseInt(dressId));
		});
		if(selectNoArr.length == 0) {
			selectNoArr.push(parseInt(chosenId));
		}
		submitDubVersionAdvice(selectNoArr, checkOption);
		updateDressStatus(14, selectNoArr, "dub_applyversion_time");
	});

	//提交审批
	$('#viewer-button').on('click', function(){
		selectNoArr = [];
		var checkOption = $('.check-option').val();
		$('#sample .list-checkbox input:checked').each(function(i, el){
			var $el = $(el);
			var dressId = $el.closest('dl').find('.design-no').html();
			selectNoArr.push(parseInt(dressId));
		});
		if(selectNoArr.length == 0) {
			selectNoArr.push(parseInt(chosenId));
		}
		submitDubVersionAdvice(selectNoArr, checkOption);
		updateDressStatus(11, selectNoArr, "adopt_admitcheck_time");
	});

	//提交审批
	$('#designer-check-button').on('click', function(){
		selectNoArr = [];
		var checkOption = $('.check-option').val();
		$('#designer-check1 .list-checkbox input:checked').each(function(i, el){
			var $el = $(el);
			var dressId = $el.closest('dl').find('.design-no').html();
			selectNoArr.push(parseInt(dressId));
		});
		if(selectNoArr.length == 0) {
			selectNoArr.push(parseInt(chosenId));
		}
		updateDressStatus(12, selectNoArr, "adopt_checked_time");
	});

	//设计主管预采单移交
	$('#transmit-button').on('click', function(){
		selectNoArr = [];
		var checkOption = $('.check-option').val();
		$('#designmonitor-repurchase2 .list-checkbox input:checked').each(function(i, el){
			var $el = $(el);
			var dressId = $el.closest('dl').find('.design-no').html();
			selectNoArr.push(parseInt(dressId));
		});
		if(selectNoArr.length == 0) {
			selectNoArr.push(parseInt(chosenId));
		}
		updateDressStatus(13, selectNoArr, "adopt_transfer_time");
	});
}
