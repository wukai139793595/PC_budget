<template>
  <div class="charge-system">
    <div class="contentTopTitle">
      <div class="fl">
        <div class="title">计费系统日账</div>
      </div>
    </div>
    <div class="operation">
      <el-form :inline="true" :model="form" label-width="80px" class="formList">
        <el-form-item label="选择区域">
          <dx-cascader :area_id.sync="form.areaId" />
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
          style="width:100%"
          class="tableTh28"
          height="73vh"
          :span-method="arraySpanMethod"
          ref="table"
        >
          <el-table-column fixed prop="incomeName" label="收入来源" width="80px"></el-table-column>
          <el-table-column fixed prop="projectName" label="是否收入" width="80px"></el-table-column>
          <el-table-column fixed prop="isProjectName" label="收入面" width="100px"></el-table-column>
          <el-table-column fixed prop="productName" label="产品项" width="100px"></el-table-column>
          <el-table-column show-overflow-tooltip class-name="right-money" v-for="item in 31" :key="item" :prop="item+''" :label="item+''" width="90px"></el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
import { $budgetAPI } from "@/api";
import { getSessionStorage } from "@/common/js/storage";
import {getCookie} from "@/common/js/cookie"
import {createSpanCharge,mergeSpan} from "@/utils/mixin"
import prefixAPI from "@/api/prefixAPI";


export default {
  data() {
    return {
      titleName: [],
      tableLoading: false,
      form: {
        areaId: "",
        month: "201911"
      },
      tableData: [],
    };
  },
  created () {
    this.accountInfo = JSON.parse(getSessionStorage("accountInfo"));
    this.form.areaId = this.accountInfo.areaId;
    this.submitHandle();
  },
  methods: {
    submitHandle () {
      let areaId = this.form.areaId;
      let accMonth = this.form.month;
      this.tableLoading = true;
      $budgetAPI.dailyAccountGetList({
        areaId,
        accMonth
      },res => {
        this.tableLoading = false;
        if (res.code == 0) {
          // console.log(res.content)
          let result = this.createTableData(res.content);
          // this.spanArr = createSpanCharge(result,['incomeName','projectName','isProjectName','productName']);
          this.spanArr  = mergeSpan(result,['incomeName','projectName','isProjectName','productName']);
          // console.log(this.spanArr)
          // console.log('mergeSpan',temp)
          this.tableData = result;
          setTimeout(() => {
            this.$refs.table.doLayout();
          },1200)
        }
      },err => {
        this.tableLoading = false;
      })
    },
    // 生成tableData数据
    createTableData (dataArr) {
      let result = dataArr.map((item,index) => {
        return {...item,...item.data}
      })
      return result
    },
    arraySpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex == 0 || columnIndex == 1||columnIndex == 2||columnIndex == 3) {
        return this.spanArr[rowIndex][columnIndex]
      }
    },
    exportExcel() {
      let areaId = this.form.areaId
        ? this.form.areaId
        : this.accountInfo.areaId;
      let accMonth = this.form.month ? this.form.month : this.accountInfo.month;
      let token = getCookie("token")
      if (process.env.NODE_ENV == "development") {
        window.location.href =
          prefixAPI.loc + "/api/dailyAccount/export?areaId=" + areaId + "&accMonth=" + accMonth + "&token=" + token;
      } else if (process.env.NODE_ENV == "production") {
        window.location.href =
          prefixAPI.hp + "/api/dailyAccount/export?areaId=" + areaId + "&accMonth=" + accMonth + "&token=" + token;
      }
    }
  }
};
</script>

<style lang="scss">
.charge-system {
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
