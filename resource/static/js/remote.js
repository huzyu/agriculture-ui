var websocket = null;
//判断当前浏览器是否支持WebSocket
if ('WebSocket' in window) {
    //本地：ws://localhost:6060/farm/pull 部署：ws://106.14.139.125:6060/farm/pull
    websocket = new WebSocket("ws://106.14.139.125:6060/farm/pull");
}else {
    alert('当前浏览器 Not support websocket')
}

//连接发生错误的回调方法
websocket.onerror = function () {
    console.log("WebSocket连接发生错误");
};

//连接成功建立的回调方法
websocket.onopen = function () {
    console.log("WebSocket连接成功");
};

//接收到消息的回调方法
websocket.onmessage = function (event) {
    displayMsg(event.data);
};

//将消息显示在网页上
function displayMsg(innerHtml) {
    var msg = JSON.parse(innerHtml);
    console.log(msg);
    if("erro" in msg){
        var err = msg.erro;
        if(err.fengMingQi) {
            if (document.getElementById("fengMingQi")){
                document.getElementById("fengMingQi").style.webkitFilter="invert(19%) sepia(97%) saturate(6588%) hue-rotate(356deg) brightness(94%) contrast(118%";
            }

        } else {
            if(document.getElementById("fengMingQi")){
                document.getElementById("fengMingQi").style.webkitFilter="";
            }

        }
        if(err.remote_Local_Control){
            document.getElementById("kongzhi").removeAttribute("hidden");
            document.getElementById("local").setAttribute("hidden", true);
        } else {
          
           document.getElementById("kongzhi").setAttribute("hidden", true)
           document.getElementById("local").removeAttribute("hidden");
        }
        for(let i in err) {
            if(i!="fengMingQi"){
                if(err[i]) {
                    if (document.getElementById(i)){
                        document.getElementById(i).style.webkitFilter="invert(19%) sepia(97%) saturate(6588%) hue-rotate(356deg) brightness(94%) contrast(118%)";
                    }

                } else {
                    if(document.getElementById(i)){
                        document.getElementById(i).style.webkitFilter="";
                    }

                }
            }

        }
    }
}

//连接关闭的回调方法
websocket.onclose = function () {
    console.log("WebSocket连接关闭");
    
};

//监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，server端会抛异常。
window.onbeforeunload = function () {
    closeWebSocket();
};

//关闭WebSocket连接
function closeWebSocket() {
    websocket.close();
}