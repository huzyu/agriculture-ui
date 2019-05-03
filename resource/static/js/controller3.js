var Main ={
    data() {
        return {
            tableData: [
                {"votage":"电机直流24","power":"80W*10"},
                
                
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
            if (params.type === 'open'){ 
                alert(`行号：${params.index+1} 正!`)
                
                document.getElementsByTagName("img")[num].src="../static/img/绿灯.png"
            }else if (params.type === 'close'){ 
                alert(`行号：${params.index+1} 停!`)
                document.getElementsByTagName("img")[num].src="../static/img/灯泡.png"
            }else if (params.type === 'reverse'){ 
                alert(`行号：${params.index+1} 反!`)
                document.getElementsByTagName("img")[num].src="../static/img/绿灯.png"               
            }
        }
    }
}

// 自定义列组件
Vue.component('table-operation',{
    template:`<span>
    <img src="../static/img/灯泡.png"  class="light">
    <a href="" @click.stop.prevent="open(rowData,index)">正</a>&nbsp;
    <a href="" @click.stop.prevent="close(rowData,index)">停</a>&nbsp;
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
            let params = {type:'close',index:this.index,rowData:this.rowData};
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