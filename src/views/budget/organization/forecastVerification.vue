<template>
  <div>
    <div class="contentTopTitle">
      <div class="fl">
        <div class="title">预测验证</div>
      </div>
      <div class="fr">
        <el-button
          size="small"
          icon="el-icon-plus"
          type="primary"
          plain
          @click="$router.push({path:'/budget/forecastVerificationCreate'})"
        >新建预测</el-button>
      </div>
    </div>
    <div>
      <el-form :inline="true" :model="form" class="formList">
        <el-form-item label="名称:" label-width="60px">
          <el-input v-model="form.name" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="预算年度:" label-width="90px">
          <el-date-picker type="year" v-model="form.year" />
        </el-form-item>
        <el-form-item>
          <el-button size="small" type="primary" @click="currentPage=1,handleSearch()">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="tableBox">
      <el-table
        v-loading="tableLoading"
        :data="tableShow"
        style="width: 100%"
        height="67vh"
        class="tableTh28"
        stripe
        border
      >
        <el-table-column type="index" width="50" label="序号"></el-table-column>
        <el-table-column prop="areaName" label="区域" width="150"></el-table-column>
        <el-table-column prop="testName" label="预算记录名称" width></el-table-column>
        <el-table-column prop="updateTime" label="修改时间" width="180" :formatter="formatDate"></el-table-column>
        <el-table-column label="操作" width="210">
          <template slot-scope="scope">
            <el-link type="primary" @click="handleSee(scope.row,scope.$index)">查看</el-link>
            <el-link type="primary" @click="handleUpdate(scope.$index,scope.row)">修改</el-link>
            <el-link type="danger" @click="deleteHandle(scope.$index,scope.row)">删除</el-link>
            <el-link type="primary" @click="exportHandle(scope.$index,scope.row)">导出</el-link>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!--翻页-->
    <div class="page">
      <el-pagination
        layout="total, prev, pager, next, jumper"
        :page-size="pageSize"
        :total="dataTotal"
        :current-page.sync="currentPage"
        @current-change="handleCurrentChange"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import { $budgetAPI } from "@/api";
import prefixAPI from "@/api/prefixAPI";
import {getSessionStorage} from "@/common/js/storage";
import {getCookie} from "@/common/js/cookie"
export default {
  data() {
    return {
      form: {
        name: "",
        type: "",
        type_big: "",
        type_small: "",
        time: "",
        year: ""
      },
      tableData: [],
      tableShow: [],
      tableLoading: false,
      pageSize: 10,
      currentPage: 1,
      dataTotal: 0,
      yearOptions: [
        { value: "2018", label: "2018" },
        { value: "2019", label: "2019" },
        { value: "2020", label: "2020" }
      ],
    };
  },
  methods: {
    // 查询
    async handleSearch() {
      // let ret = await $http.get($budgetAPI.getLoginMsg+'?page='+this.currentPage+'&pageSize='+this.pageSize);
      // console.log(ret)
      let testYear = this.form.year
        ? this.moment(this.form.year).get("year")
        : "";
      console.log("testYear", testYear);
      this.tableLoading = true;
      $budgetAPI.budgetTestList(
        {
          testName: this.form.name,
          testYear: testYear
        },
        res => {
          if (res.code == 0) {
            this.tableLoading = false;
            this.tableData = res.content;
            this.dataTotal = res.content.length;
          } else {
            this.alertError(res);
          }
        },
        err => {}
      );
    },
    // 格式化时间
    formatDate(row) {
      return this.moment(row.updateTime).format("YYYY-MM-DD HH:mm:ss");
    },
    // 页面更改
    handleCurrentChange(cpage) {
      this.currentPage = cpage;
      // this.handleSearch();
    },
    // 查看
    handleSee(row, index) {
      this.$router.push({
        path: "forecastVerificationRead",
        query: { testId: row.id }
      });
    },
    // 修改
    handleUpdate(index, row) {
      this.$router.push({
        path: "forecastVerificationUpdate",
        query: { testId: row.id }
      });
    },
    // 删除
    deleteHandle(index, row) {
      this.$confirm("此操作将删除该条数据，是否继续？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let id = row.id;
          $budgetAPI.budgetTestDelete(
            {
              testId: id
            },
            res => {
              this.alertError(res);
              if (res.code == 0) {
                this.$message({
                  type: "success",
                  message: "删除成功"
                });
                this.handleSearch();
              }
            },
            err => {
              this.alertError(err);
            }
          );
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    exportHandle(index, row) {
      let testId = row.id;
      let token = getCookie('token')
      if (process.env.NODE_ENV == "development") {
        window.location.href =
          prefixAPI.loc + "/api/test/export?testId=" + testId + "&token="+token;
      } else if (process.env.NODE_ENV == "production") {
        window.location.href =
          prefixAPI.hp + "/api/test/export?testId=" + testId + "&token=" + token;
      }
    }
  },
  watch: {
    currentPage: function(newVal) {
      let start = (newVal - 1) * this.pageSize;
      let end = newVal * this.pageSize;
      this.tableShow = this.tableData ? this.tableData.slice(start, end) : [];
    },
    tableData: function(newVal) {
      let start = (this.currentPage - 1) * this.pageSize;
      let end = this.currentPage * this.pageSize;
      this.tableShow = newVal ? newVal.slice(start, end) : [];
    }
  },
  mounted() {
    this.handleSearch();
  }
};
</script>

<style lang="scss" scoped>
</style>
