<template>
  <div class="budgetDelivery-tab6">
    <div class="tableBox">
      <el-table v-loading="tableLoading" :data="tableData" height="60vh" style="width: 100%" class="tableTh28" border
        stripe :span-method="arraySpanMethod" ref="table">
        <el-table-column prop="class1" fixed class-name="fixedColumn cancelBorder" width="80"></el-table-column>
        <el-table-column prop="indexName" fixed class-name="fixedColumn cancelBorder" width="100"></el-table-column>
        <el-table-column v-for="(item,index) in colunmName" :key="index" :label="item" width="100" class-name="right-money">
          <template slot-scope="scope">
            <span>{{scope.row.dataList[index].indexValue}}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
  import {
    mergeTableRow
  } from "@/utils/mixin";
  export default {
    name: "budgetDelivery-tab8",
    props: {
      sheetList: {
        type: Object,
        default: {}
      },
    },
    watch: {
      sheetList(val, oldVal) {
        this.tableData = val.dataList;
        this.colunmName = val.areaNames;
        this.rowspan();
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
      rowspan() {
        this.spanArr=[];
        this.position=0;
        this.tableData.forEach((item, index) => {
          if (index === 0) {
            this.spanArr.push(1);
            this.position = 0;
          } else {
            if (this.tableData[index].class1 === this.tableData[index - 1].class1) {
              this.spanArr[this.position] += 1;
              this.spanArr.push(0);
            } else {
              this.spanArr.push(1);
              this.position = index;
            }
          }
        })
      },
      //table合并行
      arraySpanMethod({
        row,
        column,
        rowIndex,
        columnIndex
      }) {
        if (columnIndex === 0) {
          const _row = this.spanArr[rowIndex];
          const _col = _row > 0 ? 1 : 0;
          return {
            rowspan: _row,
            colspan: _col
          }
        }
      },
    }
  }
</script>

<style scoped>

</style>
