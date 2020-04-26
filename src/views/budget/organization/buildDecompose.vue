<template>
  <div>
    <div class="contentTopTitle">
      <div class="fl">
        <div class="title">新建分解</div>
      </div>
      <div class="fr">
        <el-button size="small" plain @click="$router.go(-1)">返回</el-button>
      </div>
    </div>
    <div>
      <el-form :inline="true" :model="form" class="formList">
        <el-form-item label="选择区域:" label-width="90px">
          <dx-cascader :area_id.sync="form.areaId"/>
        </el-form-item>
        <el-form-item label="预算年度:" label-width="90px">
           <el-date-picker
            v-model="form.testYear"
            type="year"
            value-format="yyyy"
            placeholder="选择年"
            @change="changeYear">
          </el-date-picker>
        </el-form-item>
      </el-form>
    </div>
    <div class="tableBox">
      <el-table v-loading="tableLoading" :data="tableData"
                style="width: 100%" class="tableTh28" border stripe
                :span-method="arraySpanMethod"
      >
        <el-table-column label="年度"  prop="year" fixed="left" width="100" class-name="fixedColumn"></el-table-column>
        <el-table-column label="测算结果" prop="product" fixed="left" class-name="fixedColumn"></el-table-column>
        <el-table-column  v-for="(item,index) in areaTitles"  
                :key="index" :label="item.areaName" :prop="item.areaId" 
                width="120">
        </el-table-column>
        
      </el-table>
    </div>
    <div class="content" style="margin-top: 10px">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="移动测算编制" name="first">
          <tab1></tab1>
        </el-tab-pane>
        <el-tab-pane label="宽带" name="second">
          <tab2></tab2>
        </el-tab-pane>
        <el-tab-pane label="ITV" name="third">
          <tab3></tab3>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
  import tab1 from "@/views/budget/organization/buildDecompose/tab1";
  import tab2 from "@/views/budget/organization/buildDecompose/tab2";
  import tab3 from "@/views/budget/organization/buildDecompose/tab3";
  import {getSessionStorage} from "@/common/js/storage";
  import {$budgetAPI} from '@/api';
  import {mergeTableRow} from "@/utils/mixin"
  export default {
    name: "buildDecompose",
    components:{
      tab1,
      tab2,
      tab3,
    },
    data(){
      return{
        form: {
          areaId:'',
          testYear:""
        },
        activeName:'first',
        tableData:[],
        tableLoading:false,
        areaTitles:[]
      }
    },
    watch:{
      form:{
        handler(newValue,oldValue){
          this.getTotalInitData();
        },
        deep:true
      }
    },
    created(){
      this.accountInfo = JSON.parse(getSessionStorage('accountInfo'));
      this.form.areaId = this.accountInfo.areaId
      this.form.testYear = this.moment().format('YYYY')
    },
    methods:{
      changeYear(val){
        this.getTotalInitData();
      },
      //获取第一张表
      getTotalInitData(){
        this.tableLoading = true;
        $budgetAPI.getTotalInitData(this.form,res=>{
          this.tableLoading = false;
          if(res.code == 0){
            this.tableData = [] 
            this.areaTitles = res.content.areaTitles;
            if(res.content.dataList){
              res.content.dataList.map((item,index)=>{
                let data =  item.data
                for(let c in data){
                  this.$set(item,c,data[c])
                }
                this.tableData.push(item);
               
              });
              this.tableData = mergeTableRow(this.tableData,['year'])
            }
            
          }else{
            this.alertError(res)
          }
        },err=>{
          this.tableLoading = false;
        })
      },
      //table合并行
      arraySpanMethod({ row, column, rowIndex, columnIndex }) {
        const span = column['property'] + '-span';
        if (row[span]) {
          return row[span]
        }
      },
      handleClick(){

      },
      //更改前两列的背景色
      rowClass( {row, column, rowIndex, columnIndex }){
        if(columnIndex == 1||columnIndex == 0){
          if (rowIndex == 3 ||rowIndex == 4 || rowIndex == 5){
            return 'bgFFF4E7'
          }else{
            return 'bgECF6F5'
          }
        }
      }
    },
    mounted(){
      // this.tableLoading = true;
      // setTimeout(()=>{
      //   this.tableLoading = false;
      //   this.tableData = [
      //     {
      //       year:"19年收入",
      //       result:"移动",
      //     },
      //     {
      //       year:"19年收入",
      //       result:"宽带"
      //     },
      //     {
      //       year:"19年收入",
      //       result:"iTV"
      //     },
      //     {
      //       year:"20年收入",
      //       result:"移动"
      //     },
      //     {
      //       year:"20年收入",
      //       result:"宽带"
      //     },
      //     {
      //       year:"20年收入",
      //       result:"iTV"
      //     },
      //     {
      //       year:"增长率",
      //       result:"移动"
      //     },
      //     {
      //       year:"增长率",
      //       result:"宽带"
      //     },
      //     {
      //       year:"增长率",
      //       result:"iTV"
      //     },

      //   ];
      // },1000)
    }
  }
</script>
<style scoped lang="scss">

</style>
<style lang="scss">

  .bgECF6F5{
    background-color: #ECF6F5 !important;
  }
  .bgFFF4E7{
    background-color: #FFF4E7 !important;
  }
</style>
