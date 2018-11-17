var websocket = null;
        //判断当前浏览器是否支持WebSocket
        if ('WebSocket' in window) {
            websocket = new WebSocket("ws://localhost:6060/farm/pull");
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
        }

         //将消息显示在网页上
         function displayMsg(innerHtml) {
            var msg = JSON.parse(innerHtml);
            console.log(msg);
            for(i in msg.list){
                var dataType = msg.list[i].dataType;
                var idSelector = msg.list[i].loraNodeId;
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
        
        //连接关闭的回调方法
        websocket.onclose = function () {
            console.log("WebSocket连接关闭");
        }
        
        //监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，server端会抛异常。
        window.onbeforeunload = function () {
            closeWebSocket();
        }

        //关闭WebSocket连接
        function closeWebSocket() {
            websocket.close();
        }