function Table(){
    this.tableObj = {
        boxTitle: "",
        toolList: "",
        tableTitle: '',
        tableBody: '',
        currStatus: 1,
        currStatus1: -1,
        currTimeType: "time1",
        submitStatus: 2,
        submitTimeType: "time2",
        index: 1
    }

    this.drawTable = function(_list,_tableObj){
        console.log(_list);
        if(_list != undefined){
            var bodyDom = '<table>';
            var domItemArr = _tableObj.tableBody;
            console.log(domItemArr);
            for (var i = 0; i < _list.length; i++) {
                bodyDom += '<tr>';
                for(var j = 0; j < domItemArr.length; j++){
                    if(domItemArr[j].type == "data"){
                        if(domItemArr[j].val == "d_gender"){
                            bodyDom += '<td width="' + domItemArr[j].width + '">' + getGender(_list[i][domItemArr[j].val])+ '</td>';
                        }else if(domItemArr[j].val == "series_id"){
                            bodyDom += '<td width="' + domItemArr[j].width + '">' + getSeries(_list[i][domItemArr[j].val])+ '</td>';
                        }else if(domItemArr[j].val.indexOf('time') > -1){
                            bodyDom += '<td width="' + domItemArr[j].width + '">' + getFormatTime(_list[i][domItemArr[j].val])+ '</td>';
                        }else{
                            bodyDom += '<td width="' + domItemArr[j].width + '">' + _list[i][domItemArr[j].val]+ '</td>';
                        }
                        
                    }else if(domItemArr[j].type == "button"){
                        bodyDom += '<td width="' + domItemArr[j].width + '"><span class="operator" id="operator_' + _list[i].design_no + '">' + domItemArr[j].val + '</span></td>';
                    }else if(domItemArr[j].type == "input"){
                        bodyDom += '<td width="' + domItemArr[j].width + '"><input type="text" class="input-box"></td>';
                    }else if(domItemArr[j].type == "sheet"){
                        bodyDom += '<td width="' + domItemArr[j].width + '"><a class="sheetLink"><img src="../image/sheet.png"></a></td>';
                    }else if(domItemArr[j].type == "checkbox"){
                        bodyDom += '<td width="' + domItemArr[j].width + '"><span class="check-box"></span></td>';
                    }
                    
                }
                bodyDom += '</tr>';
            };
            bodyDom += '</table>';
            $('.table-body').html(bodyDom);
        }
        
    }

    this.bindEvent = function(_obj){
        $('.table-body').on('click', '.operator', function(event) {
            var closeId = parseInt($(this).attr('id').split('_')[1]);
            var selectNoArr = [];
            selectNoArr.push(closeId);
            $.confirm({
                "words": _obj.operatorWords,
                "yesCallback": function(){
                    top.updateDressStatus(_obj.submitStatus, selectNoArr, _obj.submitTimeType);
                }
            }); 
            
        });
    }

    this.getList = function(_func,_obj){
        /*var data = {
            "ret": 0,
            "list": [
                {"no": 1, "style_type": "女装", "series": 1},
                {"no": 2, "style_type": 2, "series": 2},
                {"no": 3, "style_type": 3, "series": 3},
                {"no": 4, "style_type": 4, "series": 4}
            ]
        }
        this.drawTable(data.list);
        this.bindEvent();*/
        if(_obj.currStatus1 < 0){
            var ajaxObj = {status: _obj.currStatus};
        }else{
            var ajaxObj = {status: _obj.currStatus,status1: _obj.currStatus1};
        }
        $.ajax({
            url: '../include/schedule/get_dress_by_status.php',
            type: 'GET',
            dataType: 'json',
            data: ajaxObj
        })
        .done(function(data) {
            var list = data.list;
            _func(list,_obj);
        })
        .fail(function() {
            console.log("error");
        })
        .always(function() {
            console.log("complete");
        });
        
    }

    this.init = function(_obj){
        this.tableObj = $.extend(true, this.tableObj, _obj);
        $('.tool-list').html(this.tableObj.toolList);
        $('.box-title').html(this.tableObj.boxTitle);
        $('.table-title tr').html(this.tableObj.tableTitle);
        this.getList(this.drawTable,this.tableObj);
        this.bindEvent(this.tableObj);
    }


}