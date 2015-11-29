$(function() {
	initAction();
});

function initAction(){
	/*******************产前版发料入口********************/
	$("#prenatal-issue-enter").bind('click', function(){
		$.ajax({
			url: '../include/schedule/get_dress_by_status.php',
			type: 'GET',
			dataType: 'JSON',
			data: {status: 36}
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
							+	'<td width="20%">' + getFormatTime(val.noticeexstore_time) + '</td>'
							+	'<td width="20%">' + getGender(val.gender) + '</td>'
							+	'<td width="20%">' + val.send_type + '</td>'
							+	'<td width="20%"><span class="list-button" id="button_' + val.design_no + '">发出</sapn></td>'
							+'</tr>';
				});
				$("#prenatal-issue .table-list").html(domStr);
			}else{
				console.log("没有款式申请调料");
			}	
		})
		.fail(function() {
		})
		.always(function() {
		});
	});
	//整款入库
	$("#prenatal-issue .table-list").on('click', '.list-button', function() {
		var $this = $(this);
		var dress_id = parseInt($this.attr('id').split('_')[1]);
		if($.inArray(dress_id, selectNoArr) == -1) {
			selectNoArr.push(dress_id);
		}
		$.confirm({
			"words": "确定辅料发出吗？",
			"yesCallback": function(){
				top.updateDressStatus(37, selectNoArr, "exstore_time");
			}
		});	
	});
	/*****************面料管理员大货发料****************/
	$("#material-cargo-issue-enter").bind('click', function(){
		$.ajax({
			url: '../include/schedule/get_dress_by_status.php',
			type: 'GET',
			dataType: 'JSON',
			data: {status: 42}
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
							+	'<td width="20%">' + getFormatTime(val.product_noticesend_time) + '</td>'
							+	'<td width="10%">' + getGender(val.gender) + '</td>'
							+	'<td width="25%">' + val.send_type + '</td>'
							+	'<td width="25%"><span class="list-button" id="button_' + val.design_no + '">发出</sapn></td>'
							+'</tr>';
				});
				$("#material-cargo-issue .table-list").html(domStr);
			}else{
				console.log("没有款式申请调料");
			}	
		})
		.fail(function() {
		})
		.always(function() {
		});
	})
	//面料发出
	$("#material-cargo-issue .table-list").on('click', '.list-button', function() {
		var $this = $(this);
		var dress_id = parseInt($this.attr('id').split('_')[1]);
		if($.inArray(dress_id, selectNoArr) == -1) {
			selectNoArr.push(dress_id);
		}
		$.confirm({
			"words": "确定面料发出吗？",
			"yesCallback": function(){
				top.setMaterialSendStatus('is_material_send', selectNoArr);
			}
		});	
	});
	/*****************辅料管理员大货发料****************/
	$("#accessory-cargo-issue-enter").bind('click', function(){
		$.ajax({
			url: '../include/schedule/get_dress_by_status.php',
			type: 'GET',
			dataType: 'JSON',
			data: {status: 42}
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
							+	'<td width="20%">' + getFormatTime(val.product_noticesend_time) + '</td>'
							+	'<td width="10%">' + getGender(val.gender) + '</td>'
							+	'<td width="25%">' + val.send_type + '</td>'
							+	'<td width="25%"><span class="list-button" id="button_' + val.design_no + '">发出</sapn></td>'
							+'</tr>';
				});
				$("#accessory-cargo-issue .table-list").html(domStr);
			}else{
				console.log("没有款式申请调料");
			}	
		})
		.fail(function() {
		})
		.always(function() {
		});
	})
	//面料发出
	$("#accessory-cargo-issue .table-list").on('click', '.list-button', function() {
		var $this = $(this);
		var dress_id = parseInt($this.attr('id').split('_')[1]);
		if($.inArray(dress_id, selectNoArr) == -1) {
			selectNoArr.push(dress_id);
		}
		$.confirm({
			"words": "确定辅料发出吗？",
			"yesCallback": function(){
				top.setMaterialSendStatus('is_accessory_send', selectNoArr);
			}
		});	
	});
}