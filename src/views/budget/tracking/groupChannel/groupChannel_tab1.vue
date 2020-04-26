<template>
  <div class="tableBox">
   <el-table
        v-loading="tableLoading"
        :data="tab_list"
        height="65vh"
        style="width: 100%"
        class="tableTh28 deep-color-border"
        border
        stripe
        ref="table"
        :span-method="arraySpanMethod"
      >
        <el-table-column prop="areaName"  :label="table_title" width="120px" show-overflow-tooltip></el-table-column>
        <el-table-column   :label="title+'用户新增'">
          <el-table-column class-name="right-money" show-overflow-tooltip prop="january" label="1月"  />
          <el-table-column class-name="right-money" show-overflow-tooltip prop="february" label="2月"  />
          <el-table-column class-name="right-money" show-overflow-tooltip prop="march" label="3月"  />
          <el-table-column class-name="right-money" show-overflow-tooltip prop="april" label="4月"  />
          <el-table-column class-name="right-money" show-overflow-tooltip prop="may" label="5月"  />
          <el-table-column class-name="right-money" show-overflow-tooltip prop="june" label="6月"  />
          <el-table-column class-name="right-money" show-overflow-tooltip prop="july" label="7月"  />
          <el-table-column class-name="right-money" show-overflow-tooltip prop="august" label="8月"  />
          <el-table-column class-name="right-money" show-overflow-tooltip prop="september" label="9月"  />
          <el-table-column class-name="right-money" show-overflow-tooltip prop="october" label="10月"  />
          <el-table-column class-name="right-money" show-overflow-tooltip prop="november" label="11月"  />
          <el-table-column class-name="right-money" show-overflow-tooltip prop="december" label="12月"  />
          <el-table-column class-name="right-money" show-overflow-tooltip prop="indexCompleteSum" label="累计完成数" min-width="90" />
        </el-table-column>
        <el-table-column  label="季度累计完成数">
          <el-table-column class-name="right-money" show-overflow-tooltip prop="newlyQuarterOne" label="一季度" />
          <el-table-column class-name="right-money" show-overflow-tooltip prop="newlyQuarterTwo" label="二季度" />
          <el-table-column class-name="right-money" show-overflow-tooltip prop="newlyQuarterThree" label="三季度" />
          <el-table-column class-name="right-money" show-overflow-tooltip prop="newlyQuarterFour" label="四季度" />
          <!-- <el-table-column class-name="right-money" show-overflow-tooltip prop="newlyQuarterSum" label="年累计" /> -->
        </el-table-column>
         <el-table-column  label="季度指标">
          <el-table-column class-name="right-money" show-overflow-tooltip prop="indexQuarterOne" label="一季度" />
          <el-table-column class-name="right-money" show-overflow-tooltip prop="indexQuarterTwo" label="二季度" />
          <el-table-column class-name="right-money" show-overflow-tooltip prop="indexQuarterThree" label="三季度" />
          <el-table-column class-name="right-money" show-overflow-tooltip prop="indexQuarterFour" label="四季度" />
          <!-- <el-table-column class-name="right-money" show-overflow-tooltip prop="indexQuarterSum" label="年累计" /> -->
        </el-table-column>
        <el-table-column  label="季度指标累计完成率">
          <el-table-column class-name="right-money" show-overflow-tooltip prop="rateQuarterOne" label="一季度" />
          <el-table-column class-name="right-money" show-overflow-tooltip prop="rateQuarterTwo" label="二季度" />
          <el-table-column class-name="right-money" show-overflow-tooltip prop="rateQuarterThree" label="三季度" />
          <el-table-column class-name="right-money" show-overflow-tooltip prop="rateQuarterFour" label="四季度" />
        </el-table-column>
      </el-table>
  </div>
</template>

<script>
export default {
  props:{
    tab_list:{
      type: Array,
      default: () =>([])
    },
    title:{
      type: String,
      default: ''
    },
    table_title:{

    }
  },
  data () {
    return {
      tableLoading:false,
      tableData:[]
    }
  },
  mounted () {
    // setTimeout(()=>{
    //   this.$refs.table.doLayout();
    // },1200);
  },
  watch:{
    tab_list (newVal) {
      console.log('tab_list',newVal)
      this.$nextTick(() => {
        this.$refs.table.doLayout();
      })
    }
  },
  methods:{
    arraySpanMethod () {}
  }
}
</script>

<style lang="scss" scoped>

</style>
