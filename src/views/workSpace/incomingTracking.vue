<template>
  <div class="incomingTracking">
    <div class="line">
      <div class="workTopTitle">
        <div class="fl">
          <div class="title">收入预估</div>
        </div>
        <div class="fr">
          <span style="margin-right:10px;">时间：{{acctMonth}}</span>
          <span>单位：万元</span>
        </div>
      </div>
      <div class="chartsArea">
        <div class="lineContainer">
          <line-component :lineObj="lineData" :xAxis="tableTitleList"></line-component>
        </div>
        <div class="tableArea">
          <div class="tableBox tableBox1">
            <el-table
              v-loading="tableLoading"
              :data="tableData"
              style="width:100%"
              class="tableTh28"
              stripe
              :span-method="arraySpanMethod"
            >
              <el-table-column label="本地网" prop="productName" width="65" class-name="first-title"  show-overflow-tooltip></el-table-column>
              <el-table-column label="本地网" prop="codeName" width="65" class-name="second-title"  show-overflow-tooltip></el-table-column>
              <el-table-column
                v-for="(item,index) in tableTitleList"
                :key="index"
                :label="item"
                :prop = "'valuePercent'+index"
                min-width="60"
                show-overflow-tooltip
              >
<!--                <template slot-scope="scope">{{scope.row.dataValue[index]}}</template>-->
              </el-table-column>
            </el-table>
          </div>
        </div>

      </div>
    </div>
<!--    <div class="table">-->
<!--      <div class="workTopTitle">-->
<!--        <div class="fl">-->
<!--          <div class="title">分产品</div>-->
<!--        </div>-->
<!--      </div>-->
<!--      <div class="tableContainer">-->
<!--        <div class="pieContainer">-->
<!--          <pie-split :pieData="pieData"></pie-split>-->
<!--        </div>-->
<!--        <div class="tableArea">-->
<!--          <div class="tableBox">-->
<!--            <el-table-->
<!--              v-loading="tableLoading"-->
<!--              :data="tableData2"-->
<!--              style="width:100%"-->
<!--              class="tableTh28"-->
<!--              stripe-->
<!--            >-->
<!--              <el-table-column label="分产品" prop="loc"  min-width="100" show-overflow-tooltip></el-table-column>-->
<!--              <el-table-column label="基本面">-->
<!--                <el-table-column label="移动" prop="1"  min-width="100" show-overflow-tooltip></el-table-column>-->
<!--                <el-table-column label="宽带" prop="2"  min-width="100" show-overflow-tooltip></el-table-column>-->
<!--                <el-table-column label="ITV" prop="3"  min-width="100" show-overflow-tooltip></el-table-column>-->
<!--                <el-table-column label="固话" prop="4"  min-width="100" show-overflow-tooltip></el-table-column>-->
<!--                <el-table-column label="其他" prop="5"  min-width="100" show-overflow-tooltip></el-table-column>-->
<!--                <el-table-column label="大单"  min-width="100" show-overflow-tooltip>-->
<!--                  <template slot-scope="scope">-->
<!--                      {{scope.row["5.1"]}}-->
<!--                  </template>-->
<!--                </el-table-column>-->
<!--              </el-table-column>-->
<!--              <el-table-column label="项目型" >-->
<!--                <el-table-column label="ICT" prop="6"  min-width="100" show-overflow-tooltip></el-table-column>-->
<!--                <el-table-column label="IDC" prop="7" min-width="100" show-overflow-tooltip></el-table-column>-->
<!--              </el-table-column>-->
<!--              <el-table-column label="合计" prop="0"  min-width="100" show-overflow-tooltip></el-table-column>-->
<!--            </el-table>-->
<!--          </div>-->
<!--        </div>-->
<!--      </div>-->
<!--    </div>-->
  </div>
</template>

<script>
import lineComponent from "./echarts/lineYg";
import pieSplit from "./echarts/pieSplit";
import { $budgetAPI } from "@/api";
import { mergeTableRow, mergeSpan } from "@/utils/mixin";
export default {
  name: "incomingTracking",
  components: {
    lineComponent,
    pieSplit
  },
  data() {
    return {
      spanArr: [],
      acctMonth:'',
      tableLoading: false,
      pieData:{},
      lineData:[],
      tableData: [],
      tableData2: [],
      tableTitleList: [],
      chartsState: 1,
      locSortTitle: [
        {
          name: "本地网",
          prop: "val0"
        },
        {
          name: "整体得分",
          prop: "val1"
        },
        {
          name: "收入完成",
          prop: "val2"
        },
        {
          name: "用户发展",
          prop: "val3"
        },
        {
          name: "发展方式",
          prop: "val4"
        },
        {
          name: "客户经营",
          prop: "val5"
        },
        {
          name: "用户质态",
          prop: "val6"
        }
      ]
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    //分产品数据
    getEstimateProductData() {
      $budgetAPI.getEstimateProductData(
        {},
        res => {
          if (res.code == 0) {
            let obj = {
              loc:"本月",
            }
            res.content.currentList.map((item,index)=>{
              obj[item.productId] = item.aftAmt
            })
            let obj1 = {
              loc:"环比"
            }
            res.content.rateList.map((item,index)=>{
              obj1[item.productId] = item.incrementRate
            })
            this.tableData2.push(obj);
            this.tableData2.push(obj1);
            this.pieData = obj;
          } else {
            this.alertError(res);
          }
        },
        err => {}
      );
    },
    //分产品表头
    getIncomeEstimateTitles() {
      $budgetAPI.getIncomeEstimateTitles(
        {},
        res => {
          if (res.code == 0) {
          } else {
            this.alertError(res);
          }
        },
        err => {}
      );
    },
    //区域累计数据
    getEstimateTotalData() {
      $budgetAPI.getIncomeEstimateData(
        {},
        res => {
          if (res.code == 0) {
            let aftAmt = [];
            let rateList = [];
            let rateListPercent = [];
            this.tableTitleList = res.content.areaNames.slice(1,res.content.areaNames.length);
            this.data= res.content.data;
            this.currentMouth = res.content.data[0].dataList;
            this.acctMonth = res.content.data[0].acctMonth;
            this.rate = res.content.data[1].dataList;
            this.ratePercent = res.content.data[1].dataList;
            this.spanArr = mergeSpan(res.content.data, [
                "productName",
                  "codeName",
              ]);
             this.tableData = res.content.data;
             this.data.forEach((item,index) => {
                  item.dataList.forEach((ele,ind) => {
                      item['valuePercent'+ind] = ele.valuePercent
                  })
              });
             this.currentMouth.map((item, index) => {
              aftAmt.push(item.value);
            });
              this.rate.map((item, index) => {
              rateList.push(item.value);
            });
              this.ratePercent.map((item, index) => {
                  rateListPercent.push(item.valuePercent);
              });
            // let obj = {
            //     // codeName: "本月预估数(万元)",
            //   dataValue: aftAmt
            // };
            // let obj1 = {
            //     // codeName: "环比",
            //   dataValue: rateListPercent
            // };
            // this.lineData = aftAmt;
            this.lineData.push(aftAmt);
            this.lineData.push(rateList);
            // this.lineData.push(obj1);

            // this.tableData.push(obj);
            // this.tableData.push(obj1);
          } else {
            this.alertError(res);
          }
        },
        err => {}
      );
    },
    //初始化
    init() {
      this.getEstimateTotalData();
      this.getEstimateProductData();
      // this.getIncomeEstimateTitles();

    },
    //table合并行
    arraySpanMethod({ row, column, rowIndex, columnIndex }) {
        if (columnIndex == 0 || columnIndex == 1 ) {
            return this.spanArr[rowIndex][columnIndex];
        }
    },
  }
};
</script>

<style lang="scss" scoped>
.incomingTracking {
  margin-top: 20px;
  margin-bottom: 20px;
  width: 99%;
  height: 805px;
  border-radius: 5px;
  background-color: #ffffff;
  border: 1px solid #dee5f3;
  display: flex;
  .line {
    width: 100%;
    height: 100%;
    border-right: 1px solid #dee5f3;

    .chartsArea {
      padding: 5px 0;
      height: 420px;
      .lineContainer {
        width: 100%;
        height: 370px;
        /*border-bottom: 1px solid #dee5f3;*/
      }
      .tableArea {
        width: 100%;
        height: 119px;
        padding: 5px;
        /deep/ .el-table td, .el-table th{
          padding: 5px 0;
          font-size: 12px;
        }
      }
    }

  }
  /*.table {*/
  /*  width: 40%;*/
  /*  height: 100%;*/
  /*  .tableContainer {*/
  /*    width: 100%;*/
  /*    padding: 5px 0;*/
  /*    height: 420px;*/
  /*    .pieContainer {*/
  /*      width: 100%;*/
  /*      height: 270px;*/
  /*      border-bottom: 1px solid #dee5f3;*/
  /*    }*/
  /*    .tableArea {*/
  /*      padding:5px;*/
  /*      width: 100%;*/
  /*      height: 119px;*/
  /*    }*/
  /*  }*/
  /*}*/
}
</style>
<style lang="scss" >
  .incomingTracking {
    .tableBox1 .tableTh28 th {
        font-size: 12px;
        color: #666666;
        font-weight: 700;
    }
    .tableBox1 .tableTh th {
        font-size: 12px;
        color: #666666;
        font-weight: 500;
        padding: 5px 0;
    }
    .first-title.is-leaf {
      position: relative;
      border-right: 1px solid #d7e5fb !important;
      .cell {
        color: #d7e5fb;
      }
    }
    .second-title.is-leaf {
      white-space: nowrap;
      overflow: visible;
      .cell {
        width: 150px;
        transform: translateX(-50%);
      }
    }
  }
</style>
