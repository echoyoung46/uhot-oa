var Vue = require('vue');

var chosenId = null,
	selectNoArr = [],
    buyerModel = null;
    
$(function(){
	buyerModel = new Vue({
        el: "#menu",
        data: {
            currentIndex: 0,
            
            //定价表
            price1: [],
            price2: [],
            
            //买手助理下单表
            order1: [],
            order2: [],
            
            //买手主管下单表
            morder1: [],
            morder2: [],
            morder3: [],
            
            //成衣入库
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
                    console.log(data);
                    buyerModel[val] = data;
            	})
            }
        }
    })
	
	// initAction();
	initSave();
	bindEvent();
    
    //初始时获取第一项数据
    buyerModel.toggle(0, [25,26], ['price1','price2']);
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

function initSave(){
	//定价表申请审批
	$('#price-save-button').on('click', function(){
		var selectArr = getSelectArr("price1");
		updateDressStatus(26, selectArr, "price_applycheck_time");
	});
}

function initAction(){
	/******************买手助理定价表入口*****************/
	//待审批
	$('#price-table-enter').on('click', function(){
		/*var reqData1 = getDressByStatus(25);
		var price1 = avalon.define({
			$id: "price1",
			dress: reqData1
		});
*/
		/*var reqData2 = getDressByStatus(26);
		var price2 = avalon.define({
			$id: "price2",
			dress: reqData2
		});*/
	}).click();
	//待审批
	
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
		/*$.ajax({
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
		})*/
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
		//待审批
		buyerModel.morder1 = getDressByStatus(26);
		buyerModel.morder2 = getDressByStatus(26);
		buyerModel.morder3 = getDressByStatus(26);
        
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
		/*var closeTable = new Table();
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
		})*/
	})
	
	/**
	 * 主管补货入口
	 */
	$('#replenishment-enter1').bind('click',function(){
		/*var closeTable = new Table();
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
		})*/

		
	})
	
}