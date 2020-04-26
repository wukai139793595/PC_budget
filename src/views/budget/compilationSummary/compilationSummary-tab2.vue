<template>
  <div class="compilationSummary-tab">
    <div class="tableBox">
      <el-table
        v-loading="tableLoading"
        :data="tableData0"
        height="85vh"
        style="width: 100%"
        class="tableTh28"
        border
        stripe
        :span-method="arraySpanMethod"
        ref="table"
      >
        <el-table-column label="类别(单位：万元)" prop="class1" class-name="first-title" min-width="100" fixed></el-table-column>
        <el-table-column label="类别(单位：万元)" prop="class2" class-name="second-title" min-width="100" fixed></el-table-column>
        <el-table-column
          label="类别(单位：万元)"
          prop="verticalIndexName"
          class-name="third-title"
          min-width="100"
          fixed
        ></el-table-column>
        <el-table-column label="新增客户收入">
          <el-table-column v-for="(item,index) in newArr" :key="index" :label="item.horizonIndexName" :prop="'val'+(index)"></el-table-column>
          </el-table-column>
        </el-table-column>
      </el-table>
    </div>
    <div class="tableBox" style="margin-bottom:10px">
      <el-table
        v-loading="tableLoading"
        :data="tableData1"
        height="85vh"
        style="width: 100%"
        class="tableTh28"
        border
        stripe
        :span-method="arraySpanMethod"
        ref="table"
      >
        <el-table-column label="类别(单位：万元)" prop="class1" class-name="first-title" min-width="100" fixed></el-table-column>
        <el-table-column label="类别(单位：万元)" prop="class2" class-name="second-title" min-width="100" fixed></el-table-column>
        <el-table-column
          label="类别(单位：万元)"
          prop="verticalIndexName"
          class-name="third-title"
          min-width="100"
          fixed
        ></el-table-column>
        <el-table-column label="存量客户收入">
          <el-table-column v-for="(item,index) in newArr" :key="index" :label="item.horizonIndexName" :prop="'val'+(index)"></el-table-column>
          </el-table-column>
        </el-table-column>
      </el-table>
    </div>
    <div class="tableBox" style="margin-bottom:10px">
      <el-table
        v-loading="tableLoading"
        :data="tableData2"
        height="85vh"
        style="width: 100%"
        class="tableTh28"
        border
        stripe
        :span-method="arraySpanMethod"
        ref="table"
      >
        <el-table-column label="类别(单位：万元)" prop="class1" class-name="first-title" min-width="100" fixed></el-table-column>
        <el-table-column label="类别(单位：万元)" prop="class2" class-name="second-title" min-width="100" fixed></el-table-column>
        <el-table-column
          label="类别(单位：万元)"
          prop="verticalIndexName"
          class-name="third-title"
          min-width="100"
          fixed
        ></el-table-column>
        <el-table-column label="客户收入合计">
          <el-table-column v-for="(item,index) in newArr" :key="index" :label="item.horizonIndexName" :prop="'val'+(index)"></el-table-column>
          </el-table-column>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { mergeTableRow, mergeSpan } from "@/utils/mixin";
export default {
  name: "newUpToDownOrganization-tab1",
  props:{
      rowData:{
          type:Array,
          default:[]
      },
      colDefList:{
          type:Array,
          default:[]
      }
  },

  data() {
    return {
      spanArr: [],
      tableData0: [],
      tableData1: [],
      tableData2: [],
        colList:[],
      newArr:[],
      tableLoading: false,
      flag:0
    };
  },
    watch:{
        rowData(val){
            this.tableData0=this.rowData[0]
            this.tableData1 = this.rowData[1];
            this.tableData2 = this.rowData[2];
        },
        colDefList(v){
            this.colList=this.colDefList[0]
            this.init()

        }
    },
  methods: {
    //table合并行
    arraySpanMethod({ row, column, rowIndex, columnIndex }) {
        // if(this.tableData0.length>0){
            if (columnIndex == 0 || columnIndex == 1 || columnIndex == 2) {
                return this.spanArr[rowIndex][columnIndex];
            }
        // }

    },

    init() {
        this.newArr=[];
        this.flag=0;

        this.classify(
        this.colList
      );
      this.spanArr = mergeSpan(this.rowData[0], [
        "class1",
        "class2",
        "verticalIndexName"
      ]);
      this.tableData0 = this.rowData[0];
      this.tableData1 = this.rowData[1];
      this.tableData2 = this.rowData[2];
      setTimeout(() => {
        this.$refs.table.doLayout();
      }, 1200);
    },
    classify(arr) {
      this.newArr=arr;
    }
  }
};
</script>

<style lang="scss">
.compilationSummary-tab {
  .first-title.is-leaf {
    font-size: 0!important;
    position: relative;
    border-right: 1px solid #d7e5fb !important;
    .cell {
      color: #d7e5fb;
    }
  }
  .second-title.is-leaf {
    font-size: 0!important;
    position: relative;
    border-right: 1px solid #d7e5fb !important;
    .cell {
      color: #d7e5fb;
    }
  }
  .third-title.is-leaf {
    overflow: visible;
    .cell {
      transform: translateX(-100%);
      white-space: nowrap;
      overflow: visible;
    }
  }
  .third-title .cell {
    text-align: left;
  }
}
</style>
