<template>
  <div class="newUpToDownOrganization-tab1">
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
        <el-table-column label="类别(单位：万元)" prop="class1" class-name="first-title" min-width="40"></el-table-column>
        <el-table-column label="类别(单位：万元)" prop="class2" class-name="second-title" min-width="40"></el-table-column>
        <el-table-column
          label="类别(单位：万元)"
          prop="verticalIndexName"
          class-name="third-title"
          min-width="90"
        ></el-table-column>
        <el-table-column :label="rowLabelList.current.class1">
          <template v-for="(item,index) in rowLabelList.current.list">
            <el-table-column
              v-if="item.length==1"
              :label="item[0].horizonIndexName"
              :prop="item[0].indexKey"
              :key="index"
              min-width="90"
              class-name="right-money"
            ></el-table-column>
            <el-table-column v-if="item.length > 1" :label="item[0].class2" :key="index">
              <el-table-column
                v-for="(e,i) in item"
                :key="i"
                :label="e.horizonIndexName"
                :prop="e.indexKey"
                min-width="90"
                class-name="right-money"
              ></el-table-column>
            </el-table-column>
          </template>
        </el-table-column>

        <el-table-column :label="rowLabelList.previous.class1">
          <template v-for="(item,index) in rowLabelList.previous.list">
            <el-table-column
              v-if="item.length==1"
              :label="item[0].horizonIndexName"
              :prop="item[0].indexKey"
              :key="index"
              min-width="90"
              class-name="right-money"
            ></el-table-column>
            <el-table-column v-if="item.length > 1" :label="item[0].class2" :key="index">
              <el-table-column
                v-for="(e,i) in item"
                :key="i"
                :label="e.horizonIndexName"
                :prop="e.indexKey"
                min-width="90"
                class-name="right-money"
              ></el-table-column>
            </el-table-column>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { mergeTableRow, mergeSpan } from "@/utils/mixin";
export default {
  name: "newUpToDownOrganization-tab1",
  props: ["rowData", "colDefList"],
  data() {
    return {
      spanArr: [],
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
      tableLoading: false
    };
  },
  methods: {
    //table合并行
    arraySpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex == 0 || columnIndex == 1 || columnIndex == 2) {
        return this.spanArr[rowIndex][columnIndex];
      }
    },

    init() {
      this.rowLabelList = this.classify2(
        this.colDefList[0],
        "class1",
        "class2"
      );
        // console.log(this.rowLabelList.current.list.item);
        // this.tableData = mergeTableRow(this.rowData[0], ["class2", "class1"]);
      this.tableData = this.rowData[0];
      this.spanArr = mergeSpan(this.tableData, [
        "class1",
        "class2",
        "verticalIndexName"
      ]);
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
.newUpToDownOrganization-tab1 {
  .first-title.is-leaf {
    position: relative;
    border-right: 1px solid #d7e5fb !important;
    .cell {
      color: #d7e5fb;
    }
  }
  .second-title.is-leaf {
    position: relative;
    border-right: 1px solid #d7e5fb !important;
    .cell {
      color: #d7e5fb;
    }
  }
  .third-title.is-leaf {
    overflow: visible;
    .cell {
      transform: translateX(-60%);
      white-space: nowrap;
      overflow: visible;
    }
  }
  .third-title .cell {
    text-align: left;
  }
}
</style>
