<template>
  <div class="budgetDelivery-tab11">
    <div class="tableBox">
      <el-table v-loading="tableLoading" :data="tableData" height="60vh" style="width: 100%" class="tableTh28" border
        stripe :span-method="arraySpanMethod" ref="table">
        <el-table-column prop="productName" fixed class-name="fixedColumn cancelBorder no-right-border" width="80"></el-table-column>
        <el-table-column prop="class1Name" fixed class-name="fixedColumn cancelBorder" width="100"></el-table-column>
        <el-table-column v-for="(item,index) in colunmName" :key="index" :prop="areaIds[index]" :label="item" width="100" class-name="right-money">
          <!-- <template slot-scope="scope">
            <span>{{scope.row.dataList[index].indexValue}}</span>
          </template> -->
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
  import {
    mergeSpan
  } from "@/utils/mixin";
  export default {
    name: "budgetDelivery-tab11",
    props: {
      sheetList: {
        type: Object,
        default: ()=>({})
      },
    },
    watch: {
      sheetList(val, oldVal) {
        this.colunmName = val.areaNames;
        this.areaIds = val.areaIds;
         val.data.forEach((item,index) => {
           item.dataList.forEach((ele,ind) => {
             item[ele.areaId] = ele.indexValue;
           })
         })
         this.tableData = val.data;
         this.spanArr = mergeSpan(this.tableData,['productName']);
        this.tableLoading=false;
        setTimeout(() => {
          this.$refs.table.doLayout();
        }, 500);
      }
    },
    data() {
      return {
        tableLoading: true,
        tableData: [],
        colunmName: [],
        spanArr: [],
        position: 0,
      }
    },
    methods: {

      //table合并行
      arraySpanMethod({
        row,
        column,
        rowIndex,
        columnIndex
      }) {
        if (columnIndex === 0) {
          return this.spanArr[rowIndex][columnIndex]
        }
      },
    }
  }
</script>

<style lang="scss">
.budgetDelivery-tab11{
  .tableBox{
      .no-right-border.is-leaf{
        border-right: 1px solid #d7e5fb!important;
      }
    }
}
</style>
