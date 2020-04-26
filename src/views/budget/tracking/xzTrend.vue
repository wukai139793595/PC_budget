<!--分产品-->
<template>
  <div class="xzTrend">
    <div class="operation">
      <el-form :inline="true" :model="form" label-width="80px" class="formList">
        <el-form-item label="选择区域">
          <!-- <el-select v-model="form.areaId"  placeholder="选择区域" >
            <el-option
              v-for="item in areaList"
              :key="item.areaId"
              :label="item.areaName"
              :value="item.areaId">
            </el-option>
          </el-select> -->
           <dx-cascader :area_id.sync="form.areaId"/>
        </el-form-item>
        <el-form-item label="账期">
          <el-date-picker
            v-model="form.year"
            value-format="yyyy"
            type="year"
            placeholder="选择年"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button size="small" type="primary" @click="findBusinessIndexNewly">查询</el-button>
        </el-form-item>
        <el-form-item class="daochu">
          <el-button size="small" type="orange" @click="exportExcel">导出</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="tableBox">
      <el-table v-loading="tableLoading" :data="tableData"
                border stripe style="width: 100%" class="tableTh28" height="65vh" :span-method="arraySpanMethod"
                ref="table">
        <el-table-column fixed prop="product" label="产品" class-name="fixedColumn"></el-table-column>
        <el-table-column fixed prop="areaName" label="区域" width="120" :show-overflow-tooltip="true" class-name="fixedColumn"></el-table-column>
        <el-table-column label="新增">
          <el-table-column prop="january" label="1月" class-name="right-money"></el-table-column>
          <el-table-column prop="february" label="2月" class-name="right-money"></el-table-column>
          <el-table-column prop="march" label="3月" class-name="right-money"></el-table-column>
          <el-table-column prop="april" label="4月" class-name="right-money"></el-table-column>
          <el-table-column prop="may" label="5月" class-name="right-money"></el-table-column>
          <el-table-column prop="june" label="6月" class-name="right-money"></el-table-column>
          <el-table-column prop="july" label="7月" class-name="right-money"></el-table-column>
          <el-table-column prop="august" label="8月" class-name="right-money"></el-table-column>
          <el-table-column prop="september" label="9月" class-name="right-money"></el-table-column>
          <el-table-column prop="october" label="10月" class-name="right-money"></el-table-column>
          <el-table-column prop="november" label="11月" class-name="right-money"></el-table-column>
          <el-table-column prop="december" label="12月" class-name="right-money"></el-table-column>
          <el-table-column prop="indexCompleteSum" label="累计完成数" width="120" class-name="right-money"></el-table-column>
        </el-table-column>
        <el-table-column label="新增季度累计完成数">
          <el-table-column prop="newlyQuarterOne" label="一季度" class-name="right-money"></el-table-column>
          <el-table-column prop="newlyQuarterTwo" label="二季度" class-name="right-money"></el-table-column>
          <el-table-column prop="newlyQuarterThree" label="三季度" class-name="right-money"></el-table-column>
          <el-table-column prop="newlyQuarterFour" label="四季度" class-name="right-money"></el-table-column>
          <!-- <el-table-column prop="newlyQuarterSum" label="年累计" class-name="right-money"></el-table-column> -->
        </el-table-column>
        <el-table-column label="新增季度指标">
          <el-table-column prop="indexQuarterOne" label="一季度" class-name="right-money"></el-table-column>
          <el-table-column prop="indexQuarterTwo" label="二季度" class-name="right-money"></el-table-column>
          <el-table-column prop="indexQuarterThree" label="三季度" class-name="right-money"></el-table-column>
          <el-table-column prop="indexQuarterFour" label="四季度" class-name="right-money"></el-table-column>
          <!-- <el-table-column prop="indexQuarterSum" label="年累计" class-name="right-money"></el-table-column> -->
        </el-table-column>
        <el-table-column label="新增季度指标累计完成率">
          <el-table-column prop="rateQuarterOne" label="一季度" class-name="right-money"></el-table-column>
          <el-table-column prop="rateQuarterTwo" label="二季度" class-name="right-money"></el-table-column>
          <el-table-column prop="rateQuarterThree" label="三季度" class-name="right-money"></el-table-column>
          <el-table-column prop="jzLastYearrateQuarterFourSamePeriod" label="四季度" class-name="right-money"></el-table-column>
        </el-table-column>
        <el-table-column fixed="right" label="操作">
          <template slot-scope="scope">
            <el-link @click="fenqd(scope.row)">分渠道</el-link>
          </template>
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
    name: "xzTrend",
    data(){
      return{
        form:{
          areaId:"",
          year:"",
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
      this.form.year = this.moment().format('YYYY')
      // this.init();
    },
    methods:{
      //分渠道
      fenqd(val){
        let product = val.product1;
        let year = this.form.year?this.form.year:this.formatDate(new Date());
        let areaId = this.form.areaId?this.form.areaId:this.accountInfo.areaId;
        this.$router.push({path:'/budget/groupChannel',query:{year,areaId,product}})
      },
      //分产品导出
      exportExcel(){
        let areaId = "";
        let year = "";
        if(this.form.areaId){
          areaId = this.form.areaId
        }else{
          areaId = this.accountInfo.areaId
        }
        if(this.form.year){
          year = this.form.year
        }else{
          year = this.formatDate(this.time)
        }

        if (process.env.NODE_ENV == 'development') {
          window.location.href = prefixAPI.loc + "/api/budgetTrack/ExportBusinessIndexByNewly?areaId=" + areaId +'&month=' + year;
        } else if (process.env.NODE_ENV == 'production') {
          window.location.href = prefixAPI.hp + "/api/budgetTrack/ExportBusinessIndexByNewly?areaId=" + areaId +'&month=' + year;
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
        return y;
      },
      //table合并行
      arraySpanMethod({ row, column, rowIndex, columnIndex }) {
        if ((columnIndex  === 0  || columnIndex  === 27 )&& this.count) {
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
      //新增趋势
      findBusinessIndexNewly(params){
        this.tableData = [];
        let obj = {};
        if(this.form.areaId){
          obj = this.form
        }else {
          obj = params
        }
        this.tableLoading = true;
        $budgetAPI.findBusinessIndexNewly(obj,res=>{
          this.alertError(res);
          if(res.code == 0){
            this.count = res.content[0].count;
            res.content.map((item,index)=>{
              item.list.map((child,idx)=>{
                this.$set(child,'product1',item.indexCode)
                // if(child.product == 'VP009010'){
                //   this.$set(child,'productName','移动')
                // }
                // if(child.product == 'VP009011'){
                //   this.$set(child,'productName','宽带')
                // }
                // if(child.product == 'VP009012'){
                //   this.$set(child,'productName','天翼高清')
                // }
                this.tableData.push(child);
                setTimeout(() => {
                  this.$refs.table.doLayout();
                },1200)
              })
            });
            this.tableLoading = false;
          }
        },err=>{

        })
      },
      init(){
        // this.getCompanyByLvl();
        let params ={
          areaId:this.accountInfo.areaId,
          year:this.formatDate(this.time)
        };
        this.findBusinessIndexNewly(params)
      }
    }
  }
</script>
<style lang="scss" scoped>

</style>
<style lang="scss">
  .xzTrend{

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
