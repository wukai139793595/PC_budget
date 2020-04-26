<template>
  <div class="income-forecast">
    <div class="contentTopTitle">
      <div class="fl">
        <div class="title">收入预估</div>
      </div>
    </div>
    <div class="operation">
      <el-form :inline="true" label-width="80px" class="formList">
        <el-form-item label="选择区域">
          <dx-cascader :area_id.sync="form.areaId" />
        </el-form-item>
        <el-form-item label="账期" style="width:34%" label-width="80px">
          <div style="display:flex">
            <el-date-picker v-model="form.accMonth" type="month" placeholder="选择月"
              value-format="yyyyMM"
              style="margin-right:15px"
            ></el-date-picker>

            <el-select v-model="form.fcDate">
              <el-option
                v-for="item in forecastOption"
                :label="item.fcDateName"
                :value="item.fcDate"
                :key="item.fcDate"
              />
            </el-select>
          </div>
        </el-form-item>
        <el-form-item style="width:4%" label-width="0">
          <el-button size="small" type="primary" @click="submitHandle()">查询</el-button>
        </el-form-item>
        <el-form-item class="daochu" style="width:34%">
          <el-button
            size="small"
            type="orange"
            @click="exportExcel()"
          >导出</el-button>
        </el-form-item>
      </el-form>
      <div class="tableBox">
        <el-table
          v-loading="tableLoading"
          :data="tableData"
          style="width: 100%"
          class="tableTh28"
          height="73vh"
          border
          stripe
          ref="table"
        >
          <el-table-column  width="150" label="单位（万元）" :show-overflow-tooltip="true" class-name="first-column">
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
  </div>
</template>
<script>
import { $budgetAPI } from "@/api";
import { getSessionStorage } from "@/common/js/storage";
import {getCookie} from "@/common/js/cookie"
import { createSpanTrend } from "@/utils/mixin.js";
import prefixAPI from "@/api/prefixAPI";

let id = 0;
export default {
  data() {
    return {
      form: {
        accMonth: "",
        areaId: "",
        fcDate: ""
      },
      isLoading: false,
      showRight: false,
      areaList: [],
      forecastOption: [],
      tableData: [],
      currentMonth: [],
      lastMonth: [],
      tableLoading: false,
    };
  },
  created() {
    this.form.accMonth = this.moment().format('YYYYMM');
    this.accountInfo = JSON.parse(getSessionStorage('accountInfo'));
    this.form.areaId = this.accountInfo.areaId;
    this.getFcDate();
  },
  methods: {
    ///获取收入列表
    listTrendData(params) {
      //  areaId:'150',
      //  fcDate:'14',
      //  accMonth:'201911'
      this.tableLoading = true;
      $budgetAPI.listTrendData(
        params,
        res => {
          this.tableLoading = false;
          this.alertError(res);
          if (res.code == 0) {
            this.tableData = res.content.data;
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
        err => {
          this.tableLoading = false;
        }
      );
    },
    //获取账期
    getFcDate() {
      $budgetAPI.getFcDate(
        {},
        res => {
          this.alertError(res);
          if (res.code == 0) {
            this.forecastOption = res.content;
            this.form.fcDate = res.content[0].fcDate;
            this.listTrendData(this.form);
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
    classify2(arr, key1, key2) {
      let name = arr[0].class1;
      let obj = {
        current: [],
        previous: []
      };
      let objCurrent = {};
      let objPrevios = {};
      let newArr = [];
      arr.forEach((item, index) => {
        if (item[key1] == name) {
          if (item[key2] === null) {
            obj.current.push([item]);
          } else if (typeof obj[item[key]] == "undefined") {
            objCurrent[item[key]] = 1;
            obj.current.push([item]);
          } else {
            let i = obj.current.length - 1;
            obj.current[i].push(item);
          }
        } else {
          if (item[key2] === null) {
            obj.previous.push([item]);
          } else if (typeof obj[item[key]] == "undefined") {
            objPrevios[item[key]] = 1;
            obj.previous.push([item]);
          } else {
            let i = obj.previous.length - 1;
            obj.previous[i].push(item);
          }
        }
      });
      console.log(obj)
      return obj;
    },
    submitHandle() {
      let params = {
        areaId: this.form.areaId,
        fcDate: this.form.fcDate,
        accMonth: this.form.accMonth
      };
      this.listTrendData(params);
    },

    exportExcel() {
      let token = getCookie('token')
      // 根据不同模式切换不同的路径
      if (process.env.NODE_ENV == "development") {
        window.location.href =
          prefixAPI.loc +
          "/api/incomeForecast/exportData?areaId=" +
          this.form.areaId +
          "&fcDate=" +
          this.form.fcDate +
          "&accMonth=" +
          this.form.accMonth + "&token=" +token;
      } else if (process.env.NODE_ENV == "production") {
        window.location.href =
          prefixAPI.hp +
          "/api/incomeForecast/exportData?areaId=" +
          this.form.areaId +
          "&fcDate=" +
          this.form.fcDate +
          "&accMonth=" +
          this.form.accMonth+ "&token=" +token;
      }
    }
  }
};
</script>
<style lang="scss">
.income-forecast {
  th.first-column{
    text-align: center !important;
  }
  .first-column{
    text-align: left;
    span{
      padding-left:16px;
    }
  }
  span.boldFont{
    padding: 0;
    font-weight: bold;
  }
  .daochu {
    float: right;
    .el-form-item__content {
      float: right;
      .el-button {
        float: right;
      }
    }
  }
  .forecast-content {
    // border: 1px solid #bbb;
    height: 67vh;
    overflow: scroll;
    .left-wrap {
      float: left;
      width: 200px;
      height: 600px;
      // background-image: url("~@/assets/images/yugu.jpg");
    }
    .right-wrap {
      margin-left: 200px;
      height: 600px;
      // background-image: url("~@/assets/images/yugu1.jpg");
    }
  }
}
</style>
