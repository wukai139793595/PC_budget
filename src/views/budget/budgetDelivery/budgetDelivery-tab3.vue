<template>
  <div class="budgetDelivery-tab3">
    <div class="tableBox">
      <el-table v-loading="tableLoading" :data="tableData" height="60vh"
                style="width: 100%" class="tableTh28" border stripe :span-method="arraySpanMethod" ref="table"
      >
        <el-table-column prop="val1" fixed class-name="fixedColumn cancelBorder"></el-table-column>
        <el-table-column prop="val2" fixed class-name="fixedColumn cancelBorder"></el-table-column>
        <el-table-column prop="val3" fixed class-name="fixedColumn "></el-table-column>
        <el-table-column v-for="(item,index) in treeStrList"
        :prop=" 'val' + (index + 4)" :key="index" :label="item" width="150" class-name="right-money"></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
  import {mergeTableRow} from "@/utils/mixin";
  export default {
    name: "budgetDelivery-tab3",
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
        let length = this.treeStrList.length + 3;
        this.tableData = mergeTableRow(this.tableData,['val1','val2','val' + length])
        setTimeout(()=>{
          this.$refs.table.doLayout();
        },500);
      }
    },
    data() {
      return {
        tableLoading: false,
        tableData: []
      }
    },
    methods:{
      //table合并行
      arraySpanMethod({row, column, rowIndex, columnIndex}) {
        const span = column['property'] + '-span';
        if (row[span]) {
          return row[span]
        }
      },
    }
  }
</script>

<style scoped>

</style>
