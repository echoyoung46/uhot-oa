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
    

    this.drawTable = function(_arr){
        var tableDom = '';
        $.each(_arr, function(index, val) {
            //bind event
            this.bindEvent(val.submitStatus, val.submitTimeType);

            //request data
            var dataArr = this.getList(val.currStatus, val.currStatus1);
            
            //data dom
            var bodyDom = '<table>';
            var domItemArr = val.tableBody;
            for (var i = 0; i < dataArr.length; i++) {
                bodyDom += '<tr id="' + dataArr[i].design_no + '">';
                for(var j = 0; j < domItemArr.length; j++){
                    if(domItemArr[j].type == "data"){
                        if(domItemArr[j].val == "d_gender"){
                            bodyDom += '<td width="' + domItemArr[j].width + '">' + getGender(dataArr[i][domItemArr[j].val])+ '</td>';
                        }else if(domItemArr[j].val == "series_id"){
                            bodyDom += '<td width="' + domItemArr[j].width + '">' + getSeries(dataArr[i][domItemArr[j].val])+ '</td>';
                        }else if(domItemArr[j].val.indexOf('time') > -1){
                            bodyDom += '<td width="' + domItemArr[j].width + '">' + getFormatTime(dataArr[i][domItemArr[j].val])+ '</td>';
                        }else{
                            bodyDom += '<td width="' + domItemArr[j].width + '">' + dataArr[i][domItemArr[j].val]+ '</td>';
                        }
                        
                    }else if(domItemArr[j].type == "button"){
                        bodyDom += '<td width="' + domItemArr[j].width + '"><span class="operator" id="operator_' + dataArr[i].design_no + '">' + domItemArr[j].val + '</span></td>';
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

            //build dom
            tableDom += '<div class="table-box">'
                     +      '<p class="box-title">' + val.boxTitle + '</p>'
                     +      '<div class="table-title">'
                     +          '<table>'
                     +              '<tr>' + val.tableTitle + '</tr>'
                     +          '</table>'
                     +      '</div>'
                     +      '<div class="table-body">'
                     +          bodyDom
                     +      '</div>'
                     +  '</div>';
        });

        //draw dom
        $('.tool-list').html(_arr[0].toolList);
        $('.close-list').html(tableDom);
    }

    this.bindEvent = function(_status, _time){
        $('.table-body').on('click', '.operator', function(event) {
            var closeId = parseInt($(this).attr('id').split('_')[1]);
            var selectNoArr = [];
            selectNoArr.push(closeId);
            $.confirm({
                "words": _obj.operatorWords,
                "yesCallback": function(){
                    top.updateDressStatus(_status, selectNoArr, _time);
                }
            }); 
            
        });
    }

    this.getList = function(_status, _status1){
        var res = null;
        if(_obj.currStatus1 < 0){
            var ajaxObj = {status: _obj.currStatus};
        }else{
            var ajaxObj = {status: _obj.currStatus,status1: _obj.currStatus1};
        }
        $.ajax({
            url: '../include/schedule/get_dress_by_status.php',
            type: 'GET',
            dataType: 'json',
            async: false,
            data: ajaxObj
        })
        .done(function(data) {
            res = data.list;
        })
        .fail(function() {
            console.log("error");
        })
        .always(function() {
            console.log("complete");
        });
        return res;
    }

    this.init = function(_objArr){
        var tableObjArr = [];
        $.each(_objArr, function(index, val) {
            var tempObj = $.extend(true, this.tableObj, val);
            tableObjArr.push(tempObj);
        });

        this.drawTable(tableObjArr);
        /*$('.tool-list').html(this.tableObj.toolList);
        $('.box-title').html(this.tableObj.boxTitle);
        $('.table-title tr').html(this.tableObj.tableTitle);
        this.getList(this.drawTable,this.tableObj);
        this.bindEvent(this.tableObj);*/
    }


}