var Main ={
    data() {
        return {
            tableData: [
                {"votage":"电机380V","power":"0.75kw"},
                {"votage":"电机380V","power":"0.75kw"},
                
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

            if (params.type === 'open'){ 

                
            }else if (params.type === 'close'){ 

                
            }else if (params.type === 'stop'){ 

                
            }

        }
    }
}

// 自定义列组件
Vue.component('table-operation',{
    template:`<span>
    <a href="" @click.stop.prevent="open(rowData,index)">开</a>&nbsp;
    <a href="" @click.stop.prevent="close(rowData,index)">关</a>&nbsp;
    <a href="" @click.stop.prevent="stop(rowData,index)">停</a>
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
           alert(`行号：${params.index+1} 开`)
        },

        close(){

            // 参数根据业务场景随意构造
            let params = {type:'close',index:this.index,rowData:this.rowData};
            this.$emit('on-custom-comp',params);
            alert(`行号：${params.index+1} 关`)

        },
        stop(){

            // 参数根据业务场景随意构造
            let params = {type:'stop',index:this.index,rowData:this.rowData};
            this.$emit('on-custom-comp',params);
            alert(`行号：${params.index+1} 停`)
        }
    }
})
var Ctor = Vue.extend(Main)
new Ctor().$mount('#app')