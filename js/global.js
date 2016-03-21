var globalObj = {
	"userid": 1000,
	"username": "admin",
	"department": "0",
	"position": "0"
};

var listNoArr = [];
var selectNoArr = [];
(function() {
	
})()

/**
 * 请求iframe要刷新的页面
 * @param  {[type]} _url    [新页面地址]
 * @param  {[type]} _iframe [iframe容器]
 * @return {[type]}         [description]
 */
function $ajaxUrl(_url){
	$.get(_url,function(data){ 
　　　　$('#index-page').html(data);
　　}); 
}

function getDressByStatus(_status, _source) {
	var ajaxData = null,        //结果
        reqData = {             //请求参数
            status: [],
            source: []
        };     
    
	if(typeof _status == 'object'){
        
        //参数为数组
        reqData.status = _status;
	}else {
        
        //参数为单个数
        reqData.status[0] = _status;
	}
    
    if( typeof _source == 'undefined' || typeof _source != 'object ') {
        reqData.source = [1];
    }else {
        reqData.source = _source;
    }
    
	$.ajax({
		url: './js/dress.json',
		// url: 'include/schedule/get_dress_by_status.php',
		type: 'GET',
		dataType: 'JSON',
		async: false,
		data: reqData
	})
	.done(function(data) {
		if(data.ret==0 && data.msg == "success"){
			ajaxData = data.list;
		}else{
            ajaxData = [];
		}	
	})
	.fail(function() {
	})
	.always(function() {
	});
	return ajaxData;
}

//avalon filters
/*var filters = avalon.filters = {
    getGender: function(num) {
        if(num == 1){
            return '男装'
        }else if(num == 2){
            return '女装'
        }else {
        	return '其他'
        }
    },
    getSeries: function(num) {
        if(num==1){
            return '贵尚'
        }else if(num==2){
            return '雅尚'
        }else if(num==3){
            return '器尚'
        }else if(num==4){
            return '风尚'
        }else if(num==5){
            return '外采'
        }else {
            return '其他'
        }
    },
    getSource: function(num) {
    	if(num == 1){
            return '自产'
        }else if(num == 2){
            return '外采'
        }else {
        	return '其他'
        }
    }
};*/

function getSelectArr(_dom){
	selectNoArr = [];
	$('#' + _dom + ' .list-checkbox input:checked').each(function(i, el){
		var $el = $(el);
		var dressId = $el.closest('dl').find('.design-no').html();
		selectNoArr.push(parseInt(dressId));
	});
	if(selectNoArr.length == 0) {
		selectNoArr.push(parseInt(chosenId));
	};

	return selectNoArr;
}

function updateDressStatus(_status, _idArr, _timeType) {
	var nowTime = new Date();
	var _newTime = nowTime.getTime();
	console.log('global update');
	console.log(_idArr);
	$.each(_idArr, function(i, val) {
		$.ajax({
			url: './include/schedule/update_schedule.php',
			type: 'GET',
			dataType: 'json',
			async: false,
			data: {designNo: val, status: _status, timeType: _timeType, newTime: _newTime},
		})
		.done(function(data) {
	        if(data.ret == 0) {
	        	$('.modal').modal('hide');
	        	$('.page-menu ul').find('.active').click();
	        }
		})
		.fail(function() {
			console.log("error");
		})
		.always(function() {
			console.log("complete");
		});
	})
}

function adoptSampler(_idArr, _name) {
	$.each(_idArr, function(i, val) {
		$.ajax({
			url: 'include/schedule/adopt_sampler.php',
			type: 'GET',
			dataType: 'json',
			async: false,
			data: {designNo: val, sampler: _name},
		})
		.done(function(data) {
	        if(data.ret == 0) {
	        }
		})
		.fail(function() {
			console.log("error");
		})
		.always(function() {
			console.log("complete");
		});
	})
}

function adoptCarversion(_idArr, _name) {
	$.each(_idArr, function(i, val) {
		$.ajax({
			url: 'include/schedule/adopt_carversion.php',
			type: 'GET',
			dataType: 'json',
			async: false,
			data: {designNo: val, carversion: _name},
		})
		.done(function(data) {
	        if(data.ret == 0) {
	        }
		})
		.fail(function() {
			console.log("error");
		})
		.always(function() {
			console.log("complete");
		});
	})
}

function setCarversionScore(_idArr, _score) {
	$.each(_idArr, function(i, val) {
		$.ajax({
			url: 'include/schedule/set_carversion_score.php',
			type: 'GET',
			dataType: 'json',
			async: false,
			data: {designNo: val, score: _score},
		})
		.done(function(data) {
	        if(data.ret == 0) {
	        }
		})
		.fail(function() {
			console.log("error");
		})
		.always(function() {
			console.log("complete");
		});
	})
}

function submitDubVersionAdvice(_idArr, _advice) {
	$.each(_idArr, function(i, val) {
		$.ajax({
			url: 'include/schedule/submit_dubversionadvice.php',
			type: 'GET',
			dataType: 'json',
			async: false,
			data: {designNo: val, advice: _advice},
		})
		.done(function(data) {
	        if(data.ret == 0) {
	        }
		})
		.fail(function() {
			console.log("error");
		})
		.always(function() {
			console.log("complete");
		});
	})
}

function submitStyleNo(_idArr, _no){
	$.each(_idArr, function(i, val) {
		$.ajax({
			url: 'include/schedule/submit_styleno.php',
			type: 'GET',
			dataType: 'json',
			async: false,
			data: {designNo: val, styleNo: _no},
		})
		.done(function(data) {
	        if(data.ret == 0) {
	        }
		})
		.fail(function() {
			console.log("error");
		})
		.always(function() {
			console.log("complete");
		});
	})
}

function submitSendType(_idArr, _type){
	$.each(_idArr, function(i, val) {
		$.ajax({
			url: 'include/schedule/submit_sendtype.php',
			type: 'GET',
			dataType: 'json',
			async: false,
			data: {designNo: val, sendType: _type},
		})
		.done(function(data) {
	        if(data.ret == 0) {
	        }
		})
		.fail(function() {
			console.log("error");
		})
		.always(function() {
			console.log("complete");
		});
	})
}

/**
 * 面料/辅料发出状态
 * @param {[type]} _type  [面料/辅料]
 * @param {[type]} _idArr [款号id]
 */
function setMaterialSendStatus(_type, _idArr){
	var nowTime = new Date();
	var _newTime = nowTime.getTime();
	$.each(_idArr, function(i, val) {
		$.ajax({
			url: 'include/schedule/set_materialsend_status.php',
			type: 'GET',
			dataType: 'json',
			async: false,
			data: {designNo: val, materialType: _type, status: 43, newTime: _newTime},
		})
		.done(function(data) {
	        if(data.ret == 0) {
	        }
		})
		.fail(function() {
			console.log("error");
		})
		.always(function() {
			console.log("complete");
		});
	})
}
/**
 * 提交入仓检验结果
 * @param  {[type]} _idArr    [款号]
 * @param  {[type]} passCount [合格个数]
 * @param  {[type]} failCount [不合格个数]
 * @return {[type]}           [description]
 */
function submitCheckCount(_idArr, _passCount, _failCount){
	$.each(_idArr, function(i, val) {
		$.ajax({
			url: 'include/schedule/submit_check_result.php',
			type: 'GET',
			dataType: 'json',
			async: false,
			data: {designNo: val, passCount: _passCount, failCount: _failCount},
		})
		.done(function(data) {
	        if(data.ret == 0) {
	        }
		})
		.fail(function() {
			console.log("error");
		})
		.always(function() {
			console.log("complete");
		});
	})
}
/**
 * 提交不合格成衣入库个数
 * @param  {[type]} _idArr    [款号]
 * @param  {[type]} passCount [入库个数]
 * @param  {[type]} failCount [不合格个数]
 * @return {[type]}           [description]
 */
function submitFailInCount(_idArr, _count){
	$.each(_idArr, function(i, val) {
		$.ajax({
			url: 'include/schedule/submit_failin_count.php',
			type: 'GET',
			dataType: 'json',
			async: false,
			data: {designNo: val, failInCount: _count},
		})
		.done(function(data) {
	        if(data.ret == 0) {
	        }
		})
		.fail(function() {
			console.log("error");
		})
		.always(function() {
			console.log("complete");
		});
	})
}

function submitAdujustMakerReason(_idArr, _reason){
	$.each(_idArr, function(i, val) {
		$.ajax({
			url: 'include/schedule/submit_adjustmaker_reason.php',
			type: 'GET',
			dataType: 'json',
			async: false,
			data: {designNo: val, reason: _reason},
		})
		.done(function(data) {
	        if(data.ret == 0) {
	        }
		})
		.fail(function() {
			console.log("error");
		})
		.always(function() {
			console.log("complete");
		});
	})
}

function submitOuybuyInInCount(_idArr, _count){
	$.each(_idArr, function(i, val) {
		$.ajax({
			url: 'include/schedule/submit_outbuy_count.php',
			type: 'GET',
			dataType: 'json',
			async: false,
			data: {designNo: val, count: _count},
		})
		.done(function(data) {
	        if(data.ret == 0) {
	        }
		})
		.fail(function() {
			console.log("error");
		})
		.always(function() {
			console.log("complete");
		});
	})
}
/**
 * 提交补货数量和补货仓
 * @param  {[type]} _idArr   [description]
 * @param  {[type]} _count   [description]
 * @param  {[type]} _storage [description]
 * @return {[type]}          [description]
 */
function submitRepleCount(_idArr, _count,_storage){
	$.each(_idArr, function(i, val) {
		$.ajax({
			url: 'include/schedule/submit_reple_count.php',
			type: 'GET',
			dataType: 'json',
			async: false,
			data: {designNo: val, count: _count, storage: _storage},
		})
		.done(function(data) {
	        if(data.ret == 0) {
	        }
		})
		.fail(function() {
			console.log("error");
		})
		.always(function() {
			console.log("complete");
		});
	})
}

