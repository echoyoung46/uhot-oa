var selectNoArr = [];

$(function() {
	var bodymodel = avalon.define({
		$id: "menu",
		currentIndex: 0,
		toggle: function(index) {
			bodymodel.currentIndex = index;
		}
	});

	initAction();
	initSave();
});

function initSave(){
	$('#sample .sample-save-button').on('click', function(){
		updateDressStatus(6, selectNoArr, "finishpattern_time");
	});
}

function initAction() {
	/*******************纸样制作入口********************/
	$("#sample-enter").bind('click', function(event) {
		var reqData = getDressByStatus(5);
		var sample1 = avalon.define({
			$id: "sample",
			dress: reqData
		});

		/*$.ajax({
			url: '../include/schedule/get_dress_by_status.php',
			type: 'GET',
			dataType: 'JSON',
			data: {status: 5}
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
							+	'<td width="15%">' + getGender(val.gender) + '</td>'
							+	'<td width="15%">' + getSeries(val.series_id) + '</td>'
							+	'<td width="25%">'
							+		'<span class="list-button" id="button_' + val.design_no + '">完成</spam>'
							+	'</td>'
							+'</tr>';
				});
				$("#applyManu .table-list").html(domStr);
			}else{
				console.log("没有款式申请纸样制作");
			}	
		})
		.fail(function() {
			console.log("error");
		})
		.always(function() {
			console.log("complete");
		});*/
	}).click();
	//纸样制作-纸样完成
	$("#applyManu .table-list").on('click', '.list-button', function() {
		var $this = $(this);
		var dress_id = parseInt($this.attr('id').split('_')[1]);
		if($.inArray(dress_id, selectNoArr) == -1) {
			selectNoArr.push(dress_id);
		}
		var sampler_name = $this.siblings('input').val();
		$.confirm({
			"words": "确定完成纸样制作吗？",
			"yesCallback": function(){
				top.adoptSampler(selectNoArr, sampler_name);
				top.updateDressStatus(6, selectNoArr, "finishpattern_time");
			}
		});	
	});
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
