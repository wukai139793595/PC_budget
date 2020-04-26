<template>
  <div class="budgetDelivery-tab9">
    <div class="tableBox" height="60vh">
      <div v-for="(item1,index1) in sheetList" :key="item1.proType" class="table-list">
        <el-table v-loading="tableLoading" :data="tableDataObj['tableData'+index1]" style="width: 100%" class="tableTh28" border
          stripe  :ref="'table'+index1">
          <el-table-column prop="areaName" :label="item1.proType" fixed class-name="fixedColumn cancelBorder" width="80"></el-table-column>
          <el-table-column prop="thisYear" label="全年"   width="80"></el-table-column>
          <el-table-column label="月度预算" class-name="fixedColumn cancelBorder" width="100">
            <el-table-column v-for="(item,index) in colunmName" :key="index" :prop="item.budget" :label="item.name"></el-table-column>
          </el-table-column>
          <el-table-column prop="explain" label="说明"  width="80"></el-table-column>
          <el-table-column label="月度预算进度"  width="100">
            <el-table-column v-for="(item,index) in colunmName" :key="index" :prop="item.rate" :label="item.name"></el-table-column>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    mergeTableRow
  } from "@/utils/mixin";
  export default {
    name: "budgetDelivery-tab6",
    props: {
      sheetList: {
        type: Array,
        default: ()=>([])
      },
    },
    watch: {
      sheetList:{
        handler(val, oldVal){
          var that = this;
          val.forEach((item,index)=>{
            that.$set(that.tableDataObj,'tableData'+index,item.dataList)
          })
          // this.tableData = tableData;
          this.tableLoading=false;
          setTimeout(() => {
            // this.$refs.table.doLayout();
            for (let prop in that.tableDataObj) {
              that.$refs[prop] && that.$refs[prop].doLayout();
            }
          }, 500);
        },
        // immediate: true
      }
    },
    data() {
      return {
        tableLoading: true,
        tableDataObj: {},
        // ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月','合计']
        colunmName: [
          {
            name:'1月',
            budget:'january',
            rate:'januaryPro'
          },
          {
            name:'2月',
            budget:'february',
            rate:'februaryPro'
          },{
            name:'3月',
            budget:'march',
            rate:'marchPro'
          }
          ,{
            name:'4月',
            budget:'april',
            rate:'aprilPro'
          },{
            name:'5月',
            budget:'may',
            rate:'mayPro'
          },{
            name:'6月',
            budget:'june',
            rate:'junePro'
          },{
            name:'7月',
            budget:'july',
            rate:'julyPro'
          },{
            name:'8月',
            budget:'august',
            rate:'augustPro'
          },{
            name:'9月',
            budget:'september',
            rate:'septemberPro'
          },{
            name:'10月',
            budget:'october',
            rate:'octoberPro'
          },{
            name:'11月',
            budget:'november',
            rate:'novemberPro'
          },{
            name:'12月',
            budget:'december',
            rate:'decemberPro'
          }
        ],
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

<style lang="scss" scoped>
.budgetDelivery-tab9{

  .table-list{
    margin-bottom: 10px;
  }
}
</style>
