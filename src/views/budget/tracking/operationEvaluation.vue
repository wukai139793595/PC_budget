<template>
  <div>
    <div class="contentTopTitle">
      <div class="fl">
        <div class="title">总体经营评价</div>
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
      </el-form>
    </div>
    <div class="tableBox2" ref="tableWrap">
      <el-table
        ref="table"
        border
        stripe
        v-loading="tableLoading"
        :data="tableData"
        style="width: 100%"
        class="tableTh28"
        height="78vh"
      >
        <el-table-column class-name="danwei" prop="areaName" label="单位"></el-table-column>
        <el-table-column label="基础数据">
          <el-table-column label="收入完成">
            <el-table-column  class-name="right-money" prop="completeYearBudget" label="主营收入完成率"></el-table-column>
            <el-table-column  class-name="right-money" prop="tbYearIncreaseRate" label="主营收入增长率"></el-table-column>
            <el-table-column  class-name="right-money" prop="tbBaseYIncreaseRate" label="基本面收入增长率"></el-table-column>
          </el-table-column>
          <el-table-column label="主量发展">
            <el-table-column  class-name="right-money" prop="ydCompleteYearAimNet" label="移动净增完成率"></el-table-column>
            <el-table-column  class-name="right-money" prop="kdCompleteYearAimNet" label="宽带净增完成率"></el-table-column>
            <el-table-column  class-name="right-money" prop="tyCompleteYearAimNet" label="天翼高清净增完成率"></el-table-column>
          </el-table-column>
          <el-table-column label="发展方式">
            <el-table-column  class-name="right-money" prop="kd100mRatio" label="宽带百兆占比"></el-table-column>
            <el-table-column  class-name="right-money" prop="kdMixRate" label="宽带融合率"></el-table-column>
          </el-table-column>
          <el-table-column label="客户经营">
            <el-table-column  class-name="right-money" prop="custMixRate" label="客户融合率（锁定存量）"></el-table-column>
            <el-table-column  class-name="right-money" prop="cproBindRate" label="C网协议绑定率"></el-table-column>
          </el-table-column>
          <el-table-column label="用户质态">
            <el-table-column  class-name="right-money" prop="ydActRate" label="移动用户活跃率"></el-table-column>
            <el-table-column  class-name="right-money" prop="kdActRate" label="宽带用户活跃率"></el-table-column>
            <el-table-column  class-name="right-money" prop="tyActRate" label="天翼高清活跃率"></el-table-column>
          </el-table-column>
        </el-table-column>
        <el-table-column label="打分排名">
          <el-table-column label="收入完成">
            <el-table-column  class-name="right-money" prop="scoreComplYearBudget" label="主营收入完成率得分"></el-table-column>
            <el-table-column  class-name="right-money" prop="scoreTbRate" label="主营收入增长率得分"></el-table-column>
            <el-table-column  class-name="right-money" prop="scoreTbBaseRate" label="基本面收入增长率得分"></el-table-column>
          </el-table-column>
          <el-table-column label="主量发展">
            <el-table-column  class-name="right-money" prop="scoreYdNet" label="移动净增完成率得分"></el-table-column>
            <el-table-column  class-name="right-money" prop="scoreKdNet" label="宽带净增完成率得分"></el-table-column>
            <el-table-column class-name="right-money"  prop="scoreTyNet" label="天翼高清净增完成率得分"></el-table-column>
          </el-table-column>
          <el-table-column label="发展方式">
            <el-table-column  class-name="right-money" prop="scoreKd100m" label="宽带百兆占比得分"></el-table-column>
            <el-table-column  class-name="right-money" prop="scoreKdMix" label="宽带融合率得分"></el-table-column>
          </el-table-column>
          <el-table-column label="客户经营">
            <el-table-column  class-name="right-money" prop="scoreCustMix" label="客户融合率得分"></el-table-column>
            <el-table-column  class-name="right-money" prop="scoreCBind" label="C网协议绑定率得分"></el-table-column>
          </el-table-column>
          <el-table-column label="用户质态">
            <el-table-column  class-name="right-money" prop="scoreYdAct" label="移动用户活跃率得分"></el-table-column>
            <el-table-column class-name="right-money"  prop="scoreKdAct" label="宽带用户活跃率得分"></el-table-column>
            <el-table-column class-name="right-money"  prop="scoreTyAct" label="天翼高清活跃率得分"></el-table-column>
          </el-table-column>
          <el-table-column  class-name="right-money" prop="totalScore" label="合计"></el-table-column>
          <el-table-column  class-name="right-money" prop="rank" label="排名"></el-table-column>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { $budgetAPI } from "@/api";
import { getSessionStorage } from "@/common/js/storage";
export default {
  data() {
    return {
      tableLoading: false,
      tableData: [],
      form: {
        areaId: "",
        month: "201911"
      },
    };
  },
  created () {
      this.submitHandle();
  },
  methods: {
    submitHandle() {
      let accountInfo = JSON.parse(sessionStorage.getItem("accountInfo"));
      let areaId = this.form.areaId ? this.form.areaId : accountInfo.areaId;
      let acctMonth = this.form.month;
      this.tableLoading = true;
      $budgetAPI.getOperationEvaluationData(
        {
          areaId,
          acctMonth
        },
        res => {
          this.tableLoading = false;
          if (res && res.code == 0) {
            this.tableData = res.content.data;
            setTimeout(() => {
                this.$refs.table.doLayout();
            },1200)
          }

        },
        err => {
          this.tableLoading = false;
        }
      );
    }
  }
};
</script>

<style lang="scss" >
.danwei{
    .cell{

    text-align: center;
    }
}
</style>
