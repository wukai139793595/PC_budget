<!--分区域-->
<template>
  <div class="fenqy">
    <div class="operation">
      <el-form :inline="true" :model="form" label-width="80px" class="formList">
        <el-form-item label="选择区域">
          <dx-cascader  :area_id.sync="form.areaId" />
          <!-- <el-select v-model="form.areaId" placeholder="选择区域" @change="areaChange($event)">
            <el-option
              v-for="item in areaList"
              :key="item.areaId"
              :label="item.areaName"
              :value="item.areaId"
            ></el-option>
          </el-select> -->
        </el-form-item>
        <el-form-item label="账期">
          <el-date-picker v-model="form.month" value-format="yyyyMM" type="month" placeholder="选择月"></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button size="small" type="primary" @click="submitHandle()">查询</el-button>
        </el-form-item>
        <el-form-item class="daochu">
          <el-button size="small" type="orange" @click="exportExcel(true)" style="margin-left: 20px">批量导出</el-button>
          <el-button size="small" type="orange" @click="exportExcel(false)"  >导出</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="tableBox">
      <el-table
        v-loading="tableLoading"
        :data="tableData"
        style="width: 100%"
        class="tableTh28"
        height="65vh"
        border
        stripe
        ref="table"
        :span-method="arraySpanMethod"
      >
        <el-table-column show-overflow-tooltip fixed prop="areaName" label="本地网" class-name="local fixedColumn" min-width="120px"></el-table-column>
        <el-table-column label="还原大收口径">
          <el-table-column prop label="月度环比情况">
            <el-table-column show-overflow-tooltip class-name="right-money" prop="thisMonthAchievement" label="本月实绩" min-width="120px"></el-table-column>
            <el-table-column show-overflow-tooltip class-name="right-money" prop="lastMonthAchievement" label="上月实绩" min-width="120px"></el-table-column>
            <el-table-column show-overflow-tooltip class-name="right-money" prop="sequentialGrowth" label="环比上月增加额" min-width="120px"></el-table-column>
          </el-table-column>
          <el-table-column prop label="累计同比情况">
            <el-table-column show-overflow-tooltip class-name="right-money" prop="thisYearTotal" label="本年累计" min-width="120px"></el-table-column>
            <el-table-column show-overflow-tooltip class-name="right-money" prop="lastYearTotal" label="上年同期累计" min-width="120px"></el-table-column>
            <el-table-column show-overflow-tooltip class-name="right-money" prop="yearOnYearChange" label="同比变化" min-width="120px"></el-table-column>
            <el-table-column show-overflow-tooltip  prop="yearOnYearGrowth" label="同比增长率" min-width="120px"></el-table-column>
            <el-table-column show-overflow-tooltip  prop="growthSort" label="增长率排名" min-width="120px" ></el-table-column>
          </el-table-column>
          <el-table-column prop label="预算完成情况">
            <el-table-column show-overflow-tooltip class-name="right-money" prop="thisYearTotalBudget" label="本年累计" min-width="120px"></el-table-column>
            <el-table-column show-overflow-tooltip class-name="right-money" prop="monthTotalBudget" label="月累计预算" min-width="120px"></el-table-column>
            <el-table-column show-overflow-tooltip class-name="right-money" prop="breachBudget" label="缺口" min-width="120px"></el-table-column>
            <el-table-column show-overflow-tooltip class-name="right-money" prop="completeTotal" label="完成累计预算" min-width="120px"></el-table-column>
            <el-table-column show-overflow-tooltip class-name="right-money" prop="thisYearBudget" label="本年预算" min-width="120px"></el-table-column>
            <el-table-column show-overflow-tooltip class-name="right-money" prop="completeYearBudget" label="累计完成年度预算" min-width="120px"></el-table-column>
            <el-table-column show-overflow-tooltip  prop="budgetProgressSort" label="预算进度排名" min-width="120px"></el-table-column>
          </el-table-column>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { $budgetAPI } from "@/api";
import prefixAPI from "@/api/prefixAPI"
import { getSessionStorage } from "@/common/js/storage";

let accountInfo = JSON.parse(getSessionStorage('accountInfo'))

export default {
  name: "fenqy",
  props:{
    areaList:{
      type:Array,
      default:()=>([])
    }
  },
  data() {
    return {
      form: {
        areaId: accountInfo.areaId,
        month: "201910"
      },
      accountInfo: "",
      tableLoading: false,
      count: "",
      tableData: [
        // {
        //   areaName: "杭州分公司",
        //   thisMonthAchievement: 5000,
        //   lastMonthAchievement: 5000,
        //   sequentialGrowth: 5000,
        //   thisYearTotal: 5000,
        //   lastYearTotal: 5000,
        //   yearOnYearChange: 5000,
        //   yearOnYearGrowth: 20,
        //   growthSort: "5000",
        //   thisYearTotalBudget: 5000,
        //   monthTotalBudget: 5000,
        //   breachBudget: 5000,
        //   completeTotal: 5000,
        //   thisYearBudget: 5000,
        //   completeYearBudget: 5000,
        //   budgetProgressSort: "5000"
        // },
        // {
        //   areaName: "杭州政企客户中心",
        //   thisMonthAchievement: null,
        //   lastMonthAchievement: null,
        //   sequentialGrowth: null,
        //   thisYearTotal: null,
        //   lastYearTotal: null,
        //   yearOnYearChange: null,
        //   yearOnYearGrowth: null,
        //   growthSort: null,
        //   thisYearTotalBudget: null,
        //   monthTotalBudget: null,
        //   breachBudget: null,
        //   completeTotal: null,
        //   thisYearBudget: null,
        //   completeYearBudget: null,
        //   budgetProgressSort: null
        // }
      ]
    };
  },
  created() {
    this.init();
  },
  methods: {
    // 初始化
    init() {
      this.accountInfo = JSON.parse(getSessionStorage("accountInfo"));
      // this.getCompanyByLvl();
      this.submitHandle();
    },
    submitHandle() {
      let areaId = this.form.areaId ? this.form.areaId:this.accountInfo.areaId;
      let month = this.form.month ? this.form.month:this.formatDate(new Date());
      this.getData(areaId,month);
    },
    getData(areaId,month) {
      this.tableLoading = true;
      $budgetAPI.incomeTrackFindByArea(
        {
          areaId: areaId,
          month: month
        },
        res => {
          if (res.code === 0) {
            this.tableLoading = false
            this.tableData = res.content;
          } else {
            this.alertError(res);
          }
          setTimeout(()=>{
            this.$refs.table.doLayout();
          },500);
        }
      );
    },
    //分产品导出
    exportExcel(type) {
      let areaId = "";
      let month = "";
      if (this.form.areaId) {
        areaId = this.form.areaId;
      } else {
        areaId = this.accountInfo.areaId;
      }
      if (this.form.month) {
        month = this.form.month;
      } else {
        month = this.formatDate(new Date());
      }

      if (process.env.NODE_ENV == "development") {
        window.location.href =
          prefixAPI.loc +
          "/api/incomeTrack/ExportIncomeDataByArea?areaId=" +
          areaId +
          "&month=" +
          month +
          "&type=" + type;
      } else if (process.env.NODE_ENV == "production") {
        window.location.href =
          prefixAPI.hp +
          "/api/incomeTrack/ExportIncomeDataByArea?areaId=" +
          areaId +
          "&month=" +
          month +
          "&type=" + type;
      }
    },
    //获取当前时间
    formatDate: function(value) {
      let date = new Date(value);
      let y = date.getFullYear();
      let MM = date.getMonth() + 1;
      MM = MM < 10 ? "0" + MM : MM;
      let d = date.getDate();
      d = d < 10 ? "0" + d : d;
      let h = date.getHours();
      h = h < 10 ? "0" + h : h;
      let m = date.getMinutes();
      m = m < 10 ? "0" + m : m;
      let s = date.getSeconds();
      s = s < 10 ? "0" + s : s;
      return y.toString() + MM.toString();
    },
    //table合并行
    arraySpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0 && this.count) {
        if (rowIndex % this.count === 0) {
          return {
            colspan: 1,
            rowspan: this.count
          };
        } else {
          return {
            colspan: 0,
            rowspan: 0
          };
        }
      }
    },
    //区域选择 返回ID和name
    areaChange(event) {
      // let temp = this.areaList.find(item => {
      //   return (item.areaId = event);
      // });
      // this.form.areaId = event;
      // this.form.areaName = temp.areaName;
    },
    //根据层级获取区域树
    // getCompanyByLvl() {
    //   $budgetAPI.getCompanyByLvl(
    //     {
    //       lvl: this.accountInfo.areaLvl,
    //       areaId: this.accountInfo.areaId
    //     },
    //     res => {
    //       if (res.code == 0) {
    //         this.areaList = res.content;
    //       } else {
    //         this.alertError(res);
    //       }
    //     },
    //     err => {}
    //   );
    // }
  }
};
</script>
<style lang="scss" scoped>
</style>
<style lang="scss">
.fenqy {
  .local {
    .cell {
      color: #000000;
      font-weight: 700;
    }
  }

  .operation {
    .daochu {
      float: right;
      .el-form-item__content {
        width: 200px;
        float: right;
        .el-button {
          float: right;
        }
      }
    }
  }
}
</style>
