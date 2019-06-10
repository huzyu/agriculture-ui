var Main ={
    data() {
        return {
            tableData: [
                {"votage":"电机380V","power":"0.75kw"},
                {"votage":"电机","power":"0.75kw"},
                
             ],
            columns: [
                {
                    field: 'custome', title:'序号', width: 50, titleAlign: 'center', columnAlign: 'center',
                    formatter: function (rowData,rowIndex,pagingIndex,field) {
                        return  rowIndex + 1
                    }, isFrozen: true,isResize:true
                },
                {field: 'votage', title: '电压', width: 80, titleAlign: 'center', columnAlign: 'center',isResize:true},
                {field: 'power', title: '功率', width: 80, titleAlign: 'center', columnAlign: 'center',isResize:true},
                {field: 'custome-adv', title: '操作',width: 200, titleAlign: 'center',columnAlign:'center',componentName:'table-operation',isResize:true}
            ]
        }
    },
    methods:{
        customCompFunc(params){

            console.log(params);
            let num = +params.index;
            let fUrl = "device/device_control";
            let info = {};
            if (params.type === 'open'){ 
                info.id = 3*num+7 ;
                jQuery.ajax({
                    url:fUrl,
                    type:'POST',
                    data:JSON.stringify(info),
                    contentType:'application/json',
                    success:function (data) {
                        if (data.success){
                        }else {
                        }
                    }
                });   
            console.log(info);
            document.getElementsByClassName("light1")[num].style.webkitFilter= "invert(19%) sepia(97%) saturate(6588%) hue-rotate(356deg) brightness(94%) contrast(118%)";
            }else if (params.type === 'close'){ 
                info.id = 3*num+8 ;
                jQuery.ajax({
                    url:fUrl,
                    type:'POST',
                    data:JSON.stringify(info),
                    contentType:'application/json',
                    success:function (data) {
                        if (data.success){
                        }else {
                        }
                    }
                });
                console.log(info);
                document.getElementsByClassName("light1")[num].style.webkitFilter= "";
                document.getElementsByClassName("light2")[num].style.webkitFilter= "";   
            }else if (params.type === 'reverse'){ 
                info.id = 3*num+9 ;
                jQuery.ajax({
                    url:fUrl,
                    type:'POST',
                    data:JSON.stringify(info),
                    contentType:'application/json',
                    success:function (data) {
                        if (data.success){
                        }else {
                        }
                    }
                });
                console.log(info);   
                document.getElementsByClassName("light2")[num].style.webkitFilter= "invert(19%) sepia(97%) saturate(6588%) hue-rotate(356deg) brightness(94%) contrast(118%)";           
            }

        }
    }
}

// 自定义列组件
Vue.component('table-operation',{
    template:`<span>
    <img src="img/灯泡.png"  class="light1">
    <a href="" @click.stop.prevent="open(rowData,index)">正</a>&nbsp;
    <a href="" @click.stop.prevent="close(rowData,index)">停</a>&nbsp;
    <img src="img/灯泡.png"  class="light2">
    <a href="" @click.stop.prevent="reverse(rowData,index)">反</a>
    </span>`,
    props:{
        rowData:{
            type:Object
        },
        field:{
            type:String
        },
        index:{
            type:Number
        }
    },
    methods:{
        open(){

           // 参数根据业务场景随意构造
           let params = {type:'open',index:this.index,rowData:this.rowData};
           this.$emit('on-custom-comp',params);
           
        },

        close(){

            // 参数根据业务场景随意构造
            let params = {type:'close',index:this.index};
            this.$emit('on-custom-comp',params);
            
        },
        reverse(){

            // 参数根据业务场景随意构造
            let params = {type:'reverse',index:this.index,rowData:this.rowData};
            this.$emit('on-custom-comp',params);
            
        }
    }
})
var Ctor = Vue.extend(Main)
new Ctor().$mount('#app')



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
        if(err.emergency_Stop_State){
            document.getElementById("emergency_Stop_State").style.webkitFilter= "invert(19%) sepia(97%) saturate(6588%) hue-rotate(356deg) brightness(94%) contrast(118%)";
        } else {
            document.getElementById("emergency_Stop_State").style.webkitFilter="";
        }
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
        if(err.neiZheYang1_Forward_FeedBack){
            document.getElementsByClassName("light1")[0].style.webkitFilter= "invert(19%) sepia(97%) saturate(6588%) hue-rotate(356deg) brightness(94%) contrast(118%)";
        }
        else{
            document.getElementsByClassName("light1")[0].style.webkitFilter="";
        }
        if(err.neiZheYang1_Reverse_FeedBack) {
            document.getElementsByClassName("light2")[0].style.webkitFilter= "invert(19%) sepia(97%) saturate(6588%) hue-rotate(356deg) brightness(94%) contrast(118%)";
        }
        else {
            document.getElementsByClassName("light2")[0].style.webkitFilter="";
        }
        if(err.neiZheYang2_Forward_FeedBack){
            document.getElementsByClassName("light1")[1].style.webkitFilter= "invert(19%) sepia(97%) saturate(6588%) hue-rotate(356deg) brightness(94%) contrast(118%)";
        } else {
            document.getElementsByClassName("light1")[1].style.webkitFilter="";
        }
        if(err.neiZheYang2_Reverse_FeedBack) {
            document.getElementsByClassName("light2")[1].style.webkitFilter= "invert(19%) sepia(97%) saturate(6588%) hue-rotate(356deg) brightness(94%) contrast(118%)";
        } else {
            document.getElementsByClassName("light2")[1].style.webkitFilter= "";
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