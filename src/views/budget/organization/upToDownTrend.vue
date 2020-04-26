<template>
  <div>
    <div class="contentTopTitle">
      <div class="fl">
        <div class="title">自上而下趋势预测</div>
      </div>
    </div>
    <div class="operation">
      <el-form :inline="true" :model="form" label-width="80px" class="formList">
        <el-form-item label="选择区域">
          <dx-cascader :area_id.sync="form.areaId" />
        </el-form-item>
        <el-form-item label="账期">
          <el-date-picker v-model="form.year" value-format="yyyy" type="year" placeholder="选择年"></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button size="small" type="primary" @click="submitHandle()">查询</el-button>
        </el-form-item>
        <el-form-item class="daochu">
          <el-button
            size="small"
            type="orange"
            @click="exportExcel()"
          >导出</el-button>
        </el-form-item>
      </el-form>
      <div class="tableBox">
        <el-table
          border
          stripe
          v-loading="tableLoading"
          :data="tableData"
          style="width: 100%"
          class="tableTh28"
          height="73vh"
          :span-method="arraySpanMethod"
          ref="table"
        >
          <el-table-column fixed label="经营单位" prop="areaName"></el-table-column>
          <el-table-column fixed label="指标名称" prop="class1" class-name="indecator-name1"></el-table-column>
          <el-table-column fixed label="指标名称" width="140px" show-overflow-tooltip prop="verticalIndexName" class-name="indecator-name2"></el-table-column>
          <el-table-column fixed label="单位" prop="unit" width="50px"></el-table-column>
          <template v-for="(item,index) in newCol">
            <el-table-column
              v-if="item.length==1"
              :label="item[0].horizonIndexName"
              :prop="item[0].indexKey"
              :key="index"
              class-name="right-money"
              width="130px">
            </el-table-column>

            <el-table-column v-if="item.length>1" :label="item[0].class1" :key="index">
              <el-table-column
                v-for="(e,i) in item"
                :key="i"
                :label="e.horizonIndexName"
                :prop="e.indexKey"
                width="130px"
                :class-name="e.horizonIndexName !=='增长率'?'right-money':''"
                >
              </el-table-column>
            </el-table-column>
          </template>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
import { $budgetAPI } from "@/api";
import { getSessionStorage } from "@/common/js/storage";
import {getCookie} from "@/common/js/cookie"
import { createSpanTrend } from "@/utils/mixin.js";
import prefixAPI from "@/api/prefixAPI";

let accountInfo = JSON.parse(getSessionStorage('accountInfo'))

export default {
  data() {
    return {
      tableLoading: false, //
      areaList: [],
      tableData: [],
      newCol: [],
      form: {
        areaId: accountInfo.areaId,
        year: ""
      },
    };
  },
  created() {
    this.accountInfo = JSON.parse(getSessionStorage("accountInfo"));
    // this.getCompanyByLvl();
    this.getYear();
  },
  methods: {
    init() {
      this.getData();
    },

    classify(arr, key) {
      let obj = {};
      let newArr = [];
      arr.forEach((item, index) => {
        if (item[key] === null) {
          newArr.push([item]);
        } else if (typeof obj[item[key]] == "undefined") {
          obj[item[key]] = 1;
          newArr.push([item]);
        } else {
          let i = newArr.length - 1;
          newArr[i].push(item);
        }
      });
      return newArr;
    },
    areaChange() {},
    exportExcel() {
      let areaId = this.form.areaId
        ? this.form.areaId
        : this.accountInfo.areaId;
      let year = this.form.year ? this.form.year : this.accountInfo.year;
      let token = getCookie('token')
      if (process.env.NODE_ENV == "development") {
        window.location.href =
          prefixAPI.loc + "/api/upBottomTrend/exportData?areaId=" + areaId + "&year=" + year + "&token=" + token;
      } else if (process.env.NODE_ENV == "production") {
        window.location.href =
          prefixAPI.hp + "/api/upBottomTrend/exportData?areaId=" + areaId + "&year=" + year + "&token=" + token;
      }
    },
    submitHandle() {
      this.getData();
    },
    arraySpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex == 0 || columnIndex == 1 || columnIndex == 2) {
        return this.spanArr[columnIndex][rowIndex];
      }
    },
    // 获取年份
    getYear() {
      $budgetAPI.upBottomTrendGetYear(
        {},
        res => {
          if (res.code == 0) {
            this.form.year = res.content;
            this.init();
          } else {
            this.alertError(res);
          }
        },
        err => {}
      );
    },
    getData() {
      let areaId = this.form.areaId
        ? this.form.areaId
        : this.accountInfo.areaId;
      let year = this.form.year ? this.form.year : this.formatDate(new Date());
      this.tableLoading = true;
      $budgetAPI.upBottomTrendListTrandData(
        {
          areaId: areaId,
          year: year
        },
        res => {
          if (res.code == 0) {
            this.tableLoading = false;
            let content = res.content;
            this.spanArr = createSpanTrend(content.data, [
              "areaName",
              "class1",
              "verticalIndexName"
            ]);
            this.newCol = this.classify(content.col, "class1");
            // console.log('content:col',content.col)
            // console.log('newCol',this.newCol)
            this.tableData = content.data;
            setTimeout(() => {
              this.$refs.table.doLayout();
            }, 1000);
          }
        },
        err => {
          this.tableLoading = false;
        }
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
      return y;
    }
  }
};
</script>

<style lang="scss" >
.operation{
  .daochu{
    float: right;
    .el-form-item__content {
      float: right;
      .el-button{
        float: right;
      }
    }
  }
}
.indecator-name1.is-leaf {
  z-index: 1;
  overflow: visible;
  // border-right: 1px solid #d7e5fb !important;
  border-right:none;
  .cell {
    text-align: center;
    transform: translateX(87%);
  }
}
.indecator-name2.is-leaf {
  .cell {
    color: #d7e5fb;
  }
}
</style>
