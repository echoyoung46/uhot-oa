function Dialog(){
    var windowWidth = $(window).width();
    var isMobileFlag = windowWidth > 760 ? false : true;
    this.dialogObj = {
        autoOpen: false,
        resizable: false,
        width: isMobileFlag ? '100%' : '359',
        height: isMobileFlag ? 'auto' : '300',
        position: {
            my: 'center',
            at: 'center',
            of: window,
            collision: 'fit'
        },
        zIndex: 9999,
        modal: true,
        buttons: {
            'Save': function() {
                $(this).dialog('close');
            },
            Cancel: function() {
                $(this).dialog('close');
            }
        }
    };

    this.openDialog = function(_obj){
        this.dialogObj = $.extend(false, this.dialogObj, _obj);
        $("#dialog").attr("title",this.dialogObj.title);
        $('#dialog').html(this.dialogObj.dialogText);
        var dialogClass = $('#dialog').dialog(this.dialogObj);
        dialogClass.dialog('open');
    }

    this.init = function(){
        var dialogClass = $('#dialog').dialog(this.dialogObj);
    }
    
    
}