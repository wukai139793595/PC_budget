<template>
  <div class="tableBox2" ref="tableWrap">
    <el-table
      ref="table"
      border
      stripe
      v-loading="tableLoading"
      :data="tableData"
      style="width: 100%"
      class="tableTh28"
      height="73vh"
    >
      <el-table-column type="index" label="行次"></el-table-column>
      <el-table-column label="指标编码" prop="levelCd" align="left"></el-table-column>
      <el-table-column label="产品收入项目名称" prop="name" align="left" width="230"></el-table-column>
      <el-table-column
        v-for="(item,index) in colDefList"
        :key="index"
        :label="item.name"
        :prop="item.indexKey"
        align="right"
      ></el-table-column>
    </el-table>
  </div>
</template>

<script>
import { $budgetAPI } from "@/api";
import { createSpanOne } from "@/utils/mixin.js";
import prefixAPI from "@/api/prefixAPI";
export default {
  props: {
    flag: {
      type: Number,
      default: 1
    },
    areaId: {},
    month: {}
  },

  data () {
      return {
          tableLoading: false,
          tableData:[],
          colDefList:[]
      }
  },
  mounted () {
      this.getData()
  },
  methods: {
    getData() {
      let areaId = this.areaId;
      let month = this.month;
      let flag = this.flag;
      this.tableLoading = true;
      $budgetAPI.mainCampDetail(
        {
          areaId: areaId,
          accMonth: month,
          flag: flag
        },
        res => {
          this.tableLoading = false;
          if (res.code == 0) {
            this.colDefList = res.content.colDefList;
            this.tableData = res.content.data;
          } else {
            this.alertError(res);
          }
        },
        err => {
          this.tableLoading = false;
        }
      );
    }
  }
};
</script>

<style>
</style>