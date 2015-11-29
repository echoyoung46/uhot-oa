$(function(){
	initAction();
});

function initAction(){
	/****************入仓检验入口******************/
	$("#storage-check-enter").bind('click', function(){
		$.ajax({
			url: '../include/schedule/get_dress_by_status.php',
			type: 'GET',
			dataType: 'JSON',
			data: {status: 45}
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
							+	'<td width="15%">' + getFormatTime(val.instorecheck_time) + '</td>'
							+	'<td width="10%">' + getGender(val.gender) + '</td>'
							+	'<td width="20%">'
							+		'<input id="pass_count" value="" placeholder="请输入个数" >'
							// +		'<span class="list-button" id="pass_' + val.design_no + '">确认</spam>'
							+	'</td>'
							+	'<td width="20%">'
							+		'<input id="fail_count" value="" placeholder="请输入个数" >'
							// +		'<span class="list-button" id="fail_' + val.design_no + '">确认</spam>'
							+	'</td>'
							+	'<td width="15%"><span class="list-button" id="button_' + val.design_no + '">申请</span></td>'
							+'</tr>';
				});
				$("#storage-check .table-list").html(domStr);
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
	}).click();
	//入仓检验申请审批
	$("#storage-check .table-list").on('click', '.list-button', function() {
		var $this = $(this);
		var dress_id = parseInt($this.attr('id').split('_')[1]);
		var pass_count = parseInt($this.closest('tr').find('#pass_count').val())||0;
		var fail_count = parseInt($this.closest('tr').find('#fail_count').val())||0;
		if($.inArray(dress_id, selectNoArr) == -1) {
			selectNoArr.push(dress_id);
		}
		$.confirm({
			"words": "确定申请审批吗？",
			"yesCallback": function(){
				top.submitCheckCount(selectNoArr, pass_count, fail_count);
				top.updateDressStatus(46, selectNoArr, "product_applycheck_time");
			}
		});	
	});
	/****************成衣发货入口******************/
	$("#readymade-send-enter").bind('click', function(){
		$.ajax({
			url: '../include/schedule/get_dress_by_status.php',
			type: 'GET',
			dataType: 'JSON',
			data: {status: 48}
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
							+	'<td width="15%">' + getFormatTime(val.product_allotconfirm_time) + '</td>'
							+	'<td width="10%">' + getGender(val.gender) + '</td>'
							+	'<td width="20%">' + val.check_pass_count + '件</td>'
							+	'<td width="20%">' + val.fail_in_count + '件</td>'
							+	'<td width="15%"><span class="list-button" id="button_' + val.design_no + '">发货</span></td>'
							+'</tr>';
				});
				$("#readymade-send .table-list").html(domStr);
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
	}).click();
	//入仓检验申请审批
	$("#readymade-send .table-list").on('click', '.list-button', function() {
		var $this = $(this);
		var dress_id = parseInt($this.attr('id').split('_')[1]);
		var pass_count = parseInt($this.closest('tr').find('#pass_count').val())||0;
		var fail_count = parseInt($this.closest('tr').find('#fail_count').val())||0;
		if($.inArray(dress_id, selectNoArr) == -1) {
			selectNoArr.push(dress_id);
		}
		$.confirm({
			"words": "确定发出吗？",
			"yesCallback": function(){
				top.submitCheckCount(selectNoArr, pass_count, fail_count);
				top.updateDressStatus(49, selectNoArr, "product_exstore_time");
			}
		});	
	});
}