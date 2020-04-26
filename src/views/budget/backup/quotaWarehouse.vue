<template>
  <div>
    <div class="contentTopTitle">
      <div class="fl">
        <div class="title">指标库</div>
      </div>
    </div>

    <div>
      <el-form :inline="true" :model="form" label-width="60px" class="formList">
        <el-form-item label="指标大类">
          <el-select v-model="form.indexType" placeholder="指标大类" @change="getIndexBroadClass">
            <el-option
              v-for="(item,index) in indexTypeList"
              :key="index"
              :label="item"
              :value="item"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="指标小类">
          <el-select v-model="form.broadClass" placeholder="指标小类">
            <el-option
              v-for="(item,index) in broadClassList"
              :key="index"
              :label="item"
              :value="item"
            ></el-option>
          </el-select>
        </el-form-item>
        <!-- <el-form-item label="指标小类">
          <el-select v-model="form.subClass" placeholder="指标小类">
            <el-option
              v-for="(item,index) in subClassList"
              :key="index"
              :label="item"
              :value="item">
            </el-option>
          </el-select>
        </el-form-item>-->
        <el-form-item label="指标名称">
          <el-autocomplete
            v-model="form.indexName"
            :fetch-suggestions="searchIndexName"
            placeholder="请输入"
            @select="handleSelect"
          ></el-autocomplete>
        </el-form-item>
        <el-form-item></el-form-item>
        <el-form-item label="选择区域">
          <!-- <el-select v-model="form.areaId" multiple collapse-tags placeholder="选择区域" @change="areaChange">
            <el-option
              v-for="item in areaList"
              :key="item.areaId"
              :label="item.areaName"
              :value="item.areaId">
            </el-option>
          </el-select>-->
          <dx-cascader :area_id.sync="form.areaId" :area_name.sync="form.areaName" />
        </el-form-item>
        <el-form-item label="开始账期">
          <el-date-picker
            v-model="form.startTime"
            value-format="yyyyMM"
            type="month"
            placeholder="选择月"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="结束账期">
          <el-date-picker
            v-model="form.endTime"
            value-format="yyyyMM"
            type="month"
            placeholder="选择月"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button size="small" type="primary" @click="handleSearchBegin">查询</el-button>
          <el-button size="small" type="orange" @click="exportExcel">导出</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="breadcrumb clearfix">
      {{accountInfo.parentName}} > {{accountInfo.areaName}}
      <span
        v-if="currentForm.areaName"
      >> {{currentForm.areaName}}</span>
    </div>

    <div class="tableBox">
      <el-table
        v-loading="tableLoading"
        :data="tableData"
        style="width: 100%"
        ref="table"
        class="tableTh28"
        height="72vh"
        border
        @row-click="indexDataTrend"
        stripe
      >
        <el-table-column
          fixed
          prop="indexType"
          label="指标大类"
          min-width="120"
          :show-overflow-tooltip="true"
          class-name="fixedColumn"
        ></el-table-column>
        <el-table-column
          fixed
          prop="broadClass"
          label="指标小类"
          min-width="120"
          :show-overflow-tooltip="true"
          class-name="fixedColumn"
        ></el-table-column>
        <!-- <el-table-column fixed prop="subClass" label="指标小类" min-width="150" :show-overflow-tooltip="true" class-name="fixedColumn"></el-table-column> -->
        <el-table-column
          fixed
          prop="indexName"
          label="指标名称"
          min-width="200"
          :show-overflow-tooltip="true"
          class-name="fixedColumn"
        ></el-table-column>
        <!-- <el-table-column fixed prop="keyType" label="图例类别" class-name="fixedColumn" width="80"></el-table-column> -->
        <el-table-column fixed prop="unit" label="单位" class-name="fixedColumn" width="50"></el-table-column>
        <el-table-column label="账期">
          <el-table-column
            v-for="(item,index) in tableColumn"
            :key="index"
            :label="item"
            prop
            class-name="right-money"
            min-width="110"
          >
            <template slot-scope="scope">{{scope.row.dataValue[index]}}</template>
          </el-table-column>
        </el-table-column>
      </el-table>
    </div>

    <!-- 翻页 -->
    <div class="page">
      <el-pagination
        layout="total,sizes, prev, pager, next, jumper"
        :page-sizes="[20,50, 100]"
        @size-change="sizeChange"
        :page-size="pageSize"
        :total="dataTotal"
        :current-page.sync="currentPage"
        @current-change="handleCurrentChange"
      ></el-pagination>
    </div>

    <el-dialog
      :visible.sync="showEcharts"
      :title="dialogTitle"
      width="900px"
      class="quotaWareHouseDialog"
    >
      <div class="tableBox">
        <el-table
          :data="dialogData"
          style="width: 100%"
          class="tableTh28"
          border
          :row-class-name="tableRowClassName"
          :show-overflow-tooltip="true"
        >
          <el-table-column
            width="100"
            label="月份"
            prop="month"
            fixed
            class-name="first-column fixedColumn"
          ></el-table-column>
          <el-table-column
            min-width="100"
            v-for="(item,index) in monthList"
            :label="item"
            :key="index"
          >
            <template slot-scope="scope">
              <span v-if="scope.row.unit == '%' ">
                {{scope.row.dataValue[index]}}
                <span v-if="scope.row.dataValue[index]">%</span>
              </span>
              <span v-else>{{scope.row.dataValue[index]}}</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div id="myChart" style="width: 870px;height: 400px;margin-top: 20px" ref="myChart"></div>
    </el-dialog>
  </div>
</template>

<script>
import { $budgetAPI } from "@/api/";
import { getSessionStorage } from "@/common/js/storage";
import echarts from "echarts";
import prefixAPI from "@/api/prefixAPI";
export default {
  data: function() {
    return {
      form: {
        indexType: "",
        indexName: "",
        indexCode: "",
        broadClass: "",
        subClass: "",
        areaId: "",
        areaName: "",
        startTime: "",
        endTime: ""
      },
      indexTypeList: [],
      showEcharts: false,
      areaList: [],
      pageSize: 20,
      currentPage: 1,
      dataTotal: null,
      tableData: [],
      tableLoading: false,
      tableColumn: [],
      areaNameList: "",
      areaIdList: "",
      broadClassList: [],
      subClassList: [],
      accountInfo: "",
      currentForm: {},
      indexNameList: [],
      dialogTitle: "",
      chartsData: [],
      assistValue: {},
      monthList: [],
      rateList: [],
      indexValueList: [],
      dialogData: [],
      increDataList: [],
      areaId: "",
    };

  },
  watch: {
    // form:{
    //   handler(val){
    //     console.log(val)
    //   },
    //   deep:true,
    // }
  },
  created() {
    this.accountInfo = JSON.parse(getSessionStorage("accountInfo"));
    this.form.areaId = this.accountInfo.areaId;
    this.form.areaName = this.accountInfo.areaName;
  },
  mounted() {
    this.init();
  },
  methods: {
    //页码改变
    sizeChange(val) {
      this.pageSize = val;
      this.handleSearchBegin();
    },
    exportExcel() {
      let areaId = this.form.areaId,
        areaName = this.form.areaName,
        broadClass = this.form.broadClass,
        subClass = this.form.subClass,
        startTime = this.form.startTime,
        endTime = this.form.endTime,
        indexCode = this.form.indexCode,
        indexType = this.form.indexCode;
      if (process.env.NODE_ENV == "development") {
        window.location.href =
          prefixAPI.loc +
          "/api/indexController/exportIndexData?areaId=" +
          areaId +
          "&areaName=" +
          areaName +
          "&broadClass=" +
          broadClass +
          "&startTime=" +
          startTime +
          "&endTime=" +
          endTime +
          "&indexCode=" +
          indexCode +
          "&indexType=" +
          indexType;
      } else if (process.env.NODE_ENV == "production") {
        window.location.href =
          prefixAPI.hp +
          "/api/indexController/exportIndexData?areaId=" +
          areaId +
          "&areaName=" +
          areaName +
          "&broadClass=" +
          broadClass +
          "&startTime=" +
          startTime +
          "&endTime=" +
          endTime +
          "&indexCode=" +
          indexCode +
          "&indexType=" +
          indexType;
      }
    },
    hebing({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 2) {
        if (columnIndex === 1) {
          return {
            colspan: this.rateList.length + 1,
            rowspan: 1
          };
        }
      }
    },
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex === 2) {
        return "success-row";
      }
    },
    //画折线图
    drawLine(val) {
      let title = this.dialogTitle;
      function qz(val) {

        var value = val.toFixed(0);
        var len = value.length;
        let head = (Number(value) / Math.pow(10, len - 1)).toFixed(0);
        if (head == 9) {
          head = 10;
        }
        var a =
          head *
          Math.pow(10, len - 1);
        return a;
      }
      //1的时候为业绩数据，环比增长量，环比增长率
      //2的时候为业绩数据，环比变化
      if (val == 1) {
        let rateList = []; //环比增长
        let indexValueList = []; //业绩数据
        let monthList = []; //月份
        this.rateList.map((item, index) => {
          let num = 0;
          if (item) {
            num = item.split("%")[0];
          }
          rateList.push(Number(num));
        });
        this.indexValueList.map((item, index) => {
          indexValueList.push(Number(item));
        });
        this.monthList.map((item, index) => {
          monthList.push(item);
        });

        setTimeout(() => {
          // 基于准备好的dom，初始化echarts实例
          let myChart = this.$echarts.init(document.getElementById("myChart"));
          // 绘制图表
          myChart.setOption({
            title: {
              text: title
            },
            tooltip: {
              trigger: "axis",
              axisPointer: {
                type: "cross",
                crossStyle: {
                  color: "#999"
                }
              },
              formatter: params => {
                return (
                  params[0].axisValue +
                  "<br/>" +
                  params[0].marker +
                  params[0].seriesName +
                  "：" +
                  params[0].value +
                  "<br/>" +
                  params[1].marker +
                  params[1].seriesName +
                  "：" +
                  params[1].value +
                  "%"
                );
              }
            },
            grid: {
              show: false
            },
            legend: {
              x: "right",
              y: "top",
              itemGap: 10,
              data: ["业绩数据", "环比增长率"]
            },
            xAxis: [
              {
                type: "category",
                // axisLine: {
                //   onZero: true,
                //   onZeroAxisIndex :0,
                // },
                // data: ['201905','201906','201907','201908','201909','201910'],
                data: monthList,
                axisPointer: {
                  type: "shadow"
                }
              }
            ],
            yAxis: [
              {
                splitLine: { show: false },
                splitNumber: 10,
                // interval: 1,
                type: "value",
                name: "业绩数据",
                // max: 500000,
                // interval: 50,
                axisLabel: {
                  formatter: "{value}"
                },
                min: function(value) {
                  if (Math.abs(value.max) > Math.abs(value.min)) {
                    return -qz(Math.abs(value.max)*1.5);
                  } else {
                    return -qz(Math.abs(value.min)*1.5);
                  }
                },

                max: function(value) {
                  if (Math.abs(value.max) > Math.abs(value.min)) {
                    return qz(Math.abs(value.max)*1.5);
                  } else {
                    return qz(Math.abs(value.min)*1.5);
                  }
                }

                // splitNumber: 10,
                // interval: (Max1 - Min1) / 10
              },
              {
                splitLine: { show: false },
                splitNumber: 10,
                // interval: 1,
                type: "value",
                name: "环比增长率",
                axisLabel: {
                  formatter: "{value} %"
                },
                min: function(value) {
                   if (Math.abs(value.max) > Math.abs(value.min)) {
                    return -qz(Math.abs(value.max)*1.5);
                  } else {
                    return -qz(Math.abs(value.min)*1.5);
                  }
                },

                max: function(value) {
                  if (Math.abs(value.max) > Math.abs(value.min)) {
                    return qz(Math.abs(value.max)*1.5);
                  } else {
                    return qz(Math.abs(value.min)*1.5);
                  }
                }
                // min: Min2,
                // max: Max2,
                // splitNumber: 10,
                // interval: (Max2 - Min2) / 10
              }
            ],
            series: [
              {
                name: "业绩数据",
                type: "bar",
                data: indexValueList,
                yAxisIndex: 0,
                itemStyle: {
                  color: "#C0504D"
                },
                barMaxWidth: 20
              },
              {
                name: "环比增长率",
                type: "line",
                yAxisIndex: 1,
                smooth: true, //是否平滑曲线显示
                itemStyle: {
                  color: "#4A7EBA"
                },
                data: rateList
              }
            ]
          });
        }, 300);
      } else {
        let indexValueList = []; //业绩数据
        let monthList = []; //月份
        let increDataList = [];
        this.indexValueList.map((item, index) => {
          indexValueList.push(Number(item));
        });
        this.increDataList.map((item, index) => {
          increDataList.push(Number(item));
        });
        this.monthList.map((item, index) => {
          monthList.push(item);
        });
        setTimeout(() => {
          // 基于准备好的dom，初始化echarts实例
          let myChart = this.$echarts.init(document.getElementById("myChart"));
          // 绘制图表
          myChart.setOption({
            // title: {
            //   text: title
            // },
            tooltip: {
              trigger: "axis",
              axisPointer: {
                type: "cross",
                crossStyle: {
                  color: "#999"
                }
              },
              formatter: params => {
                return (
                  params[0].axisValue +
                  "<br/>" +
                  params[0].marker +
                  params[0].seriesName +
                  "：" +
                  params[0].value +
                  "%" +
                  "<br/>" +
                  params[1].marker +
                  params[1].seriesName +
                  "：" +
                  params[1].value +
                  "%"
                );
              }
            },
            grid: {
              show: false
            },
            legend: {
              x: "right",
              y: "top",
              itemGap: 10,
              data: ["业绩数据", "环比变化"]
            },
            xAxis: [
              {
                type: "category",
                // axisLine: {
                //   onZero: true,
                //   onZeroAxisIndex: 0
                // },
                // data: ['201905','201906','201907','201908','201909','201910'],
                data: monthList,
                axisPointer: {
                  type: "shadow"
                }
              }
            ],
            yAxis: [
              {
                splitLine: { show: false },
                splitNumber: 10,
                // interval: 1,
                type: "value",
                name: "业绩数据",
                axisLabel: {
                  formatter: "{value}%"
                },
                min: function(value) {
                   if (Math.abs(value.max) > Math.abs(value.min)) {
                    return -qz(Math.abs(value.max)*1.5);
                  } else {
                    return -qz(Math.abs(value.min)*1.5);
                  }
                },

                max: function(value) {
                  if (Math.abs(value.max) > Math.abs(value.min)) {
                    return qz(Math.abs(value.max)*1.5);
                  } else {
                    return qz(Math.abs(value.min)*1.5);
                  }
                }
              },
              {
                splitLine: { show: false },
                splitNumber: 10,
                // interval: 1,
                type: "value",
                name: "环比变化 ",
                axisLabel: {
                  formatter: "{value} %"
                },
               min: function(value) {
                   if (Math.abs(value.max) > Math.abs(value.min)) {
                    return -qz(Math.abs(value.max)*1.5);
                  } else {
                    return -qz(Math.abs(value.min)*1.5);
                  }
                },

                max: function(value) {
                  if (Math.abs(value.max) > Math.abs(value.min)) {
                    return qz(Math.abs(value.max)*1.5);
                  } else {
                    return qz(Math.abs(value.min)*1.5);
                  }
                }
              }
            ],
            series: [
              {
                name: "业绩数据",
                type: "line",
                data: indexValueList,
                yAxisIndex: 0,
                smooth: true, //是否平滑曲线显示
                itemStyle: {
                  color: "#C0504D"
                }
              },
              {
                name: "环比变化",
                type: "bar",
                yAxisIndex: 0,

                itemStyle: {
                  color: "#4A7EBA"
                },
                barMaxWidth: 20,
                data: increDataList
              }
            ]
          });
        }, 300);
      }
    },

    //获取某一行柱状图数据
    indexDataTrend(row, column, event) {
      let timeArea = this.tableColumn;
      this.showEcharts = true;
      let keyType = null;
      if (row.keyType == "绝对值类") {
        keyType = 1;
      } else {
        keyType = 2;
      }
      let params = {
        indexCode: row.indexCode,
        indexName: row.indexName,
        startTime: timeArea[0],
        endTime: timeArea[timeArea.length - 1],
        areaId: row.areaId,
        areaName: row.areaName,
        keyType: keyType
      };
      $budgetAPI.indexDataTrend(
        params,
        res => {
          this.dialogTitle = res.content.title;
          let chartsData = res.content.data;
          //获取返回JSON数据的第一个值，为总计和辅助数据
          this.assistValue = chartsData.shift();
          let indexValue = this.assistValue.indexValue
            ? this.assistValue.indexValue
            : "";
          let str = this.assistValue.accMonth + "业绩数据" + indexValue;
          //返回数据的后面数据为表格数据
          this.chartsData = chartsData;

          //将返回的数据重组为table表格所需的数据
          this.monthList = [];
          this.rateList = [];
          this.indexValueList = [];
          this.increDataList = [];
          this.chartsData.map((item, index) => {
            this.monthList.push(item.accMonth);
            this.rateList.push(item.rate);
            this.increDataList.push(item.increData);
            this.indexValueList.push(item.indexValue);
          });
          this.dialogData = [];
          if (params.keyType == 1) {
            let obj1 = {
              month: "业绩数据",
              dataValue: this.indexValueList
            };
            let obj2 = {
              month: "环比增长量",
              dataValue: this.increDataList
            };
            let obj3 = {
              month: "环比增长率",
              dataValue: this.rateList
            };

            this.dialogData.push(obj1);
            this.dialogData.push(obj2);
            this.dialogData.push(obj3);
          } else {
            let obj1 = {
              month: "业绩数据",
              dataValue: this.indexValueList,
              unit: "%"
            };
            let obj2 = {
              month: "环比变化",
              dataValue: this.increDataList,
              unit: "%"
            };
            this.dialogData.push(obj1);
            this.dialogData.push(obj2);
          }

          //重组结束
          this.drawLine(params.keyType);
        },
        err => {}
      );
    },
    handleSearchBegin() {
      this.currentPage = 1;
      //查询时将所选择的选择项复制一份，防止点击分页时，用户操作form表单
      this.currentForm = {
        indexType: this.form.indexType,
        indexCode: this.form.indexCode,
        broadClass: this.form.broadClass,
        subClass: this.form.subClass,
        // areaId: this.areaIdList ? this.areaIdList : this.accountInfo.areaId,
        // areaName: this.areaNameList ? this.areaNameList : this.accountInfo.areaName,
        areaId: this.form.areaId ? this.form.areaId : this.accountInfo.areaId,
        areaName: this.form.areaName
          ? this.form.areaName
          : this.accountInfo.areaName,
        startTime: this.form.startTime,
        endTime: this.form.endTime,
        length: this.pageSize,
        begin: this.currentPage
      };
      this.listIndexData(this.currentForm);
    },
    //翻页操作
    handleCurrentChange(page) {
      this.currentPage = page;
      //将当前页传到保存的form表单
      this.currentForm.begin = page;
      this.listIndexData(this.currentForm);
    },
    //区域选择 返回ID和name
    areaChange(vId) {
      // vID 是一个数组，循环获取name,根据id
      if (!vId && vId.length === 0) {
        return;
      } //这里多选的时候获取name和单选不一样 单选是对象 多选是数组所以...
      let nameArr = [];
      let codeArr = [];
      let that = this;
      vId.forEach(element => {
        let obj = that.areaList.find(item => {
          return item.areaId === element;
        });
        if (obj) {
          nameArr.push(obj.areaName);
          codeArr.push(obj.areaId);
        }
      });
      this.areaNameList = nameArr.join(",");
      this.areaIdList = codeArr.join(",");
    },
    //指标名称模糊搜索    async异步  await同步
    async searchIndexName(queryString, cb) {
      //这里是从后台获取数据
      await $budgetAPI.searchIndexName(
        {
          indexName: queryString
        },
        res => {
          let results = res.content;
          results.map((item, index) => {
            this.$set(item, "value", item.indexName);
          });
          cb(results);
        },
        err => {}
      );
    },
    handleSelect(item) {
      this.form.indexCode = item.indexCode;
    },
    //获取指标列表
    listIndexData(params) {
      this.tableLoading = true;
      $budgetAPI.listIndexData(
        params,
        res => {
          this.tableLoading = false;
          this.alertError(res);
          this.form.startTime = res.content.timeArea[0];
          this.form.endTime =
            res.content.timeArea[res.content.timeArea.length - 1];
          this.tableColumn = res.content.timeArea;
          this.tableData = res.content.data;
          setTimeout(() => {
            this.$refs.table.doLayout();
          }, 1000);
          this.dataTotal = res.content.total;
        },
        err => {}
      );
    },
    //根据层级获取区域树
    getCompanyByLvl() {
      $budgetAPI.getCompanyByLvl(
        {
          lvl: this.accountInfo.areaLvl,
          areaId: this.accountInfo.areaId
        },
        res => {
          this.alertError(res);
          this.areaList = res.content;
        },
        err => {}
      );
    },
    //获取指标大类（更名为指标小类）
    getIndexBroadClass(val) {
      this.form.broadClass = "";
      $budgetAPI.getIndexBroadClass(
        {
          indexType: val
        },
        res => {
          this.alertError(res);
          this.broadClassList = res.content;
        },
        err => {}
      );
    },
    //获取指标类型（更名为指标大类）
    getIndexType() {
      $budgetAPI.getIndexType(
        {},
        res => {
          this.alertError(res);
          this.indexTypeList = res.content;
        },
        err => {}
      );
    },
    //获取指标小类(废弃)
    getIndexSubClass(broadClass) {
      this.subClassList = [];
      this.form.subClass = "";
      $budgetAPI.getIndexSubClass(
        {
          broadClass: broadClass
        },
        res => {
          this.alertError(res);
          this.subClassList = res.content;
        },
        err => {}
      );
    },
    async init() {
      let params = {
        indexType: "",
        broadClass: "",
        subClass: "",
        areaId: this.accountInfo.areaId,
        areaName: this.accountInfo.areaName,
        startTime: "",
        endTime: "",
        length: this.pageSize,
        begin: this.currentPage
      };
      //初始化的form表单存储
      this.currentForm = params;
      this.listIndexData(params);
      // this.getIndexBroadClass();
      this.getIndexType();
      this.getCompanyByLvl();
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
<style lang="scss">
.red {
  color: red;
}

.first-column {
  font-weight: bold;
}
.el-select-dropdown__item {
  width: 187px;
}
.quotaWareHouseDialog {
  .el-dialog {
    margin-top: 15px !important;
  }
  .el-dialog__body {
    padding-top: 0;
  }
}
</style>
