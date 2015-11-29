var globalObj = {
	"userid": 1000,
	"username": "admin",
	"department": "0",
	"position": "0"
};

var listNoArr = [];
var selectNoArr = [];
(function() {
	$(".table-list").on('click', '.check-box', function() {
		var $this = $(this);
		var dress_no = parseInt($this.attr('id'));
		if($this.hasClass('select')) {
			$this.removeClass('select');
			var index = $.inArray(dress_no, listNoArr);
			selectNoArr.splice(index, 1);
		}else{
			$this.addClass('select');
			selectNoArr.push(dress_no);
		}
	})
})()

function getFormatTime(_time) {
	var t = new Date(parseInt(_time));
	var _year = t.getFullYear();
	var _month = t.getMonth() + 1;
	var _day = t.getDate();
	var _hour = t.getHours();
	var _min = t.getMinutes();

	return _year+'.'+_month+'.'+_day+' '+_hour+":"+_min;
}
function getGender(_num){
	return _num == 1? '男装' : '女装';
}
function getSeries(_num){
	switch(_num){
		case 1:
			return '贵尚';
			break;
		case 2:
			return '雅尚';
			break;
		case 3:
			return '器尚';
			break;
		case 4:
			return '风尚';
			break;
		case 5:
			return '外采';
			break;
		default:
			return '其他';
			break;
	}	

}
function getSource(_num){
	return _num == 1? '自产' : '外采';
}
function showConfirmLayout(_str, _func) {

}