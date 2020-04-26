<!--分客户群-->
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
        ref="table"
              border
        stripe
        v-loading="tableLoading"
        :data="tableData"
        style="width: 100%"
        class="tableTh28"
         height="65vh"
        :span-method="arraySpanMethod"
      >
        <el-table-column fixed prop="title1" label="项目" class-name="firstProject" width="90px"></el-table-column>
        <el-table-column show-overflow-tooltip fixed prop="title2" label="项目" class-name="secondProject" width="120px"></el-table-column>
        <el-table-column label="还原大收口径">
          <el-table-column prop label="月度环比情况">
            <el-table-column class-name="right-money" label="本月实绩"></el-table-column>
            <el-table-column class-name="right-money" label="上月实绩"></el-table-column>
            <el-table-column class-name="right-money" label="环比上月增加额"></el-table-column>
          </el-table-column>
          <el-table-column prop label="累计同比情况">
            <el-table-column class-name="right-money" label="本年累计"></el-table-column>
            <el-table-column class-name="right-money" label="上年同期累计"></el-table-column>
            <el-table-column class-name="right-money" label="同比变化"></el-table-column>
            <el-table-column class-name="right-money" label="同比增长率"></el-table-column>
            <el-table-column class-name="right-money" label="收入拉动"></el-table-column>
          </el-table-column>
          <el-table-column prop label="预算完成情况">
            <el-table-column class-name="right-money" label="本年累计"></el-table-column>
            <el-table-column class-name="right-money" label="月累计预算"></el-table-column>
            <el-table-column class-name="right-money" label="缺口"></el-table-column>
            <el-table-column class-name="right-money" label="完成累计预算"></el-table-column>
            <el-table-column class-name="right-money" label="本年预算"></el-table-column>
            <el-table-column class-name="right-money" label="累计完成年度预算"></el-table-column>
          </el-table-column>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { $budgetAPI } from "@/api";
import { getSessionStorage } from "@/common/js/storage";
import {createSpan} from "@/utils/mixin"

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
      this.spanArr = createSpan(this.tableTemp,['title1','title2']);
      this.tableData = this.tableTemp;
      setTimeout(()=>{
        this.$refs.table.doLayout();
      },500);
      // let params ={
      //   areaId:this.accountInfo.areaId,
      //   month:this.formatDate(this.time)
      // };
      // this.findBusinessIndex(params)
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
        return this.spanArr[columnIndex][rowIndex]
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
    // },

  }
};
</script>
<style lang="scss" scoped>
</style>
<style lang="scss">
.fenqy {
   .firstProject,.secondProject{
    .cell{
      color: #000;
      font-weight: 700;
    }
  }
  .firstProject.is-leaf {
    position: relative;
    border-right: 1px solid #d7e5fb!important;
    .cell{
     color: #d7e5fb;
    }
  }
  .secondProject.is-leaf {
    overflow: visible;
    // border-left: 2px solid #d7e5fb;
    .cell{
      transform: translateX(-38%);
    }
  }
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
}
</style>
