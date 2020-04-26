<template>
  <div class="incomeTracking">
    <div class="contentTopTitle">
      <div class="fl">
        <div class="title">收入跟踪</div>
      </div>
    </div>
    <div class="content" style="margin-top:3px">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="分区域" name="first">
          <tab1 :areaList="areaList"/>
        </el-tab-pane>
        <el-tab-pane label="分区域趋势跟踪" name="second" lazy>
          <tab2 :areaList="areaList"/>
        </el-tab-pane>
        <el-tab-pane label="分产品分专业" name="third" lazy>
          <tab3 :areaList="areaList"/>
        </el-tab-pane>
        <el-tab-pane label="分产品分专业趋势跟踪" name="fourth" lazy>
          <tab4 :areaList="areaList"/>
        </el-tab-pane>
        <!-- <el-tab-pane label="分客户群" name="fifth" lazy>
          <tab5 :areaList="areaList"/>
        </el-tab-pane>
        <el-tab-pane label="分客户群趋势跟踪" name="sixth" lazy>
          <tab6 :areaList="areaList"/>
        </el-tab-pane> -->
        <el-tab-pane label="分收入源趋势跟踪" name="seventh" lazy>
          <tab7 :areaList="areaList"/>
        </el-tab-pane>
        <el-tab-pane label="分套餐" name="eight" lazy>
          <tab8 />
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import tab1 from "@/views/budget/tracking/incomeTracking/incomeTracking_tab1";
import tab2 from "@/views/budget/tracking/incomeTracking/incomeTracking_tab2";
import tab3 from "@/views/budget/tracking/incomeTracking/incomeTracking_tab3";
import tab4 from "@/views/budget/tracking/incomeTracking/incomeTracking_tab4";
import tab5 from "@/views/budget/tracking/incomeTracking/incomeTracking_tab5";
import tab6 from "@/views/budget/tracking/incomeTracking/incomeTracking_tab6";
import tab7 from "@/views/budget/tracking/incomeTracking/incomeTracking_tab7";
import tab8 from "@/views/budget/tracking/pointMeal";
import { getSessionStorage } from "@/common/js/storage";
import {$budgetAPI} from "@/api"
export default {
  name: "incomeTracking",
  components: {
    tab1,
    tab2,
    tab3,
    tab4,
    tab5,
    tab6,
    tab7,
    tab8,
  },
  data() {
    return {
      activeName: "first",
      areaList: [],
    };
  },
  created() {
    this.accountInfo = JSON.parse(getSessionStorage("accountInfo"));
    // this.getCompanyByLvl();
  },
  methods: {
    handleClick() {},
    //根据层级获取区域树
    // getCompanyByLvl() {
    //   $budgetAPI.getCompanyByLvl(
    //     {
    //       lvl: this.accountInfo.areaLvl,
    //       areaId: this.accountInfo.areaId

    //     },
    //     res => {
    //       let areaId = this.accountInfo.areaId;
    //       let areaName = this.accountInfo.areaName;
    //       if (res.code == 0) {
    //         for (let i = 0 ; i < res.content.length ; i++) {
    //           if (res.content[i].areaId == areaId) {
    //             this.areaList = res.content;
    //             return
    //           }
    //         }
    //         this.areaList = [{areaId,areaName},...res.content];
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
