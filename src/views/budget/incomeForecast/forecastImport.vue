<template>
  <div class="forecast-import">
    <div class="contentTopTitle">
      <div class="fl">
        <div class="title">导入预估</div>
      </div>
      <div class="fr">
        <el-button size="small" plain @click="$router.push({path:'/budget/forecastImportRecord'})">导入记录</el-button>
      </div>
    </div>
    <div>
      <el-form :inline="true" :model="form" class="formList">
        <el-form-item label="区域:" label-width="60px">
          <dx-cascader :area_id.sync="form.areaId"></dx-cascader>
        </el-form-item>
        <el-form-item label="账期:" label-width="90px">
          <el-date-picker
            v-model="form.accMonth"
            value-format="yyyyMM"
            type="month"
            placeholder="选择月"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button size="small" type="primary" @click="handleSearch()">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="table-content clearfix">
      <div class="table-header">
        <p class="table-title">
          <span v-if="fileName"></span>
          {{fileName}}
        </p>
        <div class="fr btn-right">
          <el-button size="small" style="margin-left: 10px" @click="exportModal">模版下载</el-button>
          <el-upload

            class="upload-demo"
            action="/api/incomeForecast/importData"
            :limit="3"
            :data="params"
            :on-success="importTarget"
            :on-progress="progress"
            :on-error="errorUpload"
            :show-file-list="false"
          >
         <el-button size="small" type="orange" :disabled="accountInfo.areaLvl != 3">导入</el-button>
          </el-upload>
<!--          <el-button size="small" type="orange" :disabled="accountInfo.areaLvl != 3">导入</el-button>-->
        </div>
      </div>
    </div>
    <div class="tableBox" style="margin-top:15px">
        <el-table
          v-loading="tableLoading"
          :data="tableData"
          style="width: 100%"
          class="tableTh28"
          height="66vh"
          border
          stripe
          ref="table"
        >
          <el-table-column  width="150" label="单位(万元)" :show-overflow-tooltip="true" class-name="first-column">
            <template slot-scope="scope">
                <span :class="{'boldFont' : !scope.row.class1}">
                    {{scope.row.indexName}}
                </span>
            </template>
          </el-table-column>
          <el-table-column label="当月">
            <template v-for="(item,index) in currentMonth">
              <el-table-column
                v-if="item.length==1"
                :label="item[0].incomeTypeName"
                :prop="item[0].colKey"
                :key="index"
                width="100"
                class-name="right-money"
              ></el-table-column>

              <el-table-column v-if="item.length > 1" :label="item[0].broadClass" :key="index">
                <el-table-column
                  v-for="(e,i) in item"
                  :key="i"
                  :label="e.incomeTypeName"
                  :prop="e.colKey"
                  width="100"
                  class-name="right-money"
                ></el-table-column>
              </el-table-column>
            </template>
          </el-table-column>
          <el-table-column label="上月同期">
            <template v-for="(item,index) in lastMonth">
              <el-table-column
                v-if="item.length==1"
                :label="item[0].incomeTypeName"
                :prop="item[0].colKey"
                :key="index"
                width="100"
                class-name="right-money"
              ></el-table-column>

              <el-table-column v-if="item.length > 1" :label="item[0].broadClass" :key="index">
                <el-table-column
                  v-for="(e,i) in item"
                  :key="i"
                  :label="e.incomeTypeName"
                  :prop="e.colKey"
                  width="100"
                  class-name="right-money"
                ></el-table-column>
              </el-table-column>
            </template>
          </el-table-column>
        </el-table>
    </div>
  </div>
</template>

<script>
import { $budgetAPI } from "@/api";
import { getSessionStorage } from "@/common/js/storage";
import { getCookie } from "@/common/js/cookie"
import prefixAPI from "@/api/prefixAPI"

export default {
  data() {
    return {
      form: {
        areaId: "",
        accMonth: ""
      },
      fileName: "",
      tableLoading: false,
      tableData: [],
      accountInfo: "",
      currentMonth: null,
      lastMonth: null,
      loading:null,
    };
  },
  computed:{
    params(){
      let obj = {
        areaId:this.form.areaId,
        accMonth:this.form.accMonth,
        token:getCookie('token')
      }
      return obj
    }
  },

  created() {
    this.accountInfo = JSON.parse(getSessionStorage("accountInfo"));
    if(this.$route.query.row){
      let row = this.$route.query.row
      this.form.areaId = row.areaId;
      this.form.accMonth = row.accMonth;
    }else{
      this.form.areaId = this.accountInfo.areaId;
      this.form.accMonth = this.moment().format('YYYYMM');
    }
    this.listImportFileData();
  },
  methods: {
     errorUpload(err,file,fileList){
        this.loading.close();
      },
      progress(event, file, fileList){
        this.loading = this.$loading({
          lock: true,
          text: '正在导入',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
      },
      //导入成功的回调
      importTarget(response,file,fileList){
        this.alertError(response);
        this.loading.close();
        if(response.code == 0){
          this.$message({
            type:"success",
            message:"导入成功"
          })
          this.listImportFileData();
        }

      },
    //获取表格数据
    listImportFileData() {
      this.tableLoading = true;
      $budgetAPI.listImportFileData(
        {
          areaId: this.form.areaId,
          accMonth: this.form.accMonth
        },
        res => {
          this.tableLoading = false;
          this.alertError(res);
          if (res.code == 0) {
            this.tableData = res.content.data;
            this.fileName = res.content.fileName;
            this.currentMonth = this.classify(
              res.content.colList,
              "broadClass"
            );
            this.lastMonth = this.classify(
              res.content.preColList,
              "broadClass"
            );
            setTimeout(() => {
              this.$refs.table.doLayout();
            }, 500);
          }
        },
        err => {}
      );
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
    handleSearch() {
       this.listImportFileData();
    },
    exportModal() {
      let token = getCookie('token')
      let areaId =  this.form.areaId;
      let accMonth = this.form.accMonth;
       if (process.env.NODE_ENV == 'development') {
          window.location.href = prefixAPI.loc + "/api/incomeForecast/downloadTemplate?areaId=" + areaId + "&accMonth=" +accMonth + "&token=" +token;;
        } else if (process.env.NODE_ENV == 'production') {
          window.location.href = prefixAPI.hp + "/api/incomeForecast/downloadTemplate?areaId=" + areaId + "&accMonth=" +accMonth + "&token=" +token;
        }
    }
  }
};
</script>

<style lang="scss" scoped>
.forecast-import {
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
      .upload-demo {
        margin: 0 15px;
      }
    }
  }
}
</style>
<style lang="scss">
.forecast-import{
  th.first-column{
    text-align: center !important;
  }
  .first-column {
    text-align: left;
    span {
      padding-left: 16px;
    }
  }
  span.boldFont {
    padding: 0;
    font-weight: bold;
  }
}

</style>
