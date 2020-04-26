<template>
  <div class="budgetDelivery-tab10">
    <div class="tableBox">
      <div v-for="(item1,index1) in sheetListData" :key="item1.proType"  class="table-list">
        <el-table v-loading="tableLoading" :span-method="(obj)=>arraySpanMethod(obj,index1)" :data="tableDataObj['tableData'+index1]" style="width: 100%" class="tableTh28" border
          stripe  :ref="'tableData'+index1">
          <el-table-column prop="productName" :label="item1.parentName" fixed class-name="fixedColumn cancelBorder no-right-border hidden-word" width="80"></el-table-column>
          <el-table-column prop="class1Name" :label="item1.parentName" fixed class-name="fixedColumn cancelBorder no-right-border nowrap-word" width="80"></el-table-column>
          <el-table-column prop="class2Name" :label="item1.parentName" fixed class-name="fixedColumn cancelBorder hidden-word" width="80"></el-table-column>
          <el-table-column v-for="(item,index) in colunmName" :key="index" :label="item" :prop="areaIds[index]" width="100" class-name="right-money">
            <!-- <template slot-scope="scope">
              <span>{{scope.row.dataList[index].indexValue}}</span>
            </template> -->
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    mergeTableRow,
    mergeSpan
  } from "@/utils/mixin";
  export default {
    name: "budgetDelivery-tab10",
    props: {
      sheetList: {
        type: Object,
        default: ()=>({})
      },
    },
    watch: {
      sheetList(val, oldVal) {
        var that = this;
        that.sheetListData = val.data;
        that.colunmName = val.areaNames;
        that.areaIds = val.areaIds;
        val.data && val.data.forEach((item,index)=>{

          let temp = item.dataList.map((ele,ind)=>{
            ele.dataList.forEach((e,i)=>{
              ele[e.areaId] = e.indexValue;
            })
            return ele
          })
          
          if (temp[0].dataList.length) {
            that.$set(that.tableDataObj,'tableData'+index,temp);
            that['spanArr'+index] = mergeSpan(temp,['productName','class1Name','class2Name']);
          }

        })
        that.tableLoading=false;
        setTimeout(() => {
          for (let prop in that.tableDataObj) {
            that.$refs[prop] && that.$refs[prop][0] && that.$refs[prop][0].doLayout()
          }
        }, 500);
      }
    },
    data() {
      return {
        tableLoading: true,
        sheetListData:[],
        tableDataObj: {},
        colunmName: [],
        areaIds:[],
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
            },index1) {
              if (columnIndex == 0 || columnIndex==1||columnIndex==2) {
                return this['spanArr'+index1][rowIndex][columnIndex]
              }
            }
    }
  }
</script>

<style lang="scss">
.budgetDelivery-tab10{
  .tableBox{
      .no-right-border.is-leaf{
        border-right: 1px solid #d7e5fb!important;
      }
     .hidden-word.is-leaf{
       .cell{
         font-size:0;
       }
     }
     .nowrap-word.is-leaf{
        overflow:visible;
        z-index: 1;
       .cell{
         white-space: nowrap;
        text-overflow:clip;
        overflow:visible;
       }
     }
   }

  .table-list{
    margin-bottom: 10px;
  }
}
</style>
