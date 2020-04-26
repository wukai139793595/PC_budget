<template>
  <div class="fenqy">
    <!-- <div class="contentTopTitle">
      <div class="fl">
        <div class="title">分套餐收入跟踪</div>
      </div>
    </div>-->
    <div class="operation">
      <el-form :inline="true" :model="form" label-width="80px" class="formList">
        <el-form-item label="选择区域">
          <dx-cascader :area_id.sync="form.areaId" />
          <!-- <el-select v-model="form.areaId" placeholder="选择区域" @change="areaChange($event)">
            <el-option
              v-for="item in areaList"
              :key="item.areaId"
              :label="item.areaName"
              :value="item.areaId"
            ></el-option>
          </el-select>-->
        </el-form-item>
        <el-form-item label="账期">
          <el-date-picker v-model="form.month" value-format="yyyyMM" type="month" placeholder="选择月"></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button size="small" type="primary" @click="submitHandle()">查询</el-button>
        </el-form-item>

        <el-form-item class="daochu">
          <el-button
            size="small"
            type="orange"
            @click="exportExcel(true)"
            style="margin-left: 20px"
          >批量导出</el-button>
          <el-button size="small" type="orange" @click="exportExcel(false)">导出</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="tableBox">
      <el-table
        ref="table"
        border
        stripe
        v-loading="tableLoading"
        :data="tableData"
        style="width: 100%"
        class="tableTh28"
        height="73vh"
        :span-method="arraySpanMethod"
      >
        <el-table-column fixed label="融合/单产品" prop="indexType"></el-table-column>
        <el-table-column fixed label="套餐等级" prop="indexName" width="120px"></el-table-column>
        <el-table-column label="存存量">
          <el-table-column class-name="right-money" prop="val0" label="套餐数" width="120px"></el-table-column>
          <el-table-column class-name="right-money" prop="val1" label="套餐收入" width="120px"></el-table-column>
          <el-table-column class-name="right-money" prop="val2" label="ARPU" width="120px"></el-table-column>
          <el-table-column class-name="right-money" prop="val3" label="用户占比" width="120px"></el-table-column>
          <el-table-column class-name="right-money" prop="val4" label="收入占比" width="120px"></el-table-column>
        </el-table-column>
        <el-table-column label="存增量">
          <el-table-column class-name="right-money" prop="val5" label="套餐数" width="120px"></el-table-column>
          <el-table-column class-name="right-money" prop="val6" label="套餐收入" width="120px"></el-table-column>
          <el-table-column class-name="right-money" prop="val7" label="ARPU" width="120px"></el-table-column>
          <el-table-column prop="val8" label="用户占比" width="120px"></el-table-column>
          <el-table-column prop="val9" label="收入占比" width="120px"></el-table-column>
        </el-table-column>
        <el-table-column label="增量">
          <el-table-column class-name="right-money" prop="val10" label="套餐数" width="120px"></el-table-column>
          <el-table-column class-name="right-money" prop="val11" label="套餐收入" width="120px"></el-table-column>
          <el-table-column class-name="right-money" prop="val12" label="ARPU" width="120px"></el-table-column>
          <el-table-column class-name="right-money" prop="val13" label="用户占比" width="120px"></el-table-column>
          <el-table-column class-name="right-money" prop="val14" label="收入占比" width="120px"></el-table-column>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { $budgetAPI } from "@/api";
import { getSessionStorage } from "@/common/js/storage";
import { createSpanOne } from "@/utils/mixin.js";
import prefixAPI from "@/api/prefixAPI"

let accountInfo = JSON.parse(getSessionStorage("accountInfo"));

export default {
  data() {
    return {
      tableLoading: false, //
      areaList: [],
      tableData: [],
      // titleId: [],
      // titleName: [],
      form: {
        areaId: accountInfo.areaId,
        month: "201909"
      }
    };
  },
  created() {
    this.accountInfo = JSON.parse(getSessionStorage("accountInfo"));
    // this.getCompanyByLvl();
    this.getData();
  },
  methods: {
    areaChange() {},
    //分产品导出
    exportExcel(type) {
      let areaId = "";
      let month = "";
      if (this.form.areaId) {
        areaId = this.form.areaId;
      } else {
        areaId = this.accountInfo.areaId;
      }
      // if (this.form.year) {
        month = this.form.month;
      // } else {
      //   month = this.formatDate(new Date());
      // }
      if (process.env.NODE_ENV == "development") {
        window.location.href =
          prefixAPI.loc +
          "/api/incomeTrack/ExportIncomeMealPart?areaId=" +
          areaId +
          "&month=" +
          month + "&type=" + type;
      } else if (process.env.NODE_ENV == "production") {
        window.location.href =
          prefixAPI.hp +
          "/api/incomeTrack/ExportIncomeMealPart?areaId=" +
          areaId +
          "&month=" +
          month + "&type=" + type;
      }
    },
    submitHandle() {
      this.getData();
    },
    arraySpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex == 0) {
        return this.spanArr[rowIndex];
      }
    },
    getData() {
      let areaId = this.form.areaId
        ? this.form.areaId
        : this.accountInfo.areaId;
      let month = this.form.month
        ? this.form.month
        : this.formatDate(new Date());
      this.tableLoading = true;
      $budgetAPI.findIncomeMealPart(
        {
          areaId: areaId,
          month: month
        },
        res => {
          this.tableLoading = false;
          if (res.code == 0) {
            let content = res.content;
            this.tableData = content.list;
            this.spanArr = createSpanOne(this.tableData, "indexType");
            setTimeout(() => {
              this.$refs.table.doLayout();
            }, 1200);
          } else {
            this.alertError(res);
          }
        },
        err => {
          this.tableLoading = false;
        }
      );
    },

    //根据层级获取区域树
    getCompanyByLvl() {
      $budgetAPI.getCompanyByLvl(
        {
          lvl: this.accountInfo.areaLvl,
          areaId: this.accountInfo.areaId
        },
        res => {
          let areaId = this.accountInfo.areaId;
          let areaName = this.accountInfo.areaName;
          if (res.code == 0) {
            for (let i = 0; i < res.content.length; i++) {
              if (res.content[i].areaId == areaId) {
                this.areaList = res.content;
                return;
              }
            }
            this.areaList = [{ areaId, areaName }, ...res.content];
          } else {
            this.alertError(res);
          }
        },
        err => {}
      );
    },
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
    }
  }
};
</script>

<style lang="scss">
.point-meal {
  // .daochu {
  //   float: right;
  //   .el-form-item__content {
  //     float: right;
  //     .el-button {
  //       float: right;
  //     }
  //   }
  // }
  // .el-form-item__content{
  //   float: right;
  // }
}
</style>
