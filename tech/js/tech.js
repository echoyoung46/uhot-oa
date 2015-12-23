var selectNoArr = [];

$(function(){
	var bodymodel = avalon.define({
        $id: "menu",
        currentIndex: 0,
        toggle: function(index) {
            bodymodel.currentIndex = index;
        }
    })

	initAction();

	initSave();
});


function initAction(){
	/**************头版样衣制作*************/
	$('#sample-enter').on('click', function(event) {
		var reqData1 = getDressByStatus(4);
		var sample1 = avalon.define({
			$id: "sample1",
			dress: reqData1
		});

		var reqData2 = getDressByStatus(4);
		var sample2 = avalon.define({
			$id: "sample2",
			dress: reqData2
		});

		var reqData3 = getDressByStatus(4);
		var sample3 = avalon.define({
			$id: "sample3",
			dress: reqData3
		});
	}).click();
}

function initSave() {
	//头版样衣制作
	$('#sample1-save-button').on('click', function(){
		updateDressStatus(2, selectNoArr, "apply_transmaterial_time");
	});
	$('#sample1-save-button').on('click', function(){
		updateDressStatus(2, selectNoArr, "apply_transmaterial_time");
	});
	$('#sample1-save-button').on('click', function(){
		updateDressStatus(2, selectNoArr, "apply_transmaterial_time");
	});
}

	//审版
	//复版
	//工艺单
	//纸样
	//唛架
	//样衣分数


/*$(function() {
	initList();
	initAction();
});

function initAction() {
	//头版样衣制作-申请制作-分配
	$("#applyManu .table-list").on('click', '.list-button', function() {
		var $this = $(this);
		var dress_id = parseInt($this.attr('id').split('_')[1]);
		if($.inArray(dress_id, selectNoArr) == -1) {
			selectNoArr.push(dress_id);
		}
		var sampler_name = $this.siblings('input').val();
		$.confirm({
			"words": "确定分配纸样师吗？",
			"yesCallback": function(){
				top.adoptSampler(selectNoArr, sampler_name);
				top.updateDressStatus(7, selectNoArr, "finishallot_time");
			}
		});	
	});

	//完成纸样-分配车版师
	$("#sampleDone .table-list").on('click', '.list-button', function() {
		var $this = $(this);
		var dress_id = parseInt($this.attr('id').split('_')[1]);
		if($.inArray(dress_id, selectNoArr) == -1) {
			selectNoArr.push(dress_id);
		}
		var carversion_name = $this.siblings('input').val();
		$.confirm({
			"words": "确定分配车版师吗？",
			"yesCallback": function(){
				top.adoptCarversion(selectNoArr, carversion_name);
				top.updateDressStatus(8, selectNoArr, "allotcarversion_time");
			}
		});	
	});

	//制作完成-车版计分 
	$("#ManuDone .table-list").on('click', '.list-button', function() {
		var $this = $(this);
		var dress_id = parseInt($this.attr('id').split('_')[1]);
		if($.inArray(dress_id, selectNoArr) == -1) {
			selectNoArr.push(dress_id);
		}
		var carversion_score = $this.siblings('input').val();
		$.confirm({
			"words": "确定上传分数吗？",
			"yesCallback": function(){
				top.setCarversionScore(selectNoArr, carversion_score);
				top.updateDressStatus(9, selectNoArr, "scoring_time");
			}
		});	
	});*/

	/*****************审版入口*****************/
	/*$("#viewer-enter").bind('click', function(event) {
		//审版通过
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
							+	'<td width="15%">' + val.design_no + '</td>'
							+	'<td width="20%">' + getFormatTime(val.apply_transmaterial_time) + '</td>'
							+	'<td width="15%">' + getGender(val.gender) + '</td>'
							+	'<td width="15%">' + getSeries(val.series_id) + '</td>'
							+   '<td width="35%">审版通过</td>'
							+'</tr>';
				});
				$("#viewer #passVersion .table-list").html(domStr);
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

		//申请复版
		$.ajax({
			url: '../include/schedule/get_dress_by_status.php',
			type: 'GET',
			dataType: 'JSON',
			data: {status: 14}
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
							+	'<td width="15%">' + getFormatTime(val.apply_transmaterial_time) + '</td>'
							+	'<td width="10%">' + getGender(val.gender) + '</td>'
							+	'<td width="10%">' + getSeries(val.series_id) + '</td>'
							+   '<td width="20%" class="dubversion_advice">' + val.dubversion_advice + '</td>'
							+	'<td width="15%">'
							+	'<span class="dubsample-button list-button" id="samplebutton_' + val.design_no + '">纸样复版</span>'
							+	'<span class="dubcarversion-button list-button" id="carversionbutton_' + val.design_no + '">车版复版</span>'
							+	'</td>'
							+   '<td width="10%">' + val.dubversion_count + '</td>'
							+'</tr>';
				});
				$("#viewer #applyDubVersion .table-list").html(domStr);
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
	$("#viewer #applyDubVersion .table-list").on('click', '.dubsample-button', function() {
		var $this = $(this);
		var dress_id = parseInt($this.attr('id').split('_')[1]);
		if($.inArray(dress_id, selectNoArr) == -1) {
			selectNoArr.push(dress_id);
		}
		$.confirm({
			"words": "确定同意申请复版纸样吗？",
			"yesCallback": function(){
				top.updateDressStatus(15, selectNoArr, "dub_agreeversion_time");
			}
		});	
	}).on('click', '.dubcarversion-button', function() {
		var $this = $(this);
		var dress_id = parseInt($this.attr('id').split('_')[1]);
		if($.inArray(dress_id, selectNoArr) == -1) {
			selectNoArr.push(dress_id);
		}
		$.confirm({
			"words": "确定同意申请复版车版吗？",
			"yesCallback": function(){
				top.updateDressStatus(17, selectNoArr, "dub_agreeversion_time");
			}
		});	
	});*/
	/*****************复版入口*****************/
	/*$("#dubviewer-enter").bind('click', function(event) {
		//复版制作
		$.ajax({
			url: '../include/schedule/get_dress_by_status.php',
			type: 'GET',
			dataType: 'JSON',
			data: {status: 15}
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
							+	'<td width="15%">' + getFormatTime(val.dub_agreeversion_time) + '</td>'
							+	'<td width="15%">' + getGender(val.gender) + '</td>'
							+	'<td width="15%">' + getSeries(val.series_id) + '</td>'
							+   '<td width="35%">'
							+		'<input list="sampler" value="纸样师——汤胜辉">'
							+		'<span class="list-button" id="button_' + val.design_no + '">分配</spam>'
							+	'</td>'
							/*+   '<td width="25%">'
							+		'<input list="car-version" value="车版师——汤胜辉">'
							+		'<span class="list-button" id="button_' + val.design_no + '">分配</spam>'
							+	'</td>'
							+'</tr>';
				});
				$("#dubviewer #dubversioning .table-list").html(domStr);
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
		//纸样完成
		$.ajax({
			url: '../include/schedule/get_dress_by_status.php',
			type: 'GET',
			dataType: 'JSON',
			data: {status: 17}
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
							+	'<td width="15%">' + getFormatTime(val.dub_agreeversion_time) + '</td>'
							+	'<td width="15%">' + getGender(val.gender) + '</td>'
							+	'<td width="10%">' + getSeries(val.series_id) + '</td>'
							+   '<td width="20%">' + val.sampler_name + '</td>'
							+   '<td width="20%">'
							+		'<input list="car-version" value="车版师——汤胜辉">'
							+		'<span class="list-button" id="button_' + val.design_no + '">分配</spam>'
							+	'</td>'
							+'</tr>';
				});
				$("#dubviewer #dubfinishsample .table-list").html(domStr);
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
		//复版完成
		$.ajax({
			url: '../include/schedule/get_dress_by_status.php',
			type: 'GET',
			dataType: 'JSON',
			data: {status: 18}
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
							+	'<td width="15%">' + getFormatTime(val.dub_agreeversion_time) + '</td>'
							+	'<td width="15%">' + getGender(val.gender) + '</td>'
							+	'<td width="10%">' + getSeries(val.series_id) + '</td>'
							+   '<td width="20%">' + val.carversion_name + '</td>'
							+	'<td width="25%">'
							+		'<input id="dub_carversion_score" value="" placeholder="请输入分数" >'
							+		'<span class="list-button" id="button_' + val.design_no + '">计分</spam>'
							+	'</td>'
							+'</tr>';
				});
				$("#dubviewer #dubfinish .table-list").html(domStr);
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

	$("#dubviewer #dubversioning .table-list").on('click', '.list-button', function() {
		var $this = $(this);
		var dress_id = parseInt($this.attr('id').split('_')[1]);
		if($.inArray(dress_id, selectNoArr) == -1) {
			selectNoArr.push(dress_id);
		}
		$.confirm({
			"words": "确定分配纸样师吗？",
			"yesCallback": function(){
				top.updateDressStatus(16, selectNoArr, "dub_allotpattern_time");
			}
		});	
	});

	$("#dubviewer #dubfinishsample .table-list").on('click', '.list-button', function() {
		var $this = $(this);
		var dress_id = parseInt($this.attr('id').split('_')[1]);
		if($.inArray(dress_id, selectNoArr) == -1) {
			selectNoArr.push(dress_id);
		}
		$.confirm({
			"words": "确定分配车版师吗？",
			"yesCallback": function(){
				top.updateDressStatus(18, selectNoArr, "dub_allotcarversion_time");
			}
		});	
	})

	//制作完成-车版计分 
	$("#dubviewer #dubfinish .table-list").on('click', '.list-button', function() {
		var $this = $(this);
		var dress_id = parseInt($this.attr('id').split('_')[1]);
		if($.inArray(dress_id, selectNoArr) == -1) {
			selectNoArr.push(dress_id);
		}
		var carversion_score = $this.siblings('input').val();
		$.confirm({
			"words": "确定上传分数吗？",
			"yesCallback": function(){
				top.setCarversionScore(selectNoArr, carversion_score);
				top.updateDressStatus(19, selectNoArr, "dub_scoring_time");
			}
		});	
	});*/
	/*********************纸样入口*********************/
	/*$("#paper-sample-enter").bind('click', function(event) {
		$.ajax({
			url: '../include/schedule/get_dress_by_status.php',
			type: 'GET',
			dataType: 'JSON',
			data: {status: 34}
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
							+	'<td width="15%">' + getFormatTime(val.pattern_apply_time) + '</td>'
							+	'<td width="10%">' + getGender(val.gender) + '</td>'
							+	'<td width="10%">' + getSeries(val.series_id) + '</td>'
							+	'<td width="10%">'
							+		'<a class="sheetLink" id="sheet_' + val.design_no + '"><img src="../image/sheet.png"></a>'
							+	'</td>'
							+	'<td width="15%">'
							+		'<span class="list-button" id="button_' + val.design_no + '">移交</spam>'
							+	'</td>'
							+	'<td width="20%"><input type="text" id="input_' + val.design_no + '" /></td>'
							+'</tr>';
				});
				$("#paper-sample .table-list").html(domStr);
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
	//完成移交 
	$("#paper-sample .table-list").on('click', '.list-button', function() {
		var $this = $(this);
		var dress_id = parseInt($this.attr('id').split('_')[1]);
		if($.inArray(dress_id, selectNoArr) == -1) {
			selectNoArr.push(dress_id);
		}
		var carversion_score = $this.siblings('input').val();
		$.confirm({
			"words": "确定完成移交吗？",
			"yesCallback": function(){
				top.setCarversionScore(selectNoArr, carversion_score);
				top.updateDressStatus(35, selectNoArr, "pattern_trans_time");
			}
		});	
	});*/

	/******************唛架入口********************/
	/*$("#marker-enter").bind('click', function(event) {
		$.ajax({
			url: '../include/schedule/get_dress_by_status.php',
			type: 'GET',
			dataType: 'JSON',
			data: {status: 40}
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
							+	'<td width="15%">' + getFormatTime(val.marker_applycheck_time) + '</td>'
							+	'<td width="10%">' + getGender(val.gender) + '</td>'
							+	'<td width="10%">' + getSeries(val.series_id) + '</td>'
							+	'<td width="15%">'
							+		'<a class="sheetLink" id="sheet_' + val.design_no + '"><img src="../image/sheet.png"></a>'
							+	'</td>'
							+	'<td width="15%">'
							+		'<span class="list-button" id="button_' + val.design_no + '">完成</spam>'
							+	'</td>'
							+	'<td width="20%"><input type="text" id="input_' + val.design_no + '" /></td>'
							+'</tr>';
				});
				$("#marker #sheet .table-list").html(domStr);
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
		//修改唛架
		$.ajax({
			url: '../include/schedule/get_dress_by_status.php',
			type: 'GET',
			dataType: 'JSON',
			data: {status: 51}
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
							+	'<td width="15%">' + getFormatTime(val.marker_applycheckadjust_time) + '</td>'
							+	'<td width="10%">' + getGender(val.gender) + '</td>'
							+	'<td width="10%">' + getSeries(val.series_id) + '</td>'
							+	'<td width="15%">' + val.adjustmaker_reason + '</td>'
							+	'<td width="15%">'
							+		'<a class="sheetLink" id="sheet_' + val.design_no + '"><img src="../image/sheet.png"></a>'
							+	'</td>'
							+	'<td width="20%">'
							+		'<span class="list-button" id="button_' + val.design_no + '">完成</spam>'
							+	'</td>'
							+'</tr>';
				});
				$("#marker #editSheet .table-list").html(domStr);
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
	//完成唛架
	$("#marker #sheet .table-list").on('click', '.list-button', function() {
		var $this = $(this);
		var dress_id = parseInt($this.attr('id').split('_')[1]);
		if($.inArray(dress_id, selectNoArr) == -1) {
			selectNoArr.push(dress_id);
		}
		var carversion_score = $this.siblings('input').val();
		$.confirm({
			"words": "确定完成唛架吗？",
			"yesCallback": function(){
				top.updateDressStatus(41, selectNoArr, "marker_confirm_time");
			}
		});	
	});
	//完成修改唛架
	$("#marker #editSheet .table-list").on('click', '.list-button', function() {
		var $this = $(this);
		var dress_id = parseInt($this.attr('id').split('_')[1]);
		if($.inArray(dress_id, selectNoArr) == -1) {
			selectNoArr.push(dress_id);
		}
		var carversion_score = $this.siblings('input').val();
		$.confirm({
			"words": "确定完成修改唛架吗？",
			"yesCallback": function(){
				top.updateDressStatus(52, selectNoArr, "marker_finishadjust_time");
			}
		});	
	});
}

function initList() {
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
						+	'<td width="5%">'
						+		'<span class="check-box" id="' + val.design_no + '"></span>'
						+	'</td>'
						+	'<td width="15%">' + val.design_no + '</td>'
						+	'<td width="20%">' + getFormatTime(val.filing_time) + '</td>'
						+	'<td width="15%">' + getGender(val.gender) + '</td>'
						+	'<td width="15%">' + getSeries(val.series_id) + '</td>'
						+	'<td width="30%">'
						+		'<input list="sampler" value="纸样师——汤胜辉">'
						+		'<span class="list-button" id="button_' + val.design_no + '">分配</spam>'
						+	'</td>'
						+'</tr>';
			});
			$("#applyManu .table-list").html(domStr);
		}else{
			console.log("没有款式建档完成");
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
		data: {status: 6}
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
						+	'<td width="15%">' + getFormatTime(val.filing_time) + '</td>'
						+	'<td width="15%">' + getGender(val.gender) + '</td>'
						+	'<td width="10%">' + getSeries(val.series_id) + '</td>'
						+	'<td width="15%">' + val.sampler_name + '</td>'
						+	'<td width="25%">'
						+		'<input list="car-version" value="车版师——汤胜辉">'
						+		'<span class="list-button" id="button_' + val.design_no + '">分配</spam>'
						+	'</td>'
						+'</tr>';
			});
			$("#sampleDone .table-list").html(domStr);
		}else{
			console.log("没有纸样制作完成");
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
		data: {status: 8}
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
						+	'<td width="15%">' + getFormatTime(val.filing_time) + '</td>'
						+	'<td width="15%">' + getGender(val.gender) + '</td>'
						+	'<td width="10%">' + getSeries(val.series_id) + '</td>'
						+	'<td width="15%">' + val.carversion_name + '</td>'
						+	'<td width="25%">'
						+		'<input id="carversion_score" value="" placeholder="请输入分数" >'
						+		'<span class="list-button" id="button_' + val.design_no + '">计分</spam>'
						+	'</td>'
						+'</tr>';
			});
			$("#ManuDone .table-list").html(domStr);
		}else{
			console.log("没有纸样制作完成");
		}	
	})
	.fail(function() {
		console.log("error");
	})
	.always(function() {
		console.log("complete");
	});
}*/