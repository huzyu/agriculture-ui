tableData = [
    {"votage":"电磁阀直流24","power":"10w"},
    {"votage":"电磁阀直流24","power":"10w"},
    {"votage":"电磁阀直流24","power":"10w"},
    {"votage":"电磁阀直流24","power":"10w"},
    {"votage":"电磁阀直流24","power":"10w"},
    {"votage":"电磁阀直流24","power":"10w"},
    {"votage":"电磁阀直流24","power":"10w"},
    {"votage":"电磁阀直流24","power":"10w"},
    {"votage":"电磁阀直流24","power":"10w"},
    {"votage":"电磁阀直流24","power":"10w"},
    {"votage":"电磁阀直流24","power":"10w"},
    {"votage":"电磁阀直流24","power":"10w"},
    {"votage":"电磁阀直流24","power":"10w"},
    {"votage":"电磁阀直流24","power":"10w"},
    {"votage":"电磁阀直流24","power":"10w"},
    {"votage":"电磁阀直流24","power":"10w"},
    {"votage":"电磁阀直流24","power":"10w"},
    {"votage":"电磁阀直流24","power":"10w"},
    {"votage":"电磁阀直流24","power":"10w"},
    {"votage":"电磁阀直流24","power":"10w"},
    {"votage":"电磁阀直流24","power":"10w"},
    {"votage":"电磁阀直流24","power":"10w"},
    {"votage":"电磁阀直流24","power":"10w"},
    {"votage":"电磁阀直流24","power":"10w"},
    {"votage":"电磁阀直流24","power":"10w"},
    {"votage":"电磁阀直流24","power":"10w"},
    {"votage":"电磁阀直流24","power":"10w"},
    {"votage":"电磁阀直流24","power":"10w"},
    {"votage":"电磁阀直流24","power":"10w"},
    {"votage":"电磁阀直流24","power":"10w"},
    
]

var Ctor =Vue.extend({
    data() {
        return {
           
                tableData: tableData,
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
    methods: {
        getTableData(){

            this.tableConfig.tableData = tableData.slice((this.pageIndex-1)*this.pageSize,(this.pageIndex)*this.pageSize)
        },
        pageChange(pageIndex){

            this.pageIndex = pageIndex;
            this.getTableData();
            console.log(pageIndex)
       },
       pageSizeChange(pageSize){

        this.pageIndex = 1;
        this.pageSize = pageSize;
        this.getTableData();
       },
       customCompFunc(params){

        console.log(params);
        let num = +params.index;
            let fUrl = "device/device_control";
            let info = {};
            if (params.type === 'open'){ 
                info.id = 2*num+40 ;
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
                info.id = 2*num+41;
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
        }
    }
    },
})

new Ctor().$mount('#app')
// 自定义列组件
Vue.component('table-operation',{
    template:`<span>
    <img src="img/灯泡.png"  class="light1">
    <a href="" @click.stop.prevent="open(rowData,index)">开</a>&nbsp;
    <a href="" @click.stop.prevent="close(rowData,index)">关</a>
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
           let params = {type:'open',index:this.index,rowData:this.rowData,field:this.field};
           this.$emit('on-custom-comp',params);
           
        
        },

        close(){

            // 参数根据业务场景随意构造
            let params = {type:'close',index:this.index,rowData:this.rowData};
            this.$emit('on-custom-comp',params);
        }
    }
})


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
        if(err.miaoChuangGuanGai1_ElectromagneticValveOutput){
            document.getElementsByClassName("light1")[0].style.webkitFilter= "invert(19%) sepia(97%) saturate(6588%) hue-rotate(356deg) brightness(94%) contrast(118%)";
        } else {
            document.getElementsByClassName("light1")[0].style.webkitFilter="";
        }

        if(err.miaoChuangGuanGai2_ElectromagneticValveOutput){
            document.getElementsByClassName("light1")[1].style.webkitFilter= "invert(19%) sepia(97%) saturate(6588%) hue-rotate(356deg) brightness(94%) contrast(118%)";
        } else {
            document.getElementsByClassName("light1")[1].style.webkitFilter="";
        }
        
        if(err.miaoChuangGuanGai3_ElectromagneticValveOutput){
            document.getElementsByClassName("light1")[2].style.webkitFilter= "invert(19%) sepia(97%) saturate(6588%) hue-rotate(356deg) brightness(94%) contrast(118%)";
        } else {
            document.getElementsByClassName("light1")[2].style.webkitFilter="";
        }

        if(err.miaoChuangGuanGai4_ElectromagneticValveOutput){
            document.getElementsByClassName("light1")[3].style.webkitFilter= "invert(19%) sepia(97%) saturate(6588%) hue-rotate(356deg) brightness(94%) contrast(118%)";
        } else {
            document.getElementsByClassName("light1")[3].style.webkitFilter="";
        }

        if(err.miaoChuangGuanGai5_ElectromagneticValveOutput){
            document.getElementsByClassName("light1")[4].style.webkitFilter= "invert(19%) sepia(97%) saturate(6588%) hue-rotate(356deg) brightness(94%) contrast(118%)";
        } else {
            document.getElementsByClassName("light1")[4].style.webkitFilter="";
        }

        if(err.miaoChuangGuanGai6_ElectromagneticValveOutput){
            document.getElementsByClassName("light1")[5].style.webkitFilter= "invert(19%) sepia(97%) saturate(6588%) hue-rotate(356deg) brightness(94%) contrast(118%)";
        } else {
            document.getElementsByClassName("light1")[5].style.webkitFilter="";
        }

        if(err.miaoChuangGuanGai7_ElectromagneticValveOutput){
            document.getElementsByClassName("light1")[6].style.webkitFilter= "invert(19%) sepia(97%) saturate(6588%) hue-rotate(356deg) brightness(94%) contrast(118%)";
        } else {
            document.getElementsByClassName("light1")[6].style.webkitFilter="";
        }

        if(err.miaoChuangGuanGai8_ElectromagneticValveOutput){
            document.getElementsByClassName("light1")[7].style.webkitFilter= "invert(19%) sepia(97%) saturate(6588%) hue-rotate(356deg) brightness(94%) contrast(118%)";
        } else {
            document.getElementsByClassName("light1")[7].style.webkitFilter="";
        }

        if(err.miaoChuangGuanGai9_ElectromagneticValveOutput){
            document.getElementsByClassName("light1")[8].style.webkitFilter= "invert(19%) sepia(97%) saturate(6588%) hue-rotate(356deg) brightness(94%) contrast(118%)";
        } else {
            document.getElementsByClassName("light1")[8].style.webkitFilter="";
        }

        if(err.miaoChuangGuanGai10_ElectromagneticValveOutput){
            document.getElementsByClassName("light1")[9].style.webkitFilter= "invert(19%) sepia(97%) saturate(6588%) hue-rotate(356deg) brightness(94%) contrast(118%)";
        } else {
            document.getElementsByClassName("light1")[9].style.webkitFilter="";
        }

        if(err.miaoChuangGuanGai11_ElectromagneticValveOutput){
            document.getElementsByClassName("light1")[10].style.webkitFilter= "invert(19%) sepia(97%) saturate(6588%) hue-rotate(356deg) brightness(94%) contrast(118%)";
        } else {
            document.getElementsByClassName("light1")[10].style.webkitFilter="";
        }

        if(err.miaoChuangGuanGai12_ElectromagneticValveOutput){
            document.getElementsByClassName("light1")[11].style.webkitFilter= "invert(19%) sepia(97%) saturate(6588%) hue-rotate(356deg) brightness(94%) contrast(118%)";
        } else {
            document.getElementsByClassName("light1")[11].style.webkitFilter="";
        }

        if(err.miaoChuangGuanGai13_ElectromagneticValveOutput){
            document.getElementsByClassName("light1")[12].style.webkitFilter= "invert(19%) sepia(97%) saturate(6588%) hue-rotate(356deg) brightness(94%) contrast(118%)";
        } else {
            document.getElementsByClassName("light1")[12].style.webkitFilter="";
        }

        if(err.miaoChuangGuanGai14_ElectromagneticValveOutput){
            document.getElementsByClassName("light1")[13].style.webkitFilter= "invert(19%) sepia(97%) saturate(6588%) hue-rotate(356deg) brightness(94%) contrast(118%)";
        } else {
            document.getElementsByClassName("light1")[13].style.webkitFilter="";
        }

        if(err.miaoChuangGuanGai15_ElectromagneticValveOutput){
            document.getElementsByClassName("light1")[14].style.webkitFilter= "invert(19%) sepia(97%) saturate(6588%) hue-rotate(356deg) brightness(94%) contrast(118%)";
        } else {
            document.getElementsByClassName("light1")[14].style.webkitFilter="";
        }

        if(err.miaoChuangGuanGai16_ElectromagneticValveOutput){
            document.getElementsByClassName("light1")[15].style.webkitFilter= "invert(19%) sepia(97%) saturate(6588%) hue-rotate(356deg) brightness(94%) contrast(118%)";
        } else {
            document.getElementsByClassName("light1")[15].style.webkitFilter="";
        }

        if(err.miaoChuangGuanGai17_ElectromagneticValveOutput){
            document.getElementsByClassName("light1")[16].style.webkitFilter= "invert(19%) sepia(97%) saturate(6588%) hue-rotate(356deg) brightness(94%) contrast(118%)";
        } else {
            document.getElementsByClassName("light1")[16].style.webkitFilter="";
        }

        if(err.miaoChuangGuanGai18_ElectromagneticValveOutput){
            document.getElementsByClassName("light1")[17].style.webkitFilter= "invert(19%) sepia(97%) saturate(6588%) hue-rotate(356deg) brightness(94%) contrast(118%)";
        } else {
            document.getElementsByClassName("light1")[17].style.webkitFilter="";
        }

        if(err.miaoChuangGuanGai19_ElectromagneticValveOutput){
            document.getElementsByClassName("light1")[18].style.webkitFilter= "invert(19%) sepia(97%) saturate(6588%) hue-rotate(356deg) brightness(94%) contrast(118%)";
        } else {
            document.getElementsByClassName("light1")[18].style.webkitFilter="";
        }

        if(err.miaoChuangGuanGai20_ElectromagneticValveOutput){
            document.getElementsByClassName("light1")[19].style.webkitFilter= "invert(19%) sepia(97%) saturate(6588%) hue-rotate(356deg) brightness(94%) contrast(118%)";
        } else {
            document.getElementsByClassName("light1")[19].style.webkitFilter="";
        }

        if(err.miaoChuangGuanGai21_ElectromagneticValveOutput){
            document.getElementsByClassName("light1")[20].style.webkitFilter= "invert(19%) sepia(97%) saturate(6588%) hue-rotate(356deg) brightness(94%) contrast(118%)";
        } else {
            document.getElementsByClassName("light1")[20].style.webkitFilter="";
        }

        if(err.miaoChuangGuanGai22_ElectromagneticValveOutput){
            document.getElementsByClassName("light1")[21].style.webkitFilter= "invert(19%) sepia(97%) saturate(6588%) hue-rotate(356deg) brightness(94%) contrast(118%)";
        } else {
            document.getElementsByClassName("light1")[21].style.webkitFilter="";
        }

        if(err.miaoChuangGuanGai23_ElectromagneticValveOutput){
            document.getElementsByClassName("light1")[22].style.webkitFilter= "invert(19%) sepia(97%) saturate(6588%) hue-rotate(356deg) brightness(94%) contrast(118%)";
        } else {
            document.getElementsByClassName("light1")[22].style.webkitFilter="";
        }

        if(err.miaoChuangGuanGai24_ElectromagneticValveOutput){
            document.getElementsByClassName("light1")[23].style.webkitFilter= "invert(19%) sepia(97%) saturate(6588%) hue-rotate(356deg) brightness(94%) contrast(118%)";
        } else {
            document.getElementsByClassName("light1")[23].style.webkitFilter="";
        }

        if(err.miaoChuangGuanGai25_ElectromagneticValveOutput){
            document.getElementsByClassName("light1")[24].style.webkitFilter= "invert(19%) sepia(97%) saturate(6588%) hue-rotate(356deg) brightness(94%) contrast(118%)";
        } else {
            document.getElementsByClassName("light1")[24].style.webkitFilter="";
        }

        if(err.miaoChuangGuanGai26_ElectromagneticValveOutput){
            document.getElementsByClassName("light1")[25].style.webkitFilter= "invert(19%) sepia(97%) saturate(6588%) hue-rotate(356deg) brightness(94%) contrast(118%)";
        } else {
            document.getElementsByClassName("light1")[25].style.webkitFilter="";
        }

        if(err.miaoChuangGuanGai27_ElectromagneticValveOutput){
            document.getElementsByClassName("light1")[26].style.webkitFilter= "invert(19%) sepia(97%) saturate(6588%) hue-rotate(356deg) brightness(94%) contrast(118%)";
        } else {
            document.getElementsByClassName("light1")[26].style.webkitFilter="";
        }

        if(err.miaoChuangGuanGai28_ElectromagneticValveOutput){
            document.getElementsByClassName("light1")[27].style.webkitFilter= "invert(19%) sepia(97%) saturate(6588%) hue-rotate(356deg) brightness(94%) contrast(118%)";
        } else {
            document.getElementsByClassName("light1")[27].style.webkitFilter="";
        }

        if(err.miaoChuangGuanGai29_ElectromagneticValveOutput){
            document.getElementsByClassName("light1")[28].style.webkitFilter= "invert(19%) sepia(97%) saturate(6588%) hue-rotate(356deg) brightness(94%) contrast(118%)";
        } else {
            document.getElementsByClassName("light1")[28].style.webkitFilter="";
        }

        if(err.miaoChuangGuanGai30_ElectromagneticValveOutput){
            document.getElementsByClassName("light1")[29].style.webkitFilter= "invert(19%) sepia(97%) saturate(6588%) hue-rotate(356deg) brightness(94%) contrast(118%)";
        } else {
            document.getElementsByClassName("light1")[29].style.webkitFilter="";
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