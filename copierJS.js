var lastId=0;

$(document).ready(function () {
    console.log("init start");
    $.ajax({
        type:"POST",
        url:"delete.php",
        dataType:"text", 
        data : {null:null},
        success: function(data) {
            getAjaxJson(data);
        },
        error: function(request, textStatus, errorThrown) {
            printAjaxErrLog(request, textStatus, errorThrown);
        }
    });

//sample
    // var request = "{\"title\":\"타이틀 세이브\", \"data\":\"데이터 내용 = 서울시광화문\", \"date\":\"2015/02/12\"}";
    // var ob = JSON.parse(request);
    // alert(ob);
    // initData(ob.title, ob.data, ob.date);
    

    console.log("init end ");
});

function vaildCheck() {
	var dataObj = $('#dataField');
	var titleObj = $('#titleField');
    var trimedData = $.trim(dataObj.val());
	
	if (titleObj.val().length > 60){
		alert('Subject는 최대 60 입력 가능');
		titleObj.val(titleObj.val().substring(0, 60));
		return false;
	}
	
    if (trimedData.length <= 0) {
        alert('내용을 입력하세요. (최대 3000자)');
        dataObj.focus();
        return false;
    } else if (trimedData.length > 3000){
		alert('Data는 최대 3000 입력 가능');
		dataObj.val(trimedData.substring(0, 3000));
		return false;
	}
    
    var now = new Date();
    var year= now.getFullYear();
    var mon = (now.getMonth()+1)>9 ? ''+(now.getMonth()+1) : '0'+(now.getMonth()+1);
    var day = now.getDate()>9 ? ''+now.getDate() : '0'+now.getDate();
    var hour = now.getHours()>9 ? ''+now.getHours() : '0'+now.getHours();
    var min = now.getMinutes()>9 ? ''+now.getMinutes() : '0'+now.getMinutes();
    var sec = now.getSeconds()>9 ? ''+now.getSeconds() : '0'+now.getSeconds();
    var date = year + '/' + mon + '/' + day + ' ' + hour + ':' + min + ':' + sec;

    var result = confirm("입력하시겠습니까?");    
    if(result) {
        ajaxSave(0, titleObj.val(), trimedData.replace(/\n/g,'\\n'), date);
        //addDOMData(titleObj.val(), dataObj.val(), date);
        titleObj.val("");
        dataObj.val("");
    } 
    return false;
}

function getAjaxJson(data) {
    $('#listPane').empty();
    data = eval("[ " + data + "];");
    $.each(data, function() {
        addDOMData(this.id, this.title, this.data, this.date);
    });
}

function printAjaxErrLog(request, textStatus, errorThrown) {
    console.log('error:');
    console.log(request);
    console.log(textStatus);
    console.log(errorThrown);
}

function ajaxSave(id, titleStr, dataStr, date) {
    $.ajax({
        type:"POST",
        url:"save.php",
        dataType:"text", 
        data : {id:parseInt(lastId) + 1, title:titleStr, data:dataStr, date:date },
        success:function(data) {
            getAjaxJson(data);
        },
        error: function(request, textStatus, errorThrown) {
            printAjaxErrLog(request, textStatus, errorThrown);
        }
    });
}

function addDOMData(id, titleStr, dataStr, date) {
	var itemID = 'item_' + id;
	var dataID = 'data_' + id;
		
    $('#listPane').prepend(
        $('<div></div>').attr('id', itemID).addClass('item').append(
            $('<span></span>').addClass('date').text(date)
        ).append(
            $('<div></div>').addClass('delBtn').text('X').bind('click', function() { ajaxDelete($('#'+itemID));})
        ).append(
            $('<span></span>').addClass('title').text(titleStr)
        ).append(
            $('<div></div>').css('clear', 'both')
        ).append(
            $('<p></p>').addClass('data').attr('id', dataID).html(dataStr.replace(/\\n/g,'</br>'))
        ).append(
            $('<input/>').addClass('cpBtn').attr('type', 'submit').attr('value', 'Select').bind('click', function() { selectText(dataID); })
        ).append(
            $('<div></div>').css('clear', 'both')
        )
    );
    lastId = id;
}

function ajaxDelete(obj) {
	// obj.remove();
    var result = confirm("삭제하시겠습니까?");    
    if(!result) {
        return;
    } 
    
    $.ajax({
        type:"POST",
        url:"delete.php",
        dataType:"text", 
        data : {id:obj.attr('id').split("_")[1]},
        success: function(data) {
            getAjaxJson(data);
        },
        error: function(request, textStatus, errorThrown) {
            printAjaxErrLog(request, textStatus, errorThrown);
        }
    });
}

function selectText(idStr) {
	var obj = document.getElementById(idStr);
	if (window.getSelection) {
        var selected = window.getSelection();
            selected.selectAllChildren(obj);
    } else if (document.body.createTextRange) {
        var range = document.body.createTextRange();
            range.moveToElementText(obj);
            range.select();
    }
};