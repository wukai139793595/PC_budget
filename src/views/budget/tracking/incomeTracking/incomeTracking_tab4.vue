<!--分产品分专业趋势跟踪-->
<template>
  <div class="fenqy">
    <div class="operation">
      <el-form :inline="true" :model="form" label-width="80px" class="formList">
        <el-form-item label="选择区域">
          <dx-cascader  :area_id.sync="form.areaId" />
          <!-- <el-select v-model="form.areaId" placeholder="选择区域" @change="areaChange($event)">
            <el-option
              v-for="item in areaList"
              :key="item.areaId"
              :label="item.areaName"
              :value="item.areaId"
            ></el-option>
          </el-select> -->
        </el-form-item>
        <el-form-item label="账期">
          <el-date-picker v-model="form.year" value-format="yyyy" type="year" placeholder="选择月"></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button size="small" type="primary" @click="submitHandle">查询</el-button>
        </el-form-item>
        <el-form-item class="daochu">
          <el-button size="small" type="orange" @click="exportExcel(true)" style="margin-left: 20px">批量导出</el-button>
          <el-button size="small" type="orange" @click="exportExcel(false)" >导出</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div style="border-bottom:1px solid #EBEEF5;" class="tableBox">
      <el-table
              border
        stripe
              ref="table"
        v-loading="tableLoading"
        :data="tableData"
        style="width: 100%"
        class="tableTh28"
         height="65vh"
        :span-method="arraySpanMethod"
      >
        <el-table-column fixed prop="indexCode" label="项目" class-name="firstProject" width="90px"></el-table-column>
        <el-table-column fixed show-overflow-tooltip prop="areaName" label="项目" class-name="secondProject" width="120px"></el-table-column>
        <el-table-column label="当月完成数">
          <el-table-column class-name="right-money" prop="january" label="1月" min-width="120px"/>
          <el-table-column class-name="right-money" prop="february" label="2月" min-width="120px"/>
          <el-table-column class-name="right-money" prop="march" label="3月" min-width="120px"/>
          <el-table-column class-name="right-money" prop="april" label="4月" min-width="120px"/>
          <el-table-column class-name="right-money" prop="may" label="5月" min-width="120px" />
          <el-table-column class-name="right-money" prop="june" label="6月" min-width="120px"/>
          <el-table-column class-name="right-money" prop="july" label="7月" min-width="120px"/>
          <el-table-column class-name="right-money" prop="august" label="8月" min-width="120px"/>
          <el-table-column class-name="right-money" prop="september" label="9月" min-width="120px"/>
          <el-table-column class-name="right-money" prop="october" label="10月" min-width="120px" />
          <el-table-column class-name="right-money" prop="november" label="11月" min-width="120px"/>
          <el-table-column class-name="right-money" prop="december" label="12月" min-width="120px"/>
        </el-table-column>
        <el-table-column label="月累计预算缺口">
          <el-table-column class-name="right-money" prop="januarySum" label="1月" min-width="120px"/>
          <el-table-column class-name="right-money" prop="februarySum" label="2月" min-width="120px"/>
          <el-table-column class-name="right-money" prop="marchSum" label="3月" min-width="120px"/>
          <el-table-column class-name="right-money" prop="aprilSum" label="4月" min-width="120px" />
          <el-table-column class-name="right-money" prop="maySum" label="5月" min-width="120px"/>
          <el-table-column class-name="right-money" prop="juneSum" label="6月" min-width="120px"/>
          <el-table-column class-name="right-money" prop="julySum" label="7月" min-width="120px"/>
          <el-table-column class-name="right-money" prop="augustSum" label="8月" min-width="120px"/>
          <el-table-column class-name="right-money" prop="septemberSum" label="9月" min-width="120px"/>
          <el-table-column class-name="right-money" prop="octoberSum" label="10月" min-width="120px" />
          <el-table-column class-name="right-money" prop="novemberSum" label="11月" min-width="120px"/>
          <el-table-column class-name="right-money" prop="decemberSum" label="12月" min-width="120px"/>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { $budgetAPI } from "@/api";
import { getSessionStorage } from "@/common/js/storage";
import {createSpan} from "@/utils/mixin";
import prefixAPI from "@/api/prefixAPI"

let accountInfo = JSON.parse(getSessionStorage('accountInfo'))

export default {
    props:{
    areaList:{
      type:Array,
      default:()=>([])
    }
  },
  data() {
    return {
      form: {
        areaId: accountInfo.areaId,
        year: "2019"
      },
      accountInfo: "",
      tableLoading: false,
      tableData: [],
      count: "",
      tableTemp: [
        { title1: "主营业务收入", title2: "主营业务收入" },
        { title1: "基本面收入", title2: "基本面收入合计" },
        { title1: "基本面收入", title2: "四大主量收入（不含移动ICT）" },
        { title1: "基本面收入", title2: "移动收入（不含ICT）" },
        { title1: "基本面收入", title2: "流量收入" },
        { title1: "基本面收入", title2: "移动语音" },
        { title1: "基本面收入", title2: "宽带收入" },
        { title1: "基本面收入", title2: "互联网专线" },
        { title1: "基本面收入", title2: "天翼高清收入（大收）" },
        { title1: "基本面收入", title2: "固话收入" },
        { title1: "基本面收入", title2: "组网专线" },
        { title1: "基本面收入", title2: "设施出租" },
        { title1: "基本面收入", title2: "固网其他收入" },
        { title1: "ICT（含IDC)", title2: "ICT+IDC收入合计" },
        { title1: "ICT（含IDC)", title2: "ICT收入" },
        { title1: "ICT（含IDC)", title2: "IDC收入" },
        { title1: "重点项目", title2: "云收入" },
        { title1: "重点项目", title2: "物联网" },
        { title1: "重点项目", title2: "号百考核收入" },
        { title1: "重点项目", title2: "商务彩铃" },
        { title1: "重点项目", title2: "政企专线" }
      ]
      // time:Date.parse(new Date()),
    };
  },
  created() {
    this.init();
  },
  methods: {
        // 初始化
    init() {
      this.accountInfo = JSON.parse(getSessionStorage("accountInfo"));
      this.submitHandle();
    },
    submitHandle() {
      let areaId = this.form.areaId ? this.form.areaId:this.accountInfo.areaId;
      let year = this.form.year ? this.form.year:this.moment(new Date()).get('year');
      this.getData(areaId,year);
    },
    getData(areaId,year) {
      this.tableLoading = true;
      $budgetAPI.findIncomeByProductTrend(
        {
          areaId: areaId,
          year: year
        },
        res => {
          this.tableLoading = false;
          if (res.code === 0) {
            this.tableTemp = this.mergeTableTemp(res.content);
            
            this.spanArr = createSpan(this.tableTemp, ["indexCode", "areaName"]);
            this.tableData = this.tableTemp;
          } else {
            this.alertError(res);
          }
          setTimeout(()=>{
            this.$refs.table.doLayout();
          },500);
        },
        err => {
          this.tableLoading = false;
        }
      );
    },

    // 合并tebleTemp和请求数据
    mergeTableTemp(content) {
      let newArr = [];
      for (let i = 0 ;i < content.length; i ++) {
        for (let j = 0 ; j < content[i].list.length ; j ++) {
          newArr.push({indexCode:content[i].indexCode, ...content[i].list[j]})
        }
      }
      return newArr
    },
    //分产品导出
    exportExcel(type) {
      let areaId = "";
      let year = "";
      if (this.form.areaId) {
        areaId = this.form.areaId;
      } else {
        areaId = this.accountInfo.areaId;
      }
      if (this.form.year) {
        year = this.form.year;
      } else {
        year = this.formatDate(this.time);
      }

      if (process.env.NODE_ENV == "development") {
        window.location.href =
          prefixAPI.loc +
          "/api/incomeTrack/ExportIncomeTrendByProduct?areaId=" +
          areaId +
          "&year=" +
          year + "&type=" + type;
      } else if (process.env.NODE_ENV == "production") {
        window.location.href =
          prefixAPI.hp +
          "/api/incomeTrack/ExportIncomeTrendByProduct?areaId=" +
          areaId +
          "&year=" +
          year + "&type=" + type;
      }
    },
    //获取当前时间
    formatDate: function(value) {
      let date = new Date(value);
      let y = date.getFullYear();
      let MM = date.getMonth() + 1;
      MM = MM < 10 ? "0" + MM : MM;
      let d = date.getDate();
      d = d < 10 ? "0" + d : d;
      let h = date.getHours();
      h = h < 10 ? "0" + h : h;
      let m = date.getMinutes();
      m = m < 10 ? "0" + m : m;
      let s = date.getSeconds();
      s = s < 10 ? "0" + s : s;
      return y.toString() + MM.toString();
    },
    //table合并行
    arraySpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0 || columnIndex === 1) {
        return this.spanArr[columnIndex][rowIndex]
      }
    },
    //区域选择 返回ID和name
    areaChange(event) {
      let temp = this.areaList.find(item => {
        return (item.areaId = event);
      });
      this.form.areaName = temp.areaName;
    },
   
  }
};
</script>
<style lang="scss" scoped>
</style>
<style lang="scss">
// .fenqy {
  // .firstProject,.secondProject{
  //   .cell{
  //     color: #000;
  //     font-weight: 700;
  //   }
  // }
  // .firstProject.is-leaf {
  //   position: relative;
  //   visibility: hidden;
  //   &::before {
  //     content: "";
  //     display: block;
  //     position: absolute;
  //     width: 100%;
  //     height: 100%;
  //     top: 0;
  //     left: 0;
  //     visibility: visible;
  //     background-color: #f5f7fa;
  //   }
  // }
  // .secondProject.is-leaf {
  //   overflow: visible;
  //   border-left: 2px solid #f5f7fa;
  //   .cell{
  //     transform: translateX(-50%);
  //   }
  // }
  // .el-table--border td {
  //   border-right: 1px solid #ebeef5 !important;
  // }
  // .operation {
  //   .daochu {
  //     float: right;
  //     .el-form-item__content {
  //       width: 200px;
  //       float: right;
  //       .el-button {
  //         float: right;
  //       }
  //     }
  //   }
  // }
// }
</style>
