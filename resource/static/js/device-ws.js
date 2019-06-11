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
    if (msg.erro!=null) {
        localStorage.clear();
        localStorage.setItem('erro', innerHtml);
    }
    console.log(msg);
    console.log(msg);
    if("pack" in  msg) {
        for (let i in msg.pack) {
            if(i < 12) {
                let dataType = msg.pack[i].dataType;
                let idSelector = msg.pack[i].loraNodeId;
                switch(dataType){
                    case 0:
                        //温湿度数据
                        $("#"+idSelector+"airTemp").text(msg.pack[i].airTemp);
                        $("#"+idSelector+"airHumidity").text(msg.pack[i].airHumidity);
                        break;
                    case 1:
                        //土壤湿度
                        $("#"+idSelector+"soilHumidity").text(msg.pack[i].soilHumidity);
                        break;
                    case 2:
                        //光照
                        $("#"+idSelector+"intensity").text(msg.pack[i].intensity);
                        break;
                    case 3:
                        //CO2
                        $("#"+idSelector+"concentration").text(msg.pack[i].concentration);
                        break;
                    case 19:
                        //水温
                        $("#"+idSelector+"waterTemp").text(msg.pack[i].waterTemp);
                        break;
                }
            }
            else {
                let out = msg.pack[12];
                for(let j in out) {
                    $("#"+j).text(out[j]);
                }
            }
        }
    }
    if ( "list" in msg) {
        for(let i in msg.list){
            let dataType = msg.list[i].dataType;
            let idSelector = msg.list[i].loraNodeId;
            switch(dataType){
                case 0:
                    //温湿度数据
                    $("#"+idSelector+"airTemp").text(msg.list[i].airTemp);
                    $("#"+idSelector+"airHumidity").text(msg.list[i].airHumidity);
                    break;
                case 1:
                    //土壤湿度
                    $("#"+idSelector+"soilHumidity").text(msg.list[i].soilHumidity);
                    break;
                case 2:
                    //光照
                    $("#"+idSelector+"intensity").text(msg.list[i].intensity);
                    break;
                case 3:
                    //CO2
                    $("#"+idSelector+"concentration").text(msg.list[i].concentration);
                    break;
                case 19:
                    //水温
                    $("#"+idSelector+"waterTemp").text(msg.list[i].waterTemp);
                    break;
                
            }
        }
    }
    else if("erro" in msg){
        var err = msg.erro;
        for(let i in err) {
            if (i!="emergency_Stop_State") {
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
    if(err.emergency_Stop_State){
        document.getElementById("emergency_Stop_State").style.webkitFilter= "invert(19%) sepia(97%) saturate(6588%) hue-rotate(356deg) brightness(94%) contrast(118%)";
    } else {
        document.getElementById("emergency_Stop_State").style.webkitFilter="";
    }
    }
    else if("weat" in msg) {
        var weat = msg.weat;
        console.log(weat);
        for(let i in weat) {
            $("#"+i).text(weat[i]);
        }
    }
}

//连接关闭的回调方法
websocket.onclose = function () {
    console.log("WebSocket连接关闭");
}   

//监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，server端会抛异常。
window.onbeforeunload = function () {
    closeWebSocket();
};

//关闭WebSocket连接
function closeWebSocket() {
    websocket.close();
}