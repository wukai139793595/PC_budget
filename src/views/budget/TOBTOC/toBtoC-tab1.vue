<template>
  <div class="toBtoC-tab1">
    <div class="tableBox">
      <el-table
        v-loading="tableLoading"
        :data="tableData"
        height="85vh"
        style="width: 100%"
        class="tableTh28"
        border
        stripe
        :span-method="arraySpanMethod"
        ref="table"
      >
        <el-table-column
          label="分类"
          prop="class1"
          class-name="first-title"
          min-width="40"
        ></el-table-column>
        <el-table-column min-width="40" label="分类" prop="class2" class-name="second-title" ></el-table-column>
        <el-table-column min-width="35" label="分类" prop="class3" class-name="third-title" ></el-table-column>
        <el-table-column min-width="120" label="分类" prop="verticalIndexName"  class-name="forth-title"></el-table-column>
        <el-table-column class-name="right-money" v-for="(item,index) in colDefList" min-width="84" :key="index" :label="item.areaName" :prop="item.indexKey"></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { mergeSpan } from "@/utils/mixin";
export default {
  name: "newUpToDownOrganization-tab1",
  props: ["rowData", "colDefList"],
  data() {
    return {
      tableData: [],
      rowLabelList: {
        current: {
          class1: "",
          list: []
        },
        previous: {
          class1: "",
          list: []
        }
      },
      tableLoading: false,
      spanArr:null,
    };
  },
  methods: {
    //table合并行
    arraySpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex == 0 || columnIndex == 1||columnIndex == 2||columnIndex == 3) {
        return this.spanArr[rowIndex][columnIndex]
      }
    },

    init() {
      // this.rowLabelList = this.classify2(
      //   this.colDefList,
      //   "class1",
      //   "class2"
      // );
      this.spanArr = mergeSpan(this.rowData, ["class1", "class2","class3","verticalIndexName"]);
      this.tableData = this.rowData;
      setTimeout(() => {
        this.$refs.table.doLayout();
      }, 1200);
    },

    classify(arr, key) {
      let obj = {};
      let newArr = [];
      arr.forEach((item, index) => {
        if (item[key] === null) {
          newArr.push([item]);
        } else if (typeof obj[item[key]] == "undefined") {
          obj[item[key]] = 1;
          newArr.push([item]);
        } else {
          let i = newArr.length - 1;
          newArr[i].push(item);
        }
      });
      return newArr;
    },
    classify2(arr, key1, key2) {
      let name = arr[0].class1;
      let obj = {
        current: [],
        previous: []
      };
      let objCurrent = {};
      let objPrevios = {};
      let newArr = [];
      arr.forEach((item, index) => {
        if (item[key1] == name) {
          obj.current.push(item);
        } else {
          obj.previous.push(item);
        }
      });
      let obj2 = {
        current: {
          class1: obj.current[0].class1,
          list: []
        },
        previous: {
          class1: obj.previous[0].class1,
          list: []
        }
      };
      obj2.current.list = this.classify(obj.current, key2);
      obj2.previous.list = this.classify(obj.previous, key2);
      return obj2;
    }
  }
};
</script>

<style lang="scss">
.toBtoC-tab1 {
  .first-title.is-leaf {
    position: relative;
    border-right: 1px solid #d7e5fb !important;
    .cell {
      color: #d7e5fb;
    }
  }
  .el-table .cell{
    white-space: pre-wrap;
  }
  .second-title.is-leaf {
    position: relative;
    border-right: 1px solid #d7e5fb !important;
    .cell {
      color: #d7e5fb;
    }
  }
  .third-title.is-leaf {
    position: relative;
    border-right: 1px solid #d7e5fb !important;
    .cell {
      color: #d7e5fb;
    }
  }
  .forth-title.is-leaf {
    overflow: visible;
    .cell {
      transform: translateX(-50%);
    }
  }
}
</style>