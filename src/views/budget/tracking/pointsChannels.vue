<!--分产品-->
<template>
  <div class="pointsChannels">
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
          <el-button size="small" type="primary" @click="findBusinessIndexCust">查询</el-button>
        </el-form-item>
        <el-form-item class="daochu">
          <el-button size="small" type="orange" @click="exportExcel">导出</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="tableBox">
      <el-table v-loading="tableLoading" :data="tableData" style="width: 100%"
                class="tableTh28" height="65vh" :span-method="arraySpanMethod"
                border stripe ref="table">
        <el-table-column fixed prop="channelName" label="渠道" class-name="fixedColumn"></el-table-column>
        <el-table-column fixed prop="areaName" label="区域" width="120" :show-overflow-tooltip="true" class-name="fixedColumn"></el-table-column>
        <el-table-column label="移动用户分渠道新增指标完成情况">
          <el-table-column prop="mobileTargetYear" label="年度目标" class-name="right-money"></el-table-column>
          <el-table-column prop="mobileSumTargetFinish" label="累计完成数" class-name="right-money"></el-table-column>
          <el-table-column prop="mobileItemYearFinishRate" label="年度目标完成率(%)"></el-table-column>
        </el-table-column>
        <el-table-column label="宽带用户分渠道新增指标完成情况">
          <el-table-column prop="wideTargetYear" label="年度目标" class-name="right-money"></el-table-column>
          <el-table-column prop="wideSumTargetFinish" label="累计完成数" class-name="right-money"></el-table-column>
          <el-table-column prop="wideItemYearFinishRate" label="年度目标完成率(%)" ></el-table-column>
        </el-table-column>
        <el-table-column label="天翼分渠道新增指标完成情况">
          <el-table-column prop="tianyiTargetYear" label="年度目标" class-name="right-money"></el-table-column>
          <el-table-column prop="tianyiSumTargetFinish" label="累计完成数" class-name="right-money"></el-table-column>
          <el-table-column prop="tianyiItemYearFinishRate" label="年度目标完成率(%)"></el-table-column>
        </el-table-column>

      </el-table>
    </div>
  </div>
</template>

<script>
  import{$budgetAPI} from '@/api';
  import {getSessionStorage} from "@/common/js/storage";
  import prefixAPI from "@/api/prefixAPI";

  export default {
    name: "pointsChannels",
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
          window.location.href = prefixAPI.loc + "/api/budgetTrack/ExportBusinessIndexByChannel?areaId=" + areaId +'&month=' + month;
        } else if (process.env.NODE_ENV == 'production') {
          window.location.href = prefixAPI.hp + "/api/budgetTrack/ExportBusinessIndexByChannel?areaId=" + areaId +'&month=' + month;
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
      //分渠道获取列表
      findBusinessIndexCust(params){
        this.tableData = [];
        let obj = {};
        if(this.form.areaId){
          obj = this.form
        }else {
          obj = params
        }
        this.tableLoading = true;
        $budgetAPI.findBusinessIndexCust(obj,res=>{
          this.alertError(res);
          if(res.code == 0){
            this.count = res.content[0].count;
            res.content.map((item,index)=>{
              item.list.map((child,idx)=>{
                // if(child.channelName == 'VP006001'){
                //   this.$set(child,'productName','实体渠道')
                // }
                // if(child.channelName == 'VP006002'){
                //   this.$set(child,'productName','政企渠道')
                // }
                // if(child.channelName == 'VP006003'){
                //   this.$set(child,'productName','电子渠道')
                // }

                this.tableData.push(child);
              })
            });
            setTimeout(()=>{
              this.$refs.table.doLayout();
            },500);
            this.tableLoading = false;
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
        this.findBusinessIndexCust(params)
      }
    }
  }
</script>
<style lang="scss" scoped>

</style>
<style lang="scss">
  .pointsChannels{

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
