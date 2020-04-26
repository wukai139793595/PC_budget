<template>
  <div class="liangsqs">
    <div class="workTopTitle">
      <div class="fl">
        <div class="title">量收趋势</div>
      </div>
      <div class="chartsSwitch">
        <span :class="{'active':chartsState == 1}" @click="changeCharts(1)">收入完成趋势</span>
        <span :class="{'active':chartsState == 2}" @click="changeCharts(2)">业务量发展趋势</span>
      </div>
    </div>
    <div class="content">
      <div class="chartsContainer">
        <div class="sr" v-if="chartsState == 1" >
          <div class="charts_item" v-for="(item,index) in incomeData" :key="index" >
            <p class="charts_title">{{item.name}}</p>
            <p class="charts_num">
              <span class="num">{{item.thisMonthValue}}</span>
              <!-- <span class="dw">%</span> -->
            </p>
            <div class="charts_line" @click="openDetail(item)">
              <line-component :lineObj="item" :months="months"></line-component>
            </div>
          </div>
        </div>
        <div class="sr" v-if="chartsState == 2">
          <div class="charts_item" v-for="(item,index) in businessData" :key="index" >
            <p class="charts_title">{{item.name}}</p>
            <p class="charts_num">
              <span class="num">{{item.thisMonthValue}}</span>
              <!-- <span class="dw">%</span> -->
            </p>
            <div class="charts_line" @click="openDetail(item)">
              <line-component :lineObj="item" :months="months"></line-component>
            </div>
          </div>
        </div>
      </div>
      <p class="tip" v-if="chartsState == 1">注：统计为年累计收入完成</p>
      <p class="tip" v-if="chartsState == 2">注：统计为年累计同比增长率</p>
    </div>
    <el-dialog :visible.sync="dialogVisable" :title="lineData.name" width="80%">
      <div style="width:100%;height:200px">
        <line-component2 :months="months" :lineData="lineData"></line-component2>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import lineComponent from "./echarts/line";
import lineComponent2 from "./echarts/lineTime";
import { $budgetAPI } from "@/api";
import { getSessionStorage } from "@/common/js/storage";
export default {
  name: "liangsqs",
  components: {
    lineComponent,
    lineComponent2,
  },
  data() {
    return {
      dialogVisable: false,
      chartsState: 1,
      incomeData:{},
      businessData:{},
      lineData:{},
      accountInfo:"",
      months:[],
    };
  },
  created() {
    this.accountInfo = JSON.parse(getSessionStorage("accountInfo"));
  },
  mounted() {
    this.init();
  },
  methods: {
    changeCharts(val){
      this.chartsState =val;
      if(val==1){
        this.getIncomeCompleteData();
      }else{
        this.getBusinessDevelopTrendData();
      }
    },
    openDetail(val){
      this.lineData = val,
      this.dialogVisable = true;
    },
    init(){
      this.getIncomeCompleteData();
      // this.getBusinessDevelopTrendData();
    },
    //收入完成趋势数据
    getIncomeCompleteData() {
      $budgetAPI.getIncomeCompleteData(
        {
          areaId:this.accountInfo.areaId,
        },
        res => {
          if (res.code == 0) {
            let incomeData =[];
            let nameList = ["主营业务","基本面","转型业务面"];
            res.content.data.map((item,index)=>{
              this.$set(item,"name",nameList[index]);
              this.$set(item,"className","income" + index);
              incomeData.push(item);
            });
            this.months = res.content.months;
            this.incomeData = incomeData;
          } else {
            this.alertError(res);
          }
        },
        err => {}
      );
    },
    //业务量发展趋势
    getBusinessDevelopTrendData() {
      $budgetAPI.getBusinessDevelopTrendData(
        {
          areaId:this.accountInfo.areaId,
        },
        res => {
          if (res.code == 0) {
            let businessData =[];
            let nameList = ["移动净增","移动新增","宽带净增","宽带新增","天翼高清净增","天翼高清新增"];
            res.content.data.map((item,index)=>{
              this.$set(item,"name",nameList[index]);
              this.$set(item,"className","income" + index);
              businessData.push(item);
            });
            this.months = res.content.months;
            this.businessData = businessData;
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
.liangsqs {
  margin-top: 20px;
  width: 99%;
  height: 268px;
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
  .content {
    padding: 40px 20px 20px 20px;
    width: 100%;
    height: 210px;
    .chartsContainer {
      width: 100%;
      height: 150px;
      .sr {
        width: 100%;
        height: 100%;
        display: flex;
        .charts_item {
          width: 220px;
          .charts_title {
            font-size: 13px;
            height: 18px;
            line-height: 18px;
            margin-bottom: 5px;
          }
          .charts_num {
            color: #4186f3;
            margin-bottom: 5px;
            .num {
              font-size: 16px;
              font-weight: 700;
            }
            .dw {
              font-size: 14px;
            }
          }
          .charts_line {
            width: 100px;
            height: 60px;
          }
        }
      }
    }
    .tip {
      text-align: right;
      font-size: 12px;
      height: 18px;
      line-height: 18px;
    }
  }
}
</style>
