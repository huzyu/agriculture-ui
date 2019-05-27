function emergency1() {
    let fUrl = "/stop/162";
    jQuery.ajax({
        url:fUrl,
        type:'GET',
        success:function (data) {
            if (data.success){
            }else {
            }
        }
    });   
}

function emergency2() {
    let fUrl = "/stop/163";

    jQuery.ajax({
        url:fUrl,
        type:'GET',
        success:function (data) {
            if (data.success){
            }else {
            }
        }
    });   
}

