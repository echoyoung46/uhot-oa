function updateDressStatus(_status, _idArr, _timeType) {
	var nowTime = new Date();
	var _newTime = nowTime.getTime();
	console.log(_idArr);
	$.each(_idArr, function(i, val) {
		$.ajax({
			url: 'include/schedule/update_schedule.php',
			type: 'GET',
			dataType: 'json',
			async: false,
			data: {designNo: val, status: _status, timeType: _timeType, newTime: _newTime},
		})
		.done(function(data) {
	        if(data.ret == 0) {
	        	$("#layout-div",top.document).css("display", "none");
	        	window.location.reload();
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
