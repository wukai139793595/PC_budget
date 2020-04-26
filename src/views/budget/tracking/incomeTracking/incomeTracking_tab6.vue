<!--分客户群趋势跟踪-->
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
          <el-date-picker v-model="form.month" value-format="yyyyMM" type="month" placeholder="选择月"></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button size="small" type="primary">查询</el-button>
        </el-form-item>
        <el-form-item class="daochu">
          <el-button size="small" type="orange" @click="exportExcel" style="margin-left: 20px">批量导出</el-button>
          <el-button size="small" type="orange" @click="exportExcel" >导出</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div style="border-bottom:1px solid #EBEEF5;" class="tableBox">
      <el-table
              border
        stripe
        v-loading="tableLoading"
        :data="tableData"
        style="width: 100%"
        class="tableTh28"
         height="65vh"
              ref="table"
        :span-method="arraySpanMethod"
      >
        <el-table-column fixed prop label="主营业务收入" class-name="wrap-project1">
          <el-table-column prop="title1" label="政企客户收入" class-name="first-client"></el-table-column>
        </el-table-column>
        <el-table-column fixed prop label="主营业务收入" class-name="wrap-project2"  >
          <el-table-column prop="title2" label="政企客户收入" class-name="second-client"  show-overflow-tooltip></el-table-column>
        </el-table-column>
        <el-table-column label="当月完成数">
          <el-table-column class-name="right-money" prop label="1月" />
          <el-table-column class-name="right-money" prop label="2月" />
          <el-table-column class-name="right-money" prop label="3月" />
          <el-table-column class-name="right-money" prop label="4月" />
          <el-table-column class-name="right-money" prop label="5月" />
          <el-table-column class-name="right-money" prop label="6月" />
          <el-table-column class-name="right-money" prop label="7月" />
          <el-table-column class-name="right-money" prop label="8月" />
          <el-table-column class-name="right-money" prop label="9月" />
          <el-table-column class-name="right-money" prop label="10月" />
          <el-table-column class-name="right-money" prop label="11月" />
          <el-table-column class-name="right-money" prop label="12月" />
        </el-table-column>
        <el-table-column label="月累记预算缺口">
          <el-table-column class-name="right-money" prop label="1月" />
          <el-table-column class-name="right-money" prop label="2月" />
          <el-table-column class-name="right-money" prop label="3月" />
          <el-table-column class-name="right-money" prop label="4月" />
          <el-table-column class-name="right-money" prop label="5月" />
          <el-table-column class-name="right-money" prop label="6月" />
          <el-table-column class-name="right-money" prop label="7月" />
          <el-table-column class-name="right-money" prop label="8月" />
          <el-table-column class-name="right-money" prop label="9月" />
          <el-table-column class-name="right-money" prop label="10月" />
          <el-table-column class-name="right-money" prop label="11月" />
          <el-table-column class-name="right-money" prop label="12月" />
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { $budgetAPI } from "@/api";
import { getSessionStorage } from "@/common/js/storage";
import { createSpan } from "@/utils/mixin";

let accountInfo = JSON.parse(getSessionStorage('accountInfo'))

export default {
  name: "fenqy",
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
        month: ""
      },
      accountInfo: "",
      tableLoading: false,
      tableData: [],
      count: "",
      tableTemp: [
        { title1: "主营业务收入", title2: "主营业务收入" },
        { title1: "政企客户收入", title2: "基本面收入合计" },
        { title1: "政企客户收入", title2: "四大主量收入（不含移动ICT）" },
        { title1: "政企客户收入", title2: "移动收入（不含ICT）" },
        { title1: "政企客户收入", title2: "流量收入" },
        { title1: "政企客户收入", title2: "移动语音" },
        { title1: "政企客户收入", title2: "宽带收入" },
        { title1: "政企客户收入", title2: "互联网专线" },
        { title1: "政企客户收入", title2: "天翼高清收入（大收）" },
        { title1: "政企客户收入", title2: "固话收入" },
        { title1: "政企客户收入", title2: "组网专线" },
        { title1: "政企客户收入", title2: "设施出租" },
        { title1: "政企客户收入", title2: "固网其他收入" },
        { title1: "政企客户收入", title2: "ICT+IDC收入合计" },
        { title1: "政企客户收入", title2: "ICT收入" },
        { title1: "政企客户收入", title2: "IDC收入" },
        { title1: '公众客户收入',title2:'基本面收入合计'},
        { title1: '公众客户收入',title2:'四大主量收入（不含移动ICT）'},
        { title1: '公众客户收入',title2:'移动收入（不含ICT）'},
        { title1: '公众客户收入',title2:'流量收入'},
        { title1: '公众客户收入',title2:'移动语音'},
        { title1: '公众客户收入',title2:'宽带收入'},
        { title1: '公众客户收入',title2:'互联网专线'},
        { title1: '公众客户收入',title2:'天翼高清收入（大收）'},
        { title1: '公众客户收入',title2:'固话收入'},
        { title1: '公众客户收入',title2:'组网专线'},
        { title1: '公众客户收入',title2:'设施出租'},
        { title1: '公众客户收入',title2:'固网其他收入'},
        { title1: '公众客户收入',title2:'ICT+IDC收入合计'},
        { title1: '公众客户收入',title2:'ICT收入'},
        { title1: '公众客户收入',title2:'IDC收入'},
        {title1:'其他客户收入',title2:'其他客户收入'}
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
      // this.getCompanyByLvl();
      this.spanArr = createSpan(this.tableTemp, ["title1", "title2"]);
      // console.log("spanArr", this.spanArr);
      this.tableData = this.tableTemp;
      setTimeout(()=>{
        this.$refs.table.doLayout();
      },500);
    },
    //分产品导出
    exportExcel() {
      let areaId = "";
      let month = "";
      if (this.form.areaId) {
        areaId = this.form.areaId;
      } else {
        areaId = this.accountInfo.areaId;
      }
      if (this.form.month) {
        month = this.form.month;
      } else {
        month = this.formatDate(this.time);
      }

      if (process.env.NODE_ENV == "development") {
        window.location.href =
          prefixAPI.loc +
          "/api/budgetTrack/ExportBusinessIndexByProduct?areaId=" +
          areaId +
          "&month=" +
          month;
      } else if (process.env.NODE_ENV == "production") {
        window.location.href =
          prefixAPI.hp +
          "/api/budgetTrack/ExportBusinessIndexByProduct?areaId=" +
          areaId +
          "&month=" +
          month;
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
        return this.spanArr[columnIndex][rowIndex];
      }
    },
    //区域选择 返回ID和name
    areaChange(event) {
      // let temp = this.areaList.find(item => {
      //   return (item.areaId = event);
      // });
      // this.form.areaName = temp.areaName;
    },
    //根据层级获取区域树
    // getCompanyByLvl() {
    //   $budgetAPI.getCompanyByLvl(
    //     {
    //       lvl: this.accountInfo.areaLvl,
    //       areaId: this.accountInfo.areaId
    //     },
    //     res => {
    //       if (res.code == 0) {
    //         this.areaList = res.content;
    //       } else {
    //         this.alertError(res);
    //       }
    //     },
    //     err => {}
    //   );
    // }
  }
};
</script>
<style lang="scss" scoped>
</style>
<style lang="scss">
.fenqy {
  tr:first-child {
    .wrap-project1 {
      border-right: 1px solid #d7e5fb!important;
      border-bottom: 1px solid #d7e5fb!important;
      .cell {
        white-space: nowrap;
        overflow: visible !important;
        text-overflow: clip;
        text-indent: -6px;
      }
    }
    .wrap-project2 {
      border-bottom: 1px solid #d7e5fb!important;
      .cell{
        color: #d7e5fb;
      }
      position: relative;
    }
  }
  .first-client.is-leaf {
    border-right: 1px solid #d7e5fb!important;
    .cell {
      white-space: nowrap;
      overflow: visible !important;
      text-overflow: clip;
      text-indent: -6px;
    }
  }

  .second-client.is-leaf {
    .cell{
      color: #d7e5fb;
    }
  }
}
</style>
