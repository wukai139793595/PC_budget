<template>
  <div class="newUpToDownOrganizationRecord">
    <div class="contentTopTitle">
      <div class="fl">
        <div class="title">编制记录</div>
      </div>
      <div class="fr">
        <el-button size="small" @click="$router.go(-1)">返回</el-button>
      </div>
    </div>
    <div>
      <el-form :inline="true" :model="form" class="formList">

        <el-form-item label="当前区域:" label-width="90px">
          <!-- <el-select v-model="form.areaId"  placeholder="请选择" >
            <el-option
              v-for="(item,index) in areaList"
              :key="index"
              :label="item.areaName"
              :value="item.areaId">
            </el-option>
          </el-select>-->
          <prop-cascader :area_id.sync="form.areaId" :area_name.sync="form.areaName" :area_lvl.sync="form.areaLvl" />
        </el-form-item>

        <el-form-item label="预算年度:">
          <el-date-picker v-model="form.year" type="year" placeholder="选择年" value-format="yyyy"></el-date-picker>
        </el-form-item>

        <el-form-item>
          <el-button size="small" type="primary" @click="handleSearch()">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="tableBox">
      <el-table v-loading="tableLoading" :data="tableData" style="width: 100%" class="tableTh28" border :span-method="arraySpanMethod"
        height="73vh">
        <el-table-column type="index" width="50" label="序号" class-name="fixedColumn" fixed></el-table-column>
        <el-table-column prop="areaName" label="区域" width="250" class-name="area fixedColumn" fixed align="left"
          :show-overflow-tooltip="true">
          <template slot-scope="scope">
            <span :class=" 'indent' + scope.row.areaLvl ">
              <i :class="scope.row.icon" @click="addOrMinus(scope.row,scope.$index)"></i>
              {{scope.row.areaName}}
            </span>
          </template>
        </el-table-column>
        <el-table-column prop="fileName" label="名称" :show-overflow-tooltip="true" min-width="280"></el-table-column>
        <el-table-column prop="createTime" label="时间" width="180" :formatter="dateFormat"></el-table-column>
        <el-table-column label="操作" width="350" class-name="operation">
          <template slot-scope="scope">
            <el-link type="primary" @click="handleSee(scope.row,scope.$index)">查看</el-link>
            <el-link type="danger" @click="del(scope.row,scope.$index)">删除</el-link>
            <el-link type="primary" @click="exportModal(scope.row.accMonth)">导出</el-link>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!--翻页-->
    <!--    <div class="page">-->
    <!--      <el-pagination-->
    <!--        layout="total, prev, pager, next, jumper"-->
    <!--        :page-size="pageSize"-->
    <!--        :total="dataTotal"-->
    <!--        :current-page.sync="currentPage"-->
    <!--        @current-change="handleCurrentChange"-->
    <!--      ></el-pagination>-->
    <!--    </div>-->
  </div>
</template>

<script>
  import propCascader from "@/components/cascader/prop-cascader.vue";
  import {
    getCookie,
    setCookie
  } from '@/common/js/cookie';
  import {
    mergeTableRow
  } from "@/utils/mixin";
  import {
    $budgetAPI
  } from "@/api";
  import {
    getSessionStorage
  } from "@/common/js/storage";
  import prefixAPI from "@/api/prefixAPI";
  export default {
    data() {
      return {
        form: {
          areaId: "",
          year: ""
        },
        tableData: [],
        areaList: [],
        tableTemp: [],
        tableLoading: false,
        pageSize: 10,
        currentPage: 1,
        dataTotal: 100,
        accountInfo: "",
      };
    },
    components: {
      propCascader
    },
    created() {
      this.init();
    },
    activated() {
      this.init();
    },
    deactivated() {},
    methods: {
      init() {
        this.accountInfo = JSON.parse(getSessionStorage("accountInfo"));
        let decodeName = decodeURIComponent(this.$route.query.name);
        this.form.areaId = this.$route.query.id ?
          this.$route.query.id :
          this.accountInfo.areaId;
        this.form.areaName = decodeName ? decodeName : this.accountInfo.areaName;
        this.form.areaLvl = this.$route.query.lvl ?
          this.$route.query.lvl :
          this.accountInfo.areaLvl;
        // this.form.year = this.$route.query.year ?this.$route.query.year : "";
        let params = {
          year: "",
          areaId: this.form.areaId,
          isShowSelf: true,
        };
        this.getList(params)
      },
      //时间格式化
      dateFormat(row, column, cellValue, index) {
        return this.moment(cellValue).format("YYYY-MM-DD HH:mm:ss");
      },
      exportModal(val) {
        let areaId = this.form.areaId;
        // 根据不同模式切换不同的路径
        if (process.env.NODE_ENV == "development") {
          window.location.href =
            prefixAPI.loc +
            "/api/budgetIncomeSecond/downloadTemplate?areaId=" + areaId + "&importFlag=true&year=" + val + "&token=" +
            getCookie('token');
        } else if (process.env.NODE_ENV == "production") {
          window.location.href =
            prefixAPI.hp +
            "/api/budgetIncomeSecond/downloadTemplate?areaId=" + areaId + "&importFlag=true&year=" + val + "&token=" +
            getCookie('token');
        }
      },
      //获取列表
      async handleSearch() {
        let params = {
          year: this.form.year,
          areaId: this.form.areaId,
          isShowSelf: true
        };
        this.getList(params);
      },
      //查看
      handleSee(row, index) {
        this.$router.push({
          path: "/budget/recordRead",
          query: {
            accMonth: row.accMonth,
            areaId: row.areaId,
            backRecord: true
          }
        });
      },
      del(row, index) {
        this.$confirm("此操作将删除该条数据，是否继续？", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          })

          .then(() => {
            let token = getCookie('token')
            $budgetAPI.deleteFile({
                id: row.id,
                token:token
              },
              res => {
                this.alertError(res);
                if (res.code == 0) {
                  this.$message({
                    type: "success",
                    message: "删除成功"
                  });
                  let params = {
                    year: this.form.year,
                    areaId: this.form.areaId,
                    isShowSelf: true
                  };
                  this.getList(params);
                }
              },
              err => {}
            );
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除"
            });
          });
      },
      //table合并行
      arraySpanMethod({
        row,
        column,
        rowIndex,
        columnIndex
      }) {
        const span = column['property'] + '-span';
        if (row[span]) {
          return row[span]
        }
      },
      //获取编制文件列表
      getList(params, rowIndex) {
        //rowIndex当查询时传search，加载下一级的时候穿点击的select
        let areaLvl = this.accountInfo.areaLvl;
        $budgetAPI.listFileListNew(params, res => {
          this.alertError(res);
          if (!res.code) {
            //该表格折叠展开行通过添加删除行实现
            //1:得到本级以及下级区域数据 2：只得到下级区域的数据
            if (params.isShowSelf) {
              this.tableLoading = true;
              this.tableData = [];
              //遍历获取到的数据 ，重组为需要的数组格式，mergeTableRow方法为通用合并行方法
              res.content.map((item, index) => {
                item.list.map((child, idx) => {
                  this.$set(child, 'areaId', item.areaId);
                  this.$set(child, 'areaLvl', item.areaLvl);
                  this.$set(child, 'areaName', item.areaName);
                  this.$set(child, 'parentName', item.parentName);
                  this.$set(child, 'parentId', item.parentId);
                  this.$set(child, 'listLength', item.list.length);
                  if (item.areaLvl == 5) {
                    this.$set(child, 'icon', '')
                  }
                  if (item.areaLvl == areaLvl) {
                    this.$set(child, 'icon', 'el-icon-minus')
                  }
                  if (item.areaLvl > areaLvl && item.areaLvl != 5) {
                    this.$set(child, 'icon', 'el-icon-plus')
                  }
                  if (rowIndex == 'search' && item.areaLvl != 5 && index == 0) {
                    this.$set(child, 'icon', 'el-icon-minus')
                  }
                  this.tableData.push(child);
                })
              });
              this.tableLoading = false;
              this.tableData = mergeTableRow(this.tableData, ['areaName']);
            }

            if (!params.isShowSelf) {
              let i = 0;
              if (res.content.length > 0) {
                res.content.map((item, index) => {
                  item.list.map((child, idx) => {
                    this.$set(child, 'areaId', item.areaId);
                    this.$set(child, 'areaLvl', item.areaLvl);
                    this.$set(child, 'areaName', item.areaName);
                    this.$set(child, 'parentName', item.parentName);
                    this.$set(child, 'parentId', item.parentId);
                    this.$set(child, 'listLength', item.list.length);
                    if (item.areaLvl == 5) {
                      this.$set(child, 'icon', '')
                    }
                    if (item.areaLvl == areaLvl) {
                      this.$set(child, 'icon', 'el-icon-minus')
                    }
                    if (item.areaLvl > areaLvl && item.areaLvl != 5) {
                      this.$set(child, 'icon', 'el-icon-plus')
                    }
                    i++;
                    this.tableData.splice(rowIndex + i, 0, child)
                  })
                });
              } else {
                // this.tableLoading = false;
                // this.$message('当前层级下没有数据')
              }
              this.tableLoading = false;
              this.tableData = mergeTableRow(this.tableData, ['areaName']);
            }

          }
        }, err => {

        })
      },
      //增加或展开行
      addOrMinus(row, index) {
        let rowIndex = index;
        if (row.listLength == 2) {
          rowIndex++;
        }
        if (row.icon == 'el-icon-plus') {
          let params = {
            areaId: row.areaId,
            year: this.form.year,
            isShowSelf: false,
          };
          this.getList(params, rowIndex);
          row.icon = 'el-icon-minus';
          return false
        }
        if (row.icon == 'el-icon-minus') {
          let i = 0;
          this.tableData.map((item, index) => {
            if (item.parentId == row.areaId) {
              i++;
            }
          });
          this.tableData.splice(rowIndex + 1, i);
          row.icon = 'el-icon-plus';
        }
      },
    }
  };
</script>

<style lang="scss" scoped>
  .newUpToDownOrganizationRecord {
    .formList {
      .el-button {
        margin-top: 5px;
        float: right;
      }
    }

    .el-dialog {
      .el-dialog__body {
        padding-top: 10px;
      }

      .formList {
        .el-form-item {
          margin-bottom: 20px;
        }
      }
    }

    th.el-table_1_column_1.area {
      text-align: center !important;
    }

    .area {
      span{
        display: block;
        text-align: left;
      }
      i {
        font-size: 10px;
        cursor: pointer;
        border: 1px solid #3a85e1;
        padding: 1px;
        border-radius: 5px;
        margin-right: 2px;
        color: #3a85e1;
      }

      span.indent2 {
        padding-left: 0px;
      }

      span.indent3 {
        padding-left: 15px;
      }

      span.indent4 {
        padding-left: 30px;
      }

      span.indent5 {
        padding-left: 45px;

        i {
          border: 0
        }
      }


    }

    .operation {
      .el-link {
        margin-right: 8px;
      }
    }
  }
</style>
