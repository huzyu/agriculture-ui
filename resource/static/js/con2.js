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
            document.getElementsByClassName("light1")[num].style.webkitFilter= "invert(45%) sepia(60%) saturate(2599%) hue-rotate(91deg) brightness(128%) contrast(122%)";
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
                document.getElementsByClassName("light1")[num].style.webkitFilter="";
                document.getElementsByClassName("light2")[num].style.webkitFilter="";
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
                document.getElementsByClassName("light2")[num].style.webkitFilter= "invert(45%) sepia(60%) saturate(2599%) hue-rotate(91deg) brightness(128%) contrast(122%)";           
            }

        }
    }
}

// 自定义列组件
Vue.component('table-operation',{
    template:`<span>
    <img src="../static/img/灯泡.png"  class="light1">
    <a href="" @click.stop.prevent="open(rowData,index)">正</a>&nbsp;
    <a href="" @click.stop.prevent="close(rowData,index)">停</a>&nbsp;
    <img src="../static/img/灯泡.png"  class="light2">
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