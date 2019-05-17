var Main ={
    data() {
        return {
            tableData: [
                {"votage":"电机380","power":"1.5kw"}
                
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
                info.id = 21 ;
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
            
            }else if (params.type === 'close'){ 
                info.id = 22;
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
                
            }

        }
    }
}

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
           let params = {type:'open',index:this.index,rowData:this.rowData};
           this.$emit('on-custom-comp',params);
           
        },

        close(){

            // 参数根据业务场景随意构造
            let params = {type:'close',index:this.index,rowData:this.rowData};
            this.$emit('on-custom-comp',params);
            

        }
    }
})
var Ctor = Vue.extend(Main)
new Ctor().$mount('#app')

window.addEventListener('storage',function(e){
    if(e.key === "erro") {
        var msg = JSON.parse(e.newValue);
        if ("erro" in msg) {
            var err = msg.erro;
            console.log(err);
            if(err.shiFeiBeng_FeedBack){
                document.getElementsByClassName("light1")[0].style.webkitFilter= "invert(45%) sepia(60%) saturate(2599%) hue-rotate(91deg) brightness(128%) contrast(122%)";
            } else {
                document.getElementsByClassName("light1")[0].style.webkitFilter="";
            }
            
            
        }
    }
})