<template>
  <div class="upToDownOrganization">
    <div class="contentTopTitle">
      <div class="fl">
        <div class="title">自下而上的编制</div>
      </div>
      <div class="fr">
        <el-button size="small" icon="el-icon-edit" type="primary" plain @click="dialogSelect">新建编制</el-button>
      </div>
    </div>
    <!--        <div style="margin-bottom:10px;">-->
    <!--            <el-alert-->
    <!--                title="截止到2019年8月22日，已收到8个区县提交，还有江干区、上城区、下城区、余杭区未提交！"-->
    <!--                type="warning"-->
    <!--                close-text="知道了"-->
    <!--                show-icon-->
    <!--                >-->
    <!--            </el-alert>-->
    <!--        </div>-->

    <div>
      <el-form :inline="true" :model="form" label-width="60px" class="formList">
        <el-form-item label="区域">
          <!-- <el-select v-model="form.areaId" placeholder="选择区域">
            <el-option
              v-for="item in areaList"
              :key="item.areaId"
              :label="item.areaName"
              :value="item.areaId">
            </el-option>
          </el-select> -->
        <dx-cascader :area_id.sync="form.areaId"/>
        </el-form-item>
        <el-form-item label="年份">
          <el-select v-model="form.year" placeholder="选择年份">
            <el-option
              v-for="item in yearList"
              :key="item.year"
              :label="item.description"
              :value="item.year">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="名称">
          <el-input v-model="form.fileName" placeholder="请输入"></el-input>
        </el-form-item>
        <el-button size="small" type="orange" @click="delOrSubmit(selectArray,'del')">批量删除</el-button>
        <el-button size="small" type="orange" @click="delOrSubmit(selectArray,'submit')" style="margin-right: 15px">
          批量提交
        </el-button>
        <el-button size="small" type="primary" @click="handleSearch()">查询</el-button>
      </el-form>
    </div>

    <div class="tableBox">
      <el-table v-loading="tableLoading" :data="tableData" style="width: 100%" class="tableTh28"
                border :span-method="arraySpanMethod" height="73vh"
                @selection-change="handleSelectionChange">
        <el-table-column
          type="selection" fixed class-name="fixedColumn">
        </el-table-column>
        <el-table-column prop="areaName" label="区域" width="150" class-name="area fixedColumn" fixed :show-overflow-tooltip="true" >
          <template slot-scope="scope">
            <span :class=" 'indent' + scope.row.areaLvl ">
              <i :class="scope.row.icon" @click="addOrMinus(scope.row,scope.$index)"></i>
              {{scope.row.areaName}}
            </span>
          </template>
        </el-table-column>
        <el-table-column prop="fileName" label="名称" :show-overflow-tooltip="true" min-width="280"></el-table-column>
        <el-table-column label="状态" width="100">
          <template slot-scope="scope">
                        <span class="bgBox" :class="{
                        'grayBg':scope.row.status == 1,
                        'yellowBg':scope.row.status == 2,
                        'greenBg':scope.row.status == 3,
                        'redBg':scope.row.status == 4,
                        }">
                        </span>
                        <span>
                        {{listState(scope.row.status)}}
                        </span>
          </template>
        </el-table-column>
        <el-table-column label="创建人" width="150">
          <template slot-scope="scope">
            <span v-if="scope.row.userName">{{scope.row.userName}}</span>
            <span v-else>---</span>
          </template>
        </el-table-column>
        <el-table-column prop="importDate" label="时间" width="180" :formatter="dateFormat"></el-table-column>
        <el-table-column label="操作" width="350" class-name="operation">
          <template slot-scope="scope">
            <el-link type="primary" :disabled="!scope.row.read" @click="handleSee(scope.row,scope.$index)">查看</el-link>
            <el-link type="primary" :disabled="!scope.row.update" @click="correct(scope.row,scope.$index)">修改</el-link>
            <el-link type="primary" :disabled="!scope.row.export" @click="exportBian(scope.row.detailId)">导出</el-link>
            <el-link type="primary" :disabled="!scope.row.submit" @click="delOrSubmit(scope.row.detailId,'submit')">提交
            </el-link>
            <el-link type="primary" :disabled="!scope.row.check" @click="exam(scope.row,scope.$index)">审核</el-link>
            <el-link type="primary" :disabled="!scope.row.copy" @click="clone(scope.row.detailId)">克隆</el-link>
            <el-link type="danger" :disabled="!scope.row.delete" @click="delOrSubmit(scope.row.detailId,'del')">删除
            </el-link>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog :visible.sync="showSelect" title="选择" width="300px" style="margin-top: 100px">
      <div>
        <el-form :model="select" :rules="rules" label-width="60px" class="formList" ref="ruleForm">
          <el-form-item label="区域" style="width: 300px" required prop="areaId">
            <!-- <el-select v-model="select.areaId" placeholder="选择区域">
              <el-option
                v-for="item in areaList"
                :key="item.areaId"
                :label="item.areaName"
                :value="item.areaId">
              </el-option>
            </el-select> -->
            <dx-cascader :area_id.sync="select.areaId"/>
          </el-form-item>
          <el-form-item label="年份" style="width: 300px" required prop="year">
            <el-select v-model="select.year" placeholder="选择年份">
              <el-option
                v-for="item in newYearList"
                :key="item.year"
                :label="item.description"
                :value="item.year">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <div style="display: flex;align-items: center;justify-content: center;margin-top: 20px">
        <el-button type="primary" size="small" @click="confirm('ruleForm')">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {$budgetAPI} from '@/api/';
  import {getSessionStorage} from "@/common/js/storage";
  import {getCookie} from "@/common/js/cookie"
  import {mergeTableRow} from "@/utils/mixin";
  import prefixAPI from "@/api/prefixAPI";

  export default {
    data() {
      return {
        rules:{
          year:[{ required: true, message: '请选择年份', trigger: 'blur' }],
          areaId:[{ required: true, message: '请选择区域', trigger: 'blur' }]
        },
        select: {
          areaId: "",
          year: ""
        },
        form: {
          areaId: "",
          fileName: "",
          year: ""
        },
        showSelect: false,
        tableData: [],
        areaList: [],
        yearList: [],
        tableLoading: false,
        accountInfo: "",
        selectArray: [],
        newYearList: [],
      }
    },
    created(){
       this.accountInfo = JSON.parse(getSessionStorage('accountInfo'));
       this.form.areaId = this.accountInfo.areaId
    },
    mounted() {
      this.init();
    },
    methods: {
      //确认选择
      confirm(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            $budgetAPI.showEditInfo(this.select,res=>{
              this.alertError(res);
              if(res.code == 0){
                this.$router.push({
                  path:'/budget/buildOrganization',
                  query:{areaId:this.select.areaId,year:this.select.year}
                })
              }
            },err =>{

            });
          } else {
            return false;
          }
        });
      },
      exportBian(val) {
        // 根据不同模式切换不同的路径
        let token = getCookie('token')
        if (process.env.NODE_ENV == 'development') {
          window.location.href = prefixAPI.loc + "/api/bottomUpEdit/exportData?detailId=" + val + "&token" + token;
        } else if (process.env.NODE_ENV == 'production') {
          window.location.href = prefixAPI.hp + "/api/bottomUpEdit/exportData?detailId=" + val + "&token" + token;
        }
      },
      //克隆
      clone(row) {
        let str = '此操作将克隆本条数据，是否继续？';
        this.$confirm(str, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: "warning"
        }).then(() => {
          $budgetAPI.clone({
            str: row
          }, res => {
            this.alertError(res);
            if (res.code == 0) {
              this.$message({
                type: "success",
                message: "克隆成功",
              });
              let params = {
                areaId: this.form.areaId ? this.form.areaId : this.accountInfo.areaId,
                year: this.form.year ? this.form.year : this.yearList[this.yearList.length - 1].year,
                fileName: this.form.fileName ? this.form.fileName : "",
                flag: 1
              };
              this.listEditFile(params);
            }

          }, err => {

          })
        }).catch(() => {
          this.$message({
            type: "info",
            message: "已取消克隆"
          })
        })
      },
      handleSelectionChange(val) {
        this.selectArray = val;
      },
      //提交编制
      submitEdit(params) {
        let str = "";
        if (params.str.indexOf(',') != -1) {
          str = '此操作将提交选中的数据，是否继续？'
        } else {
          str = '此操作将提交该条数据，是否继续？'
        }
        this.$confirm(str, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: "warning"
        }).then(() => {
          $budgetAPI.submitEdit(params, res => {
            this.alertError(res);
            if (res.code == 0) {
              this.$message({
                type: "success",
                message: "提交成功",
              });
              let params = {
                areaId: this.form.areaId ? this.form.areaId : this.accountInfo.areaId,
                year: this.form.year ? this.form.year : this.yearList[this.yearList.length - 1].year,
                fileName: this.form.fileName ? this.form.fileName : "",
                flag: 1
              };
              this.listEditFile(params);
            }

          }, err => {

          })
        }).catch(() => {
          this.$message({
            type: "info",
            message: "已取消提交"
          })
        })
      },
      //拉起提交，删除编制之前的数据处理
      delOrSubmit(row, state) {
        let list = [];
        if (typeof row == 'number') {
          list.push(row);
          let params = {str: list.join(',')};
          if (state == 'del') {
            this.deleteEdit(params);
          } else {
            this.submitEdit(params);
          }
          return false
        }
        let isTrue = false;
        if (typeof row == 'object') {
          row.map((item, index) => {
            if (item.delete == 0 || item.submit == 0) {
              isTrue = true;
            }
            list.push(item.detailId)
          });
          if (isTrue) {
            this.$message({
              type: 'error',
              message: '当前选中数据包含不可执行此操作的数据，请重新选择'
            })
            return false
          }
          let params = {str: list.join(',')};
          if (state == 'del') {
            this.deleteEdit(params);
          } else {
            this.submitEdit(params);
          }
          return false
        }
      },
      //删除编制
      deleteEdit(params) {
        let str = "";
        if (params.str.indexOf(',') != -1) {
          str = '此操作将删除选中的数据，是否继续？'
        } else {
          str = '此操作将删除该条数据，是否继续？'
        }
        this.$confirm(str, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: "warning"
        }).then(() => {
          $budgetAPI.deleteEdit(params, res => {
            this.alertError(res);
            if (res.code == 0) {
              this.$message({
                type: "success",
                message: "删除成功",
              });
              let params = {
                areaId: this.form.areaId ? this.form.areaId : this.accountInfo.areaId,
                year: this.form.year ? this.form.year : this.yearList[this.yearList.length - 1].year,
                fileName: this.form.fileName ? this.form.fileName : "",
                flag: 1
              };
              this.listEditFile(params);
            }

          }, err => {

          })
        }).catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          })
        })
      },
      //新建编制选择弹框
      dialogSelect() {
        this.showSelect = true;
        this.select = {
          areaId: "",
          year: ""
        }
      },
      //table合并行
      arraySpanMethod({row, column, rowIndex, columnIndex}) {
        const span = column['property'] + '-span';
        if (row[span]) {
          return row[span]
        }
      },
      //时间格式化
      dateFormat(row, column, cellValue, index) {
        console.log(cellValue)
        return this.moment(cellValue).format("YYYY-MM-DD HH:mm:ss");
      },
      async handleSearch() {
        let params = {
          areaId: this.form.areaId ? this.form.areaId : this.accountInfo.areaId,
          year: this.form.year ? this.form.year : this.yearList[this.yearList.length - 1].year,
          fileName: this.form.fileName ? this.form.fileName : "",
          flag: 1
        };
        this.listEditFile(params, 'search');
      },
      listState(state) {
        if (state == 1) {
          return '未提交'
        }
        if (state == 2) {
          return '未审核'
        }
        if (state == 3) {
          return '审核通过'
        }
        if (state == 4) {
          return '审核不通过'
        }
        if (state == 9) {
          return '---'
        }
      },
      handleSee(row, index) {
        this.$router.push({path: '/budget/seeOrganization', query: {detailId: row.detailId, fileName: row.fileName}})
      },
      correct(row, index) {
        this.$router.push({path: '/budget/correctOrganization', query: {detailId: row.detailId, fileName: row.fileName}})
      },
      exam(row, index) {
        this.$router.push({path: '/budget/examOrganization', query: {detailId: row.detailId, fileName: row.fileName}})
      },
      //新建编制年份获取
      getCurrentYear() {
        $budgetAPI.getCurrentYear({}, res => {
          this.alertError(res);
          this.newYearList = res.content;
        }, err => {

        })
      },
      //初始化
      init() {

        this.getCompanyByLvl();
        this.getCurrentYear();
        this.getYear().then(() => {
          setTimeout(() => {
            let params = {
              areaId: this.accountInfo.areaId,
              year: this.yearList[this.yearList.length - 1].year,
              fileName: '',
              flag: 1
            };
            this.listEditFile(params);
          }, 1000);
        });

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
            year: this.form.year ? this.form.year : this.yearList[this.yearList.length - 1].year,
            fileName: this.form.fileName ? this.form.fileName : "",
            flag: 2
          };
          this.listEditFile(params, rowIndex);
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
      //获取编制文件列表
      listEditFile(params, rowIndex) {
        //rowIndex当查询时传search，加载下一级的时候穿点击的select

        let areaLvl = this.accountInfo.areaLvl;
        $budgetAPI.listEditFile(params, res => {
          this.alertError(res);
          if (!res.code) {
            //该表格折叠展开行通过添加删除行实现
            //1:得到本级以及下级区域数据 2：只得到下级区域的数据
            if (params.flag == 1) {
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

            if (params.flag == 2) {
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
      //根据层级获取区域树
      getCompanyByLvl() {
        $budgetAPI.getCompanyByLvl({
          lvl: this.accountInfo.areaLvl,
          areaId: this.accountInfo.areaId
        }, res => {
          this.alertError(res);
          this.areaList = res.content;
        }, err => {

        })
      },
      //获取编制文件年份
      async getYear() {
        await $budgetAPI.getYear({}, res => {
          this.alertError(res);
          this.yearList = res.content;
        }, err => {

        })
      }
    },
  }
</script>

<style lang="scss">
  .upToDownOrganization {
    .formList {
      .el-button {
        margin-top: 5px;
        float: right;
      }
    }
    .el-dialog{
      .el-dialog__body{
        padding-top: 10px;
      }
      .formList{
        .el-form-item{
          margin-bottom: 20px;
        }
      }
    }

    th.el-table_1_column_1.area{
      text-align: center!important;
    }
    .area {
      text-align: left !important;

      span.indent2 {
        padding-left: 2px;
      }

      span.indent3 {
        padding-left: 16px;
      }

      span.indent4 {
        padding-left: 32px;
      }

      span.indent5 {
        padding-left: 48px;
        i{
            border:0
        }
      }

      i {
        font-size:10px;
        cursor: pointer;
        border:1px solid #3a85e1;
        padding: 1px;
        border-radius:5px;
        margin-right: 2px;
        color: #3a85e1;
      }
    }

    .operation {
      .el-link {
        margin-right: 8px;
      }
    }
  }
</style>
<style lang="scss" scoped>
  .upToDownOrganization {
    span.bgBox {
      border-radius:50%;
      display: inline-block;
      width: 5px;
      height: 5px;
      overflow: hidden;
      vertical-align: middle;
    }
    span.grayBg {
      background: #f0f0f0;
    }

    span.yellowBg {
      background: #ffa200;
      color: #fff;
    }

    span.greenBg {
      background: #59c78d;
      color: #fff;
    }

    span.redBg {
      background: #f46a66;
      color: #fff;
    }

  }
</style>
