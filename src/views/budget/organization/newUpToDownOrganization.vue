<template>
  <div class="newUpToDownOrganization">
    <div class="contentTopTitle">
      <div class="fl">
        <div class="title">自下而上的编制</div>
      </div>
      <div class="fr">
        <el-button
          @click="recordHandle"
          size="small"
          :disabled="this.form.checked == true" >编制记录</el-button>
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
        <el-form-item class="checkedBox">
          <template>
           <el-checkbox v-model="form.checked" @change="handleCheckedCitiesChange">明细数据</el-checkbox>
          </template>
        </el-form-item>

        <el-form-item class="btnBox">

          <div>
            <el-button size="small" type="primary"   @click="search">查询</el-button>
          </div>
          <div>
            <el-button size="small" type="orange" class="upload-demo" @click="batchExport"  v-if="this.form.checked ==false">批量导出</el-button>
          </div>
          <div>
            <el-button size="small"  class="upload-demo"  v-if="this.form.checked ==true" disabled>批量导出</el-button>
          </div>
          <!-- <div>
            <el-button size="small" style="margin-left: 10px" @click="exportModal(false)">模版下载</eo" @cll-button>
          </div> -->
          <el-upload
            class="upload-demo"
            action="/api/budgetIncomeSecond/importData"
            :limit="3"
            :data="params"
            :on-success="importTarget"
            :on-progress="progress"
            :on-error="errorUpload"
            :show-file-list="false"
            v-if="this.form.checked ==false"
          >
           <el-button size="small" type="orange"   >导入</el-button>
           </el-upload>
          <div  class="upload-demo" v-if="this.form.checked == true"><el-button size="small" disabled >导入</el-button></div>

          <div>
            <el-button size="small" class="upload-demo" type="orange" @click="exportModal()">导出</el-button>
          </div>
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
      <div class="content" v-show="form.checked == false">
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
      <div class="content" v-show="form.checked == true">
        <span class="fileName">{{fileName}}</span>
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="主量收入" name="four">
            <tab4 :rowData="tableData" :colDefList="colDefList" ref="tab4"></tab4>
          </el-tab-pane>
          <el-tab-pane label="存增量" name="five">
            <tab5 :rowData="tableData" :colDefList="colDefList" ref="tab5"></tab5>
          </el-tab-pane>
          <el-tab-pane label="总收入" name="six">
            <tab6 :rowData="tableData" :colDefList="colDefList" ref="tab6"></tab6>
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
import tab1 from "./newUpToDownOrganization/newUpToDown-tab1";
import tab2 from "./newUpToDownOrganization/newUpToDown-tab2";
import tab3 from "./newUpToDownOrganization/newUpToDown-tab3";
import tab4 from "./newUpToDownOrganization/newUpToDown-tab4";
import tab5 from "./newUpToDownOrganization/newUpToDown-tab5";
import tab6 from "./newUpToDownOrganization/newUpToDown-tab6";
import prefixAPI from "@/api/prefixAPI";
import { getCookie } from "@/common/js/cookie";
import { getSessionStorage } from "@/common/js/storage";
import { $budgetAPI } from "@/api";
export default {
  name: "newUpToDownOrganization",
  components: {
    tab1,
    tab2,
    tab3,
    tab4,
    tab5,
    tab6,
  },
  data() {
    return {
      backRecord: false,
      form: {
        year: "",
        areaId: "",
        resourceId: false,
        checked:false,
      },
      resourceList: [
        {
          resourceName: "系统测算",
          resourceId: false
        },
        {
          resourceName: "经营单元导入",
          resourceId: true
        }
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
    let query = this.$route.query;
    this.backRecord = typeof(query.backRecord) === undefined ? true: false;
    if (this.backRecord) {
      this.form.areaId = query.areaId;
      this.form.year = query.accMonth;
      this.resourceId = true;
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
    handleCheckedCitiesChange(){
        this.init();

    },
    recordHandle () {
      let areaId = this.form.areaId ? this.form.areaId : this.accountInfo.areaId;
      let areaName =encodeURIComponent(this.form.areaName ? this.form.areaName : this.accountInfo.areaName);
      let areaLvl = this.form.areaLvl ? this.form.areaLvl : this.accountInfo.areaLvl;
      let year = this.form.year ;
      this.$router.push({path:'/budget/newUpToDownOrganizationRecord',query:{id:areaId,name:areaName,lvl:areaLvl,year:year}});
    },
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

      if(this.form.checked == false){
          let areaId = this.form.areaId;
          let year = this.form.year;
          let importFlag = this.form.resourceId;
          let token = getCookie('token');
          // 根据不同模式切换不同的路径
          if (process.env.NODE_ENV == "development") {
              window.location.href =
                  prefixAPI.loc + `/api/budgetIncomeSecond/downloadTemplate?areaId=${areaId}&importFlag=${importFlag}&year=${year}&token=${token}`;
          } else if (process.env.NODE_ENV == "production") {
              window.location.href =
                  prefixAPI.hp + `/api/budgetIncomeSecond/downloadTemplate?areaId=${areaId}&importFlag=${importFlag}&year=${year}&token=${token}`;
          }
      }else{
          let areaId = this.form.areaId;
          let year = this.form.year;
          let importFlag = this.form.resourceId;
          let token = getCookie('token');
          // 根据不同模式切换不同的路径
          if (process.env.NODE_ENV == "development") {
              window.location.href =
                  prefixAPI.loc + `/api/budgetIncomeDetail/downloadBudgetIncomeDetail?areaId=${areaId}&importFlag=${importFlag}&year=${year}&token=${token}`;
          } else if (process.env.NODE_ENV == "production") {
              window.location.href =
                  prefixAPI.hp + `/api/budgetIncomeDetail/downloadBudgetIncomeDetail?areaId=${areaId}&importFlag=${importFlag}&year=${year}&token=${token}`;
          }
      }

    },
   // 批量导出
   batchExport(){

  if(this.form.checked == false){
          let areaId = this.form.areaId;
          let year = this.form.year;
          let importFlag = this.form.resourceId;
          let token = getCookie('token');
          // 根据不同模式切换不同的路径
          if (process.env.NODE_ENV == "development") {
              window.location.href =
                  prefixAPI.loc + `/api/statisticsReport/downloadBudgetIncome?areaId=${areaId}&importFlag=${importFlag}&year=${year}&token=${token}`;
          } else if (process.env.NODE_ENV == "production") {
              window.location.href =
                  prefixAPI.hp + `/api/statisticsReport/downloadBudgetIncome?areaId=${areaId}&importFlag=${importFlag}&year=${year}&token=${token}`;
          }
      }
   },

    listResourceData(params) {
       if(this.form.checked==false){
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
       }else{
           switch (params.flag) {
               case 1:
                   this.$refs.tab4.tableLoading = true;
                   break;
               case 2:
                   this.$refs.tab5.tableLoading = true;
                   break;
               case 3:
                   this.$refs.tab6.tableLoading = true;
                   break;

           }
       }

      // $budgetAPI.listResourceDataNew(
      //   params,
      //   res => {
      //     console.log('listResourceDataNew',res)
      //   }
      // )
      // $budgetAPI.listResourceData(

      if(this.form.checked == false){
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
      }
      else{
          $budgetAPI.listResourceDetailData(
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
                                  this.$refs.tab4.init();
                                  this.$refs.tab4.tableLoading = false;
                                  break;
                              case 2:
                                  this.$refs.tab5.init();
                                  this.$refs.tab5.tableLoading = false;
                                  break;
                              case 3:
                                  this.$refs.tab6.init();
                                  this.$refs.tab6.tableLoading = false;
                                  break;
                          }
                      }, 500);
                  } else {
                      this.alertError(res);
                  }
              },
              err => {}
          );
      }
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
          if(this.form.checked==false){
              let params = {
                  year: this.form.year,
                  importFlag: this.form.resourceId,
                  areaId: this.form.areaId ? this.form.areaId : this.accountInfo.areaId,
                  flag: 1
              };
              this.listResourceData(params);
              this.activeName='first';
          }else {
              let params = {
                  year: this.form.year,
                  importFlag: this.form.resourceId,
                  areaId: this.form.areaId ? this.form.areaId : this.accountInfo.areaId,
                  flag: 1
              };
              this.listResourceData(params);
              this.activeName='four';
          }


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
        if (tab.name == "four") {
            params.flag = 1;
            this.flag = 1;
            this.listResourceData(params);
        }
        if (tab.name == "five") {
            params.flag = 2;
            this.flag = 2;
            this.listResourceData(params);
        }
        if (tab.name == "six") {
            params.flag = 3;
            this.flag = 3;
            this.listResourceData(params);
        }
    },
      // 获取年份
   getYear() {
          $budgetAPI.getBudgetYear(
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
.newUpToDownOrganization {
  .formList {
    .el-form-item{
      width: 21%;
    }
    .el-form-item.btnBox {
      margin-bottom: 0px;
      width: 18%;
      margin-right: 0;
      .el-form-item__content{
        display: flex;
      }
    }
     .el-form-item.checkedBox{
         width: 8%;
    }
    .el-checkbox__inner{
     border-radius: 100%;
   }
  }
  .upload-demo {
    display: inline-block;
    margin-left: 15px;
  }
}
</style>
