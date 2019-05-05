$(function () {
    $("#submit").click(function () {
        login();
    });
});
function login() {
    var loginUrl = "user/login";
    var info = {};
    info.username= $("#username").val();
    info.password= $("#inputPassword").val();
    $.ajax({
        url:loginUrl,
        type:'POST',
        data:JSON.stringify(info),
        contentType:'application/json',
        success:function (data) {
            if (data.success){
                //页面跳转 此时不能使用$.get()ajax可以实现局部刷新页面，即在不刷新整个页面的情况下更新页面的局部信息。
                window.location.href = "device";
            }else {
                window.location.reload();
            }
        }
    });
};