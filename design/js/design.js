var chosenId = null;

$(function() {
	var bodymodel = avalon.define({
        $id: "menu",
        currentIndex: 0,
        toggle: function(index) {
            bodymodel.currentIndex = index;
        }
    })

	initAction();
	initSave();
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

	$('#passModal').on('show.bs.modal', function (event) {
		var $button = $(event.relatedTarget);
		chosenId = $button.closest('dl').find('.design-no').html();
	});

	$('#viewerModal').on('show.bs.modal', function (event) {
		var $button = $(event.relatedTarget);
		chosenId = $button.closest('dl').find('.design-no').html();
	});

	$('#designerModal').on('show.bs.modal', function (event) {
		var $button = $(event.relatedTarget);
		chosenId = $button.closest('dl').find('.design-no').html();
	});

	$('#designer-transmit-Modal').on('show.bs.modal', function (event) {
		var $button = $(event.relatedTarget);
		chosenId = $button.closest('dl').find('.design-no').html();
	});
}

function initSave(){
	$('#filing-save-button').on('click', function(){
		selectNoArr = [];
		var carversionName = $('.sampler-select').val();
		$('#basic-file .list-checkbox input:checked').each(function(i, el){
			var $el = $(el);
			var dressId = $el.closest('dl').find('.design-no').html();
			selectNoArr.push(parseInt(dressId));
		});
		if(selectNoArr.length == 0) {
			selectNoArr.push(parseInt(chosenId));
		}
		adoptSampler(selectNoArr, samplerName);
		updateDressStatus(2, selectNoArr, "apply_transmaterial_time");
	});
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

	/***************************调料入口******************************/
	$("#season-enter").on('click', function(event) {
		event.preventDefault();
		var reqData1 = getDressByStatus(2);
		var season1 = avalon.define({
			$id: "season1",
			dress: reqData1
		});

		var reqData2 = getDressByStatus(3);
		var season2 = avalon.define({
			$id: "season2",
			dress: reqData2
		});
	}).click();
	//调料-申请样衣制作
	$("#season2 .list-detail").on('click', '.operator-button', function() {
		var $this = $(this);
		var dress_id = parseInt($this.closest('dl').find('.design-no').html());
		if($.inArray(dress_id, selectNoArr) == -1){
			selectNoArr.push(dress_id);
		}
	});

	/*********************头版样衣制作入口***********************/
	$('#sample-enter').on('click', function(event) {
		event.preventDefault();
		var reqData1 = getDressByStatus(4);
		var sample1 = avalon.define({
			$id: "sample1",
			dress: reqData1
		});

		var reqData2 = getDressByStatus(9);
		var sample2 = avalon.define({
			$id: "sample2",
			dress: reqData2
		});
	}).click();

	/*********************审版入口***********************/
	$('#viewer-enter').on('click', function(event) {
		event.preventDefault();
		var reqData1 = getDressByStatus(10);
		var sample1 = avalon.define({
			$id: "viewer",
			dress: reqData1
		});
	}).click();

	/*********************设计师预采单入口***********************/
	$('#repurchase1-enter').on('click', function(event) {
		event.preventDefault();
		var reqData1 = getDressByStatus(11);
		var repurchase1 = avalon.define({
			$id: "designer-repurchase1",
			dress: reqData1
		});
	}).click();

	/*********************设计主管预采单入口***********************/
	$('#repurchase1-enter').on('click', function(event) {
		event.preventDefault();
		var reqData1 = getDressByStatus(11);
		var repurchase1 = avalon.define({
			$id: "designmonitor-repurchase1",
			dress: reqData1
		});

		var reqData2 = getDressByStatus(12);
		var repurchase2 = avalon.define({
			$id: "designmonitor-repurchase2",
			dress: reqData2
		});

		var reqData3 = getDressByStatus(13);
		var repurchase3 = avalon.define({
			$id: "designmonitor-repurchase3",
			dress: reqData3
		});
	}).click();



	/*//审版通过
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
	});*/

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
