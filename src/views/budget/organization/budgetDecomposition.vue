<template>
  <div>
    <div class="contentTopTitle">
      <div class="fl">
        <div class="title">自上而下空间预测</div>
      </div>
      <div class="fr">
        <el-button size="small" icon="el-icon-plus" type="primary" plain @click="$router.push({path:'/budget/buildDecompose'})">新建预测</el-button>
      </div>
    </div>
    <div>
      <el-form :inline="true" :model="form" class="formList">
        <el-form-item label="名称:" label-width="60px">
          <el-input v-model="form.fileName" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="预算年度:" label-width="90px">
          <el-date-picker v-model="form.testYear" placeholder="请选择" type="year" format="yyyy"/>
        </el-form-item>
        <el-form-item>
          <el-button size="small" type="primary" @click="handleSearch()">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="tableBox">
      <el-table v-loading="tableLoading" :data="tableData" style="width: 100%" class="tableTh28" height="67vh" border stripe>
        <el-table-column type="index" width="50" label="序号"></el-table-column>
        <el-table-column  prop="areaName" label="区域" width="150"></el-table-column>
        <el-table-column  prop="fileName" label="测算记录名称" width=""></el-table-column>
        <el-table-column  prop="createUserName" label="创建人" width=""></el-table-column>
        <el-table-column  prop="updateTime" label="修改时间" width="180"></el-table-column>
        <el-table-column  label="操作" width="210">
          <template slot-scope="scope">
            <el-link type="primary" @click="handleSee(scope.row,scope.$index)">查看</el-link>
            <el-link type="primary">修改</el-link>
            <el-link type="danger" @click="handleDelete(scope.$index,scope.row)">删除</el-link>
            <el-link type="primary">导出</el-link>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!--翻页-->
    <!-- <div class="page">
      <el-pagination
        layout="total, prev, pager, next, jumper"
        :page-size="pageSize"
        :total="dataTotal"
        :current-page.sync="currentPage"
        @current-change="handleCurrentChange"
      ></el-pagination>
    </div> -->
  </div>
</template>

<script>
import {$budgetAPI} from '@/api';
import {getSessionStorage} from "@/common/js/storage"
  export default {
    data(){
      return{
        form: {
          fileName:undefined,
          testYear:undefined
        },
        tableData:[],
        tableTemp:[],
        tableLoading:false,
        // pageSize: 10,
        // currentPage: 1,
        // dataTotal:100,
      }
    },
    methods:{

      async handleSearch(){
        this.getData();
      },

      getData () {
        this.tableLoading = true;
        $budgetAPI.decomposeList({
          fileName: this.form.fileName,
          testYear: this.form.testYear
        },res => {
          this.tableLoading = false;
          if (res.code == 0) {
            this.tableData = res.content;
          } else {
            this.alertError(res)
          }
        },err => {
            this.tableLoading = false;
        })
      },

      // handleCurrentChange(cpage) {
      //   this.currentPage = cpage;
      // },

      handleSee(row,index){
        console.log(row)
      },
      // 删除
      handleDelete (index, row) {
        $budgetAPI.decomposeDelete({
          id:row.id
        },res => {
          if (res.code == 0 ) {
            this.handleSearch();
          } else {
            this.alertError(res)
          }
        })
      }
    },
    watch: {
      // tableData (newVal) {
      //   let start = (this.currentPage - 1) * this.pageSize;
      //   let end = (this.currentPage) * this.pageSize;
      //   this.tableTemp = newVal.slice(start,end)
      // },
      // currentPage (newVal) {
      //   let start = (newVal-1)*this.pageSize;
      //   let end = newVal * this.pageSize;
      //   this.tableTemp = this.tableData.slice(start,end);
      // }
    },     
    mounted() {
      this.handleSearch();
    }

  }
</script>

<style lang="scss" scoped>

</style>
