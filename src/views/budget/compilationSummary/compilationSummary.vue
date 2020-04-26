<template>
  <div class="compilationSummary">
    <div class="contentTopTitle">
      <div class="fl">
        <div class="title">预算编制汇总</div>
      </div>
    </div>
    <div>
      <el-form :inline="true" :model="form" label-width="70px" class="formList">
        <el-form-item label="预算年度">
          <el-date-picker v-model="form.year" type="year" placeholder="选择年" value-format="yyyy"></el-date-picker>
        </el-form-item>
        <el-form-item label="区域">
          <dx-cascader :area_id.sync="form.areaId" :area_name.sync="form.areaName" :area_lvl.sync="form.areaLvl" ref="cascader" />
        </el-form-item>
        <el-form-item>
            <el-button size="small" type="primary" @click="search">查询</el-button>
             <el-button size="small" type="orange" @click="batchxport()">批量导出</el-button>
            <el-button size="small" type="orange" @click="exportModal()">导出</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="table-content clearfix">
      <div class="content">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="主量收入" name="first">
            <tab1 :rowData="tableData" :colDefList="colDefList" ref="tab1"></tab1>
          </el-tab-pane>
          <el-tab-pane label="存增量" name="second">
            <tab2 :rowData="tableData" :colDefList="colDefList" ref="tab2"></tab2>
          </el-tab-pane>
          <el-tab-pane label="总收入" name="third">
            <tab3 :rowData="tableData" :colDefList="colDefList" ref="tab3"></tab3>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script>
  import tab1 from "@/views/budget/compilationSummary/compilationSummary-tab1";
  import tab2 from "@/views/budget/compilationSummary/compilationSummary-tab2";
  import tab3 from "@/views/budget/compilationSummary/compilationSummary-tab3";
  import prefixAPI from "@/api/prefixAPI";
  import {
    getCookie
  } from "@/common/js/cookie";
  import {
    getSessionStorage
  } from "@/common/js/storage";
  import {
    $budgetAPI
  } from "@/api";
  export default {
    name: "newUpToDownOrganization",
    components: {
      tab1,
      tab2,
      tab3,
    },
    data() {
      return {
        backRecord: false,
        form: {
          year: "",
          areaId: "",
        },
        activeName: "first",
        flag: 1,
        accountInfo: "",
        tableData: [],
        colDefList: [],
      };
    },
    computed: {
      areaSelect() {
        return this.form.areaSelect;
      }
    },
    created() {
      let query = this.$route.query;
      this.backRecord = typeof(query.backRecord) === undefined ? true : false;
      if (this.backRecord) {
        this.form.areaId = query.areaId;
        this.form.year = query.accMonth;
      } else {
        this.accountInfo = JSON.parse(getSessionStorage("accountInfo"));
        this.form.areaId = this.accountInfo.areaId;
        this.form.year = this.moment()
          .add(1, "years")
          .format("YYYY");
      };
      this.getYear()
    },
    mounted() {
      this.init();
    },
    methods: {
      //查询
      search() {
        let params = {
          year: this.form.year,
          areaId: this.form.areaId ? this.form.areaId : this.accountInfo.areaId,
          flag: this.flag
        };
        this.listResourceData(params);
      },
      //导出
      exportModal() {
        let areaId = this.form.areaId;
        let year = this.form.year;
        let token = getCookie('token');
        // 根据不同模式切换不同的路径
        if (process.env.NODE_ENV == "development") {
          window.location.href =
            prefixAPI.loc +
            `/api/budgetIncomeForecast/downloadTemplate?areaId=${areaId}&year=${year}&token=${token}`;
        } else if (process.env.NODE_ENV == "production") {
          window.location.href =
            prefixAPI.hp +
            `/api/budgetIncomeForecast/downloadTemplate?areaId=${areaId}&year=${year}&token=${token}`;
        }
      },

     // 批量导出
     batchxport(){
       let areaId = this.form.areaId;
       let year = this.form.year;
       let token = getCookie('token');
       // 根据不同模式切换不同的路径
       if (process.env.NODE_ENV == "development") {
         window.location.href =
           prefixAPI.loc +
           `/api/summaryReport/downloadBatch?areaId=${areaId}&year=${year}&token=${token}`;
       } else if (process.env.NODE_ENV == "production") {
         window.location.href =
           prefixAPI.hp +
           `/api/summaryReport/downloadBatch?areaId=${areaId}&year=${year}&token=${token}`;
       }
     },
      listResourceData(params) {
        switch (params.flag) {
          case 1:
            this.$refs.tab1.tableLoading = true;
            break;
          case 2:
            this.$refs.tab2.tableLoading = true;
            break;
          case 3:
            this.$refs.tab3.tableLoading = true;
            break;
        }
        $budgetAPI.compilationSummary(
          params,
          res => {
            if (res.code == 0) {
              this.tableData = [];
              this.colDefList = [];
              this.tableData = res.content.data;
              this.colDefList = res.content.colDefList;
              setTimeout(() => {
                switch (params.flag) {
                  case 1:
                    this.$refs.tab1.init();
                    this.$refs.tab1.tableLoading = false;
                    break;
                  case 2:
                    this.$refs.tab2.init();
                    this.$refs.tab2.tableLoading = false;
                    break;
                  case 3:
                    this.$refs.tab3.init();
                    this.$refs.tab3.tableLoading = false;
                    break;
                }
              }, 500);
            } else {
              this.alertError(res);
            }
          },
          err => {}
        );
      },
      init() {
        if (this.$route.query.backRecord) {
          let query = this.$route.query;
          let params = {
            year: query.accMonth,
            importFlag: true,
            areaId: query.areaId,
            flag: 1
          };
          this.listResourceData(params);
        } else {
          let params = {
            year: this.form.year,
            areaId: this.form.areaId ? this.form.areaId : this.accountInfo.areaId,
            flag: 1
          };
          this.listResourceData(params);
          this.activeName = 'first';
        }
      },
      //数据点击切换页请求不同的数据
      handleClick(tab, event) {
        let params = {
          year: this.form.year,
          areaId: this.form.areaId ? this.form.areaId : this.accountInfo.areaId,
          flag: null
        };
        if (tab.name == "first") {
          params.flag = 1;
          this.flag = 1;
          this.listResourceData(params);
        }
        if (tab.name == "second") {
          params.flag = 2;
          this.flag = 2;
          this.listResourceData(params);
        }
        if (tab.name == "third") {
          params.flag = 3;
          this.flag = 3;
          this.listResourceData(params);
        }
      },
      // 获取年份
      getYear() {
        $budgetAPI.getBudgetYear({},
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
    }
  };
</script>

<style lang="scss" scoped>
  .compilationSummary {
    .table-content {
      .table-header {
        display: flex;
        justify-content: space-between;

        .btn-right {
          display: flex;
        }

        .table-title {
          font-size: 14px;
          font-weight: bold;
          height: 30px;
          line-height: 30px;

          span {
            display: inline-block;
            width: 5px;
            height: 5px;
            background-color: #418ee9;
            border-radius: 1000%;
            overflow: hidden;
            margin-right: 10px;
            margin-bottom: 3px;
          }
        }
      }

    }
  }
</style>
<style lang="scss">
  .compilationSummary {
    .formList {
      .el-form-item {
        width: 22%;
      }
       .el-form-item:last-child {
        width: 32%;
      }
      .el-form-item.btnBox {
        margin-bottom: 0px;
        width: 18%;
        margin-right: 0;

        .el-form-item__content {
          display: flex;
        }
      }
    }
  }
</style>
