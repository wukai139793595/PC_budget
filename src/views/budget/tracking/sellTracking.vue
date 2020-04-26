<template>
  <div class="sell-tracking">
    <div class="contentTopTitle">
      <div class="fl">
        <div class="title">销售费用跟踪</div>
      </div>
    </div>
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
          <el-button
            size="small"
            type="orange"
            @click="exportExcel(false)"
          >导出</el-button>
        </el-form-item>
      </el-form>
      <div class="tableBox" ref='tableWrap'>
        <el-table
            ref="table"
            border stripe
            v-loading="tableLoading"
            :data="list"
            style="width: 100%"
            class="tableTh28"
            height="73vh"
            :span-method="arraySpanMethod"
        >
          <el-table-column fixed label="收入归类" prop="indexType" :width="tableWidth"></el-table-column>
          <el-table-column fixed label="指标项" prop="indexName"  :width="tableWidth" show-overflow-tooltip></el-table-column>
          <el-table-column
            v-for="(item,index) in titleName"
            :key="index"
            :label="item"
            :prop="titleId[index]"
            :width="tableWidth"
            class-name="right-money"
          ></el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
import { $budgetAPI } from "@/api";
import { getSessionStorage } from "@/common/js/storage";
import { createSpanOne } from "@/utils/mixin.js";
import prefixAPI from "@/api/prefixAPI";
export default {
  data() {
    return {
      tableLoading: false,//
      tableWidth: '140px',
      areaList: [],
      tableData: [],
      list: [],
      titleId: [],
      titleName: [],
      form: {
        areaId: "",
        month: "201910"
      },
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
      if (this.form.month) {
        month = this.form.month;
      } else {
        month = this.formatDate(new Date());
      }

      if (process.env.NODE_ENV == "development") {
        window.location.href =
          prefixAPI.loc +
          "/api/incomeTrack/ExportIncomeDataSale?areaId=" +
          areaId +
          "&year=" +
          month +
          "&type=" + type;
      } else if (process.env.NODE_ENV == "production") {
        window.location.href =
          prefixAPI.hp +
          "/api/incomeTrack/ExportIncomeDataSale?areaId=" +
          areaId +
          "&year=" +
          month +
          "&type=" + type;
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
      $budgetAPI.findIncomeTrendSale(
        {
          areaId: areaId,
          month: month
        },
        res => {
          this.tableLoading = false;
          if (res.code == 0) {
            let content = res.content;
            this.titleId = content.titleId;
            this.titleName = content.titleName;
            this.list = content.list;
            this.spanArr = createSpanOne(this.list, "indexType");
            if (this.$refs.tableWrap.offsetWidth / (this.titleName.length+2) < 140) {
                this.tableWidth = '140px';
              } else {
                this.tableWidth = this.$refs.tableWrap.offsetWidth / (this.titleName+2) + 'px';
              }
            setTimeout(() => {

              this.$refs.table.doLayout()
            }, 1200);
          } else {
            this.alertError(res)
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
            for (let i = 0 ; i < res.content.length ; i++) {
              if (res.content[i].areaId == areaId) {
                this.areaList = res.content;
                return
              }
            }
            this.areaList = [{areaId,areaName},...res.content];
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
.sell-tracking{
  .daochu {
    float: right;
    .el-form-item__content {
      float: right;
      .el-button {
        float: right;
      }
    }
  }

}
</style>
