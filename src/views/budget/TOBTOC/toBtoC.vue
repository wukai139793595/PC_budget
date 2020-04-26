<template>
  <div class="tobBtoC">
    <div class="contentTopTitle">
      <div class="fl">
        <div class="title">TOB-TOC 预算编制</div>
      </div>
      <!-- <div class="fr">
        <el-button
          @click="$router.push({path:'/budget/newUpToDownOrganizationRecord'})"
          size="small"
        >编制记录</el-button>
      </div> -->
    </div>
    <div>
      <el-form :inline="true" :model="form" label-width="70px" class="formList">
        <el-form-item label="预算年度">
          <el-date-picker v-model="form.year" type="month" placeholder="选择年" value-format="yyyyMM"></el-date-picker>
        </el-form-item>
        <el-form-item label="区域">
          <dx-cascader :area_id.sync="form.areaId" ref="cascader" />
        </el-form-item>
        <el-form-item label="数据来源">
          <el-select v-model="form.resourceId" placeholder="请选择">
            <el-option
              v-for="(item,index) in resourceList"
              :key="index"
              :label="item.resourceName"
              :value="item.resourceId"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="btnBox">
          <div>
            <el-button size="small" type="primary" @click="search">查询</el-button>
          </div>
          <div>
            <el-button size="small" style="margin-left: 10px" type="orange" @click="exportModal">导出</el-button>
          </div>
          <!-- <el-upload
            class="upload-demo"
            action="/api/budgetIncome/importData"
            :limit="3"
            :data="params"
            :on-success="importTarget"
            :on-progress="progress"
            :on-error="errorUpload"
            :show-file-list="false"
          >
            <el-button size="small" type="orange">导入</el-button>
          </el-upload> -->
        </el-form-item>
      </el-form>
    </div>
    <div class="table-content clearfix">
      <!-- <div class="table-header">
        <p class="table-title">
          <span v-if="fileName"></span>
          {{fileName}}
        </p>
        <div class="fr btn-right">
          <el-button size="small" style="margin-left: 10px" @click="exportModal">模版下载</el-button>
          <el-upload
            class="upload-demo"
            action="/api/budgetIncome/importData"
            :limit="3"
            :data="params"
            :on-success="importTarget"
            :on-progress="progress"
            :on-error="errorUpload"
            :show-file-list="false"
          >
            <el-button size="small" type="orange">导入</el-button>
          </el-upload>
        </div>
      </div>-->
      <div class="content">
        <span class="fileName">{{fileName}}</span>
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="主营业务" name="first">
            <tab1 :rowData="tableData" :colDefList="colDefList" ref="tab1"></tab1>
          </el-tab-pane>

        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import prefixAPI from "@/api/prefixAPI";
import { getCookie } from "@/common/js/cookie";
import { getSessionStorage } from "@/common/js/storage";
import { $budgetAPI } from "@/api";
import tab1 from "./toBtoC-tab1"
export default {
  name: "tobBtoC",
  components: {
    tab1,
  },
  data() {
    return {
      form: {
        year: "",
        areaId: "",
        resourceId: false
      },
      resourceList: [
        {
          resourceName: "系统测算",
          resourceId: false
        },
        // {
        //   resourceName: "经营单元导入",
        //   resourceId: true
        // }
      ],
      activeName: "first",
      fileName: "",
      flag: 1,
      accountInfo: "",
      tableData: [],
      colDefList: [],
    };
  },
  computed: {
    params() {
      let obj = {
        token: getCookie("token"),
        areaId: this.form.areaId,
        year: this.form.year
      };
      return obj;
    },
    areaSelect() {
      return this.form.areaSelect;
    }
  },
  created() {
    if (this.$route.query.row) {
      let row = this.$route.query.row;
      this.form.areaId = row.areaId;
      this.form.year = row.accMonth;
      this.resourceId = true;
    } else {
      this.accountInfo = JSON.parse(getSessionStorage("accountInfo"));
      this.form.areaId = this.accountInfo.areaId;
      this.form.year = this.moment().format("YYYYMM");
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    errorUpload(err, file, fileList) {
      console.log(err);
      this.loading.close();
    },
    progress(event, file, fileList) {
      this.loading = this.$loading({
        lock: true,
        text: "正在导入",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)"
      });
    },
    //导入成功的回调
    importTarget(response, file, fileList) {
      this.alertError(response);
      this.loading.close();
      if (response.code == 0) {
        this.$message({
          type: "success",
          message: "导入成功"
        });
        this.form.resourceId = true;
        this.search();
      }
    },
    //查询
    search() {
      let params = {
        year: this.form.year,
        importFlag: this.form.resourceId,
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
          "/api/mainCampIncome/downloadTemplate?areaId=" +
          areaId +
          "&importFlag=false&year=" +
          year + "&token=" + token;
      } else if (process.env.NODE_ENV == "production") {
        window.location.href =
          prefixAPI.hp +
          "/api/mainCampIncome/downloadTemplate?areaId=" +
          areaId +
          "&importFlag=false&year=" +
          year + "&token=" + token;
      }
    },
    listResourceData(params) {
      switch (params.flag) {
        case 1:
          this.$refs.tab1.tableLoading = true;
          break;
        // case 2:
        //   this.$refs.tab2.tableLoading = true;
        //   break;
        // case 3:
        //   this.$refs.tab3.tableLoading = true;
        //   break;
      }
      $budgetAPI.getlistResourceData(
        params,
        res => {
          if (res.code == 0) {
            this.tableData = [];
            this.colDefList = [];
            this.tableData = res.content.data;
            this.colDefList = res.content.colDefList;
            this.fileName = res.content.fileName;
            setTimeout(() => {
              switch (params.flag) {
                case 1:
                  this.$refs.tab1.init();
                  this.$refs.tab1.tableLoading = false;
                  break;
                // case 2:
                //   this.$refs.tab2.init();
                //   this.$refs.tab2.tableLoading = false;
                //   break;
                // case 3:
                //   this.$refs.tab3.init();
                //   this.$refs.tab3.tableLoading = false;
                //   break;
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
      if (this.$route.query.row) {
        let row = this.$route.query.row;
        let params = {
          year: row.accMonth,
          importFlag: true,
          areaId: row.areaId,
          flag: 1
        };
        this.listResourceData(params);
      } else {
        let params = {
          year: this.form.year,
          importFlag: this.form.resourceId,
          areaId: this.form.areaId ? this.form.areaId : this.accountInfo.areaId,
          flag: 1
        };
        this.listResourceData(params);
      }
    },
    //数据点击切换页请求不同的数据
    handleClick(tab, event) {
      let params = {
        year: this.form.year,
        importFlag: this.form.resourceId,
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
    }
  }
};
</script>

<style lang="scss" scoped>
.newUpToDownOrganization {
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
    .content{
      position: relative;
      .fileName{
        position: absolute;
        right:0;
        top:15px;
      }
    }
  }
}
</style>
<style lang="scss">
.tobBtoC {
  .formList {
    .el-form-item.btnBox {
      margin-bottom: 0px;
      width: 27%;
      margin-right: 0;
      .el-form-item__content{
        display: flex;
      }
    }
  }
  .upload-demo {
    display: inline-block;
    margin: 0 15px;
  }
}
</style>
