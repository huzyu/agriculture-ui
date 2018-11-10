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
                var data_type = msg.list[i].data_type;
                var loraNode_id = msg.list[i].loraNode_id
                var data = msg.list[i].data;
                console.log(data_type+" "+data+" "+loraNode_id);
                switch(data_type){
                    case 0:
                        var loraClass = "."+loraNode_id; 
                        console.log(loraClass);
                        $("loraClass,.0").text(data);
                        //$(".0").text(data);
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