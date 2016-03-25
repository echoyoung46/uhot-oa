var Vue = require('vue');

var chosenId = null,
	selectNoArr = [],
    storeModel = null;
    
$(function(){
	storeModel = new Vue({
        el: "#menu",
        data: {
            currentIndex: 0,
            
            //入仓检验
            mInCheck: [],
            
            //产前版发料 
            prenatal: [],
            
            //大货发料   
            cargo: [],
            
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
                    storeModel[val] = data;
            	})
            }
        }
    })
	
	// initAction();
	// initSave();
	bindEvent();
    
    //初始时获取第一项数据
    storeModel.toggle(0, [32], ['mInCheck']);
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

	$('#priceModal').on('show.bs.modal', function (event) {
		var $button = $(event.relatedTarget);
		chosenId = $button.closest('dl').find('.design-no').html();
	});
}

function initAction(){
	$("#storage-check-enter").bind('click', function(){
		$.ajax({
			url: '../include/schedule/get_dress_by_status.php',
			type: 'GET',
			dataType: 'JSON',
			data: {status: 32}
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
							+	'<td width="15%"><div class="button1" id="fabrichandle_' + val.design_no + '">需处理</div>'
							+		'<div class="button1" id="fabricenter_' + val.design_no + '">入库</div></td>'
							+	'<td width="15%"><div class="button1" id="accessoryhandle_' + val.design_no + '">需处理</div>'
							+		'<div class="button1" id="accessoryenter_' + val.design_no + '">入库</div></td>'
	 						+	'<td width="10%">'
							+		'<a class="sheetLink" id="sheet_' + val.design_no + '"><img src="../image/sheet.png"></a>'
							+	'</td>'
							+	'<td width="15%"><span class="list-button" id="button_' + val.design_no + '">完成</sapn></td>'
							+'</tr>';
				});
				$("#storage-check .table-list").html(domStr);
			}else{
				console.log("没有款式申请调料");
			}	
		})
		.fail(function() {
		})
		.always(function() {
		});
	}).click();
	//整款入库
	$("#storage-check .table-list").on('click', '.list-button', function() {
		var $this = $(this);
		var dress_id = parseInt($this.attr('id').split('_')[1]);
		if($.inArray(dress_id, selectNoArr) == -1) {
			selectNoArr.push(dress_id);
		}
		$.confirm({
			"words": "确定整款入库吗？",
			"yesCallback": function(){
				top.updateDressStatus(33, selectNoArr, "inrecord_finish_time");
			}
		});	
	});
	/**********************产前版发料入口***********************/
	$("#prenatal-issue-enter").bind('click', function(){
		$.ajax({
			url: '../include/schedule/get_dress_by_status.php',
			type: 'GET',
			dataType: 'JSON',
			data: {status: 37}
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
							+	'<td width="15%">' + getFormatTime(val.exstore_time) + '</td>'
							+	'<td width="10%">' + getGender(val.gender) + '</td>'
							+	'<td width="15%">' + val.send_type + '</td>'
							+	'<td width="15%">已发出</td>'
							+	'<td width="15%">已发出</td>'
							+	'<td width="10%"><span class="list-button" id="button_' + val.design_no + '">发出</sapn></td>'
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
			"words": "确定整款发出吗？",
			"yesCallback": function(){
				top.updateDressStatus(38, selectNoArr, "preedition_allsend_time");
			}
		});	
	});
	/********************大货发料入口**********************/
	$("#cargo-issue-enter").bind('click', function(){
		$.ajax({
			url: '../include/schedule/get_dress_by_status.php',
			type: 'GET',
			dataType: 'JSON',
			data: {status: 43}
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
							+	'<td width="15%">' + getFormatTime(val.exstore_time) + '</td>'
							+	'<td width="10%">' + getGender(val.gender) + '</td>'
							+	'<td width="15%">' + val.send_type + '</td>'
							+	'<td width="15%">已发出</td>'
							+	'<td width="15%">已发出</td>'
							+	'<td width="10%"><span class="list-button" id="button_' + val.design_no + '">发出</sapn></td>'
							+'</tr>';
				});
				$("#cargo-issue .table-list").html(domStr);
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
	$("#cargo-issue .table-list").on('click', '.list-button', function() {
		var $this = $(this);
		var dress_id = parseInt($this.attr('id').split('_')[1]);
		if($.inArray(dress_id, selectNoArr) == -1) {
			selectNoArr.push(dress_id);
		}
		$.confirm({
			"words": "确定整款发出吗？",
			"yesCallback": function(){
				top.updateDressStatus(44, selectNoArr, "production_time");
			}
		});	
	});
	/********************成衣检验入口********************/
	$("#readymade-check-enter").bind('click', function(){
		var closeTable = new Table();
		closeTable.init([{
		        	tableTitle: '<td width="5%"><span class="check-box"></span></td><td width="15%">款号</td><td width="15%">申请时间</td><td width="10%">女/男装</td><td width="15%">检验合格</td><td width="15%">检验不合格</td><td width="15%">入库</td><td width="10%">确认入库</td>',
		        	tableBody: [{"width": "5%", "val": "", "type" : "checkbox"},{"width": "15%", "val": "design_no", "type" : "data"},{"width": "15%", "val": "reple_instore_time", "type" : "data"},{"width": "10%", "val": "d_gender", "type" : "data"},{"width": "15%", "val": "check_pass_count", "type" : "data"},{"width": "15%", "val": "check_fail_count", "type" : "data"},{"width": "15%", "val": "请输入个数", "type" : "input"},{"width": "10%", "val": "入库", "type" : "button"}],
		        	currStatus: 46,
		        	currStatus1: 58,
			        currTimeType: "product_applycheck_time",
			        currTimeType1: "reple_instore_time",
			        submitStatus: 47,
			        submitStatus1: 59,
		        	submitTimeType: "product_inrecord_time",
		        	submitTimeType1: "reple_inrecord_time",
		        	secondFunc: function(){
						var fail_in_count = parseInt($this.closest('tr').find('#fail_in_count').val())||0;
							top.submitFailInCount(selectNoArr, fail_in_count);
		        	}
				}]);

		/*$.ajax({
			url: '../include/schedule/get_dress_by_status.php',
			type: 'GET',
			dataType: 'JSON',
			data: {status: 46, status1: 58}
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
							+	'<td width="15%">' + getFormatTime(val.product_applycheck_time) + '</td>'
							+	'<td width="10%">' + getGender(val.gender) + '</td>'
							+	'<td width="15%">' + val.check_pass_count + '件</td>'
							+	'<td width="15%">' + val.check_fail_count + '件</td>'
							+	'<td width="15%">'
							+		'<input id="fail_in_count" value="" placeholder="请输入个数" >'
							+	'</td>'
							+	'<td width="10%"><span class="list-button" id="button_' + val.design_no + '">入库</span></td>'
							+'</tr>';
				});
				$("#readymade-check .table-list").html(domStr);
			}else{
				console.log("暂无数据");
			}	
		})
		.fail(function() {
			console.log("error");
		})
		.always(function() {
			console.log("complete");
		});*/
	});
	//入库
	$("#readymade-check .table-list").on('click', '.list-button', function() {
		var $this = $(this);
		var dress_id = parseInt($this.attr('id').split('_')[1]);
		var fail_in_count = parseInt($this.closest('tr').find('#fail_in_count').val())||0;
		if($.inArray(dress_id, selectNoArr) == -1) {
			selectNoArr.push(dress_id);
		}
		$.confirm({
			"words": "确定入库吗？",
			"yesCallback": function(){
				top.submitFailInCount(selectNoArr, fail_in_count);
				top.updateDressStatus(47, selectNoArr, "product_inrecord_time");
			}
		});	
	});
}