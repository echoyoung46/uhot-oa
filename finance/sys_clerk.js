var Vue = require('vue');

var chosenId = null,
	selectNoArr = [],
    sysClerkModel = null;
    
$(function(){
	sysClerkModel = new Vue({
        el: "#menu",
        data: {
            currentIndex: 0,
            
            //商品信息
            goodsInfo: [],
            
            //定价表
            price: []
            
            
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
                    console.log(val);
                    console.log(data);
                    sysClerkModel[val] = data;
            	})
            }
        }
    })
	
	// initAction();
	// initSave();
	bindEvent();
    
    //初始时获取第一项数据
    sysClerkModel.toggle(0, [20], ['goodsInfo']);
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
	$('#goodsModal').on('show.bs.modal', function (event) {
		var $button = $(event.relatedTarget);
		chosenId = $button.closest('dl').find('.design-no').html();
	});
}

function initSave(){
	//商品信息-录入
	$('#info-input-button').on('click', function(){
		var selectArr = getSelectArr("info");
		updateDressStatus(21, selectArr, "typein_product_time");
	});
}

function initAction(){
	/********************商品信息入口************************/
	$("#goods-info-enter").bind('click',function(){
		var reqData = getDressByStatus(20);
		var info = avalon.define({
			$id: "goods",
			dress: reqData
		});
		
	}).click();

	//录入完成
	$("#goods-info .table-list").on('click', '.list-button', function() {
		var $this = $(this);
		var dress_id = parseInt($this.attr('id').split('_')[1]);
		if($.inArray(dress_id, selectNoArr) == -1) {
			selectNoArr.push(dress_id);
		}
		$.confirm({
			"words": "确定录入完成吗？",
			"yesCallback": function(){
				top.updateDressStatus(21, selectNoArr, "typein_product_time");
			}
		});	
	});
	/*********************成分录入入口**********************/
	$("#ingredient-entering-enter").bind('click', function(event) {
		$.ajax({
			url: '../include/schedule/get_dress_by_status.php',
			type: 'GET',
			dataType: 'JSON',
			data: {status: 20}
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
							+	'<td width="15%">' + val.product_no + '</td>'
							+	'<td width="15%">' + getFormatTime(val.adopt_transfer_time) + '</td>'
							+	'<td width="10%">' + getGender(val.gender) + '</td>'
							+	'<td width="15%">'
							+		'<a class="sheetLink" id="sheet_' + val.design_no + '"><img src="../image/sheet.png"></a>'
							+	'</td>'
							+	'<td width="25%"><span class="list-button" id="button_' + val.design_no + '">完成</span></td>'
							+'</tr>';
				});
				$("#ingredient-entering .table-list").html(domStr);
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
	//录入完成
	$("#ingredient-entering .table-list").on('click', '.list-button', function() {
		var $this = $(this);
		var dress_id = parseInt($this.attr('id').split('_')[1]);
		var styleNo = parseInt($this.closest('tr').find('.styleno-input').val());
		if($.inArray(dress_id, selectNoArr) == -1) {
			selectNoArr.push(dress_id);
		}
		$.confirm({
			"words": "确定录入完成吗？",
			"yesCallback": function(){
				top.submitStyleNo(selectNoArr, styleNo);
				top.updateDressStatus(21, selectNoArr, "typein_product_time");
			}
		});	
	});


	/*****************定价表入口****************/
	$("#price-list-enter").bind('click',function(){
		//待审批
		$.ajax({
			url: '../include/schedule/get_dress_by_status.php',
			type: 'GET',
			dataType: 'JSON',
			data: {status: 27}
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
							+	'<td width="15%">' + getFormatTime(val.price_confirm_time) + '</td>'
							+	'<td width="10%">' + getGender(val.gender) + '</td>'
							+	'<td width="10%">完成定价</td>'
							+	'<td width="20%"><input type="text" id="input_' + val.design_no + '" /></td>'
							+	'<td width="25%"><span class="list-button" id="button_' + val.design_no + '">完成</span></td>'
							+'</tr>';
				});
				$("#price-list .table-list").html(domStr);
			}else{
				console.log("没有款式申请调料");
			}
		})
	})
	//价格录入完成
	$("#price-list .table-list").on('click', '.list-button', function() {
		var $this = $(this);
		var dress_id = parseInt($this.attr('id').split('_')[1]);
		var styleNo = parseInt($this.closest('tr').find('.styleno-input').val());
		if($.inArray(dress_id, selectNoArr) == -1) {
			selectNoArr.push(dress_id);
		}
		$.confirm({
			"words": "确定录入完成吗？",
			"yesCallback": function(){
				top.submitStyleNo(selectNoArr, styleNo);
				top.updateDressStatus(28, selectNoArr, "price_finishtypein_time");
			}
		});	
	});
}