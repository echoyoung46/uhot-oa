var selectNoArr = [];

$(function() {
	var bodymodel = avalon.define({
        $id: "menu",
        currentIndex: 0,
        toggle: function(index) {
            bodymodel.currentIndex = index;
        }
    })

	initAction();

	$('#save-button').on('click', function(){
		updateDressStatus(2, selectNoArr, "apply_transmaterial_time");
	})
});

function  initAction() {
	/***************************基础档案入口******************************/
	$("#basic-file-enter").on('click', function(){
		event.preventDefault();
		var reqData = getDressByStatus(1);
		var basic = avalon.define({
			$id: "basic",
			dress: reqData
		})
	}).click();

	//基础档案-申请调料按钮
	$("#basic-file .list-detail").on('click', '.operator-button', function() {
		var $this = $(this);
		var dress_id = parseInt($this.closest('dl').find('.design-no').html());
		if($.inArray(dress_id, selectNoArr) == -1){
			selectNoArr.push(dress_id);
		}
	});

	//调料入口
	$("#season-enter").bind('click', function() {
		//调料中
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
							+	'<td width="15%">' + val.design_no + '</td>'
							+	'<td width="15%">' + getFormatTime(val.apply_transmaterial_time) + '</td>'
							+	'<td width="15%">' + getGender(val.gender) + '</td>'
							+	'<td width="10%">' + getSeries(val.series_id) + '</td>'
							+   '<td width="15%">申请调料</td>'
							+	'<td width="30%"><input type="text" id="input_' + val.design_no + '" /></td>'
							+'</tr>';
				});
				$("#seasoning .table-list").html(domStr);
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

		//完成调料
		$.ajax({
			url: '../include/schedule/get_dress_by_status.php',
			type: 'GET',
			dataType: 'JSON',
			data: {status: 3}
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
							+	'<td width="15%">' + getFormatTime(val.finish_transmaterial_time) + '</td>'
							+	'<td width="15%">' + getGender(val.gender) + '</td>'
							+	'<td width="10%">' + getSeries(val.series_id) + '</td>'
							+   '<td width="15%">调料完成</td>'
							+	'<td width="30%"><span class="list-button" id="button_' + val.design_no + '">申请</spam></td>'
							+'</tr>';
				});
				$("#season-done .table-list").html(domStr);
			}else{
				console.log("没有调料完成");
			}	
		})
		.fail(function() {
			console.log("error");
		})
		.always(function() {
			console.log("complete");
		});
	});
	//调料-申请样衣制作
	$("#season-done .table-list").on('click', '.list-button', function() {
		var $this = $(this);
		var dress_id = parseInt($this.attr('id').split('_')[1]);
		if($.inArray(dress_id, selectNoArr) == -1) {
			selectNoArr.push(dress_id);
		}
		$.confirm({
			"words": "确定申请头版样衣制作吗？",
			"yesCallback": function(){
				top.updateDressStatus(4, selectNoArr, "apply_makefront_time");
			}
		});	
	});
	//头版样衣制作入口
	$("#sample-enter").bind('click', function() {
		//制作中
		$.ajax({
			url: '../include/schedule/get_dress_by_status.php',
			type: 'GET',
			dataType: 'JSON',
			data: {status: 4}
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
							+	'<td width="15%">' + val.design_no + '</td>'
							+	'<td width="15%">' + getFormatTime(val.apply_transmaterial_time) + '</td>'
							+	'<td width="15%">' + getGender(val.gender) + '</td>'
							+	'<td width="10%">' + getSeries(val.series_id) + '</td>'
							+   '<td width="15%">申请头版样衣制作</td>'
							+	'<td width="30%"><input type="text" id="input_' + val.design_no + '" /></td>'
							+'</tr>';
				});
				$("#producting .table-list").html(domStr);
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

		//制作完成
		$.ajax({
			url: '../include/schedule/get_dress_by_status.php',
			type: 'GET',
			dataType: 'JSON',
			data: {status: 9, status1: 19}
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
							+	'<td width="15%">' + getFormatTime(val.finish_transmaterial_time) + '</td>'
							+	'<td width="10%">' + getGender(val.gender) + '</td>'
							+	'<td width="10%">' + getSeries(val.series_id) + '</td>'
							+   '<td width="15%">制作完成</td>'
							+	'<td width="15%"><span class="list-button" id="button_' + val.design_no + '">审版通过</span></td>'
							+	'<td width="15%"><span class="apply_dubversion" id="apply_' + val.design_no + '">申请复版</span></td>'
							+'</tr>';
				});
				$("#producting-done .table-list").html(domStr);
			}else{
				console.log("没有制作完成");
			}	
		})
		.fail(function() {
			console.log("error");
		})
		.always(function() {
			console.log("complete");
		});
	});
	//审版通过
	$("#producting-done .table-list").on('click', '.list-button', function() {
		var $this = $(this);
		var dress_id = parseInt($this.attr('id').split('_')[1]);
		if($.inArray(dress_id, selectNoArr) == -1) {
			selectNoArr.push(dress_id);
		}
		$.confirm({
			"words": "确定通过审版吗？",
			"yesCallback": function(){
				top.updateDressStatus(10, selectNoArr, "passversion_time");
			}
		});	
	});
	//申请复版
	$("#producting-done .table-list").on('click', '.apply_dubversion', function() {
		var $this = $(this);
		var dress_id = parseInt($this.attr('id').split('_')[1]);
		if($.inArray(dress_id, selectNoArr) == -1) {
			selectNoArr.push(dress_id);
		}
		$.input({
			"width": "400px",
			"height": "300px",
			"words": "请输入复版意见",
			"yesCallback": function(){
				var dubversionInput = $("#layoutFrame",top.document).contents().find("#inputContainer").val();
				top.submitDubVersionAdvice(selectNoArr, dubversionInput);
				top.updateDressStatus(14, selectNoArr, "dub_applyversion_time");
			}
		});	
	});

	//审版入口
	$("#viewer-enter").bind('click', function() {
		$.ajax({
			url: '../include/schedule/get_dress_by_status.php',
			type: 'GET',
			dataType: 'JSON',
			data: {status: 10}
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
							+	'<td width="15%">' + getFormatTime(val.finish_transmaterial_time) + '</td>'
							+	'<td width="10%">' + getGender(val.gender) + '</td>'
							+	'<td width="10%">' + getSeries(val.series_id) + '</td>'
							+   '<td width="15%">审版通过</td>'
							+	'<td width="15%">'
							+	'<a class="sheetLink" id="sheet_' + val.design_no + '"><img src="../image/sheet.png"></a>'
							+	'</td>'
							+	'<td width="15%"><span class="list-button" id="button_' + val.design_no + '">提交审批</span></td>'
							+'</tr>';
				});
				$("#viewlist .table-list").html(domStr);

			}else{
				console.log("没有制作完成");
			}	
		})
		.fail(function() {
			console.log("error");
		})
		.always(function() {
			console.log("complete");
		});
	});
	//审版-提交审批
	$("#viewlist .table-list").on('click', '.list-button', function() {
		var $this = $(this);
		var dress_id = parseInt($this.attr('id').split('_')[1]);
		if($.inArray(dress_id, selectNoArr) == -1) {
			selectNoArr.push(dress_id);
		}
		$.confirm({
			"words": "确定提交审批吗？",
			"yesCallback": function(){
				top.updateDressStatus(11, selectNoArr, "adopt_admitcheck_time");
			}
		});	
	});

	/****************************设计师预采任务单入口***************************/
	$("#repurchase1-enter").bind('click', function() {
		$.ajax({
			url: '../include/schedule/get_dress_by_status.php',
			type: 'GET',
			dataType: 'JSON',
			data: {status: 11}
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
							+	'<td width="15%">' + getFormatTime(val.adopt_admitcheck_time) + '</td>'
							+	'<td width="10%">' + getGender(val.gender) + '</td>'
							+	'<td width="10%">' + getSeries(val.series_id) + '</td>'
							+   '<td width="15%">预采单提交审批</td>'
							+	'<td width="15%">'
							+	'<a class="sheetLink" id="sheet_' + val.design_no + '"><img src="../image/sheet.png"></a>'
							+	'</td>'
							+	'<td width="15%"><span class="list-button" id="button_' + val.design_no + '">审批</span></td>'
							+'</tr>';
				});
				$("#repurchase-list1 #examine .table-list").html(domStr);

			}else{
				console.log("没有制作完成");
			}	
		})
		.fail(function() {
			console.log("error");
		})
		.always(function() {
			console.log("complete");
		});
	})

	$("#repurchase-list1 #examine .table-list").on('click', '.list-button', function() {
		var $this = $(this);
		var dress_id = parseInt($this.attr('id').split('_')[1]);
		if($.inArray(dress_id, selectNoArr) == -1) {
			selectNoArr.push(dress_id);
		}
		$.confirm({
			"words": "确定审批吗？",
			"yesCallback": function(){
				top.updateDressStatus(12, selectNoArr, "adopt_checked_time");
			}
		});	
	});

	/****************************设计主管预采任务单入口***************************/
	$("#repurchase2-enter").bind('click', function() {
		$.ajax({
			url: '../include/schedule/get_dress_by_status.php',
			type: 'GET',
			dataType: 'JSON',
			data: {status: 11}
		})
		.done(function(data) {
			if(data.ret==0){
				var dressList = data.list;
				var domStr = "";
				listNoArr = [];
				$.each(dressList, function(i, val) {
					listNoArr.push(val.design_no);
					domStr += '<tr>'
							+	'<td width="15%">' + val.design_no + '</td>'
							+	'<td width="15%">' + getFormatTime(val.adopt_admitcheck_time) + '</td>'
							+	'<td width="15%">' + getGender(val.gender) + '</td>'
							+	'<td width="10%">' + getSeries(val.series_id) + '</td>'
							+   '<td width="15%">提交审批</td>'
							+	'<td width="30%"><input type="text" id="input_' + val.design_no + '" /></td>'
							+'</tr>';
				});
				$("#repurchase-list2 #examine .table-list").html(domStr);

			}else{
				console.log("没有制作完成");
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
			data: {status: 12}
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
							+	'<td width="15%">' + getFormatTime(val.adopt_checked_time) + '</td>'
							+	'<td width="10%">' + getGender(val.gender) + '</td>'
							+	'<td width="10%">' + getSeries(val.series_id) + '</td>'
							+   '<td width="15%">提交审批</td>'
							+	'<td width="15%">'
							+	'<a class="sheetLink" id="sheet_' + val.design_no + '"><img src="../image/sheet.png"></a>'
							+	'</td>'
							+	'<td width="15%"><span class="list-button" id="button_' + val.design_no + '">移交</span></td>'
							+'</tr>';
				});
				$("#repurchase-list2 #examining .table-list").html(domStr);

			}else{
				console.log("没有制作完成");
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
			data: {status: 13}
		})
		.done(function(data) {
			if(data.ret==0){
				var dressList = data.list;
				var domStr = "";
				listNoArr = [];
				$.each(dressList, function(i, val) {
					listNoArr.push(val.design_no);
					domStr += '<tr>'
							+	'<td width="15%">' + val.design_no + '</td>'
							+	'<td width="15%">' + getFormatTime(val.adopt_transfer_time) + '</td>'
							+	'<td width="15%">' + getGender(val.gender) + '</td>'
							+	'<td width="10%">' + getSeries(val.series_id) + '</td>'
							+   '<td width="15%">已移交</td>'
							+	'<td width="30%"><input type="text" id="input_' + val.design_no + '" /></td>'
							+'</tr>';
				});
				$("#repurchase-list2 #transfer .table-list").html(domStr);

			}else{
				console.log("没有制作完成");
			}	
		})
		.fail(function() {
			console.log("error");
		})
		.always(function() {
			console.log("complete");
		});
	})

	$("#repurchase-list2 #examining .table-list").on('click', '.list-button', function() {
		var $this = $(this);
		var dress_id = parseInt($this.attr('id').split('_')[1]);
		if($.inArray(dress_id, selectNoArr) == -1) {
			selectNoArr.push(dress_id);
		}
		$.confirm({
			"words": "确定移交吗？",
			"yesCallback": function(){
				top.updateDressStatus(13, selectNoArr, "adopt_transfer_time");
			}
		});	
	});
}
