<template>
  <div class="newUpToDownOrganization-tab2">
    <div class="tableBox">
      <el-table
        v-loading="tableLoading"
        :data="tableData0"
        style="width: 100%"
        class="tableTh28"
        border
        stripe
        :span-method="arraySpanMethod"
        ref="table1"
        >
        <el-table-column label="类别(单位：万)" prop="class1" class-name="first-title"></el-table-column>
        <el-table-column label="类别(单位：万)" prop="class2" class-name="second-title"></el-table-column>
        <el-table-column label="类别(单位：万)" prop="verticalIndexName" class-name="third-title"></el-table-column>
        <el-table-column label="新增客户收入">
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
        </el-table-column>
      </el-table>
    </div>
    <div class="tableBox" style="margin-bottom:10px">
      <el-table
        v-loading="tableLoading"
        :data="tableData1"
        style="width: 100%"
        class="tableTh28"
        border
        stripe
        :span-method="arraySpanMethod"
        ref="table2"
      >
        <el-table-column label="类别(单位：万)" prop="class1" class-name="first-title"></el-table-column>
        <el-table-column label="类别(单位：万)" prop="class2" class-name="second-title"></el-table-column>
        <el-table-column label="类别(单位：万元)" prop="verticalIndexName" class-name="third-title"></el-table-column>
        <el-table-column label="存量客户收入">
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
        </el-table-column>
        <!-- <el-table-column label="存量客户保有率">
          <el-table-column :label="rateRowLabelList.current.class1">
            <template v-for="(item,index) in rateRowLabelList.current.list">
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

          <el-table-column :label="rateRowLabelList.previous.class1">
            <template v-for="(item,index) in rateRowLabelList.previous.list">
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
        </el-table-column> -->
      </el-table>
    </div>
    <div class="tableBox" style="margin-bottom:10px">
      <el-table
        v-loading="tableLoading"
        :data="tableData2"
        style="width: 100%"
        class="tableTh28"
        border
        stripe
        :span-method="arraySpanMethod"
        ref="table3"
      >
        <el-table-column label="类别(单位：万)" prop="class1" class-name="first-title"></el-table-column>
        <el-table-column label="类别(单位：万)" prop="class2" class-name="second-title"></el-table-column>
        <el-table-column label="类别(单位：万)" prop="verticalIndexName" class-name="third-title"></el-table-column>
        <el-table-column label="客户收入合计">
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
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { mergeSpan } from "@/utils/mixin";
export default {
  name: "newUpToDownOrganization-tab2",
  props: ["rowData", "colDefList"],
  data() {
    return {
      tableData0: [],
      tableData1: [],
      tableData2: [],
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
      rateRowLabelList:{
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
      spanArr: []
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
      // 存量客户保有率
      // let rateArr = this.colDefList[1].splice(21);
      // this.rateRowLabelList = this.classify2(
      //   rateArr,
      //   "class1",
      //   "class2"
      // )
      this.spanArr = mergeSpan(this.rowData[0], [
        "class1",
        "class2",
        "verticalIndexName"
      ]);
      this.tableData0 = this.rowData[0];
      this.tableData1 = this.rowData[1];
      this.tableData2 = this.rowData[2];
      setTimeout(() => {
        this.$refs.table1.doLayout();
        this.$refs.table2.doLayout();
        this.$refs.table3.doLayout();
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
.newUpToDownOrganization-tab2 {
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
    white-space: nowrap;
    overflow: visible;
    .cell {
      width: 150px;
      transform: translateX(-75%);
    }
  }
}
</style>
