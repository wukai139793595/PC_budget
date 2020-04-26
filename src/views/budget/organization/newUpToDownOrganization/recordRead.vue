<template>
  <div class="newUpToDownOrganization">
    <div class="contentTopTitle">
      <div class="fl">
        <div class="title">编制记录查看</div>
      </div>
      <div class="fr">
        <el-button size="small" @click="$router.go(-1)">返回</el-button>
      </div>
    </div>
    <div class="table-content clearfix">
      <div class="content">
        <span class="fileName">{{fileName}}</span>
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
// import tab1 from "./newUpToDownOrganization/newUpToDownOrganization-tab1";
// import tab2 from "./newUpToDownOrganization/newUpToDownOrganization-tab2";
// import tab3 from "./newUpToDownOrganization/newUpToDownOrganization-tab3";
import tab1 from "./newUpToDown-tab1";
import tab2 from "./newUpToDown-tab2";
import tab3 from "./newUpToDown-tab3";
import prefixAPI from "@/api/prefixAPI";
import { getCookie } from "@/common/js/cookie";
import { getSessionStorage } from "@/common/js/storage";
import { $budgetAPI } from "@/api";
export default {
  name: "newUpToDownOrganization",
  components: {
    tab1,
    tab2,
    tab3
  },
  data() {
    return {

      form: {
        year: "",
        areaId: "",
        resourceId: true
      },
      activeName: "first",
      fileName: "",
      flag: 1,
      accountInfo: "",
      tableData: [],
      colDefList: []
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
    let query = this.$route.query;
    // this.backRecord = typeof(query.backRecord) === undefined ? true: false;
    this.form.areaId = query.areaId;
    this.form.year = query.accMonth;
    this.resourceId = true;
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      let query = this.$route.query;
      let params = {
        year: query.accMonth,
        importFlag: true,
        areaId: query.areaId,
        flag: 1
      };
      this.listResourceData(params);
    },
    
    // errorUpload(err, file, fileList) {
    //   console.log(err);
    //   this.loading.close();
    // },
    // progress(event, file, fileList) {
    //   this.loading = this.$loading({
    //     lock: true,
    //     text: "正在导入",
    //     spinner: "el-icon-loading",
    //     background: "rgba(0, 0, 0, 0.7)"
    //   });
    // },
    //导入成功的回调
    // importTarget(response, file, fileList) {
    //   this.alertError(response);
    //   this.loading.close();
    //   if (response.code == 0) {
    //     this.$message({
    //       type: "success",
    //       message: "导入成功"
    //     });
    //     this.form.resourceId = true;
    //     this.search();
    //   }
    // },
    // //查询
    // search() {
    //   let params = {
    //     year: this.form.year,
    //     importFlag: this.form.resourceId,
    //     areaId: this.form.areaId ? this.form.areaId : this.accountInfo.areaId,
    //     flag: this.flag
    //   };
    //   this.listResourceData(params);
    // },

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
      // $budgetAPI.listResourceDataNew(
      //   params,
      //   res => {
      //     console.log('listResourceDataNew',res)
      //   }
      // )
      // $budgetAPI.listResourceData(
      $budgetAPI.listResourceDataNew(
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
    .content {
      position: relative;
      .fileName {
        position: absolute;
        right: 0;
        top: 15px;
      }
    }
  }
}
</style>
<style lang="scss">
.newUpToDownOrganization {
  .formList {
    .el-form-item.btnBox {
      margin-bottom: 0px;
      width: 27%;
      margin-right: 0;
      .el-form-item__content {
        display: flex;
      }
    }
  }
  .upload-demo {
    display: inline-block;
    margin: 0 15px;
  }
}
