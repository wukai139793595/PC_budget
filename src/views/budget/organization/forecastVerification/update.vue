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
          <!-- <dx-cascader  :area_id="form.area" /> -->
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
          <el-button @click="budgetSave()" type="primary" size="small">保存</el-button>
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
        <el-table-column show-overflow-tooltip prop="title1"></el-table-column>
        <el-table-column show-overflow-tooltip prop="title2"></el-table-column>
        <el-table-column label="业务量">
          <el-table-column show-overflow-tooltip label="存量" prop="businessStock"></el-table-column>
          <el-table-column show-overflow-tooltip label="增量">
            <template slot-scope="scope">
              <div v-if="scope.row.title2=='小计'">{{scope.row.businessIncrement}}</div>
              <div v-else-if="scope.row.title2=='合计'">{{scope.row.businessIncrement}}</div>
              <el-input
                v-else
                style="width: 60px;"
                size="small"
                class="input"
                placeholder="请输入"
                v-model="scope.row.businessIncrement"
                @change="bussinessChange($event,scope.$index,scope.row)"
              ></el-input>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column label="ARPU">
          <el-table-column show-overflow-tooltip label="存量" prop="arpuStock"></el-table-column>
          <el-table-column show-overflow-tooltip label="增量">
            <template slot-scope="scope">
              <div v-if="scope.row.title2=='小计'">{{scope.row.arpuIncrement}}</div>
              <div v-else-if="scope.row.title2=='合计'">{{scope.row.arpuIncrement}}</div>
              <el-input
                v-else
                style="width: 60px;"
                size="small"
                v-model="scope.row.arpuIncrement"
                class="input"
                placeholder="请输入"
                @change="arpuChange($event,scope.$index,scope.row)"
              ></el-input>
            </template>
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
        <el-table-column show-overflow-tooltip label="增长率">
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
          type: "mobile"
        },
        {
          title1: "宽带",
          title2: "宽带",
          type: "broadband"
        },
        {
          title1: "宽带",
          title2: "互联网专线",
          type: "internetLine"
        },
        {
          title1: "宽带",
          title2: "小计",
          type: "subTotal"
        },
        {
          title1: "ITV",
          title2: "ITV",
          type: "ITV"
        },
        {
          title1: "合计",
          title2: "合计",
          type: "total"
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
      reportStr:  [
        {
          type: "mobile",
          businessIncrement: "",
          arpuIncrement: "",
          "nextStock": "",
          "nextIncrement": "",
          "nextTotal": "",
          "nextRate": ""
        },
        {
          type: "broadband",
          businessIncrement: "",
          arpuIncrement: "",
          "nextStock": "",
          "nextIncrement": "",
          "nextTotal": "",
          "nextRate": ""
        },
        {
          type: "internetLine",
          businessIncrement: "",
          arpuIncrement: "",
          "nextStock": "",
          "nextIncrement": "",
          "nextTotal": "",
          "nextRate": ""
        },
        {
          type: "ITV",
          businessIncrement: "",
          arpuIncrement: "",
          "nextStock": "",
          "nextIncrement": "",
          "nextTotal": "",
          "nextRate": ""
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
      this.testId = this.$route.query.testId;
      this.tableLoading = true;
      $budgetAPI.budgetTestDetail(
        {
          testId: this.testId
        },
        res => {
          this.tableLoading= false;
          if (res.code == 0) {
            this.form.testYear = res.content.testYear;
            this.form.area = res.content.areaName;
            this.form.areaId = res.content.areaId;
            let result = res.content.reportData;

            this.tableData = this.tableTemp.map((item, index) => {
              return { ...item, ...result[index] };
            });
            // 将请求回来的businessIncrement和arpuIncrement赋给reportStr
            result.forEach((item, index) => {
              let type = item.type;
              let len = this.reportStr.length;
              for (let i = 0; i < len; i++) {
                if (this.reportStr[i].type == type) {
                  item.businessIncrement &&
                    (this.reportStr[i].businessIncrement =
                      item.businessIncrement);
                  item.arpuIncrement &&
                    (this.reportStr[i].arpuIncrement = item.arpuIncrement);
                }
              }
            });
          }
        },
        err => {
           this.tableLoading= false;
        }
      );
    },
     // 检查输入框
    checkInput(reportStr) {
      let flagHas = this.hasOneGroupData(reportStr);
      let oneFalse = this.hasNoGroup(reportStr);
      return flagHas && !oneFalse;
    },
    //是否存在一组值
    hasOneGroupData (reportStr) {
      let flagHas = false;
      let len = reportStr.length;
      for (let i = 0; i < len; i++) {
        if (reportStr[i].businessIncrement && reportStr[i].arpuIncrement) {
          flagHas = true;
        }
      }
      return flagHas
    },
    //一组值是否有一个未填
    hasNoGroup (reportStr) {
      let oneFalse = false;
      let len = reportStr.length;
      for (let i = 0; i < len; i++) {
        if (
          (reportStr[i].businessIncrement && !reportStr[i].arpuIncrement) ||
          (!reportStr[i].businessIncrement && this.reportStr[i].arpuIncrement)
        ) {
          oneFalse = true;
        }
      }
      return oneFalse
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
          break;
        }
      }
      if (
        this.checkInput(this.reportStr)
      ) {
        this.budgetSubmit();
      }

    },
    // arpu增量更改
    arpuChange(event, index, row) {
      let type = row.type;
      let len = this.reportStr.length;
      for (let i = 0; i < len; i++) {
        if (this.reportStr[i].type === type) {
          this.reportStr[i].arpuIncrement = event.trim();
          break;
        }
      }
      if (
        this.checkInput(this.reportStr)
      ) {
        this.budgetSubmit();
      }
    },
    // 测算保存
    budgetSave() {
      if (this.checkInput(this.reportStr)) {
        $budgetAPI.budgetTestUpdate(
          {
            testId: this.testId,
            reportStr: JSON.stringify(this.reportStr)
          },
          res => {
            if (res.code == 0) {
              this.$router.go(-1);
            }
          },
          err => {}
        );
      }
    },
    // 触发测算
    budgetSubmit() {
      this.tableLoading = true;
      $budgetAPI.budgetTestTest(
        {
          areaId: this.form.areaId,
          testYear: this.form.testYear,
          reportStr: JSON.stringify(this.reportStr)
        },
        res => {
          this.tableLoading = false;
          if (res.code == 0) {
            let result = res.content;
            this.mergeBudget(result);
          } else {
            this.alertError(res)
          }
        },
        err => {
          this.tableLoading = false;
        }
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
