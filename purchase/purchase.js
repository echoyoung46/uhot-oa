var Vue = require('vue');

var chosenId = null,
	selectNoArr = [],
	purchaseModel = null;

$(function() {
	purchaseModel = new Vue({
        el: "#menu",
        data: {
            currentIndex: 0,
            
            //调料申请 
            spicesApply: [],
            
            //预采任务单
            purchase: [],
            
            //下单表
            orderSheet: [],
            
            //检验入库
            checkIn: [],
            
            //需处理
            handling: [],
            
            //补货 
            replenishment: [],
            
            //补货入库
            replenishmentIn: [],
            
            //成本核算
            cost: []
            
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
                    purchaseModel[val] = data;
            	})
            }
        }
    })

    //初始时获取第一项数据
    purchaseModel.toggle(0, [2], ['spicesApply']);
    
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

function initSave() {
	//成本核算-移交
	$('#costs2-save-button').on('click', function(){
		var selectArr = getSelectArr("costs2");
		updateDressStatus(23, selectArr, "confirmtrans_time");
	});
}

function initAction(){
	/******************调料申请入口******************/
	$('#spicesApply-enter').on('click', function(event) {
		event.preventDefault();
		var reqData = getDressByStatus(2);
		var filing = avalon.define({
			$id: "spices",
			dress: reqData
		})
	}).click();

	/*****************成本核算入口*******************/
	$('#cost-accounting-enter').on('click', function(event) {
		event.preventDefault();
		var reqData2 = getDressByStatus(22);
		var costs2 = avalon.define({
			$id: "costs2",
			dress: reqData2
		})
	}).click();
}



/*$(function() {
	initList();
	initAction();
});

function  initAction() {
	//基础档案-申请调料按钮
	$("#spicesApply .table-list").on('click', '.list-button', function() {
		console.log(selectNoArr);
		var $this = $(this);
		var dress_id = parseInt($this.attr('id').split('_')[1]);
		if($.inArray(dress_id, selectNoArr) == -1) {
			selectNoArr.push(dress_id);
		}
		$.confirm({
			"words": "确定完成调料？",
			"yesCallback": function(){
				top.updateDressStatus(3, selectNoArr, "finish_transmaterial_time");
			}
		});	
	});
	//录入完成
	$("#repurchase-list .table-list").on('click', '.list-button', function() {
		var $this = $(this);
		var dress_id = parseInt($this.attr('id').split('_')[1]);
		var styleNo = parseInt($this.closest('tr').find('.styleno-input').val());
		if($.inArray(dress_id, selectNoArr) == -1){
			selectNoArr.push(dress_id);
		}
		$.confirm({
			"words": "确定系统录入完成吗？",
			"yesCallback": function(){
				top.submitStyleNo(selectNoArr, styleNo);
				top.updateDressStatus(22, selectNoArr, "typein_materialsheet_time");
			}
		});	
	});*/
	/***********************预采任务单入口***********************/
	/*$("#repurchase-list-enter").bind('click',function(){
		$.ajax({
			url: '../include/schedule/get_dress_by_status.php',
			type: 'GET',
			dataType: 'JSON',
			data: {status: 31,source: 1}
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
							+	'<td width="10%">' + val.design_no + '</td>'
							+	'<td width="15%">' + getFormatTime(val.apply_transmaterial_time) + '</td>'
							+	'<td width="10%">' + getGender(val.gender) + '</td>'
							+	'<td width="10%">' + getSeries(val.series_id) + '</td>'
	 						+	'<td width="25%">'
							+		'<a class="sheetLink" id="sheet_' + val.design_no + '"><img src="../image/sheet.png"></a>'
							+	'</td>'
							+	'<td width="25%"><span class="list-button" id="button_' + val.design_no + '">完成</sapn></td>'
							+'</tr>';
				});
				$("#repurchase-list .table-list").html(domStr);
			}else{
				console.log("没有款式申请调料");
			}	
		})
		.fail(function() {
			console.log("error");
		})
		.always(function() {
			console.log("complete");
		});
	})
	//整款入仓
	$("#repurchase-list .table-list").on('click', '.list-button', function() {
		var $this = $(this);
		var dress_id = parseInt($this.attr('id').split('_')[1]);
		if($.inArray(dress_id, selectNoArr) == -1) {
			selectNoArr.push(dress_id);
		}
		$.confirm({
			"words": "确定整款入仓吗？",
			"yesCallback": function(){
				top.updateDressStatus(32, selectNoArr, "instore_finish_time");
			}
		});	
	});*/
	/********************成本核算入口*******************/
	/*$("#cost-accounting-enter").bind('click', function(){
		$.ajax({
			url: '../include/schedule/get_dress_by_status.php',
			type: 'GET',
			dataType: 'JSON',
			data: {status: 22}
		})
		.done(function(data) {
			if(data.ret==0){
				var dressList = data.list;
				var domStr = "";
				listNoArr = [];
				$.each(dressList, function(i, val) {
					listNoArr.push(val.design_no);
					domStr += '<tr>'
							+	'<td width="5%">'
							+		'<span class="check-box" id="' + val.design_no + '"></span>'
							+	'</td>'
							+	'<td width="15%">' + val.design_no + '</td>'
							+	'<td width="15%">' + getFormatTime(val.typein_materialsheet_time) + '</td>'
							+	'<td width="10%">' + getGender(val.gender) + '</td>'
							+	'<td width="10%">' + getSeries(val.series_id) + '</td>'
							+	'<td width="20%">'
							+		'<span class="list-button" id="upload_' + val.design_no + '">上传</span>'
							+	'</td>'
							+	'<td width="25%"><span class="list-button" id="button_' + val.design_no + '">完成</span></td>'
							+'</tr>';
				});
				$("#cost-accounting #transfer .table-list").html(domStr);
			}else{
				console.log("没有款式申请调料");
			}	
		})
		.fail(function() {
			console.log("error");
		})
		.always(function() {
			console.log("complete");
		});
	});
	//确认移交
	$("#cost-accounting #transfer .table-list").on('click', '.list-button', function() {
		var $this = $(this);
		var dress_id = parseInt($this.attr('id').split('_')[1]);
		var styleNo = parseInt($this.closest('tr').find('.styleno-input').val());
		if($.inArray(dress_id, selectNoArr) == -1){
			selectNoArr.push(dress_id);
		}
		$.confirm({
			"words": "确定移交吗？",
			"yesCallback": function(){
				top.submitStyleNo(selectNoArr, styleNo);
				top.updateDressStatus(23, selectNoArr, "confirmtrans_time");
			}
		});	
	});
}
function initList() {
	$.ajax({
		url: '../include/schedule/get_dress_by_status.php',
		type: 'GET',
		dataType: 'JSON',
		data: {status: 2}
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
						+	'<td width="20%">' + getFormatTime(val.apply_transmaterial_time) + '</td>'
						+	'<td width="15%">' + getGender(val.gender) + '</td>'
						+	'<td width="15%">' + getSeries(val.series_id) + '</td>'
 						+	'<td width="15%">'
						+		'<a class="sheetLink" id="sheet_' + val.design_no + '"><img src="../image/sheet.png"></a>'
						+	'</td>'
						+	'<td width="15%"><span class="list-button" id="button_' + val.design_no + '">完成</sapn></td>'
						+'</tr>';
			});
			$("#spicesApply .table-list").html(domStr);
		}else{
			console.log("没有款式申请调料");
		}	
	})
	.fail(function() {
		console.log("error");
	})
	.always(function() {
		console.log("complete");
	});

	$('#replenishment-enter').bind('click', function(event) {
		var closeTable = new Table();
		closeTable.init({
        	tableTitle: '<td width="5%"><span class="check-box"></span></td><td width="15%">款号</td><td width="10%">女/男装</td><td width="10%">系列</td><td width="15%">补货时间</td><td width="15%">预采任务单</td><td width="30%">整款入仓</td>',
        	tableBody: [{"width": "5%", "val": "", "type" : "checkbox"},{"width": "15%", "val": "design_no", "type" : "data"},{"width": "10%", "val": "d_gender", "type" : "data"},{"width": "10%", "val": "series_id", "type" : "data"},{"width": "15%", "val": "refle_confirm_time", "type" : "data"},{"width": "15%", "val": "", "type" : "sheet"},{"width": "30%", "val": "完成", "type" : "button"}],
        	currStatus: 57,
	        currTimeType: "refle_confirm_time",
	        submitStatus: 58,
        	submitTimeType: "reple_instore_time",
        	operatorWords: "确定整款入仓吗？"
		});
	});
}*/