var Vue = require('vue');

var chosenId = null,
	selectNoArr = [],
    paperModel = null;

$(function() {
	paperModel = new Vue({
        el: "#menu",
        data: {
            currentIndex: 0,
            
            //纸样制作 
            sample1: [],
            sample2: [],
            
            //唛架 
            maker: [],
            modifyMaker: [],
            
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
                    paperModel[val] = data;
            	})
            }
        }
    })

	// initAction();
    
    //初始时获取第一项数据
    paperModel.toggle(0,[5,5],['sample1','sample2']);
    
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

function initAction() {
	/*******************纸样制作入口********************/
	$("#sample-enter").bind('click', function(event) {
		var reqData1 = getDressByStatus(5);
		var sample1 = avalon.define({
			$id: "sample1",
			dress: reqData1
		});

		var reqData2 = getDressByStatus(16);
		var sample2 = avalon.define({
			$id: "sample2",
			dress: reqData2
		});
	}).click();


	/*******************唛架*********************/
	$("#marker-enter").bind('click', function(event) {
		$.ajax({
			url: '../include/schedule/get_dress_by_status.php',
			type: 'GET',
			dataType: 'JSON',
			data: {status: 39}
		})
		.done(function(data) {
			if(data.ret==0){
				var dressList = data.list;
				console.log(dressList);
				var domStr = "";
				listNoArr = [];
				$.each(dressList, function(i, val) {
					listNoArr.push(val.design_no);
					domStr += '<tr>'
							+	'<td width="5%">'
							+		'<span class="check-box" id="' + val.design_no + '"></span>'
							+	'</td>'
							+	'<td width="15%">' + val.design_no + '</td>'
							+	'<td width="20%">' + getFormatTime(val.allotpattern_time) + '</td>'
							+	'<td width="10%">' + getGender(val.gender) + '</td>'
							+	'<td width="10%">' + getSeries(val.series_id) + '</td>'
							+	'<td width="20%">'
							+		'<span class="list-button" id="button_' + val.design_no + '">申请审批</spam>'
							+	'</td>'
							+	'<td width="20%"><input type="text" id="input_' + val.design_no + '" /></td>'
							+'</tr>';
				});
				$("#marker #sheet .table-list").html(domStr);
			}else{
				console.log("没有款式申请纸样制作");
			}	
		})
		.fail(function() {
			console.log("error");
		})
		.always(function() {
			console.log("complete");
		});
		//修改唛架
		$.ajax({
			url: '../include/schedule/get_dress_by_status.php',
			type: 'GET',
			dataType: 'JSON',
			data: {status: 50}
		})
		.done(function(data) {
			if(data.ret==0){
				var dressList = data.list;
				console.log(dressList);
				var domStr = "";
				listNoArr = [];
				$.each(dressList, function(i, val) {
					listNoArr.push(val.design_no);
					domStr += '<tr>'
							+	'<td width="5%">'
							+		'<span class="check-box" id="' + val.design_no + '"></span>'
							+	'</td>'
							+	'<td width="15%">' + val.design_no + '</td>'
							+	'<td width="20%">' + getFormatTime(val.marker_applyadjust_time) + '</td>'
							+	'<td width="10%">' + getGender(val.gender) + '</td>'
							+	'<td width="10%">' + getSeries(val.series_id) + '</td>'
							+	'<td width="20%"><input type="text" id="input_' + val.design_no + '" /></td>'
							+	'<td width="20%">'
							+		'<span class="list-button" id="button_' + val.design_no + '">申请</spam>'
							+	'</td>'
							+'</tr>';
				});
				$("#marker #editSheet .table-list").html(domStr);
			}else{
				console.log("没有款式申请纸样制作");
			}	
		})
		.fail(function() {
			console.log("error");
		})
		.always(function() {
			console.log("complete");
		});
	});
	//唛架申请审批
	$("#marker #sheet .table-list").on('click', '.list-button', function() {
		var $this = $(this);
		var dress_id = parseInt($this.attr('id').split('_')[1]);
		if($.inArray(dress_id, selectNoArr) == -1) {
			selectNoArr.push(dress_id);
		}
		$.confirm({
			"words": "确定申请审批吗？",
			"yesCallback": function(){
				top.updateDressStatus(40, selectNoArr, "marker_applycheck_time");
			}
		});	
	});
	//修改唛架申请审批
	$("#marker #editSheet .table-list").on('click', '.list-button', function() {
		var $this = $(this);
		var dress_id = parseInt($this.attr('id').split('_')[1]);
		if($.inArray(dress_id, selectNoArr) == -1) {
			selectNoArr.push(dress_id);
		}
		var reason = $this.closest('tr').find('input').val();
		$.confirm({
			"words": "确定申请审批吗？",
			"yesCallback": function(){
				top.submitAdujustMakerReason(selectNoArr,reason);
				top.updateDressStatus(51, selectNoArr, "marker_applycheckadjust_time");
			}
		});	
	});
}

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