<template>
  <div class="liangsqs2">
    <div class="workTopTitle">
      <div class="fl">
        <div class="title">量收趋势</div>
      </div>
      <div class="chartsSwitch">
        <span :class="{'active':chartsState == 1}" @click="chartsStateChange(1)">收入构成</span>
        <span :class="{'active':chartsState == 2}" @click="chartsStateChange(2)">业务量构成</span>
      </div>
    </div>
    <div class="contentContainer" v-if="chartsState == 1">
      <div class="charts_item">
        <div class="charts_title">
          <p>分产品构成</p>
        </div>
        <div class="charts_pie">
          <pie :pieData="pieData"></pie>
        </div>
      </div>

      <div class="charts_item">
        <div class="charts_title">
          <p>分存增量构成</p>
        </div>
        <div class="charts_pie">
          <pie6 :pieData="pieData6"></pie6>
        </div>
      </div>
      <div class="charts_item">
        <div class="charts_title">
          <p>四大主量分套餐构成</p>
        </div>
        <div class="charts_pie">
          <pie5 :pieData="pieData5"></pie5>
        </div>
      </div>
    </div>
    <div class="contentContainer" v-if="chartsState == 2">
      <div class="charts_item">
        <div class="charts_title">
          <p>移动</p>
        </div>
        <div class="charts_pie">
          <pie2 :pieData="pieData2"></pie2>
        </div>
      </div>
      <div class="charts_item">
        <div class="charts_title">
          <p>宽带</p>
        </div>
        <div class="charts_pie">
          <pie3 :pieData="pieData3"></pie3>
        </div>
      </div>
      <div class="charts_item">
        <div class="charts_title">
          <p>天翼高清</p>
        </div>
        <div class="charts_pie">
          <pie4 :pieData="pieData4"></pie4>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import pie from "./echarts/pie";
import pie2 from "./echarts/pie2";
import pie3 from "./echarts/pie3";
import pie4 from "./echarts/pie4";
import pie5 from "./echarts/pie5";
import pie6 from "./echarts/pie6";
import { $budgetAPI } from "@/api";
export default {
  name: "liangsqs2",
  components: {
    pie,
    pie2,
    pie3,
    pie4,
    pie5,
    pie6
  },
  data() {
    return {
      chartsState: 1,
      pieData: {},
      pieData2: {},
      pieData4: {},
      pieData3: {},
      pieData5: {},
      pieData6: {}
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    chartsStateChange(val) {
      this.chartsState = val;
      if (val == 1) {
        this.getIncomeProductStructData();
        this.getSetMealData();
        this.getCustTypeNewData();
      }
      if (val == 2) {
        this.getMobileBusinessStructData();
        this.getBroadHandBusinessStructData();
        this.getITVBusinessStructData();
      }
    },
    init() {
      this.getIncomeProductStructData();
      this.getSetMealData();
      this.getCustTypeNewData();
    },
    //分产品
    getIncomeProductStructData() {
      $budgetAPI.getIncomeProductStructData(
        {},
        res => {
          if (res.code == 0) {
            this.pieData = res.content;
          } else {
            this.alertError(res);
          }
        },
        err => {}
      );
    },
    //获取收入构成-分套餐数据
    getSetMealData() {
      $budgetAPI.getSetMealData(
        {},
        res => {
          if (res.code == 0) {
            this.pieData5 = res.content;
          } else {
            this.alertError(res);
          }
        },
        err => {}
      );
    },
    //获取收入构成-分存增量数据
    getCustTypeNewData() {
      $budgetAPI.getCustTypeNewData(
        {},
        res => {
          if (res.code == 0) {
            let obj = {
              className: "pieData2",
              data: []
            };
            obj.data = res.content;
            this.pieData6 = obj;
          } else {
            this.alertError(res);
          }
        },
        err => {}
      );
    },
    //移动
    getMobileBusinessStructData() {
      $budgetAPI.getMobileBusinessStructData(
        {},
        res => {
          if (res.code == 0) {
            let obj = {
              className: "pieData2",
              data: []
            };
            obj.data = res.content;
            this.pieData2 = obj;
          } else {
            this.alertError(res);
          }
        },
        err => {}
      );
    },
    //获取业务量-宽带数据
    getBroadHandBusinessStructData() {
      $budgetAPI.getBroadHandBusinessStructData(
        {},
        res => {
          if (res.code == 0) {
            let obj = {
              className: "pieData2",
              data: []
            };
            obj.data = res.content;
            this.pieData3 = obj;
          } else {
            this.alertError(res);
          }
        },
        err => {}
      );
    },
    //获取业务量-天翼高清数据
    getITVBusinessStructData() {
      $budgetAPI.getITVBusinessStructData(
        {},
        res => {
          if (res.code == 0) {
            let obj = {
              className: "pieData2",
              data: []
            };
            obj.data = res.content;
            this.pieData4 = obj;
          } else {
            this.alertError(res);
          }
        },
        err => {}
      );
    }
  }
};
</script>

<style lang="scss" scoped>
.liangsqs2 {
  margin-top: 20px;
  width: 99%;
  height: 439px;
  border-radius: 5px;
  background-color: #ffffff;
  border: 1px solid #dee5f3;
  position: relative;
  .chartsSwitch {
    position: absolute;
    width: 300px;
    height: 27px;
    line-height: 25px;
    left: 50%;
    margin-left: -150px;
    top: 8px;
    text-align: center;
    border: 1px solid #dee5f3;
    border-radius: 3px;
    display: flex;
    overflow: hidden;
    span {
      width: 150px;
      height: 100%;
      cursor: pointer;
      display: inline-block;
      &.active {
        background-color: #00b7ee;
        color: #ffffff;
      }
    }
  }
  .contentContainer {
    width: 100%;
    height: 396px;
    display: flex;
    justify-content: space-around;
    padding: 20px 0;
    .charts_item {
      width: 34%;
      height: 356px;
      border-right: 1px solid #e5e5e5;
      &:last-child {
        border-right: 0;
      }
      .charts_title {
        p {
          width: 150px;
          margin: 0 auto;
          background-color: #f2f3f7;
          padding: 1px 15px;
          text-align: center;
          height: 21px;
          line-height: 17px;
          border-radius: 10px;
          border: solid 1px #f3f7ff;
        }
      }
      .charts_pie {
        width: 100%;
        height: 335px;
      }
    }
  }
}
</style>
