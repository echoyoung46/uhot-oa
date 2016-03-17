var Vue = require('vue');

var chosenId = null,
	selectNoArr = [],
	gmoModel = null;

$(function() {
	gmoModel = new Vue({
        el: "#menu",
        data: {
            currentIndex: 0,
            morder1: [],
            morder2: [],
            morder3: [],
        },
        methods: {
            toggle: function(index) {
                this.currentIndex = index;
            },
            updateStatus: function(_status, _time){
            	console.log('confirm');
            	updateDressStatus(_status, selectNoArr, _time);
            },
            getChosenId: function(_id){
            	if($.inArray(_id, selectNoArr) < 0){
					selectNoArr.push(_id);
				}
            }
        }
    })

	initAction();

	$('#filing-save-button').on('click', function(){
		updateDressStatus(1, selectNoArr, "filing_time");
	})
});

function initAction() {
	$('#filing-enter').on('click', function(event) {
		event.preventDefault();
		var reqData = getDressByStatus(0);
		var filing = avalon.define({
			$id: "filing",
			dress: reqData
		})
	}).click();

	//建档-建档完成
	$("#filing .list-detail").on('click', '.operator-button', function() {
		var $this = $(this);
		var dress_id = parseInt($this.closest('dl').find('.design-no').html());
		if($.inArray(dress_id, selectNoArr) == -1){
			selectNoArr.push(dress_id);
		}
	});

	$('#drawingin-enter').on('click', function(event) {
		event.preventDefault();
		var reqData = getDressByStatus(1);
		var drawingin = avalon.define({
			$id: "drawingin",
			dress: reqData
		})
	}).click();
	
	/*//建档-建档按钮
	$("#new-file").bind('click', function() {
		$("#fullscreenFrame",top.document).get(0).src = "/uhot/layout/purchase_sheet.html";
		$("#fullscreenFrame",top.document).fadeIn("normal");
	});
	//建档-打开预采任务单
	$("#filing .table-list").on('click', 'img', function() {
		var $this = $(this);
		var dress_id = parseInt($this.parent('a').attr('id').split("_")[1]);
		$("#fullscreenFrame",top.document).get(0).src = "/uhot/layout/purchase_sheet.html?" + dress_id;
		$("#fullscreenFrame",top.document).fadeIn("normal");
	});
	
	

	//入图入口
	$("#drawingin-enter").bind('click', function() {
		$.ajax({
			url: '../include/schedule/get_dress_by_status.php',
			type: 'GET',
			dataType: 'JSON',
			data: {status: 1}
		})
		.done(function(data) {
			if(data.ret==0){
				var dressList = data.list;
				console.log(dressList);
				var domStr = "";
				$.each(dressList, function(i, val) {
					domStr += '<tr>'
							+	'<td width="5%">'
							+		'<span class="check-box"></span>'
							+	'</td>'
							+	'<td width="20%">' + val.design_no + '</td>'
							+	'<td width="20%">' + getFormatTime(val.filing_time) + '</td>'
							+	'<td width="20%">' + getGender(val.gender) + '</td>'
							+	'<td width="15%">' + getSeries(val.series_id) + '</td>'
							+	'<td width="20%">'
							+		'<a class="sheetLink" id="sheet_' + val.design_no + '"><img src="../image/sheet.png"></a>'
							+	'</td>'
							+'</tr>';
				});
				$("#drawing-in .table-list").html(domStr);
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
	});

}
function initList() {
	$.ajax({
		url: '../include/schedule/get_dress_by_status.php',
		type: 'GET',
		dataType: 'JSON',
		data: {status: 0}
	})
	.done(function(data) {
		if(data.ret==0){
			var dressList = data.list;
			console.log(dressList);
			var domStr = "";
			$.each(dressList, function(i, val) {
				domStr += '<tr>'
						+	'<td width="5%">'
						+		'<span class="check-box"></span>'
						+	'</td>'
						+	'<td width="15%">' + val.design_no + '</td>'
						+	'<td width="15%">' + getFormatTime(val.filing_time) + '</td>'
						+	'<td width="15%">' + getGender(val.gender) + '</td>'
						+	'<td width="10%">' + getSeries(val.series_id) + '</td>'
						+	'<td width="10%">' + getSource(val.source) + '</td>'
						+	'<td width="20%">'
						+		'<a class="sheetLink" id="sheet_' + val.design_no + '"><img src="../image/sheet.png"></a>'
						+	'</td>'
						+	'<td width="10%"><span class="list-button" id="button_' + val.design_no + '">提交</sapn></td>'
						+'</tr>';
			});
			$("#filing .table-list").html(domStr);
		}else{
			console.log("没有款式建档完成");
		}	
	})
	.fail(function() {
		console.log("error");
	})
	.always(function() {
		console.log("complete");
	});*/
}