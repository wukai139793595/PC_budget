<template>
  <div class="globalAssessment">
    <div class="radar">
      <div class="workTopTitle">
        <div class="fl">
          <div class="title">{{leftTitle}}</div>
        </div>
        <div class="fr chartsSwitch">
          <span :class="{'active':chartsState == 1}" @click="changeEcharts(1)">
            <i class="iconfont icon-genzong1"></i>
          </span>
          <span :class="{'active':chartsState == 2}" @click="changeEcharts(2)">
            <i class="iconfont icon-zhexiantu"></i>
          </span>
        </div>
      </div>
      <div class="chartsArea">
        <div class="radarContainer" v-if="chartsState == 1">
          <div class="option">
            <div style="width:150px">
              <el-select
                v-model="areaSelect"
                value-key="areaId"
                placeholder="选择区域"
                @change="changeRadar"
              >
                <el-option
                  v-for="item in areaList"
                  :key="item.areaId"
                  :label="item.areaName"
                  :value="item"
                ></el-option>
              </el-select>
            </div>
          </div>
          <radar :radarData="radarData"></radar>
        </div>
        <div class="barContainer" v-if="chartsState == 2">
          <div class="option">
            <p>日期：{{currentTime}}</p>
            <div style="width:150px">
              <el-select v-model="barSelect" value-key="id" placeholder="请选择" @change="changeType">
                <el-option v-for="item in barTable" :key="item.id" :label="item.name" :value="item"></el-option>
              </el-select>
            </div>
            <div style="width:150px">
              <el-select
                v-model="areaSelect2"
                value-key="areaId"
                placeholder="选择区域"
                @change="changeArea"
              >
                <el-option
                  v-for="item in areaList"
                  :key="item.areaId"
                  :label="item.areaName"
                  :value="item"
                ></el-option>
              </el-select>
            </div>
          </div>
          <bar :barData="barData"></bar>
        </div>
      </div>
    </div>
    <div class="table">
      <div class="workTopTitle">
        <div class="fl">
          <div class="title">{{rightTitle}}</div>
        </div>
        <div class="fr" v-if="chartsState == 2">
          <p>单位：万元</p>
        </div>
      </div>
      <div class="tableContainer">
        <el-table
          v-loading="tableLoading"
          :data="tableData"
          style="width: 100%"
          height="450px"
          class="tableTh28"
          ref="table"
        >
          <el-table-column label="整体排名" width="70" align="center">
            <template slot-scope="scope">
              <img src="~@/assets/images/common/sort1.png" alt v-if="scope.$index == 0" />
              <img src="~@/assets/images/common/sort2.png" alt v-else-if="scope.$index == 1" />
              <img src="~@/assets/images/common/sort3.png" alt v-else-if="scope.$index == 2" />
              <span v-else>{{scope.$index + 1}}</span>
            </template>
          </el-table-column>
          <el-table-column
            v-for="(item,index) in titleList"
            :key="index"
            :prop="item.prop"
            :label="item.name"
            :align="item.align"
            :width="item.width"
            show-overflow-tooltip
            min-width="60"
          ></el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
import radar from "./echarts/radar";
import bar from "./echarts/bar";
import { $budgetAPI } from "@/api";
import { getSessionStorage } from "@/common/js/storage";
export default {
  name: "globalAssessment",
  components: {
    radar,
    bar
  },
  data() {
    return {
      tableLoading: false,
      areaSelect: {
        areaId: "",
        areaName: ""
      },
      currentTime: "",
      leftTitle: "整体经营情况画像",
      rightTitle: "区域排名",
      areaSelect2: {
        areaId: "",
        areaName: ""
      },
      barSelect: {
        name: "",
        id: "1"
      },
      areaList: [],
      tableData: [],
      titleList: [],
      chartsState: 1,
      barTable: [
        {
          name: "主营业务",
          id: "1"
        },
        {
          name: "基本面",
          id: "2"
        },
        {
          name: "DICT",
          id: "3"
        },
        {
          name: "移动净增",
          id: "4"
        },
        {
          name: "移动新增",
          id: "5"
        },
        {
          name: "宽带净增",
          id: "6"
        },
        {
          name: "宽带新增",
          id: "7"
        },
        {
          name: "天翼高清净增",
          id: "8"
        },
        {
          name: "天翼高清新增",
          id: "9"
        }
      ],
      locSortTitle: [
        {
          name: "本地网",
          prop: "areaName",
          align:"center",
          // width: 90
        },
        {
          name: "整体得分",
          align:"center",
          prop: "totalScore"
        },
        {
          name: "收入完成",
          align:"center",
          prop: "incomeComplete"
        },
        {
          name: "主量发展",
          align:"center",
          prop: "mainDevelop"
        },
        {
          name: "发展方式",
          align:"center",
          prop: "developWay"
        },
        {
          name: "客户经营",
          align:"center",
          prop: "customerManager"
        },
        {
          name: "用户质态",
          align:"center",
          prop: "userQualityState"
        }
      ],
      barSortTitle: [
        {
          name: "区域",
          prop: "areaName",
          // width: 90,
          align:"center"
        },
        {
          name: "当月",
          prop: "thisMonthValue",
          align:"center",
        },
        {
          name: "环比",
          align:"center",
          prop: "hbAmt"
        },
        {
          name: "年累计",
          align:"center",
          prop: "thisYearLj"
        },
        {
          name: "同比增长率",
          align:"center",
          prop: "tbYearIncreaseRatePercent"
        },
        {
          name: "年累计完成率",
          align:"center",
          prop: "completeLjRatePercent"
        }
      ],
      barData: {},
      radarData: {},
      accountInfo: ""
    };
  },
  created() {
    // this.currentTime = this.moment().format("YYYY年MM月");
  },
  mounted() {
    this.accountInfo = JSON.parse(getSessionStorage("accountInfo"));
    this.areaSelect.areaId = this.accountInfo.areaId;
    this.areaSelect2.areaId = this.accountInfo.areaId;
    this.areaSelect2.areaName = this.accountInfo.areaName;

    this.init();
  },
  methods: {
    changeType(val) {
      switch (Number(val.id)) {
        case 1:
        case 2:
        case 3:
          this.leftTitle = val.name + "收入完成情况";
          this.rightTitle = val.name + "收入完成情况排名";
          break;
        case 4:
        case 5:
        case 6:
        case 7:
        case 8:
        case 9:
          this.leftTitle = val.name + "情况";
          this.rightTitle = val.name + "排名";
          break;
      }
      this.getLineData();
    },
    changeArea(val) {
      this.getLineData();
    },
    //柱状图雷达图切换
    changeEcharts(val) {
      this.chartsState = val;
      if (val == 1) {
        this.leftTitle = "整体经营情况画像";
        this.rightTitle = "区域排名";
        this.titleList = this.locSortTitle;
        this.getRadarData();
      }
      if (val == 2) {
        this.leftTitle = "主营业务收入完成情况";
        this.rightTitle = "主营业务收入完成情况排名";
        this.titleList = this.barSortTitle;
        this.getLineData();
      }
    },
    //获取柱状图数据
    getLineData() {
      this.tableLoading = true;
      $budgetAPI.getLineData(
        {
          tjType: this.barSelect.id,
          areaId: this.areaSelect2.areaId
        },
        res => {
          this.tableLoading = false;
          if (res.code == 0) {
            this.tableData = res.content.data;
            let a = res.content.acctMonth;
            this.currentTime = a.substring(0,4) + "年" + a.substring(4,6) + "月";
            let obj = {
              xAxis: [],
              yAxis: [],
              areaName: this.areaSelect2.areaName
            };
            res.content.data.map((item, index) => {
              obj.xAxis.push(item.areaName);
              obj.yAxis.push(item.completeLjRate);
            });
            this.barData = obj;
          } else {
            this.alertError(res);
          }
        },
        err => {}
      );
    },
    changeRadar(val) {
      this.getRadarData();
    },
    //获取区域排名
    getRadarData() {
      this.tableLoading = true;
      $budgetAPI.getRadarData(
        {
          areaId: this.areaSelect.areaId
        },
        res => {
          this.tableLoading = false;
          this.radarData = {
              currentData: [],
              currentName: "",
              parentData: [],
              parentName: ""
            };
          if (res.code == 0) {
            this.tableData = res.content.dataList;
            let upData = res.content.upData;
            let currentData = res.content.currentData;
            let obj = {
              currentData: [],
              currentName: "",
              parentData: [],
              parentName: ""
            };
            obj.parentName = this.accountInfo.areaName;
            obj.parentData = [
              upData.incomeComplete ? upData.incomeComplete : 0,
              upData.mainDevelop ? upData.mainDevelop : 0,
              upData.developWay ? upData.developWay : 0,
              upData.customerManager ? upData.customerManager : 0,
              upData.userQualityState ? upData.userQualityState : 0
            ];
            if (this.areaSelect.areaId != this.accountInfo.areaId) {
              obj.currentName = this.areaSelect.areaName;
              obj.currentData = [
                currentData.incomeComplete ? currentData.incomeComplete : 0,
                currentData.mainDevelop ? currentData.mainDevelop : 0,
                currentData.developWay ? currentData.developWay : 0,
                currentData.customerManager ? currentData.customerManager : 0,
                currentData.userQualityState ? currentData.userQualityState : 0
              ];
            }
            this.radarData = obj;
          } else {
            this.alertError(res);
          }
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
          res.content.unshift(this.accountInfo);
          this.areaList = res.content;
        },
        err => {}
      );
    },
    init() {
      this.titleList = this.locSortTitle;
      this.getCompanyByLvl();
      this.getRadarData();
    }
  }
};
</script>

<style lang="scss" scoped>
.globalAssessment {
  margin-top: 20px;
  width: 99%;
  height: 495px;
  border-radius: 5px;
  background-color: #ffffff;
  border: 1px solid #dee5f3;
  display: flex;
  .radar {
    width: 50%;
    height: 100%;
    border-right: 1px solid #dee5f3;
    .chartsSwitch {
      width: 72px;
      height: 27px;
      line-height: 25px;
      margin-top: 8px;
      text-align: center;
      border: 1px solid #dee5f3;
      border-radius: 3px;
      display: flex;
      overflow: hidden;
      span {
        width: 35px;
        cursor: pointer;
        display: inline-block;
        &.active {
          background-color: #00b7ee;
          color: #ffffff;
        }
      }
    }
    .chartsArea {
      padding: 10px 20px;
      height: 450px;
      .radarContainer {
        width: 100%;
        height: 100%;
        position: relative;
        .option {
          width: 100%;
          position: absolute;
          top: 0;
          z-index: 88;
          display: flex;
          justify-content: flex-end;
        }
      }
      .barContainer {
        width: 100%;
        height: 100%;
        position: relative;
        .option {
          width: 100%;
          position: absolute;
          top: 0;
          z-index: 88;
          display: flex;
          justify-content: space-between;
          p {
            line-height: 28px;
            margin-right: 20px;
          }
        }
      }
    }
  }
  .table {
    width: 50%;
    height: 100%;
    padding-right: 10px;
    .tableContainer {
      padding: 5px 0 10px 5px;
      height: 450px;
      overflow: hidden;
    }
  }
}
</style>
<style lang="scss">
.globalAssessment {
  .option {
    .el-input__inner {
      padding: 0 14px;
      height: 28px;
      line-height: 28px;
      font-size: 12px;
      vertical-align: middle;
      border-radius: 5px;
    }
    .el-input__icon{
      line-height: 28px;
    }
  }
}
</style>
