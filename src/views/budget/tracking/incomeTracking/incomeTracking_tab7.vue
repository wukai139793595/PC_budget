<!--分收入源趋势跟踪-->
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
        v-loading="tableLoading"
        :data="tableData"
        style="width: 100%"
        class="tableTh28"
        height="65vh"
              ref="table"
        :span-method="arraySpanMethod"
      >
        <el-table-column fixed prop="indexCode" label="收入源" class-name="firstProject" width="90px"></el-table-column>
        <el-table-column fixed prop="areaName" label="收入源" class-name="secondProject" width="120px" show-overflow-tooltip></el-table-column>
        <el-table-column label="当月完成数">
          <el-table-column class-name="right-money" show-overflow-tooltip width="108px" prop="january" label="1月" />
          <el-table-column class-name="right-money" show-overflow-tooltip width="108px" prop="february" label="2月" />
          <el-table-column class-name="right-money" show-overflow-tooltip width="108px" prop="march" label="3月" />
          <el-table-column class-name="right-money" show-overflow-tooltip width="108px" prop="april" label="4月" />
          <el-table-column class-name="right-money" show-overflow-tooltip width="108px" prop="may" label="5月" />
          <el-table-column class-name="right-money" show-overflow-tooltip width="108px" prop="june" label="6月" />
          <el-table-column class-name="right-money" show-overflow-tooltip width="108px" prop="july" label="7月" />
          <el-table-column class-name="right-money" show-overflow-tooltip width="108px" prop="august" label="8月" />
          <el-table-column class-name="right-money" show-overflow-tooltip width="108px" prop="september" label="9月" />
          <el-table-column class-name="right-money" show-overflow-tooltip width="108px" prop="october" label="10月" />
          <el-table-column class-name="right-money" show-overflow-tooltip width="108px" prop="november" label="11月" />
          <el-table-column class-name="right-money" show-overflow-tooltip width="108px" prop="december" label="12月" />
        </el-table-column>
        <el-table-column label="月环比净增数">
          <el-table-column class-name="right-money" show-overflow-tooltip width="108px" prop="januarySum" label="1月" />
          <el-table-column class-name="right-money" show-overflow-tooltip width="108px" prop="februarySum" label="2月" />
          <el-table-column class-name="right-money" show-overflow-tooltip width="108px" prop="marchSum" label="3月" />
          <el-table-column class-name="right-money" show-overflow-tooltip width="108px" prop="aprilSum" label="4月" />
          <el-table-column class-name="right-money" show-overflow-tooltip width="108px" prop="maySum" label="5月" />
          <el-table-column class-name="right-money" show-overflow-tooltip width="108px" prop="juneSum" label="6月" />
          <el-table-column class-name="right-money" show-overflow-tooltip width="108px" prop="julySum" label="7月" />
          <el-table-column class-name="right-money" show-overflow-tooltip width="108px" prop="augustSum" label="8月" />
          <el-table-column class-name="right-money" show-overflow-tooltip width="108px" prop="septemberSum" label="9月" />
          <el-table-column class-name="right-money" show-overflow-tooltip width="108px" prop="octoberSum" label="10月" />
          <el-table-column class-name="right-money" show-overflow-tooltip width="108px" prop="novemberSum" label="11月" />
          <el-table-column class-name="right-money" show-overflow-tooltip width="108px" prop="decemberSum" label="12月" />
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { $budgetAPI } from "@/api";
import { getSessionStorage } from "@/common/js/storage";
import { createSpan } from "@/utils/mixin";
import prefixAPI from "@/api/prefixAPI"

let accountInfo = JSON.parse(getSessionStorage('accountInfo'))

export default {
  props: {
    areaList: {
      type: Array,
      default: () => []
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
        { title1: "01_省计费平台出账", title2: "01_OCS出账收入" },
        { title1: "01_省计费平台出账", title2: "02_集团出账收入" },
        { title1: "01_省计费平台出账", title2: "03_OOCP一次性" },
        { title1: "01_省计费平台出账", title2: "04_OCS/OOCP分摊收入" },
        { title1: "01_省计费平台出账", title2: "05_欠费不确认" },
        { title1: "01_省计费平台出账", title2: "06_欠费收回" },
        { title1: "01_省计费平台出账", title2: "07_无现金流（赠金）" },
        { title1: "01_省计费平台出账", title2: "09_流量递延收入" },
        { title1: "01_省计费平台出账", title2: "99_其他" },
        { title1: "01_省计费平台出账", title2: "小计" },
        { title1: "02_省公司人工收入", title2: "01_网间结算" },
        { title1: "02_省公司人工收入", title2: "02_网内结算" },
        { title1: "02_省公司人工收入", title2: "03_省公司分摊收入" },
        { title1: "02_省公司人工收入", title2: "04_积分计提" },
        { title1: "02_省公司人工收入", title2: "05_积分兑换" },
        { title1: "02_省公司人工收入", title2: "06_省分成结算" },
        { title1: "02_省公司人工收入", title2: "07_预付费卡" },
        { title1: "02_省公司人工收入", title2: "99_其他" },
        { title1: "02_省公司人工收入", title2: "小计" },
        { title1: "03_分公司人工收入", title2: "01_全业务卡捆绑赠送" },
        { title1: "03_分公司人工收入", title2: "02_分公司分成结算" },
        { title1: "03_分公司人工收入", title2: "99_其他" },
        { title1: "03_分公司人工收入", title2: "小计" },
        { title1: "04_新会计准则影响", title2: "01_翼支付话补" },
        { title1: "04_新会计准则影响", title2: "03_手机终端减收" },
        { title1: "04_新会计准则影响", title2: "04_手机终端减收（追溯）" },
        { title1: "04_新会计准则影响", title2: "05_代金券减收" },
        { title1: "04_新会计准则影响", title2: "06_代金券减收（追溯）" },
        { title1: "04_新会计准则影响", title2: "小计" },
        { title1: "总计", title2: "总计" }
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

      this.submitHandle();
    },
    submitHandle() {
      let areaId = this.form.areaId
        ? this.form.areaId
        : this.accountInfo.areaId;
      let year = this.form.year ? this.form.year : new Date().getFullYear();
      this.getData(areaId, year);
    },
    getData(areaId, year) {
      this.tableLoading = true;
      $budgetAPI.findIncomeTrendBySource(
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
      console.log('newArr',newArr)
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
        year = this.formatDate(new Date());
      }
      if (process.env.NODE_ENV == "development") {
        window.location.href =
          prefixAPI.loc +
          "/api/incomeTrack/ExportIncomeDataBySource?areaId=" +
          areaId +
          "&year=" +
          year + "&type=" + type;
      } else if (process.env.NODE_ENV == "production") {
        window.location.href =
          prefixAPI.hp +
          "/api/incomeTrack/ExportIncomeDataBySource?areaId=" +
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
      return y
    },
    //table合并行
    arraySpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0 || columnIndex === 1) {
        return this.spanArr[columnIndex][rowIndex];
      }
    },
    //区域选择 返回ID和name
    areaChange(event) {
      let temp = this.areaList.find(item => {
        return (item.areaId = event);
      });
      this.form.areaName = temp.areaName;
    }
    //根据层级获取区域树
    // getCompanyByLvl(){
    //   $budgetAPI.getCompanyByLvl({
    //     lvl:this.accountInfo.areaLvl,
    //     areaId:this.accountInfo.areaId
    //   },res =>{
    //     if (res.code == 0) {
    //       this.areaList = res.content;
    //     } else {
    //       this.alertError(res);
    //     }
    //   },err =>{

    //   })
    // }
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
}
</style>
