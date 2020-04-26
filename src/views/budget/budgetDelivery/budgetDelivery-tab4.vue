<template>
  <div class="budgetDelivery-tab4">
    <div class="tableBox">
      <el-table v-loading="tableLoading" :data="tableData" height="60vh"
                style="width: 100%" class="tableTh28" border stripe ref="table"
      >
        <el-table-column  prop="val1" label="年度目标" width="120" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column  prop="val2" label="单位"></el-table-column>
        <el-table-column v-for="(item,index) in treeStrList"
        :prop=" 'val' + (index + 3)" :key="index" :label="item" width="100" class-name="right-money"></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
  export default {
    name: "budgetDelivery-tab4",
    props: {
      sheetList: {
        type: Array,
        default: []
      },
      treeStrList: {
        type: Array,
        default: []
      },
    },
    watch: {
      sheetList(val, oldVal) {
        this.tableData = [];
        val.map((item, index) => {
          let obj = {
            val1: "",
            val2: "",
            val3: "",
            val4: "",
            val5: "",
            val6: "",
            val7: "",
            val8: "",
            val9: "",
          };
          item.map((child, idx) => {
            this.$set(obj, 'val' + (idx + 1), child);
          });
          this.tableData.push(obj);

        });
        setTimeout(()=>{
          this.$refs.table.doLayout();
        },500);
      }
    },
    data(){
      return{
        tableLoading:false,
        tableData:[]
      }
    }
  }
</script>

<style scoped>

</style>
