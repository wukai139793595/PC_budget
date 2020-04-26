<template>
  <div class="record">
    <div class="contentTopTitle">
      <div class="fl">
        <div class="title">导入记录</div>
      </div>
      <div class="fr">
        <el-button size="small" @click="$router.go(-1)">返回</el-button>
      </div>
    </div>
    <div class="tableBox">
      <el-table
        v-loading="tableLoading"
        :data="tableData"
        style="width: 100%"
        class="tableTh28"
        height="67vh"
        border
        stripe
      >
        <el-table-column type="index" width="50" label="序号"></el-table-column>
        <el-table-column prop="areaName" label="区域" width="150"></el-table-column>
        <el-table-column prop="fileName" label="名称" width></el-table-column>
        <el-table-column prop="importUserName" label="导入人员"></el-table-column>
        <el-table-column prop="createTime" label="时间" width="180" :formatter="dateFormat"></el-table-column>
        <el-table-column label="操作" width="210">
          <template slot-scope="scope">
            <el-link type="primary" @click="see(scope.row,scope.$index)">查看</el-link>
            <el-link type="danger" @click="del(scope.row,scope.$index)">删除</el-link>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { $budgetAPI } from "@/api";
import { getSessionStorage } from "@/common/js/storage";
import {
    getCookie,
    setCookie
} from '@/common/js/cookie';
export default {
  name: "forecastImportRecord",
  data() {
    return {
      accountInfo: "",
      tableData: [],
      tableLoading: false
    };
  },
  created() {
    this.accountInfo = JSON.parse(getSessionStorage("accountInfo"));
    this.listFileData();
  },
  methods: {
    //时间格式化
    dateFormat(row, column, cellValue, index) {
      return this.moment(cellValue).format("YYYY-MM-DD HH:mm:ss");
    },
    //导入记录列表
    listFileData() {
      $budgetAPI.listFileData(
        {
          areaId: this.accountInfo.areaId
        },
        res => {
          if (res.code == 0) {
            this.tableData = res.content;
          } else {
            this.alertError(res);
          }
        },
        err => {}
      );
    },
    see(row, index) {
      this.$router.push({
        path: "/budget/forecastImport",
        query: { row: row }
      });
    },
    //删除
    del(row, index) {
      this.$confirm("此操作将删除该条数据，是否继续？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })

        .then(() => {
          let token = getCookie('token')
          $budgetAPI.deleteImportFile(
            {
              id: row.id,
              token:token
            },
            res => {
              this.alertError(res);
              if (res.code == 0) {
                this.$message({
                  type: "success",
                  message: "删除成功"
                });
                this.listFileData();
              }
            },
            err => {}
          );
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  }
};
</script>

<style>
</style>
