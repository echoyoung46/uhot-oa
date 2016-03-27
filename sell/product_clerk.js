var Vue = require('vue');

var chosenId = null,
	selectNoArr = [],
    buyerModel = null;
    
$(function(){
	buyerModel = new Vue({
        el: "#menu",
        data: {
            currentIndex: 0,
            
            //成衣入库
            madeIn: [],
            
            
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
                    buyerModel[val] = data;
            	})
            }
        }
    })
	
	// initAction();
	// initSave();
	bindEvent();
    
    //初始时获取第一项数据
    // buyerModel.toggle(0, [25,26], ['price1','price2']);
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

// function initAction(){
// 	/*****************定价表入口****************/
// 	$("#price-list-enter").bind('click',function(){
// 		//待审批
// 		$.ajax({
// 			url: '../include/schedule/get_dress_by_status.php',
// 			type: 'GET',
// 			dataType: 'JSON',
// 			data: {status: 27}
// 		})
// 		.done(function(data) {
// 			if(data.ret==0){
// 				var dressList = data.list;
// 				var domStr = "";
// 				listNoArr = [];
// 				$.each(dressList, function(i, val) {
// 					listNoArr.push(val.design_no);
// 					domStr += '<tr>'
// 							+	'<td width="5%">'
// 							+		'<span class="check-box" id="' + val.design_no + '"></span>'
// 							+	'</td>'
// 							+	'<td width="15%">' + val.design_no + '</td>'
// 							+	'<td width="15%">' + getFormatTime(val.price_confirm_time) + '</td>'
// 							+	'<td width="10%">' + getGender(val.gender) + '</td>'
// 							+	'<td width="10%">完成定价</td>'
// 							+	'<td width="20%"><input type="text" id="input_' + val.design_no + '" /></td>'
// 							+	'<td width="25%"><span class="list-button" id="button_' + val.design_no + '">完成</span></td>'
// 							+'</tr>';
// 				});
// 				$("#price-list .table-list").html(domStr);
// 			}else{
// 				console.log("没有款式申请调料");
// 			}
// 		})
// 	})
// 	//价格录入完成
// 	$("#price-list .table-list").on('click', '.list-button', function() {
// 		var $this = $(this);
// 		var dress_id = parseInt($this.attr('id').split('_')[1]);
// 		var styleNo = parseInt($this.closest('tr').find('.styleno-input').val());
// 		if($.inArray(dress_id, selectNoArr) == -1) {
// 			selectNoArr.push(dress_id);
// 		}
// 		$.confirm({
// 			"words": "确定录入完成吗？",
// 			"yesCallback": function(){
// 				top.submitStyleNo(selectNoArr, styleNo);
// 				top.updateDressStatus(28, selectNoArr, "price_finishtypein_time");
// 			}
// 		});	
// 	});
// 	/*****************成衣入库入口******************/
// 	$("#readymade-in-enter").bind('click',function(){
// 		//待审批
// 		$.ajax({
// 			url: '../include/schedule/get_dress_by_status.php',
// 			type: 'GET',
// 			dataType: 'JSON',
// 			data: {status: 47, source: 1}
// 		})
// 		.done(function(data) {
// 			if(data.ret==0){
// 				var dressList = data.list;
// 				var domStr = "";
// 				listNoArr = [];
// 				$.each(dressList, function(i, val) {
// 					listNoArr.push(val.design_no);
// 					domStr += '<tr>'
// 							+	'<td width="5%">'
// 							+		'<span class="check-box" id="' + val.design_no + '"></span>'
// 							+	'</td>'
// 							+	'<td width="15%">' + val.design_no + '</td>'
// 							+	'<td width="15%">' + getFormatTime(val.price_confirm_time) + '</td>'
// 							+	'<td width="10%">' + getGender(val.gender) + '</td>'
// 							+	'<td width="15%">成衣入库</td>'
// 							+	'<td width="15%"><input type="text" id="input_' + val.design_no + '" /></td>'
// 							+	'<td width="25%"><span class="list-button" id="button_' + val.design_no + '">完成</span></td>'
// 							+'</tr>';
// 				});
// 				$("#readymade-in .table-list").html(domStr);
// 			}else{
// 				console.log("没有款式申请调料");
// 			}
// 		})
// 	})
// 	//调拨完成
// 	$("#readymade-in .table-list").on('click', '.list-button', function() {
// 		var $this = $(this);
// 		var dress_id = parseInt($this.attr('id').split('_')[1]);
// 		var styleNo = parseInt($this.closest('tr').find('.styleno-input').val());
// 		if($.inArray(dress_id, selectNoArr) == -1) {
// 			selectNoArr.push(dress_id);
// 		}
// 		$.confirm({
// 			"words": "确定调拨完成吗？",
// 			"yesCallback": function(){
// 				top.submitStyleNo(selectNoArr, styleNo);
// 				top.updateDressStatus(48, selectNoArr, "product_allotconfirm_time");
// 			}
// 		});	
// 	});
// 	/****************外采入库入口******************/
// 	$("#outbuy-in-enter").bind('click',function(){
// 		$.ajax({
// 			url: '../include/schedule/get_dress_by_status.php',
// 			type: 'GET',
// 			dataType: 'JSON',
// 			data: {status: 47, source: 2}
// 		})
// 		.done(function(data) {
// 			if(data.ret==0){
// 				var dressList = data.list;
// 				var domStr = "";
// 				listNoArr = [];
// 				$.each(dressList, function(i, val) {
// 					listNoArr.push(val.design_no);
// 					domStr += '<tr>'
// 							+	'<td width="5%">'
// 							+		'<span class="check-box" id="' + val.design_no + '"></span>'
// 							+	'</td>'
// 							+	'<td width="15%">' + val.design_no + '</td>'
// 							+	'<td width="15%">' + getFormatTime(val.price_confirm_time) + '</td>'
// 							+	'<td width="10%">' + getGender(val.gender) + '</td>'
// 							+	'<td width="10%">外采入库</td>'
// 							+	'<td width="15%">供应商</td>'
// 							+	'<td width="10%">订单数</td>'
// 							+	'<td width="10%"><input type="text" id="input_' + val.design_no + '" /></td>'
// 							+	'<td width="10%"><span class="list-button" id="button_' + val.design_no + '">完成</span></td>'
// 							+'</tr>';
// 				});
// 				$("#outbuy-in .table-list").html(domStr);
// 			}else{
// 				console.log("没有款式申请调料");
// 			}
// 		})
// 	})
// 	//调拨完成
// 	$("#outbuy-in .table-list").on('click', '.list-button', function() {
// 		var $this = $(this);
// 		var dress_id = parseInt($this.attr('id').split('_')[1]);
// 		var orderCount = parseInt($this.closest('tr').find('input').val());
// 		if($.inArray(dress_id, selectNoArr) == -1) {
// 			selectNoArr.push(dress_id);
// 		}
// 		$.confirm({
// 			"words": "确定调拨完成吗？",
// 			"yesCallback": function(){
// 				top.submitOuybuyIn Count(selectNoArr, orderCount);
// 				top.updateDressStatus(48, selectNoArr, "product_allotconfirm_time");
// 			}
// 		});	
// 	});
// }