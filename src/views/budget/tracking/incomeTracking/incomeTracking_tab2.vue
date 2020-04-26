<!--分区域趋势跟踪-->
<template>
  <div class="fenqy">
    <div class="operation">
      <el-form :inline="true" :model="form" label-width="100px" class="formList">
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
          <el-date-picker v-model="form.year" value-format="yyyy" type="year" placeholder="选择月"></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button size="small" type="primary" @click="submitHandle">查询</el-button>
        </el-form-item>
        <el-form-item class="daochu">
          <el-button size="small" type="orange" @click="exportExcel(true)" style="margin-left: 20px">批量导出</el-button>
          <el-button size="small" type="orange" @click="exportExcel(false)" >导出</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div style="border-bottom:1px solid #EBEEF5;" class="tableBox">
      <el-table
        v-loading="tableLoading"
                border
        stripe
        :data="tableData"
        style="width: 100%"
        class="tableTh28"
         height="65vh"
        ref="table"
        :span-method="arraySpanMethod"
      >
        <el-table-column fixed prop="areaName" label="本地网" width="140px"></el-table-column>
        <el-table-column label="当月完成数">
          <el-table-column show-overflow-tooltip class-name="right-money" prop="january" label="1月" min-width="120px" />
          <el-table-column show-overflow-tooltip class-name="right-money" prop="february" label="2月" min-width="120px" />
          <el-table-column show-overflow-tooltip class-name="right-money" prop="march" label="3月" min-width="120px" />
          <el-table-column show-overflow-tooltip class-name="right-money" prop="april" label="4月" min-width="120px" />
          <el-table-column show-overflow-tooltip class-name="right-money" prop="may" label="5月" min-width="120px" />
          <el-table-column show-overflow-tooltip class-name="right-money" prop="june" label="6月" min-width="120px" />
          <el-table-column show-overflow-tooltip class-name="right-money" prop="july" label="7月" min-width="120px" />
          <el-table-column show-overflow-tooltip class-name="right-money" prop="august" label="8月" min-width="120px" />
          <el-table-column show-overflow-tooltip class-name="right-money" prop="september" label="9月" min-width="120px" />
          <el-table-column show-overflow-tooltip class-name="right-money" prop="october" label="10月" min-width="120px" />
          <el-table-column show-overflow-tooltip class-name="right-money" prop="november" label="11月" min-width="120px" />
          <el-table-column show-overflow-tooltip class-name="right-money" prop="december" label="12月" min-width="120px" />
        </el-table-column>
        <el-table-column label="月累计预算缺口">
          <el-table-column show-overflow-tooltip class-name="right-money" prop="januarySum" label="1月" min-width="120px" />
          <el-table-column show-overflow-tooltip class-name="right-money" prop="februarySum" label="2月" min-width="120px" />
          <el-table-column show-overflow-tooltip class-name="right-money" prop="marchSum" label="3月" min-width="120px" />
          <el-table-column show-overflow-tooltip class-name="right-money" prop="aprilSum" label="4月" min-width="120px" />
          <el-table-column show-overflow-tooltip class-name="right-money" prop="maySum" label="5月" min-width="120px" />
          <el-table-column show-overflow-tooltip class-name="right-money" prop="juneSum" label="6月" min-width="120px" />
          <el-table-column show-overflow-tooltip class-name="right-money" prop="julySum" label="7月" min-width="120px" />
          <el-table-column show-overflow-tooltip class-name="right-money" prop="augustSum" label="8月" min-width="120px" />
          <el-table-column show-overflow-tooltip class-name="right-money" prop="septemberSum" label="9月" min-width="120px" />
          <el-table-column show-overflow-tooltip class-name="right-money" prop="octoberSum" label="10月" min-width="120px" />
          <el-table-column show-overflow-tooltip class-name="right-money" prop="novemberSum" label="11月" min-width="120px" />
          <el-table-column show-overflow-tooltip class-name="right-money" prop="decemberSum" label="12月" min-width="120px" />
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { $budgetAPI } from "@/api";
import prefixAPI from "@/api/prefixAPI";
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
        year: "2019"
      },
      accountInfo: "",
      tableLoading: false,
      tableData: [
        // {
        //   areaName: "杭州分公司",
        //   january: 0,
        //   february: 0,
        //   march: 0,
        //   april: 0,
        //   may: 0,
        //   june: 0,
        //   july: 0,
        //   august: 0,
        //   september: 0,
        //   october: 0,
        //   november: 5000,
        //   december: 5000,
        //   januarySum: 0,
        //   februarySum: 0,
        //   marchSum: 0,
        //   aprilSum: 0,
        //   maySum: 0,
        //   juneSum: 0,
        //   julySum: 0,
        //   augustSum: 0,
        //   septemberSum: 0,
        //   octoberSum: 0,
        //   novemberSum: 5000,
        //   decemberSum: 5000
        // }
      ],
      count: ""
      // time:Date.parse(new Date()),
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
      let year = this.form.year ? this.form.year:this.formatDate(new Date);
      this.getData(areaId,year);
    },
    getData(areaId,year) {
      this.tableLoading = true;
      $budgetAPI.findIncomeByAreaTrend(
        {
          areaId: areaId,
          year: year
        },
        res => {
          this.tableLoading =false;
          if (res.code === 0) {
            this.tableData = res.content;
          } else {
            this.alertError(res);
          }
          setTimeout(()=>{
            this.$refs.table.doLayout();
          },500);
        },
        err => {
          this.tableLoading = false;
        }
      );
    },
    //分产品导出
    exportExcel(type) {
      let areaId = "";
      let year = "";
      if (this.form.areaId) {
        areaId = this.form.areaId;
      } else {
        areaId = this.accountInfo.areaId;
      }
      if (this.form.year) {
        year = this.form.year;
      } else {
        year = this.formatDate(new Date());
      }

      if (process.env.NODE_ENV == "development") {
        window.location.href =
          prefixAPI.loc +
          "/api/incomeTrack/ExportIncomeTrendDataByArea?areaId=" +
          areaId +
          "&year=" +
          year +
          "&type=" + type;
      } else if (process.env.NODE_ENV == "production") {
        window.location.href =
          prefixAPI.hp +
          "/api/incomeTrack/ExportIncomeTrendDataByArea?areaId=" +
          areaId +
          "&year=" +
          year +
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
      return y;
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
// .fenqy {
//   .el-table--border td {
//     border-right: 1px solid #ebeef5 !important;
//   }
//   .operation {
//     .daochu {
//       float: right;
//       .el-form-item__content {
//         width: 200px;
//         float: right;
//         .el-button {
//           float: right;
//         }
//       }
//     }
//   }
// }
</style>
