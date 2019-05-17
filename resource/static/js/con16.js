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
                            return  rowIndex + 31 
                             
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
                info.id = 2*num+100 ;
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
                info.id = 2*num+101;
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


window.addEventListener('storage',function(e){
    if(e.key === "erro") {
        var msg = JSON.parse(e.newValue);
        if ("erro" in msg) {
            var err = msg.erro;
            console.log(err);
            if(err.miaoChuangGuanGai31_ElectromagneticValveOutput){
                document.getElementsByClassName("light1")[0].style.webkitFilter= "invert(45%) sepia(60%) saturate(2599%) hue-rotate(91deg) brightness(128%) contrast(122%)";
            } else {
                document.getElementsByClassName("light1")[0].style.webkitFilter="";
            }

            if(err.miaoChuangGuanGai32_ElectromagneticValveOutput){
                document.getElementsByClassName("light1")[1].style.webkitFilter= "invert(45%) sepia(60%) saturate(2599%) hue-rotate(91deg) brightness(128%) contrast(122%)";
            } else {
                document.getElementsByClassName("light1")[1].style.webkitFilter="";
            }
            
            if(err.miaoChuangGuanGai33_ElectromagneticValveOutput){
                document.getElementsByClassName("light1")[2].style.webkitFilter= "invert(45%) sepia(60%) saturate(2599%) hue-rotate(91deg) brightness(128%) contrast(122%)";
            } else {
                document.getElementsByClassName("light1")[2].style.webkitFilter="";
            }

            if(err.miaoChuangGuanGai34_ElectromagneticValveOutput){
                document.getElementsByClassName("light1")[3].style.webkitFilter= "invert(45%) sepia(60%) saturate(2599%) hue-rotate(91deg) brightness(128%) contrast(122%)";
            } else {
                document.getElementsByClassName("light1")[3].style.webkitFilter="";
            }

            if(err.miaoChuangGuanGai35_ElectromagneticValveOutput){
                document.getElementsByClassName("light1")[4].style.webkitFilter= "invert(45%) sepia(60%) saturate(2599%) hue-rotate(91deg) brightness(128%) contrast(122%)";
            } else {
                document.getElementsByClassName("light1")[4].style.webkitFilter="";
            }

            if(err.miaoChuangGuanGai36_ElectromagneticValveOutput){
                document.getElementsByClassName("light1")[5].style.webkitFilter= "invert(45%) sepia(60%) saturate(2599%) hue-rotate(91deg) brightness(128%) contrast(122%)";
            } else {
                document.getElementsByClassName("light1")[5].style.webkitFilter="";
            }

            if(err.miaoChuangGuanGai37_ElectromagneticValveOutput){
                document.getElementsByClassName("light1")[6].style.webkitFilter= "invert(45%) sepia(60%) saturate(2599%) hue-rotate(91deg) brightness(128%) contrast(122%)";
            } else {
                document.getElementsByClassName("light1")[6].style.webkitFilter="";
            }

            if(err.miaoChuangGuanGai38_ElectromagneticValveOutput){
                document.getElementsByClassName("light1")[7].style.webkitFilter= "invert(45%) sepia(60%) saturate(2599%) hue-rotate(91deg) brightness(128%) contrast(122%)";
            } else {
                document.getElementsByClassName("light1")[7].style.webkitFilter="";
            }

            if(err.miaoChuangGuanGai39_ElectromagneticValveOutput){
                document.getElementsByClassName("light1")[8].style.webkitFilter= "invert(45%) sepia(60%) saturate(2599%) hue-rotate(91deg) brightness(128%) contrast(122%)";
            } else {
                document.getElementsByClassName("light1")[8].style.webkitFilter="";
            }

            if(err.miaoChuangGuanGai40_ElectromagneticValveOutput){
                document.getElementsByClassName("light1")[9].style.webkitFilter= "invert(45%) sepia(60%) saturate(2599%) hue-rotate(91deg) brightness(128%) contrast(122%)";
            } else {
                document.getElementsByClassName("light1")[9].style.webkitFilter="";
            }

            if(err.miaoChuangGuanGai41_ElectromagneticValveOutput){
                document.getElementsByClassName("light1")[10].style.webkitFilter= "invert(45%) sepia(60%) saturate(2599%) hue-rotate(91deg) brightness(128%) contrast(122%)";
            } else {
                document.getElementsByClassName("light1")[10].style.webkitFilter="";
            }

            if(err.miaoChuangGuanGai42_ElectromagneticValveOutput){
                document.getElementsByClassName("light1")[11].style.webkitFilter= "invert(45%) sepia(60%) saturate(2599%) hue-rotate(91deg) brightness(128%) contrast(122%)";
            } else {
                document.getElementsByClassName("light1")[11].style.webkitFilter="";
            }

            if(err.miaoChuangGuanGai43_ElectromagneticValveOutput){
                document.getElementsByClassName("light1")[12].style.webkitFilter= "invert(45%) sepia(60%) saturate(2599%) hue-rotate(91deg) brightness(128%) contrast(122%)";
            } else {
                document.getElementsByClassName("light1")[12].style.webkitFilter="";
            }

            if(err.miaoChuangGuanGai44_ElectromagneticValveOutput){
                document.getElementsByClassName("light1")[13].style.webkitFilter= "invert(45%) sepia(60%) saturate(2599%) hue-rotate(91deg) brightness(128%) contrast(122%)";
            } else {
                document.getElementsByClassName("light1")[13].style.webkitFilter="";
            }

            if(err.miaoChuangGuanGai45_ElectromagneticValveOutput){
                document.getElementsByClassName("light1")[14].style.webkitFilter= "invert(45%) sepia(60%) saturate(2599%) hue-rotate(91deg) brightness(128%) contrast(122%)";
            } else {
                document.getElementsByClassName("light1")[14].style.webkitFilter="";
            }

            if(err.miaoChuangGuanGai46_ElectromagneticValveOutput){
                document.getElementsByClassName("light1")[15].style.webkitFilter= "invert(45%) sepia(60%) saturate(2599%) hue-rotate(91deg) brightness(128%) contrast(122%)";
            } else {
                document.getElementsByClassName("light1")[15].style.webkitFilter="";
            }

            if(err.miaoChuangGuanGai47_ElectromagneticValveOutput){
                document.getElementsByClassName("light1")[16].style.webkitFilter= "invert(45%) sepia(60%) saturate(2599%) hue-rotate(91deg) brightness(128%) contrast(122%)";
            } else {
                document.getElementsByClassName("light1")[16].style.webkitFilter="";
            }

            if(err.miaoChuangGuanGai48_ElectromagneticValveOutput){
                document.getElementsByClassName("light1")[17].style.webkitFilter= "invert(45%) sepia(60%) saturate(2599%) hue-rotate(91deg) brightness(128%) contrast(122%)";
            } else {
                document.getElementsByClassName("light1")[17].style.webkitFilter="";
            }

            if(err.miaoChuangGuanGai49_ElectromagneticValveOutput){
                document.getElementsByClassName("light1")[18].style.webkitFilter= "invert(45%) sepia(60%) saturate(2599%) hue-rotate(91deg) brightness(128%) contrast(122%)";
            } else {
                document.getElementsByClassName("light1")[18].style.webkitFilter="";
            }

            if(err.miaoChuangGuanGai50_ElectromagneticValveOutput){
                document.getElementsByClassName("light1")[19].style.webkitFilter= "invert(45%) sepia(60%) saturate(2599%) hue-rotate(91deg) brightness(128%) contrast(122%)";
            } else {
                document.getElementsByClassName("light1")[19].style.webkitFilter="";
            }

            if(err.miaoChuangGuanGai51_ElectromagneticValveOutput){
                document.getElementsByClassName("light1")[20].style.webkitFilter= "invert(45%) sepia(60%) saturate(2599%) hue-rotate(91deg) brightness(128%) contrast(122%)";
            } else {
                document.getElementsByClassName("light1")[20].style.webkitFilter="";
            }

            if(err.miaoChuangGuanGai52_ElectromagneticValveOutput){
                document.getElementsByClassName("light1")[21].style.webkitFilter= "invert(45%) sepia(60%) saturate(2599%) hue-rotate(91deg) brightness(128%) contrast(122%)";
            } else {
                document.getElementsByClassName("light1")[21].style.webkitFilter="";
            }

            if(err.miaoChuangGuanGai53_ElectromagneticValveOutput){
                document.getElementsByClassName("light1")[22].style.webkitFilter= "invert(45%) sepia(60%) saturate(2599%) hue-rotate(91deg) brightness(128%) contrast(122%)";
            } else {
                document.getElementsByClassName("light1")[22].style.webkitFilter="";
            }

            if(err.miaoChuangGuanGai54_ElectromagneticValveOutput){
                document.getElementsByClassName("light1")[23].style.webkitFilter= "invert(45%) sepia(60%) saturate(2599%) hue-rotate(91deg) brightness(128%) contrast(122%)";
            } else {
                document.getElementsByClassName("light1")[23].style.webkitFilter="";
            }

            if(err.miaoChuangGuanGai55_ElectromagneticValveOutput){
                document.getElementsByClassName("light1")[24].style.webkitFilter= "invert(45%) sepia(60%) saturate(2599%) hue-rotate(91deg) brightness(128%) contrast(122%)";
            } else {
                document.getElementsByClassName("light1")[24].style.webkitFilter="";
            }

            if(err.miaoChuangGuanGai56_ElectromagneticValveOutput){
                document.getElementsByClassName("light1")[25].style.webkitFilter= "invert(45%) sepia(60%) saturate(2599%) hue-rotate(91deg) brightness(128%) contrast(122%)";
            } else {
                document.getElementsByClassName("light1")[25].style.webkitFilter="";
            }

            if(err.miaoChuangGuanGai57_ElectromagneticValveOutput){
                document.getElementsByClassName("light1")[26].style.webkitFilter= "invert(45%) sepia(60%) saturate(2599%) hue-rotate(91deg) brightness(128%) contrast(122%)";
            } else {
                document.getElementsByClassName("light1")[26].style.webkitFilter="";
            }

            if(err.miaoChuangGuanGai58_ElectromagneticValveOutput){
                document.getElementsByClassName("light1")[27].style.webkitFilter= "invert(45%) sepia(60%) saturate(2599%) hue-rotate(91deg) brightness(128%) contrast(122%)";
            } else {
                document.getElementsByClassName("light1")[27].style.webkitFilter="";
            }

            if(err.miaoChuangGuanGai59_ElectromagneticValveOutput){
                document.getElementsByClassName("light1")[28].style.webkitFilter= "invert(45%) sepia(60%) saturate(2599%) hue-rotate(91deg) brightness(128%) contrast(122%)";
            } else {
                document.getElementsByClassName("light1")[28].style.webkitFilter="";
            }

            if(err.miaoChuangGuanGai60_ElectromagneticValveOutput){
                document.getElementsByClassName("light1")[29].style.webkitFilter= "invert(45%) sepia(60%) saturate(2599%) hue-rotate(91deg) brightness(128%) contrast(122%)";
            } else {
                document.getElementsByClassName("light1")[29].style.webkitFilter="";
            }
        }
    }
})