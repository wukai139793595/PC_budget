<template>
  <div class="buildGuide">
    <div class="contentTopTitle">
      <div class="fl">
        <div class="title">新建指引</div>
      </div>
      <div class="fr">
        <el-button size="small" plain @click="$router.go(-1)">返回</el-button>
      </div>
    </div>
    <div class="upload">
      <el-upload
        class="upload-demo"
        drag
        action="/api/guide/upload"
        :on-success="updata"
        :on-remove="removeFileList"
        multiple
      >
        <div class="user-defined">
          <div class="fujian">
            <i class="iconfont icon-fujian"></i>
          </div>
          <div class="user-defined-des">
            <p class="user-defined-title">点击或将文件拖拽到这里上传</p>
            <p class="user-defined-limit">支持扩展名：.doc .docx .pdf .jpg</p>
          </div>
        </div>
      </el-upload>
    </div>
    <div class="table-content clearfix">
      <div class="table-header">
        <p class="table-title">
          <span></span>{{accountInfo.areaName}}预算指引
        </p>
        <div class="fr btn-right">
          <el-upload
            class="upload-demo"
            action="/api/guide/importTarget"
            :limit="3"
            :on-success="importTarget"
            :show-file-list="false"
          >
            <el-button size="small" type="orange">导入</el-button>
          </el-upload>

          <el-button size="small" style="margin-left: 10px" @click="exportGuideLineTemplate">模版下载</el-button>
        </div>
      </div>
      <div style="margin-top: 5px" class="tableBox">
        <el-table
          v-loading="tableLoading"
          :data="tableData"
          height="61vh"
          style="width: 100%"
          class="tableTh28"
          border
          stripe
          ref="table"
        >
          <el-table-column prop="indexClass" label="指标大类"></el-table-column>
          <el-table-column label="指标名称" width="180">

            <template slot-scope="scope" >
              <el-autocomplete
                 v-model="scope.row.indexSelect"
                 :fetch-suggestions="(str,callback)=>{searchIndexName(str,callback,scope.row)}"
                 placeholder="请输入"
                 @select="handleSelect"
                 prefix-icon="el-icon-search">
              </el-autocomplete>

<!--              <el-select-->
<!--                v-model="scope.row.indexSelect"-->
<!--                value-key="indexCode"-->
<!--                placeholder="请选择"-->
<!--                @change="indexChange(scope.row,scope.$index)"-->
<!--              >-->
<!--                <el-option-->
<!--                  v-for="item in scope.row.indexList"-->
<!--                  :key="item.indexCode"-->
<!--                  :label="item.indexName"-->
<!--                  :value="item"-->
<!--                ></el-option>-->
<!--              </el-select>-->
            </template>
          </el-table-column>
          <el-table-column prop="weight" :label="year" width="80"></el-table-column>
          <el-table-column label="大于等于">
            <template slot-scope="scope">
              <el-input size="small" v-model="scope.row.moreThan" class="input" placeholder="请输入"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="小于">
            <template slot-scope="scope">
              <el-input size="small" v-model="scope.row.lessThan" class="input" placeholder="请输入"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="到达方式" class-name="reachWay">
            <template slot-scope="scope">
              <el-select v-model="scope.row.reachWay" placeholder="请选择">
                <el-option
                  v-for="(item,index) in scope.row.reachWayList"
                  :key="index"
                  :label="item"
                  :value="item"
                ></el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column label="目标值">
            <template slot-scope="scope">
              <el-input size="small" v-model="scope.row.targetData" class="input" placeholder="请输入"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="单位">
            <template slot-scope="scope">
              <el-select v-model="scope.row.indexUnit" placeholder="请选择">
                <el-option
                  v-for="(item,index) in scope.row.indexUnitList"
                  :key="index"
                  :label="item"
                  :value="item"
                ></el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <i
                class="el-icon-plus"
                v-if="scope.row.operation == 'add' "
                style="cursor: pointer"
                @click="addRow(scope.row,scope.$index)"
              ></i>
              <i
                class="el-icon-minus"
                v-if="scope.row.operation == 'minus' "
                style="cursor: pointer"
                @click="delRow(scope.row,scope.$index)"
              ></i>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div class="bottom-btn">
      <el-button type="primary" size="small" @click="release">发布</el-button>
      <el-button plain size="small" @click="save">保存并生成</el-button>
    </div>
    <el-dialog :visible.sync="showTable" :title="dialogTitle" width="900px">
      <div class="areaInfo">
        <span>区域名称：{{areaName}}</span>
        <span>区域编码：{{areaId}}</span>
      </div>
      <div style="border-bottom:  1px solid #EBEEF5">
        <el-table
          v-loading="tableLoading"
          :data="dialogTableData"
          height="67vh"
          style="width: 100%"
          class="tableTh28"
          border
        >
          <el-table-column prop="indexCode" label="指标编码"></el-table-column>
          <el-table-column prop="indexName" label="指标名称"></el-table-column>
          <el-table-column prop="moreThan" label="指标值大于等于"></el-table-column>
          <el-table-column prop="lessThan" label="指标值小于等于"></el-table-column>
          <el-table-column prop="reachWay" label="目标值到达方式"></el-table-column>
          <el-table-column prop="targetData" label="目标值"></el-table-column>
          <el-table-column prop="indexUnit" label="单位"></el-table-column>
        </el-table>
      </div>
      <div class="dialogFuJian" v-if="files && files.length > 0">
        <p>附件</p>
        <div class="list">
          <div v-for="(item,index) in files" :key="index" class="list-item">
            <img
              v-if="item.attachType == 'DOC' "
              src="~@/assets/images/common/WORD.png"
              alt
              width="21"
            />
            <img
              v-if="item.attachType == 'EXCEL' "
              src="~@/assets/images/common/excel.png"
              alt
              width="21"
            />
            <span>{{item.attachName}}</span>
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="confirmSave">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { $budgetAPI } from "@/api/";
import prefixAPI from "../../../api/prefixAPI";
import {getSessionStorage} from "@/common/js/storage"
import {getCookie} from '@/common/js/cookie'
export default {
  name: "buildGuide",
  components: {},
  data() {
    return {
      dialogTitle: "预算指引",
      showTable: false,
      tableLoading: false,
      tableData: [],
      files: [],
      year: "",
      areaName: "",
      areaId: "",
      dialogTableData: [],
      accountInfo:"",
      rowIndex:"",
    };
  },
  created() {
    this.listBroadClassAndIndex();
  },
  mounted() {
    this.accountInfo = JSON.parse(getSessionStorage("accountInfo"));
    this.dialogTitle = this.accountInfo.areaName + "预算指引"
    let date = new Date();
    this.year = date.getFullYear() + "年";
  },
  methods: {
    //发布
    //optType 操作类型0：保存 1：保存并发布
    release() {
      this.$confirm("是否发布该指引？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let detailStr = [];
          this.tableData.map((item, index) => {
            let obj = {
              indexCalss1: item.indexCalss1,
              indexCode: item.indexCode,
              indexName: item.indexName,
              weight: item.weight,
              moreThan: item.moreThan,
              lessThan: item.lessThan,
              reachWay: item.reachWay,
              targetData: item.targetData,
              indexUnit: item.indexUnit
            };
            detailStr.push(obj);
          });
          $budgetAPI.saveOrRelease(
            {
              fileStr: JSON.stringify(this.files),
              detailStr: JSON.stringify(detailStr),
              guideLineFileName: this.accountInfo.areaName + "预算指引",
              optType: "1"
            },
            res => {
              this.alertError(res);
              if (!res.code) {
                this.$message({
                  type: "success",
                  message: "发布成功"
                });
                this.$router.go(-1);
              }
            },
            err => {}
          );
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消发布"
          });
        });
    },
    //确认保存并生成
    confirmSave() {
      let detailStr = [];
      this.tableData.map((item, index) => {
        let obj = {
          indexCalss1: item.indexCalss1,
          indexCode: item.indexCode,
          indexName: item.indexName,
          weight: item.weight,
          moreThan: item.moreThan,
          lessThan: item.lessThan,
          reachWay: item.reachWay,
          targetData: item.targetData,
          indexUnit: item.indexUnit
        };
        detailStr.push(obj);
      });
      $budgetAPI.saveOrRelease(
        {
          fileStr: JSON.stringify(this.files),
          detailStr: JSON.stringify(detailStr),
          guideLineFileName: this.accountInfo.areaName + "预算指引",
          optType: "0"
        },
        res => {
          this.alertError(res);
          if (!res.code) {
            this.showTable = false;
            this.$message({
              type: "success",
              message: "保存成功"
            });
            this.$router.go(-1);
          }
        },
        err => {}
      );
    },
    //保存并生成
    save() {
      this.showTable = true;
      this.dialogTableData = [];
      this.tableData.map((item, index) => {
        if (item.indexCode) {
          this.dialogTableData.push(item);
        }
      });
    },
    //指引指标数据导入
    importTarget(response, file, fileList) {
      this.alertError(response);
      if (response.code == 0) {
        this.tableLoading = true;
        this.tableData = [];
        response.content.data.map((item, index) => {
          if (item.dataList && item.dataList.length > 0) {
            item.dataList.map((dataItem, idx) => {
              let obj = {
                indexCalss1: dataItem.broadClass,
                indexClass:
                  dataItem.operation == "add" ? dataItem.broadClass : "",
                indexList: item.indexList,
                // indexSelect: {
                //   // indexCode: dataItem.indexCode,
                //   indexName: dataItem.indexName
                // },
                  indexSelect:dataItem.indexName,

                indexCode: dataItem.indexCode,
                indexName: dataItem.indexName,
                weight: dataItem.weight,
                moreThan: dataItem.moreThan,
                lessThan: dataItem.lessThan,
                reachWayList: ["增长", "到达", "下降"],
                reachWay: dataItem.reachWay,
                targetData: dataItem.targetData,
                indexUnitList: ["%", "万元","万户"],
                indexUnit: dataItem.indexUnit,
                operation: dataItem.operation
              };
              this.tableData.push(obj);
            });
          } else {
            let obj = {
              indexCalss1: item.indexCalss1,
              indexClass: item.indexCalss1,
              indexList: item.indexList,
              // indexSelect: {},
              indexSelect:'',
              indexCode: "",
              indexName: "",
              weight: "",
              moreThan: "",
              lessThan: "",
              reachWayList: ["增长", "到达", "下降"],
              reachWay: "",
              targetData: "",
              indexUnitList:  ["%", "万元","万户"],
              indexUnit: "",
              operation: "add"
            };
            this.tableData.push(obj);
          }
        });
        this.tableLoading = false;
      }
    },
    //初始化数据
    listBroadClassAndIndex() {
      this.tableLoading = true;
      $budgetAPI.listBroadClassAndIndex(
        {},
        res => {
          this.tableLoading = false;
          this.areaName = res.content.areaName;
          this.areaId = res.content.areaId;
          this.alertError(res);
          let reachWayList = ["增长", "到达", "下降"];
          let indexUnitList = ["%", "万元", "万户"];
          res.content.data.map((item, index) => {
            //构造一行的数据
            this.$set(item, "indexClass", item.indexCalss1);
            this.$set(item, "indexSelect", "");
            this.$set(item, "indexCode", "");
            this.$set(item, "indexName", "");
            this.$set(item, "weight", "");
            this.$set(item, "moreThan", "");
            this.$set(item, "lessThan", "");
            this.$set(item, "reachWayList", reachWayList);
            this.$set(item, "reachWay", "");
            this.$set(item, "targetData", "");
            this.$set(item, "indexUnitList", indexUnitList);
            this.$set(item, "indexUnit", "");
            this.$set(item, "operation", "add");
            this.tableData.push(item);
          });
          setTimeout(() => {
            this.$refs.table.doLayout();
          }, 1000);
        },
        err => {}
      );
    },
    //导入模版下载
    exportGuideLineTemplate() {
      let token =getCookie('token');
      if (process.env.NODE_ENV == "development") {
        window.location.href =
          prefixAPI.loc + "/api/guide/exportGuideLineTemplate?token="+token;
      } else if (process.env.NODE_ENV == "production") {
        window.location.href =
          prefixAPI.hp + "/api/guide/exportGuideLineTemplate?token="+token;
      }
    },
    //指标名称选择 返回Code和name
    // indexChange(row, index) {
    //   row.indexCode = row.indexSelect.indexCode;
    //   row.indexName = row.indexSelect.indexName;
    //   $budgetAPI.childClassByIndex(
    //     {
    //       indexCode: row.indexCode
    //     },
    //     res => {
    //       this.alertError(res);
    //       row.weight = res.content;
    //     },
    //     err => {}
    //   );
    // },
      handleSelect(){

      },
      // focusHandel(row){
      //   this.rowIndex=row
      // },
    //指标名称模糊搜索
    async searchIndexName(queryString, cb,row) {
        let indexType=row.indexCalss1;
        //这里是从后台获取数据
        await $budgetAPI.searchIndexName(
            {
                indexType:indexType,
                indexName: queryString
            },
            res => {
                let results = res.content;
                results.map((item, index) => {
                    this.$set(item, "value", item.indexName);
                });
                cb(results);
            },
            err => {}
        );
    },
    // handleSelect(item) {
    //     this.form.indexCode = item.indexCode;
    // },

    //添加一行
    addRow(row, index) {
      //初始化行数据
      let rowData = {
        indexCalss1: "",
        indexClass: "",
        indexList: [],
        // indexSelect: {},
        indexSelect: '',
        indexCode: "",
        indexName: "",
        weight: "",
        moreThan: "",
        lessThan: "",
        reachWayList: ["增长", "到达", "下降"],
        reachWay: "",
        targetData: "",
        indexUnitList:  ["%", "万元","万户"],
        indexUnit: "",
        operation: "minus"
      };
      rowData.indexCalss1 = row.indexCalss1;
      rowData.indexList = row.indexList;
      this.tableData.splice(index + 1, 0, rowData);
    },
    //删除一行
    delRow(row, index) {
      this.$confirm("此操作将删除本行数据，是否继续？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.tableData.splice(index, 1);
          this.$message({
            type: "info",
            message: "已删除"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    //删除文件时的钩子
    removeFileList(file, fileList) {
      if (fileList.length >= 0) {
        this.files = [];
        fileList.map((item, index) => {
          this.files.push(item.response.content);
        });
      } else {
        return false;
      }
    },
    //文件上传成功时的钩子
    updata(response, file, fileList) {
      this.files = [];
      fileList.map((item, index) => {
        this.files.push(item.response.content);
      });
    }
  }
};
</script>
<style scoped lang="scss">
.buildGuide {
  .user-defined {
    width: 100%;
    margin: 20px 0;
    display: flex;
    justify-content: center;
    align-items: center;
    .fujian {
      margin-right: 10px;
      .icon-fujian {
        font-size: 28px;
        color: #418ee9;
      }
    }
    .user-defined-des {
      font-size: 14px;
      .user-defined-title {
        text-align: left;
        color: #222222;
        font-weight: bold;
        height: 20px;
        line-height: 20px;
      }
      .user-defined-limit {
        color: #555555;
        height: 20px;
        line-height: 20px;
      }
    }
  }
  .table-content {
    margin-top: 10px;
    .table-header {
      display: flex;
      justify-content: space-between;
      .btn-right {
        display: flex;
      }
      .table-title {
        font-size: 14px;
        font-weight: bold;
        height: 30px;
        line-height: 30px;
        span {
          display: inline-block;
          width: 5px;
          height: 5px;
          background-color: #418ee9;
          border-radius: 1000%;
          overflow: hidden;
          margin-right: 10px;
          margin-bottom: 3px;
        }
      }
    }
    .tableBox .el-autocomplete{
      /deep/ .el-input__inner{
        border:none;
        background: none;
      }
    }
  }
  .bottom-btn {
    margin-top: 15px;
    display: flex;
    flex-direction: row-reverse;
    .el-button {
      margin-right: 10px;
    }
  }
  .areaInfo {
    span {
      display: inline-block;
      margin-right: 15px;
      height: 30px;
      line-height: 30px;
    }
  }
  .dialogFuJian {
    margin-top: 30px;
    .list {
      border: 1px solid #e6e6e6;
      padding: 21px 15px;
      display: flex;
      flex-wrap: wrap;
      .list-item {
        width: 30%;
        margin-right: 20px;
        cursor: pointer;
        img {
          vertical-align: middle;
        }
        span {
          display: inline-block;
          height: 25px;
          line-height: 25px;
        }
      }
    }
  }

}
</style>

<style lang="scss">
.buildGuide {
  .el-dialog__footer {
    display: flex;
    justify-content: center;
  }
  .el-dialog__body {
    padding: 10px 20px;
  }
  .el-upload {
    width: 100%;
    .el-upload-dragger {
      width: 100%;
      height: 90px;
    }
  }
  .el-upload-list__item {
    width: 30%;
    margin-top: 10px;
    float: left;
  }
  .el-table td,
  .el-table th {
    padding: 5px 0;
  }
  .el-select .el-input__inner {
    border: none !important;
    background-color: transparent;
    padding-left: 0;
  }
  .input .el-input__inner {
    border: none !important;
    background-color: transparent;
  }
  .input .el-input__inner:hover {
    background-color: transparent;
  }
  .reachWay .el-select-dropdown__item {
    width: 100px !important;
  }
}
</style>
