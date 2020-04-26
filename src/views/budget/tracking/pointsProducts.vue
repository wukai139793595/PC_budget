<!--分产品-->
<template>
  <div class="pointsProducts">
    <div class="operation">
      <el-form :inline="true" :model="form" label-width="80px" class="formList">
        <el-form-item label="选择区域">
           <dx-cascader :area_id.sync="form.areaId"/>
          <!-- <el-select v-model="form.areaId"  placeholder="选择区域" >
            <el-option
              v-for="item in areaList"
              :key="item.areaId"
              :label="item.areaName"
              :value="item.areaId">
            </el-option>
          </el-select> -->
        </el-form-item>
        <el-form-item label="账期">
          <el-date-picker
            v-model="form.month"
            value-format="yyyyMM"
            type="month"
            placeholder="选择月"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button size="small" type="primary" @click="findBusinessIndex">查询</el-button>
        </el-form-item>
        <el-form-item class="daochu">
          <el-button size="small" type="orange" @click="exportExcel">导出</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="tableBox">
      <el-table  v-loading="tableLoading" :data="tableData" border stripe
                 style="width: 100%" class="tableTh28" height="67vh" :span-method="arraySpanMethod" ref="table">
        <el-table-column fixed prop="product" label="产品" class-name="fixedColumn"></el-table-column>
        <el-table-column fixed prop="areaName" label="区域" width="120" :show-overflow-tooltip="true" class-name="fixedColumn"></el-table-column>
        <el-table-column label="到达">
          <el-table-column prop="reachNum" label="到达数" class-name="right-money"></el-table-column>
        </el-table-column>
        <el-table-column label="净增">
          <el-table-column label="预算完成情况">
            <el-table-column prop="jzTargetYear" label="年度目标" class-name="right-money"></el-table-column>
            <el-table-column prop="jzSumTargetFinish" label="累计完成数" class-name="right-money" min-width="90"></el-table-column>
            <el-table-column prop="jzItemYearFinishRate" label="年度目标完成率(%)"></el-table-column>
            <el-table-column prop="jzSort" label="排名"></el-table-column>
            <el-table-column prop="jzBudgetAdvanceSum" label="月累计预算进度"></el-table-column>
          </el-table-column>
          <el-table-column label="同比情况">
            <el-table-column prop="jzLastYearSamePeriod" label="上年同期" class-name="right-money"></el-table-column>
            <el-table-column prop="jzCompareSamePeriod" label="同比变化" class-name="right-money"></el-table-column>
            <el-table-column prop="jzCompareSamePeriodGrowRate" label="同比增长率(%)" class-name="right-money"></el-table-column>
          </el-table-column>
        </el-table-column>
        <el-table-column label="新增">
          <el-table-column label="预算完成情况">
            <el-table-column prop="xzTargetYear" label="年度目标" class-name="right-money"></el-table-column>
            <el-table-column prop="xzSumTargetFinish" label="累计完成数" class-name="right-money" min-width="90"></el-table-column>
            <el-table-column prop="xzItemYearFinishRate" label="年度目标完成率(%)"></el-table-column>
            <el-table-column prop="xzSort" label="排名" ></el-table-column>
            <el-table-column prop="xzBudgetAdvanceSum" label="月累计预算进度"></el-table-column>
          </el-table-column>
          <el-table-column label="同比情况">
            <el-table-column prop="xzLastYearSamePeriod" label="上年同期" class-name="right-money"></el-table-column>
            <el-table-column prop="xzCompareSamePeriod" label="同比变化" class-name="right-money"></el-table-column>
            <el-table-column prop="xzCompareSamePeriodGrowRate" label="同比增长率(%)"></el-table-column>
          </el-table-column>
        </el-table-column>

      </el-table>
    </div>
  </div>
</template>

<script>
  import{ $budgetAPI} from '@/api';
  import {getSessionStorage} from "@/common/js/storage";
  import prefixAPI from "@/api/prefixAPI";
  export default {
    name: "pointsProducts",
    data(){
      return{
        form:{
          areaId:"",
          month:"",
        },
        accountInfo:"",
        areaList:[],
        tableLoading:false,
        tableData:[],
        count:'',
        time:Date.parse(new Date()),
      }
    },
    created(){
       this.accountInfo = JSON.parse(getSessionStorage('accountInfo'));
      this.form.areaId = this.accountInfo.areaId;
      this.form.month = this.moment().subtract(1,'months').format('YYYYMM')
      // this.init();
    },
    methods:{
      //分产品导出
      exportExcel(){
        let areaId = "";
        let month = "";
        if(this.form.areaId){
          areaId = this.form.areaId
        }else{
          areaId = this.accountInfo.areaId
        }
        if(this.form.month){
          month = this.form.month
        }else{
          month = this.formatDate(this.time)
        }

        if (process.env.NODE_ENV == 'development') {
          window.location.href = prefixAPI.loc + "/api/budgetTrack/ExportBusinessIndexByProduct?areaId=" + areaId +'&month=' + month;
        } else if (process.env.NODE_ENV == 'production') {
          window.location.href = prefixAPI.hp + "/api/budgetTrack/ExportBusinessIndexByProduct?areaId=" + areaId +'&month=' + month;
        }
      },
      //获取当前时间
      formatDate: function (value) {
        let date = new Date(value);
        let y = date.getFullYear();
        let MM = date.getMonth() + 1;
        MM = MM < 10 ? ('0' + MM) : MM;
        let d = date.getDate();
        d = d < 10 ? ('0' + d) : d;
        let h = date.getHours();
        h = h < 10 ? ('0' + h) : h;
        let m = date.getMinutes();
        m = m < 10 ? ('0' + m) : m;
        let s = date.getSeconds();
        s = s < 10 ? ('0' + s) : s;
        return y.toString() + MM.toString() ;
      },
      //table合并行
      arraySpanMethod({ row, column, rowIndex, columnIndex }) {
        if (columnIndex  === 0 && this.count) {
          if (rowIndex % this.count === 0) {
            return {
              colspan:1,
              rowspan:this.count
            };
          }else{
            return{
              colspan:0,
              rowspan:0
            }
          }
        }
      },
      //区域选择 返回ID和name
      areaChange(vId) {
        // vID 是一个数组，循环获取name,根据id
        if (!vId && vId.length === 0) {
          return;
        }//这里多选的时候获取name和单选不一样 单选是对象 多选是数组所以...
        let nameArr = [];
        let codeArr = [];
        let that = this;
        vId.forEach(element => {
          let obj = that.areaList.find((item) => {
            return item.areaId === element;
          });
          if (obj) {
            nameArr.push(obj.areaName);
            codeArr.push(obj.areaId);

          }
        });
      },
      //根据层级获取区域树
      getCompanyByLvl(){
        $budgetAPI.getCompanyByLvl({
          lvl:this.accountInfo.areaLvl,
          areaId:this.accountInfo.areaId
        },res =>{
          this.alertError(res);
          this.areaList = res.content;
        },err =>{

        })
      },
      //分产品获取列表
      findBusinessIndex(params){
        this.tableData = [];
        let obj = {};
        if(this.form.areaId){
          obj = this.form
        }else {
          obj = params
        }
        this.tableLoading = true;
        $budgetAPI.findBusinessIndex(obj,res=>{
          this.alertError(res);
          if(res.code == 0){
            this.count = res.content[0].count;
            res.content.map((item,index)=>{
              item.list.map((child,idx)=>{
                // if(child.product == 'VP005001'){
                //   this.$set(child,'productName','移动')
                // }
                // if(child.product == 'VP005002'){
                //   this.$set(child,'productName','宽带')
                // }
                // if(child.product == 'VP005003'){
                //   this.$set(child,'productName','天翼')
                // }
                // if(child.product == 'VP005004'){
                //   this.$set(child,'productName','物联网')
                // }
                this.tableData.push(child);
              })
            });
            this.tableLoading = false;
            setTimeout(()=>{
              this.$refs.table.doLayout();
            },500);
          }
        },err=>{

        })
      },
      init(){
        // this.getCompanyByLvl();
        let params ={
          areaId:this.accountInfo.areaId,
          month:this.moment().subtract(1,'months').format('YYYYMM')
        };
        this.findBusinessIndex(params)
      }
    }
  }
</script>
<style lang="scss" scoped>

</style>
<style lang="scss">
  .pointsProducts{

    .operation{
      .daochu{
        float: right;
        .el-form-item__content{
          float: right;
          .el-button{
            float: right;
          }
        }
      }
    }
  }
</style>
