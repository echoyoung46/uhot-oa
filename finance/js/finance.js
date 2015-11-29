$(function() {
	initAction();
});

function initAction(){
	/******************财务专员成本核算入口*****************/
	$("#cost-accounting-enter").bind('click',function(){
		$.ajax({
			url: '../include/schedule/get_dress_by_status.php',
			type: 'GET',
			dataType: 'JSON',
			data: {status: 23}
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
							+	'<td width="15%">'
							+		'<span class="list-button" id="upload_' + val.design_no + '">下载</span>'
							+	'</td>'
							+	'<td width="15%"><span class="list-button" id="button_' + val.design_no + '">上传</span></td>'
							+	'<td width="20%"><span class="list-button" id="button_' + val.design_no + '">完成</span></td>'
							+'</tr>';
				});
				$("#cost-accounting .table-list").html(domStr);
			}else{
				console.log("没有款式申请调料");
			}
		})
	}).click();
	//确认申请审批
	$("#cost-accounting .table-list").on('click', '.list-button', function() {
		var $this = $(this);
		var dress_id = parseInt($this.attr('id').split('_')[1]);
		var styleNo = parseInt($this.closest('tr').find('.styleno-input').val());
		if($.inArray(dress_id, selectNoArr) == -1){
			selectNoArr.push(dress_id);
		}
		$.confirm({
			"words": "确定申请审批吗？",
			"yesCallback": function(){
				top.submitStyleNo(selectNoArr, styleNo);
				top.updateDressStatus(24, selectNoArr, "cost_check_time");
			}
		});	
	});
	/******************财务经理成本核算入口*****************/
	$("#cost-accounting-enter1").bind('click',function(){
		$.ajax({
			url: '../include/schedule/get_dress_by_status.php',
			type: 'GET',
			dataType: 'JSON',
			data: {status: 24, status1: 54}
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
							+	'<td width="15%">' + getFormatTime(val.cost_check_time) + '</td>'
							+	'<td width="15%">' + getGender(val.gender) + '</td>'
							+	'<td width="15%">'
							+		'<span class="list-button" id="upload_' + val.design_no + '">下载</span>'
							+	'</td>'
							+	'<td width="15%"><span class="list-button" id="button_' + val.design_no + '">下载</span></td>'
							+	'<td width="20%"><span class="list-button" id="button_' + val.design_no + '">确认</span></td>'
							+'</tr>';
				});
				$("#cost-accounting1 .table-list").html(domStr);
			}else{
				console.log("没有款式申请调料");
			}
		})
	}).click();
	//确认移交
	$("#cost-accounting1 .table-list").on('click', '.list-button', function() {
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
				top.updateDressStatus(25, selectNoArr, "cost_trans_time");
			}
		});	
	});
}