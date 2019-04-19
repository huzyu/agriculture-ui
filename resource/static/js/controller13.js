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
    {"votage":"电磁阀直流24","power":"10w"}
]

var Ctor =Vue.extend({
    data() {
        return {
            pageIndex:1,
            pageSize:10,
            tableConfig: {
                tableData: [],
                columns: [
                    {
                        field: 'custome', title:'序号', width: 50, titleAlign: 'center', columnAlign: 'center',
                        formatter: function (rowData,rowIndex,pagingIndex,field) {
                            return  rowIndex + 1 + pagingIndex
                        }, isFrozen: true,isResize:true
                    },
                    {field: 'votage', title: '电压', width: 80, titleAlign: 'center', columnAlign: 'center',isResize:true},
                    {field: 'power', title: '功率', width: 80, titleAlign: 'center', columnAlign: 'center',isResize:true},
                    {field: 'custome-adv', title: '操作',width: 200, titleAlign: 'center',columnAlign:'center',componentName:'table-operation',isResize:true}
                ]
            }
        }
    },
    created() {
        this.getTableData();
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

        if (params.type === 'open'){ // do open operation

            alert(`行号：${ params.index+1+(this.pageIndex-1)*this.pageSize} 开!`)

        }
        if (params.type === 'close'){
            alert(`行号：${params.index+1+(this.pageIndex-1)*this.pageSize} 关!`)
        }
    }
    },
})

new Ctor().$mount('#app')
// 自定义列组件
Vue.component('table-operation',{
    template:`<span>
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
