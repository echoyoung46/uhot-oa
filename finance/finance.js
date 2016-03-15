var chosenId = null;
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
	$('#costsModal').on('show.bs.modal', function (event) {
		var $button = $(event.relatedTarget);
		chosenId = $button.closest('dl').find('.design-no').html();
	});
	$('#costsTransferModal').on('show.bs.modal', function (event) {
		var $button = $(event.relatedTarget);
		chosenId = $button.closest('dl').find('.design-no').html();
	});
}

function initSave(){
	//成本核算申请审批
	$('#costs-save-button').on('click', function(){
		var selectArr = getSelectArr("costs");
		updateDressStatus(24, selectArr, "cost_check_time");
	});

	//成本核算移交
	$('#costsTransfer-save-button').on('click', function(){
		var selectArr = getSelectArr("costTransfer");
		updateDressStatus(25, selectArr, "cost_trans_time");
	});

}

function initAction(){
	/******************财务专员成本核算入口*****************/
	$("#cost-accounting-enter").bind('click',function(){
		var reqData = getDressByStatus(23);
		var costs = avalon.define({
			$id: "costs",
			dress: reqData
		});
		
	}).click();

	
	/******************财务经理成本核算入口*****************/
	$("#cost-accounting-enter1").bind('click',function(){
		var reqData = getDressByStatus(24);
		var costs = avalon.define({
			$id: "costTransfer",
			dress: reqData
		});
	}).click();
}