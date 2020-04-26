<template>
  <div>
    <div class="contentTopTitle">
      <div class="fl">
        <div class="title">横向预测验证</div>
      </div>
      <div class="fr">
        <el-button size="small" plain @click="$router.go(-1)">返回</el-button>
      </div>
    </div>
    <div>
      <el-form :inline="true" :model="form" class="formList">
        <el-form-item label="选择区域:" label-width="90px">
          <!-- <dx-cascader  :area_id.sync="form.area" /> -->
          <el-select v-model="form.area" placeholder="请选择" disabled>
            <el-option-group v-for="item in areaOptions" :key="item.label" :label="item.label">
              <el-option
                v-for="ele in item.options"
                :key="ele.value"
                :label="ele.label"
                :value="ele.value"
              />
            </el-option-group>
          </el-select>
        </el-form-item>
        <el-form-item label="预算年度:" label-width="90px">
          <el-select v-model="form.testYear" placeholder="请选择" disabled @change="yearChange()">
            <el-option
              v-for="item in yearOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <div class="fr">
          <!-- <el-button @click="budgetSave()" disabled type="primary" size="small">保存</el-button> -->
        </div>
      </el-form>
    </div>
    <div class="tableBox">
      <el-table
        v-loading="tableLoading"
        :data="tableData"
        height="67vh"
        style="width: 100%"
        class="tableTh28"
        border
        stripe
        :span-method="arraySpanMethod"
      >
        <el-table-column prop="title1"></el-table-column>
        <el-table-column prop="title2"></el-table-column>
        <el-table-column label="业务量">
          <el-table-column show-overflow-tooltip label="存量" prop="businessStock"></el-table-column>
          <el-table-column show-overflow-tooltip label="增量" prop="businessIncrement">
          </el-table-column>
        </el-table-column>
        <el-table-column label="ARPU">
          <el-table-column show-overflow-tooltip label="存量" prop="arpuStock"></el-table-column>
          <el-table-column show-overflow-tooltip label="增量" prop="arpuIncrement">
          </el-table-column>
          <!-- <el-table-column label="增量"></el-table-column> -->
        </el-table-column>
        <el-table-column :label="form.testYear+'年收入'">
          <el-table-column show-overflow-tooltip label="存量" prop="nextStock"></el-table-column>
          <el-table-column show-overflow-tooltip label="增量" prop="nextIncrement"></el-table-column>
          <el-table-column show-overflow-tooltip label="合计" prop="nextTotal"></el-table-column>
        </el-table-column>
        <el-table-column show-overflow-tooltip :label="lastYear+'年收入（可比）'" prop="currentValue"></el-table-column>
        <el-table-column show-overflow-tooltip :label="beforeLastYear+'年收入（可比）'" prop="upValue"></el-table-column>
        <el-table-column label="增长率">
          <el-table-column show-overflow-tooltip :label="lastYear+'年'" prop="currentRate"></el-table-column>
          <el-table-column show-overflow-tooltip :label="form.testYear+'年'" prop="nextRate"></el-table-column>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import { $budgetAPI } from "@/api";
export default {
  name: "forecastVerificationUpdate",
  data() {
    return {
      form: {
        area: "",
        areaId: "",
        testYear: ""
      },
      tableData: [],
      tableTemp: [
        {
          title1: "移动",
          title2: "移动",
          type: "mobile",
          ycl: "12"
        },
        {
          title1: "宽带",
          title2: "宽带",
          ycl: "55"
        },
        {
          title1: "宽带",
          title2: "互联网专线",
          ycl: "124"
        },
        {
          title1: "宽带",
          title2: "小计",
          ycl: "55"
        },
        {
          title1: "ITV",
          title2: "ITV",
          ycl: "38"
        },
        {
          title1: "合计",
          title2: "合计",
          ycl: "38"
        }
      ],
      tableLoading: false,
      areaOptions: [
        {
          label: "杭州",
          options: [
            {
              value: "西湖区",
              label: "西湖区"
            },
            {
              value: "江干区",
              label: "江干区"
            }
          ]
        }
      ],
      yearOptions: [
        { value: 2018, label: 2018 },
        { value: 2019, label: 2019 },
        { value: 2020, label: 2020 }
      ],
      reportStr: [
        {
          type: "mobile",
          businessIncrement: "",
          arpuIncrement: ""
        },
        {
          type: "broadband",
          businessIncrement: "",
          arpuIncrement: ""
        },
        {
          type: "internetLine",
          businessIncrement: "",
          arpuIncrement: ""
        },
        {
          type: "ITV",
          businessIncrement: "",
          arpuIncrement: ""
        }
      ]
    };
  },
  computed: {
    lastYear() {
      return moment()
        .set("year", this.form.testYear)
        .subtract(1, "y")
        .get("year");
    },
    beforeLastYear() {
      return moment()
        .set("year", this.form.testYear)
        .subtract(2, "y")
        .get("year");
    }
  },
  methods: {
    // 初始化
    init() {
      let option = {
        code: 0,
        message: "成功",
        content: {
          areaId: "2",
          areaName: "杭州市",
          testYear: "2019",
          reportData: [
            {
              type: "mobile",
              businessStock: null,
              businessIncrement: null,
              arpuStock: null,
              arpuIncrement: null,
              nextStock: null,
              nextIncrement: "6",
              nextTotal: null,
              currentValue: null,
              upValue: null,
              currentRate: null,
              nextRate: null
            },
            {
              type: "broadband",
              businessStock: null,
              businessIncrement: null,
              arpuStock: null,
              arpuIncrement: null,
              nextStock: null,
              nextIncrement: "12",
              nextTotal: null,
              currentValue: null,
              upValue: null,
              currentRate: null,
              nextRate: null
            },
            {
              type: "internetLine",
              businessStock: null,
              businessIncrement: null,
              arpuStock: null,
              arpuIncrement: null,
              nextStock: null,
              nextIncrement: "20",
              nextTotal: null,
              currentValue: null,
              upValue: null,
              currentRate: null,
              nextRate: null
            },
            {
              type: "subTotal",
              businessStock: null,
              businessIncrement: null,
              arpuStock: null,
              arpuIncrement: null,
              nextStock: null,
              nextIncrement: "88",
              nextTotal: null,
              currentValue: null,
              upValue: null,
              currentRate: null,
              nextRate: null
            },
            {
              type: "ITV",
              businessStock: null,
              businessIncrement: null,
              arpuStock: null,
              arpuIncrement: null,
              nextStock: null,
              nextIncrement: null,
              nextTotal: null,
              currentValue: null,
              upValue: null,
              currentRate: null,
              nextRate: null
            },
            {
              type: "total",
              businessStock: null,
              businessIncrement: null,
              arpuStock: null,
              arpuIncrement: null,
              nextStock: null,
              nextIncrement: null,
              nextTotal: null,
              currentValue: null,
              upValue: null,
              currentRate: null,
              nextRate: null
            }
          ],
          testName: "2019年测算记录"
        }
      };

      this.testId = this.$route.query.testId;
      this.tableLoading = true;
      $budgetAPI.budgetTestDetail(
        {
          testId: this.testId
        },
        res => {
          this.tableLoading = false;
          if (res.code == 0) {
            this.form.testYear = res.content.testYear;
            this.form.area = res.content.areaName;
            this.form.areaId = res.content.areaId;
            let result = res.content.reportData;

            this.tableData = this.tableTemp.map((item, index) => {
              return { ...item, ...result[index] };
            });
            result.forEach((item,index) => {
              let type = item.type;
              let len = this.reportStr.length;
              for (let i = 0; i < len; i++) {
                if (this.reportStr[i].type == type) {
                  item.businessIncrement &&
                    ( this.reportStr[i].businessIncrement = item.businessIncrement);
                  item.arpuIncrement &&
                    ( this.reportStr[i].arpuIncrement = item.arpuIncrement);
                }
              }
            })
          }
        },
        err => {
          this.tableLoading = false;

        }
      );
    },

    arraySpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        if (rowIndex === 1) {
          return {
            colspan: 1,
            rowspan: 3
          };
        } else if (rowIndex === 2 || rowIndex === 3) {
          return {
            colspan: 0,
            rowspan: 0
          };
        } else if (rowIndex === 5) {
          return {
            colspan: 2,
            rowspan: 1
          };
        }
      } else if (columnIndex == 1) {
        if (rowIndex === 5) {
          return {
            colspan: 0,
            rowspan: 0
          };
        }
      }
    },
    // 业务增量更改
    bussinessChange(event, index, row) {
      let type = row.type;
      let len = this.reportStr.length;
      for (let i = 0; i < len; i++) {
        if (this.reportStr[i].type === type) {
          this.reportStr[i].businessIncrement = event.trim();
          if (
            this.reportStr[i].arpuIncrement &&
            this.reportStr[i].businessIncrement
          ) {
            this.budgetSubmit();
          }
          break;
        }
      }
    },
    // arpu增量更改
    arpuChange(event, index, row) {
      let type = row.type;
      let len = this.reportStr.length;
      for (let i = 0; i < len; i++) {
        if (this.reportStr[i].type === type) {
          this.reportStr[i].arpuIncrement = event.trim();
          if (
            this.reportStr[i].arpuIncrement &&
            this.reportStr[i].businessIncrement
          ) {
            this.budgetSubmit();
          }
          break;
        }
      }
    },
    // 测算保存
    budgetSave() {
      let len = this.reportStr.length;
      let flag = false;
      this.tableData.forEach((item,index) => {
        let type =item.type;

        for (let i = 0; i < len; i++) {
          if (
            this.reportStr[i].businessIncrement &&
            this.reportStr[i].arpuIncrement
          ) {
            flag = true;
          }

        }
      })

      if (flag) {
        $budgetAPI.budgetTestUpdate(
          {
            testId: this.testId,
            reportStr: JSON.stringify(this.reportStr)
          },
          res => {
            console.log("budgetTestUpdate", res);
            if (res.code == 0) {
              this.$router.go(-1);
            } else {
              this.alertError(res)
            }
          },
          err => {}
        );
      }
    },
    // 触发测算
    budgetSubmit() {
      $budgetAPI.budgetTestTest(
        {
          areaId: this.form.areaId,
          testYear: this.form.testYear,
          reportStr: JSON.stringify(this.reportStr)
        },
        res => {
          if (res.code == 0) {
            let result = res.content;
            this.mergeBudget(result);
            // this.tableData = this.tableTemp.map((item, index) => {
            //   return { ...item, ...result[index] };
            // });
          } else {
            this.alertError(res)
          }
        },
        err => {}
      );
    },
    // 合并数据
    mergeBudget(result) {
      var that = this;
      that.tableData = result.map((item, index) => {
        let type = item.type;
        let tableTemp = that.tableTemp;
        let len = that.reportStr.length;
        for (let i = 0; i < len; i++) {
          if (that.reportStr[i].type == type) {
            // 测算返回数据没有 businessIncrement ，arpuIncrement
            that.reportStr[i].businessIncrement &&
              (item.businessIncrement = that.reportStr[i].businessIncrement);
            that.reportStr[i].arpuIncrement &&
              (item.arpuIncrement = that.reportStr[i].arpuIncrement);
            // 将测算返回的nextStock放入reportStr
            that.reportStr[i].nextStock = item.nextStock;
            that.reportStr[i].nextIncrement = item.nextIncrement;
            that.reportStr[i].nextTotal = item.nextTotal;
            that.reportStr[i].nextRate = item.nextRate;
          }
        }
        return { ...item, ...tableTemp[index] };
      });
      console.log(that.tableData);
    },
    // 年份发生变化
    yearChange(value) {
      console.log(this.form.year);
    }
  },
  created() {
    this.init();
  },
  mounted() {}
};
</script>
<style scoped lang="scss">
</style>
<style lang="scss">

.input .el-input__inner {
  border: none !important;
}
.input .el-input__inner:hover {
  background-color: transparent;
}
</style>
