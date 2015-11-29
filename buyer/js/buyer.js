var dialogBox = {};
$(function() {
	dialogBox = new Dialog();
	dialogBox.init();
	initAction();
});

function initAction(){
	/******************买手助理定价表入口*****************/
	$("#price-table-enter").bind('click',function(){
		//待审批
		$.ajax({
			url: '../include/schedule/get_dress_by_status.php',
			type: 'GET',
			dataType: 'JSON',
			data: {status: 25}
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
							+	'<td width="15%">' + getFormatTime(val.confirmtrans_time) + '</td>'
							+	'<td width="15%">' + getGender(val.gender) + '</td>'
							+	'<td width="15%">财务确认移交</td>'
							+	'<td width="20%"><input type="text" id="input_' + val.design_no + '" /></td>'
							+	'<td width="15%"><span class="list-button" id="button_' + val.design_no + '">申请</span></td>'
							+'</tr>';
				});
				$("#price-table .table-list").html(domStr);
			}else{
				console.log("没有款式申请调料");
			}
		});
		//待审批
		$.ajax({
			url: '../include/schedule/get_dress_by_status.php',
			type: 'GET',
			dataType: 'JSON',
			data: {status: 26}
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
							+	'<td width="15%">' + getFormatTime(val.confirmtrans_time) + '</td>'
							+	'<td width="15%">' + getGender(val.gender) + '</td>'
							+	'<td width="15%">财务确认移交</td>'
							+	'<td width="20%"><input type="text" id="input_' + val.design_no + '" /></td>'
							+	'<td width="15%"><span class="list-button" id="button_' + val.design_no + '">完成</span></td>'
							+'</tr>';
				});
				$("#price-done .table-list").html(domStr);
			}else{
				console.log("没有款式申请调料");
			}
		})
		
	}).click();
	//确认定价
	$("#price-table .table-list").on('click', '.list-button', function() {
		var $this = $(this);
		var dress_id = parseInt($this.attr('id').split('_')[1]);
		if($.inArray(dress_id, selectNoArr) == -1){
			selectNoArr.push(dress_id);
		}
		$.confirm({
			"words": "确定申请审批吗？",
			"yesCallback": function(){
				top.updateDressStatus(26, selectNoArr, "price_applycheck_time");
			}
		});	
	})

	//确认定价
	$("#price-done .table-list").on('click', '.list-button', function() {
		var $this = $(this);
		var dress_id = parseInt($this.attr('id').split('_')[1]);
		var styleNo = parseInt($this.closest('tr').find('.styleno-input').val());
		if($.inArray(dress_id, selectNoArr) == -1){
			selectNoArr.push(dress_id);
		}
		$.confirm({
			"words": "确定完成定价吗？",
			"yesCallback": function(){
				top.submitStyleNo(selectNoArr, styleNo);
				top.updateDressStatus(27, selectNoArr, "price_confirm_time");
			}
		});	
	});
	/*********************下单表入口********************/
	$("#order-table-enter").bind('click', function(event) {
		$.ajax({
			url: '../include/schedule/get_dress_by_status.php',
			type: 'GET',
			dataType: 'JSON',
			data: {status: 28}
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
							+	'<td width="15%">' + getFormatTime(val.price_finishtypein_time) + '</td>'
							+	'<td width="10%">' + getGender(val.gender) + '</td>'
							+	'<td width="10%">定价录入完成</td>'
							+	'<td width="30%"><input type="text" id="input_' + val.design_no + '" /></td>'
							+	'<td width="15%"><span class="list-button" id="button_' + val.design_no + '">申请</span></td>'
							+'</tr>';
				});
				$("#order-table #order-examine .table-list").html(domStr);
			}else{
				console.log("没有款式申请调料");
			}
		})
	});
	//下单表提交审批
	$("#order-table #order-examine .table-list").on('click', '.list-button', function() {
		var $this = $(this);
		var dress_id = parseInt($this.attr('id').split('_')[1]);
		var styleNo = parseInt($this.closest('tr').find('.styleno-input').val());
		if($.inArray(dress_id, selectNoArr) == -1){
			selectNoArr.push(dress_id);
		}
		$.confirm({
			"words": "确定提交审批吗？",
			"yesCallback": function(){
				top.submitStyleNo(selectNoArr, styleNo);
				top.updateDressStatus(29, selectNoArr, "order_applycheck_time");
			}
		});	
	});
	/*********************买手主管下单表入口********************/
	$("#order-table-enter1").bind('click', function(event) {
		$.ajax({
			url: '../include/schedule/get_dress_by_status.php',
			type: 'GET',
			dataType: 'JSON',
			data: {status: 29}
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
							+	'<td width="15%">' + getFormatTime(val.order_applycheck_time) + '</td>'
							+	'<td width="10%">' + getGender(val.gender) + '</td>'
							+	'<td width="10%">定价录入完成</td>'
							+	'<td width="30%"><input type="text" id="input_' + val.design_no + '" /></td>'
							+	'<td width="15%"><span class="list-button" id="button_' + val.design_no + '">申请</span></td>'
							+'</tr>';
				});
				$("#order-table1 #order-done .table-list").html(domStr);
			}else{
				console.log("没有款式申请调料");
			}
		})
	});
	//下单表提交审批
	$("#order-table1 #order-done .table-list").on('click', '.list-button', function() {
		var $this = $(this);
		var dress_id = parseInt($this.attr('id').split('_')[1]);
		var styleNo = parseInt($this.closest('tr').find('.styleno-input').val());
		if($.inArray(dress_id, selectNoArr) == -1){
			selectNoArr.push(dress_id);
		}
		$.confirm({
			"words": "确定完成下单吗？",
			"yesCallback": function(){
				top.submitStyleNo(selectNoArr, styleNo);
				top.updateDressStatus(30, selectNoArr, "order_confirm_time");
			}
		});	
	});
	/**
	 * 补货入口
	 */
	$('#replenishment-enter').bind('click',function(){
		var closeTable = new Table();
		// $('.table-title tr').html('<span class="operator" id="reply-replenishment-button">申请补货</span>');
		closeTable.init({
			toolList: '<span class="operator" id="reply-replenishment-button">申请补货</span>',
        	tableTitle: '<td width="15%">款号</td><td width="10%">女/男装</td><td width="10%">系列</td><td width="20%">补货时间</td><td width="20%">补货数量</td><td width="25%">补货仓</td>',
        	tableBody: [{"width": "15%", "val": "design_no", "type" : "data"},{"width": "10%", "val": "d_gender", "type" : "data"},{"width": "10%", "val": "series_id", "type" : "data"},{"width": "20%", "val": "refle_apply_time", "type" : "data"},{"width": "20%", "val": "reple_count", "type" : "data"},{"width": "25%", "val": "reple_storage", "type" : "data"}],
        	currStatus: 56,
	        currTimeType: "refle_apply_time",
	        operatorWords: "确定完成下单吗？"
		});
		$('#reply-replenishment-button').on('click',function(){
				dialogBox.openDialog({
					"title": "申请补货",
					// "dialogText": '<div class="pwd-container"><span class="pwd-title">款号：</span><input type="text" name="design_no" value=""></div><div class="pwd-container"><span class="pwd-title">女/男装：</span><input type="text" name="d_gender" id="d_gender" value="" readonly="readonly"></div><div class="pwd-container"><span class="pwd-title">补货数量：</span><input type="text" name="reple_count" id="reple_count"value=""></div><div class="pwd-container"><span class="pwd-title">补货仓：</span><input type="text" name="reple_storage" id="reple_storage" value=""></div>',
					buttons: {
			            'Save': function() {
			            	var closeId = parseInt($('#design_no').val());
			            	var selectNoArr = [];
			            	selectNoArr.push(closeId);
			            	var count = parseInt($('#reple_count').val());
			            	var storage = $('#reple_storage').val();
			            	top.submitRepleCount(selectNoArr,count,storage);
			                top.updateDressStatus(56, selectNoArr, "refle_apply_time");
			            },
			            Cancel: function() {
			                $(this).dialog('close');
			            }
			        }
				})
		})

		
		/*closeTable.init({
			tableTitle: '<td width="5%"><span class="check-box"></span></td><td width="15">款号</td><td width="20">补货时间</td><td width="10">女/男装</td><td width="10">补货数量</td><td width="20">补货仓</td><td width="20"><span>申请审批</span></td>',
			tableBody: [{"width":"100%","val":"","type":"button"}]
		});*/
	})
	
	/**
	 * 主管补货入口
	 */
	$('#replenishment-enter1').bind('click',function(){
		var closeTable = new Table();
		closeTable.init({
			toolList: '<span class="operator" id="reply-replenishment-button">申请补货</span>',
			boxTitle: "待审批",
        	tableTitle: '<td width="5%"><span class="check-box"></span></td><td width="15%">款号</td><td width="10%">女/男装</td><td width="10%">系列</td><td width="15%">补货时间</td><td width="15%">补货数量</td><td width="15%">补货仓</td><td width="15%">完成下单</td>',
        	tableBody: [{"width": "5%", "val": "", "type" : "checkbox"},{"width": "15%", "val": "design_no", "type" : "data"},{"width": "10%", "val": "d_gender", "type" : "data"},{"width": "10%", "val": "series_id", "type" : "data"},{"width": "15%", "val": "refle_apply_time", "type" : "data"},{"width": "15%", "val": "reple_count", "type" : "data"},{"width": "15%", "val": "reple_storage", "type" : "data"},{"width": "15%", "val": "完成", "type" : "button"}],
        	currStatus: 56,
	        currTimeType: "refle_apply_time",
	        submitStatus: 57,
        	submitTimeType: "refle_confirm_time"
		});
		$('#reply-replenishment-button').on('click',function(){
				dialogBox.openDialog({
					"title": "申请补货",
					buttons: {
			            'Save': function() {
			            	var closeId = parseInt($('#design_no').val());
			            	var selectNoArr = [];
			            	selectNoArr.push(closeId);
			            	var count = parseInt($('#reple_count').val());
			            	var storage = $('#reple_storage').val();
			            	top.submitRepleCount(selectNoArr,count,storage);
			                top.updateDressStatus(56, selectNoArr, "refle_apply_time");
			            },
			            Cancel: function() {
			                $(this).dialog('close');
			            }
			        }
				})
		})

		
	})
	
}