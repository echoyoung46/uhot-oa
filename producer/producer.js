var Vue = require('vue');

var chosenId = null,
	selectNoArr = [],
    producerModel = null;

$(function() {
	producerModel = new Vue({
        el: "#menu",
        data: {
            currentIndex: 0,
            
            //下单表 
            order: [],
            
            //工艺单 
            craft: [],
            
            //产前版发料 
            prenatal1: [],
            prenatal2: [],
            
            //大货发料 
            cargo1: [],
            cargo2: [],
            
            
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
                    producerModel[val] = data;
            	})
            }
        }
    })

	// initAction();
    
    //初始时获取第一项数据
    // producerModel.toggle(4, [27], ['order1']);
    
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

function initSave() {
	$('#cargono-save-button').on('click', function () {
		var selectArr = getSelectArr("apply");
		var cargoNo = $('.cargo-no').val();
		submitStyleNo(selectArr, cargoNo);
		updateDressStatus(20, selectArr, "finish_styleno_time");
	});

	$('#repurchase-save-button').on('click', function () {
		var selectArr = getSelectArr("repurchase");
		updateDressStatus(22, selectArr, "typein_materialsheet_time");
	});
}

function initAction() {
	/*******************申请款号入口*******************/
	$("#apply-no-enter").on('click', function(){
		var reqData = getDressByStatus(13);
		var apply = avalon.define({
			$id: "apply",
			dress: reqData
		})
	}).click();

	/********************预采任务单入口**********************/
	$("#repurchase-list-enter").bind('click', function(){
		var reqData = getDressByStatus(21);
		var apply = avalon.define({
			$id: "repurchase",
			dress: reqData
		})

	}).click();
	//录入完成
	$("#repurchase-list .table-list").on('click', '.list-button', function() {
		var $this = $(this);
		var dress_id = parseInt($this.attr('id').split('_')[1]);
		var styleNo = parseInt($this.closest('tr').find('.styleno-input').val());
		if($.inArray(dress_id, selectNoArr) == -1) {
			selectNoArr.push(dress_id);
		}
		$.confirm({
			"words": "确定系统录入完成吗？",
			"yesCallback": function(){
				top.submitStyleNo(selectNoArr, styleNo);
				top.updateDressStatus(22, selectNoArr, "typein_materialsheet_time");
			}
		});
	});
	/********************外采预采任务单入口**********************/
	$("#craftmaterial-list-enter").bind('click', function(){
		$.ajax({
			url: '../include/schedule/get_dress_by_status.php',
			type: 'GET',
			dataType: 'JSON',
			data: {status: 21,source: 2}
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
							+	'<td width="15%">' + getFormatTime(val.typein_product_time) + '</td>'
							+	'<td width="10%">' + getGender(val.gender) + '</td>'
							+	'<td width="10%">' + getSeries(val.series_id) + '</td>'
							+	'<td width="15%">'
							+		'<a class="sheetLink" id="sheet_' + val.design_no + '"><img src="../image/sheet.png"></a>'
							+	'</td>'
							+	'<td width="15%"><input type="text" class="styleno-input" id="input_' + val.design_no + '" /></td>'
							+	'<td width="15%"><span class="list-button" id="button_' + val.design_no + '">完成</span></td>'
							+'</tr>';
				});
				$("#craftmaterial-list .table-list").html(domStr);
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
	//录入完成
	$("#craftmaterial-list .table-list").on('click', '.list-button', function() {
		var $this = $(this);
		var dress_id = parseInt($this.attr('id').split('_')[1]);
		if($.inArray(dress_id, selectNoArr) == -1) {
			selectNoArr.push(dress_id);
		}
		$.confirm({
			"words": "确定系统录入完成吗？",
			"yesCallback": function(){
				top.updateDressStatus(22, selectNoArr, "typein_materialsheet_time");
			}
		});
	});
	/********************工艺单入口****************/
	$("#process-sheet-enter").bind('click', function(){
		var processStr = "";
		$.ajax({
			url: '../include/schedule/get_dress_by_status.php',
			type: 'GET',
			dataType: 'JSON',
			data: {status: 33}
		})
		.done(function(data) {
			if(data.ret==0){
				var dressList = data.list;
				listNoArr = [];
				$.each(dressList, function(i, val) {
					listNoArr.push(val.design_no);
					processStr += '<tr>'
							+	'<td width="5%">'
							+		'<span class="check-box" id="' + val.design_no + '"></span>'
							+	'</td>'
							+	'<td width="10%">' + val.design_no + '</td>'
							+	'<td width="10%">' + getFormatTime(val.inrecord_finish_time) + '</td>'
							+	'<td width="5%">' + getGender(val.gender) + '</td>'
							+	'<td width="5%">' + getSeries(val.series_id) + '</td>'
							+	'<td width="10%">'
							+		'<a class="sheetLink" id="sheet_' + val.design_no + '"><img src="../image/sheet.png"></a>'
							+	'</td>'
							+	'<td width="15%"><input type="text" class="styleno-input" id="input_' + val.design_no + '" /></td>'
							+	'<td width="10%"><span class="maker-button" id="makerbutton_' + val.design_no + '">申请</span></td>'
							+	'<td width="10%"><span class="process-button" id="processbutton_' + val.design_no + '">申请</span></td>'
							+	'<td width="10%"><span class="list-button sample-button" id="samplebutton_' + val.design_no + '">申请</span></td>'
							+	'<td width="10%"><span class="editmaker-button" id="editmakerbutton_' + val.design_no + '">申请</span></td>'
							+'</tr>';
				});
				$("#process-sheet .table-list").html(processStr);
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
		//申请唛架
		$.ajax({
			url: '../include/schedule/get_dress_by_status.php',
			type: 'GET',
			dataType: 'JSON',
			data: {status: 38}
		})
		.done(function(data) {
			if(data.ret==0){
				var dressList = data.list;
				listNoArr = [];
				// var domStr = "";
				$.each(dressList, function(i, val) {
					listNoArr.push(val.design_no);
					processStr += '<tr>'
							+	'<td width="5%">'
							+		'<span class="check-box" id="' + val.design_no + '"></span>'
							+	'</td>'
							+	'<td width="10%">' + val.design_no + '</td>'
							+	'<td width="10%">' + getFormatTime(val.preedition_allsend_time) + '</td>'
							+	'<td width="5%">' + getGender(val.gender) + '</td>'
							+	'<td width="5%">' + getSeries(val.series_id) + '</td>'
							+	'<td width="10%">'
							+		'<a class="sheetLink" id="sheet_' + val.design_no + '"><img src="../image/sheet.png"></a>'
							+	'</td>'
							+	'<td width="15%"><input type="text" class="styleno-input" id="input_' + val.design_no + '" /></td>'
							+	'<td width="10%"><span class="list-button maker-button" id="makerbutton_' + val.design_no + '">申请</span></td>'
							+	'<td width="10%"><span class="process-button" id="processbutton_' + val.design_no + '">申请</span></td>'
							+	'<td width="10%"><span class="sample-button" id="samplebutton_' + val.design_no + '">申请</span></td>'
							+	'<td width="10%"><span class="editmaker-button" id="editmakerbutton_' + val.design_no + '">申请</span></td>'
							+'</tr>';
				});
				$("#process-sheet .table-list").html(processStr);
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
		//申请修改唛架
		$.ajax({
			url: '../include/schedule/get_dress_by_status.php',
			type: 'GET',
			dataType: 'JSON',
			data: {status: 41}
		})
		.done(function(data) {
			if(data.ret==0){
				var dressList = data.list;
				listNoArr = [];
				// var domStr = "";
				$.each(dressList, function(i, val) {
					listNoArr.push(val.design_no);
					processStr += '<tr>'
							+	'<td width="5%">'
							+		'<span class="check-box" id="' + val.design_no + '"></span>'
							+	'</td>'
							+	'<td width="10%">' + val.design_no + '</td>'
							+	'<td width="10%">' + getFormatTime(val.preedition_allsend_time) + '</td>'
							+	'<td width="5%">' + getGender(val.gender) + '</td>'
							+	'<td width="5%">' + getSeries(val.series_id) + '</td>'
							+	'<td width="10%">'
							+		'<a class="sheetLink" id="sheet_' + val.design_no + '"><img src="../image/sheet.png"></a>'
							+	'</td>'
							+	'<td width="15%"><input type="text" class="styleno-input" id="input_' + val.design_no + '" /></td>'
							+	'<td width="10%"><span class="maker-button" id="makerbutton_' + val.design_no + '">申请</span></td>'
							+	'<td width="10%"><span class="process-button" id="processbutton_' + val.design_no + '">申请</span></td>'
							+	'<td width="10%"><span class="sample-button" id="samplebutton_' + val.design_no + '">申请</span></td>'
							+	'<td width="10%"><span class="list-button editmaker-button" id="editmakerbutton_' + val.design_no + '">申请</span></td>'
							+'</tr>';
				});
				$("#process-sheet .table-list").html(processStr);
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
	//申请纸样
	$("#process-sheet .table-list").on('click', '.list-button.sample-button', function() {
		var $this = $(this);
		var dress_id = parseInt($this.attr('id').split('_')[1]);
		var styleNo = parseInt($this.closest('tr').find('.styleno-input').val());
		if($.inArray(dress_id, selectNoArr) == -1) {
			selectNoArr.push(dress_id);
		}
		$.confirm({
			"words": "确定申请纸样吗？",
			"yesCallback": function(){
				top.submitStyleNo(selectNoArr, styleNo);
				top.updateDressStatus(34, selectNoArr, "pattern_apply_time");
			}
		});
	});
	//申请唛架
	$("#process-sheet .table-list").on('click', '.list-button.maker-button', function() {
		var $this = $(this);
		var dress_id = parseInt($this.attr('id').split('_')[1]);
		if($.inArray(dress_id, selectNoArr) == -1) {
			selectNoArr.push(dress_id);
		}
		$.confirm({
			"words": "确定申请唛架吗？",
			"yesCallback": function(){
				top.updateDressStatus(39, selectNoArr, "marker_apply_time");
			}
		});
	});
	//申请修改唛架
	$("#process-sheet .table-list").on('click', '.list-button.editmaker-button', function() {
		var $this = $(this);
		var dress_id = parseInt($this.attr('id').split('_')[1]);
		if($.inArray(dress_id, selectNoArr) == -1) {
			selectNoArr.push(dress_id);
		}
		$.confirm({
			"words": "确定申请修改唛架吗？",
			"yesCallback": function(){
				top.updateDressStatus(50, selectNoArr, "marker_applyadjust_time");
			}
		});
	});
	/******************下单表入口******************/
	$("#order-table-enter").bind('click',function(){
		$.ajax({
			url: '../include/schedule/get_dress_by_status.php',
			type: 'GET',
			dataType: 'JSON',
			data: {status: 30}
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
							+	'<td width="15%">' + getFormatTime(val.typein_product_time) + '</td>'
							+	'<td width="10%">' + getGender(val.gender) + '</td>'
							+	'<td width="10%" class="source-id" id="source_' + val.source + '">' + getSource(val.source) + '</td>'
							+	'<td width="10%">下单完成</td>'
							+	'<td width="25%"><input type="text" class="styleno-input" id="input_' + val.design_no + '" /></td>'
							+	'<td width="10%"><span class="list-button" id="button_' + val.design_no + '">完成</span></td>'
							+'</tr>';
				});
				$("#order-table .table-list").html(domStr);
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
	//录入完成
	$("#order-table .table-list").on('click', '.list-button', function() {
		var $this = $(this);
		var dress_id = parseInt($this.attr('id').split('_')[1]);
		var styleNo = parseInt($this.closest('tr').find('.styleno-input').val());
		if($.inArray(dress_id, selectNoArr) == -1) {
			selectNoArr.push(dress_id);
		}
		$.confirm({
			"words": "确定录入完成吗？",
			"yesCallback": function(){
				top.submitStyleNo(selectNoArr, styleNo);
				top.updateDressStatus(31, selectNoArr, "order_typein_time");
			}
		});
	});
	/*********************产前版发料入口***********************/
	$("#prenatal-issue-enter").bind('click',function(){
		$.ajax({
			url: '../include/schedule/get_dress_by_status.php',
			type: 'GET',
			dataType: 'JSON',
			data: {status: 35}
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
							+	'<td width="15%">' + getFormatTime(val.pattern_trans_time) + '</td>'
							+	'<td width="10%">' + getGender(val.gender) + '</td>'
							+	'<td width="15%">移交完成</td>'
							+	'<td width="40%"><input list="send-type" class="send-type" value="聚一佳"><span class="list-button" id="button_' + val.design_no + '">发出</span></td>'
							+'</tr>';
				});
				$("#prenatal-issue #send-material .table-list").html(domStr);
			}else{
				console.log("暂无数据");
			}
		})
		.fail(function() {
			console.log("error");
		})
		.always(function() {
			console.log("complete");
		});
	});
	//产前版通知发料
	$("#prenatal-issue .table-list").on('click', '.list-button', function() {
		var $this = $(this);
		var dress_id = parseInt($this.attr('id').split('_')[1]);
		var sendType = $this.closest('tr').find('.send-type').val();
		if($.inArray(dress_id, selectNoArr) == -1) {
			selectNoArr.push(dress_id);
		}
		$.confirm({
			"words": "确定通知发料吗？",
			"yesCallback": function(){
				top.submitSendType(selectNoArr, sendType);
				top.updateDressStatus(36, selectNoArr, "noticeexstore_time");
			}
		});
	});
	/*************************大货发料入口**************************/
	$("#cargo-issue-enter").bind('click',function(){
		var cargoDom = "";
		$.ajax({
			url: '../include/schedule/get_dress_by_status.php',
			type: 'GET',
			dataType: 'JSON',
			data: {status: 41}
		})
		.done(function(data) {
			if(data.ret==0){
				var dressList = data.list;
				listNoArr = [];
				$.each(dressList, function(i, val) {
					listNoArr.push(val.design_no);
					cargoDom += '<tr>'
							+	'<td width="5%">'
							+		'<span class="check-box" id="' + val.design_no + '"></span>'
							+	'</td>'
							+	'<td width="15%">' + val.design_no + '</td>'
							+	'<td width="15%">' + getFormatTime(val.pattern_trans_time) + '</td>'
							+	'<td width="10%">' + getGender(val.gender) + '</td>'
							+	'<td width="10%">唛架完成</td>'
							+	'<td width="20%"><input type="text" id="input_' + val.design_no + '" /></td>'
							+	'<td width="25%"><input list="send-type" class="send-type" value="聚一佳"><span class="list-button" id="button_' + val.design_no + '">发出</span></td>'
							+'</tr>';
				});
				$("#cargo-issue  #notice-issue .table-list").html(cargoDom);
			}else{
				console.log("暂无数据");
			}
		})
		.fail(function() {
			console.log("error");
		})
		.always(function() {
			console.log("complete");
		});

		$.ajax({
			url: '../include/schedule/get_dress_by_status.php',
			type: 'GET',
			dataType: 'JSON',
			data: {status: 52}
		})
		.done(function(data) {
			if(data.ret==0){
				var dressList = data.list;
				listNoArr = [];
				$.each(dressList, function(i, val) {
					listNoArr.push(val.design_no);
					cargoDom += '<tr>'
							+	'<td width="5%">'
							+		'<span class="check-box" id="' + val.design_no + '"></span>'
							+	'</td>'
							+	'<td width="15%">' + val.design_no + '</td>'
							+	'<td width="15%">' + getFormatTime(val.pattern_trans_time) + '</td>'
							+	'<td width="10%">' + getGender(val.gender) + '</td>'
							+	'<td width="10%">唛架完成</td>'
							+	'<td width="20%"><input type="text" id="input_' + val.design_no + '" /></td>'
							+	'<td width="25%"><input list="send-type" class="send-type" value="聚一佳"><span class="list-button" id="button_' + val.design_no + '">发出</span></td>'
							+'</tr>';
				});
				$("#cargo-issue  #notice-issue .table-list").html(cargoDom);
			}else{
				console.log("暂无数据");
			}
		})
		.fail(function() {
			console.log("error");
		})
		.always(function() {
			console.log("complete");
		});
	});
	//大货通知发料
	$("#cargo-issue #notice-issue .table-list").on('click', '.list-button', function() {
		var $this = $(this);
		var dress_id = parseInt($this.attr('id').split('_')[1]);
		var sendType = $this.closest('tr').find('.send-type').val();
		if($.inArray(dress_id, selectNoArr) == -1) {
			selectNoArr.push(dress_id);
		}
		$.confirm({
			"words": "确定通知发料吗？",
			"yesCallback": function(){
				top.submitSendType(selectNoArr, sendType);
				top.updateDressStatus(42, selectNoArr, "product_noticesend_time");
			}
		});
	});
	/********************生产中入口**********************/
	$("#producing-enter").bind('click',function(){
		$.ajax({
			url: '../include/schedule/get_dress_by_status.php',
			type: 'GET',
			dataType: 'JSON',
			data: {status: 44}
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
							+	'<td width="15%">' + getFormatTime(val.production_time) + '</td>'
							+	'<td width="10%">' + getGender(val.gender) + '</td>'
							+	'<td width="10%">大货整款发出</td>'
							+	'<td width="45%"><span class="list-button" id="button_' + val.design_no + '">入仓</span></td>'
							+'</tr>';
				});
				$("#producing .table-list").html(domStr);
			}else{
				console.log("暂无数据");
			}
		})
		.fail(function() {
			console.log("error");
		})
		.always(function() {
			console.log("complete");
		});
	});
	//大货通知发料
	$("#producing .table-list").on('click', '.list-button', function() {
		var $this = $(this);
		var dress_id = parseInt($this.attr('id').split('_')[1]);
		var sendType = $this.closest('tr').find('.send-type').val();
		if($.inArray(dress_id, selectNoArr) == -1) {
			selectNoArr.push(dress_id);
		}
		$.confirm({
			"words": "确定入仓检验吗？",
			"yesCallback": function(){
				top.submitSendType(selectNoArr, sendType);
				top.updateDressStatus(45, selectNoArr, "instorecheck_time");
			}
		});
	});
	/******************成本核算入口*********************/
	$("#cost-check-enter").bind('click', function(){
		$.ajax({
			url: '../include/schedule/get_dress_by_status.php',
			type: 'GET',
			dataType: 'JSON',
			data: {status: 22, source: 2}
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
							+	'<td width="10%">' + getSource(val.source) + '</td>'
							+	'<td width="15%">'
							+		'<a class="sheetLink" id="sheet_' + val.design_no + '"><img src="../image/sheet.png"></a>'
							+	'</td>'
							+	'<td width="20%"><span class="list-button" id="button_' + val.design_no + '">完成</span></td>'
							+'</tr>';
				});
				$("#cost-check #cost-checking .table-list").html(domStr);
			}else{
				console.log("暂无数据");
			}
		})
		.fail(function() {
			console.log("error");
		})
		.always(function() {
			console.log("complete");
		});

		$.ajax({
			url: '../include/schedule/get_dress_by_status.php',
			type: 'GET',
			dataType: 'JSON',
			data: {status: 53, source: 2}
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
							+	'<td width="10%">' + getSource(val.source) + '</td>'
							+	'<td width="35%"><span class="list-button" id="button_' + val.design_no + '">移交</span></td>'
							+'</tr>';
				});
				$("#cost-check #cost-transfer .table-list").html(domStr);
			}else{
				console.log("暂无数据");
			}
		})
		.fail(function() {
			console.log("error");
		})
		.always(function() {
			console.log("complete");
		});
	});
	//成本核算完成
	$("#cost-check #cost-checking .table-list").on('click', '.list-button', function() {
		var $this = $(this);
		var dress_id = parseInt($this.attr('id').split('_')[1]);
		if($.inArray(dress_id, selectNoArr) == -1) {
			selectNoArr.push(dress_id);
		}
		$.confirm({
			"words": "确定审核完成吗？",
			"yesCallback": function(){
				top.updateDressStatus(53, selectNoArr, "outcost_check_time");
			}
		});
	});
	//成本移交
	$("#cost-check #cost-transfer .table-list").on('click', '.list-button', function() {
		var $this = $(this);
		var dress_id = parseInt($this.attr('id').split('_')[1]);
		if($.inArray(dress_id, selectNoArr) == -1) {
			selectNoArr.push(dress_id);
		}
		$.confirm({
			"words": "确定移交吗？",
			"yesCallback": function(){
				top.updateDressStatus(54, selectNoArr, "cost_check_time");
			}
		});
	});
	/********************外采发料入口**********************/
	$("#outbuy-send-enter").bind('click',function(){
		$.ajax({
			url: '../include/schedule/get_dress_by_status.php',
			type: 'GET',
			dataType: 'JSON',
			data: {status: 31,source: 2}
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
							+	'<td width="15%">' + getFormatTime(val.apply_transmaterial_time) + '</td>'
							+	'<td width="10%">' + getGender(val.gender) + '</td>'
							+	'<td width="15%">' + getSource(val.source) + '</td>'
							+	'<td width="20%">生产计划单录入完成</td>'
							+	'<td width="20%"><span class="list-button" id="button_' + val.design_no + '">发料</span></td>'
							+'</tr>';
				});
				$("#outbuy-send .table-list").html(domStr);
			}else{
				console.log("暂无数据");
			}
		})
		.fail(function() {
			console.log("error");
		})
		.always(function() {
			console.log("complete");
		});
	});
	//大货通知发料
	$("#outbuy-send .table-list").on('click', '.list-button', function() {
		var $this = $(this);
		var dress_id = parseInt($this.attr('id').split('_')[1]);
		var sendType = $this.closest('tr').find('.send-type').val();
		if($.inArray(dress_id, selectNoArr) == -1) {
			selectNoArr.push(dress_id);
		}
		$.confirm({
			"words": "确定发料吗？",
			"yesCallback": function(){
				top.submitSendType(selectNoArr, sendType);
				top.updateDressStatus(44, selectNoArr, "production_time");
			}
		});
	});
}