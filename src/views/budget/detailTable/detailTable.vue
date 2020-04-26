<template>
  <div class="detailTable">
    <div class="contentTopTitle">
      <div class="fl">
        <div class="title">通信主业明细表</div>
      </div>
    </div>
    <div class="operation">
      <el-form :inline="true" :model="form" label-width="80px" class="formList">
        <el-form-item label="选择区域">
          <dx-cascader :area_id.sync="form.areaId" />
        </el-form-item>
        <el-form-item label="账期">
          <el-date-picker v-model="form.month" value-format="yyyyMM" type="month" placeholder="选择月"></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button size="small" type="primary" @click="submitHandle()">查询</el-button>
        </el-form-item>
        <el-form-item class="daochu">
          <el-button size="small" type="orange" @click="exportExcel">导出</el-button>
        </el-form-item>
      </el-form>
      <el-tabs v-model="activeName">
        <el-tab-pane name="first" label="新方案" :lazy="true">
          <tab ref="tab1" :flag="1" :areaId="form.areaId" :month="form.month"  />
        </el-tab-pane>
        <el-tab-pane name="second" label="旧方案" :lazy="true">
          <tab ref="tab2" :flag="2" :areaId="form.areaId" :month="form.month"  />
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import { $budgetAPI } from "@/api";
import { getSessionStorage } from "@/common/js/storage";
import {getCookie} from "@/common/js/cookie"
import { createSpanOne } from "@/utils/mixin.js";
import prefixAPI from "@/api/prefixAPI";
import tab from "./detailTable-tab";
export default {
  data() {
    return {
      activeName: "first",

      form: {
        areaId: "",
        month: ""
      },
    };
  },
  components: {
    tab
  },
  created() {
    this.accountInfo = JSON.parse(getSessionStorage("accountInfo"));
    this.form.areaId = this.accountInfo.areaId;
    this.form.month = this.moment()
      .subtract(1, "months")
      .format("YYYYMM");

  },
  methods: {
    areaChange() {},
    //分产品导出
    exportExcel() {
      let areaId = "";
      let month = "";
      let token = getCookie('token');
      if (this.form.areaId) {
        areaId = this.form.areaId;
      } else {
        areaId = this.accountInfo.areaId;
      }
      if (this.form.month) {
        month = this.form.month;
      } else {
        month = this.formatDate(new Date());
      }

      if (process.env.NODE_ENV == "development") {
        window.location.href =
          prefixAPI.loc +
          "/api/mainCampDetailController/downloadTemplate?areaId=" +
          areaId +
          "&accMonth=" +
          month + "&token=" + token;
      } else if (process.env.NODE_ENV == "production") {
        window.location.href =
          prefixAPI.hp +
          "/api/mainCampDetailController/downloadTemplate?areaId=" +
          areaId +
          "&accMonth=" +
          month + "&token=" + token;
      }
    },
    // 点击查询
    submitHandle() {
      if (this.activeName == "first") {
        this.$refs.tab1.getData();
      } else if (this.activeName == "second") {
        this.$refs.tab2.getData();
      }
    },
  //
    // tabClickHandle (tab, event) {
    //   console.log("tabClickHandle",tab, event)
    // },
    //根据层级获取区域树
    getCompanyByLvl() {
      $budgetAPI.getCompanyByLvl(
        {
          lvl: this.accountInfo.areaLvl,
          areaId: this.accountInfo.areaId
        },
        res => {
          let areaId = this.accountInfo.areaId;
          let areaName = this.accountInfo.areaName;
          if (res.code == 0) {
            for (let i = 0; i < res.content.length; i++) {
              if (res.content[i].areaId == areaId) {
                this.areaList = res.content;
                return;
              }
            }
            this.areaList = [{ areaId, areaName }, ...res.content];
          } else {
            this.alertError(res);
          }
        },
        err => {}
      );
    },
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
    }
  }
};
</script>

<style lang="scss">
.detailTable {
  .el-table .cell {
    white-space: pre-wrap;
  }
  .daochu {
    float: right;
    .el-form-item__content {
      float: right;
      .el-button {
        float: right;
      }
    }
  }
}
</style>
