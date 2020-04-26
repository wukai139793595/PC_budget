<template>
  <div class="budgetDelivery">
    <div class="contentTopTitle">
      <div class="fl">
        <div class="title">预算下达</div>
      </div>
      <div class="fr">
        <el-button @click="$router.push({path:'/budget/budgetDeliveryRecord',query:{areaId:form.areaSelect.areaId,areaLvl:form.areaSelect.areaLvl,areaName:form.areaSelect.areaName}})" size="small">下达记录</el-button>
      </div>
    </div>
    <div>
      <el-form :inline="true" :model="form" label-width="100px" class="formList">
        <el-form-item label="预算年度">
          <el-date-picker v-model="form.year" type="year" placeholder="选择年" value-format="yyyy" @change="changeYear">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="区域">
          <!-- <el-select v-model="form.areaSelect"  value-key="areaId" placeholder="请选择" @change="indexChange">
            <el-option
              v-for="(item,index) in areaList"
              :key="item.areaId"
              :label="item.areaName"
              :value="item">
            </el-option>
          </el-select> -->
          <dx-cascader :area_id.sync="form.areaSelect.areaId" :area_lvl.sync="form.areaSelect.areaLvl" :area_name.sync="form.areaSelect.areaName"
            ref="cascader" />
        </el-form-item>
        <el-form-item label="下达记录">
          <el-select v-model="form.recordId" placeholder="请选择" @change="recordChange">
            <el-option v-for="(item,index) in recordsList" :key="index" :label="item.recordName" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button size="small" type="primary" @click="search">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="table-content clearfix">
      <div class="table-header">
        <p class="table-title"><span v-if="fileName"></span>{{fileName}}</p>
        <div class="fr btn-right">
          <el-button size="small" style="margin-left: 10px" @click="exportModal">模版下载</el-button>
          <el-upload class="upload-demo" action="/api/releaseSecond/importEditData" :limit="3" :data="params" :on-success="importTarget"
            :on-progress="progress" :on-error="errorUpload" :show-file-list="false" v-if="isDelete != 0">
            <el-button size="small" type="orange">导入</el-button>
          </el-upload>
          <div class="upload-demo"  v-if="isDelete == 0"><el-button size="small" type="orange" disabled>导入</el-button></div>
          <el-button size="small" type="primary" @click="doRelease" :disabled="isDelete == 0">下达</el-button>
        </div>
      </div>
    </div>
    <div class="content">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <!-- <el-tab-pane label="经营预算认领表" name="first">
          <tab1 :sheetList="sheetList0" :year="year" ref="tab1"></tab1>
        </el-tab-pane>
        <el-tab-pane label="分月收入预算" name="second">
          <tab2 :sheetList1="sheetList1" :sheetList2="sheetList1_1" :sheetList3="sheetList1_2" ref="tab2"></tab2>
        </el-tab-pane>
        <el-tab-pane label="分产品（季度）预算" name="third">
          <tab3 :sheetList="sheetList2" :treeStrList="sheetList2_1" ref="tab3"></tab3>
        </el-tab-pane>
        <el-tab-pane label="业务量预算" name="fourth">
          <tab4 :sheetList="sheetList3" :treeStrList="sheetList3_1" ref="tab4"></tab4>
        </el-tab-pane>
        <el-tab-pane label="信产月度预算（含当地信产）" name="fifth">
          <tab5 :sheetList="sheetList4" ref="tab5"></tab5>
        </el-tab-pane>-->
        <!-- <el-tab-pane label="核心平台收入" name="first">
          <tab6 :sheetList="sheetList5" :year="year" ref="tab6"></tab6>
        </el-tab-pane>
        <el-tab-pane label="主量收入" name="second">
          <tab7 :sheetList="sheetList6" :year="year" ref="tab7"></tab7>
        </el-tab-pane>
        <el-tab-pane label="总收入" name="third">
          <tab8 :sheetList="sheetList7" :year="year" ref="tab8"></tab8>
        </el-tab-pane> -->
        <el-tab-pane label="分公司月度预算" name="first">
           <tab9 :sheetList="sheetList9" :year="year" ref="tab9"></tab9>
        </el-tab-pane>
        <el-tab-pane label="用户发展预算" name="second">
          <tab10 :sheetList="sheetList10" :year="year" ref="tab10"></tab10>
        </el-tab-pane>
        <el-tab-pane label="分项业务收入" name="third">
          <tab11 :sheetList="sheetList11" :year="year" ref="tab11"></tab11>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
  // import tab1 from '@/views/budget/budgetDelivery/budgetDelivery-tab1'
  // import tab2 from '@/views/budget/budgetDelivery/budgetDelivery-tab2'
  // import tab3 from '@/views/budget/budgetDelivery/budgetDelivery-tab3'
  // import tab4 from '@/views/budget/budgetDelivery/budgetDelivery-tab4'
  // import tab5 from '@/views/budget/budgetDelivery/budgetDelivery-tab5'
  // import tab6 from '@/views/budget/budgetDelivery/budgetDelivery-tab6'
  // import tab7 from '@/views/budget/budgetDelivery/budgetDelivery-tab7'
  // import tab8 from '@/views/budget/budgetDelivery/budgetDelivery-tab8'
  import tab9 from '@/views/budget/budgetDelivery/budgetDelivery-tab9'
    import tab10 from '@/views/budget/budgetDelivery/budgetDelivery-tab10'
    import tab11 from '@/views/budget/budgetDelivery/budgetDelivery-tab11'
  import {
    getSessionStorage
  } from "@/common/js/storage";
  import {
    getCookie
  } from "@/common/js/cookie"
  import {
    $budgetAPI
  } from '@/api'
  import prefixAPI from '@/api/prefixAPI'
  export default {
    name: "budgetDelivery",
    components: {
      // tab1,
      // tab2,
      // tab3,
      // tab4,
      // tab5,
      // tab6,
      // tab7,
      // tab8,
      tab9,
      tab10,
      tab11,
    },
    data() {
      return {
        form: {
          year: "2020",
          areaSelect: {
            areaId: "",
            areaLvl: "",
            areaName: ""
          },
          recordId: "",
        },
        activeName: 'first',
        areaList: [],
        accountInfo: "",
        recordsList: [],
        fileName: "",
        // sheetList0: [],
        // sheetList1: [],
        // sheetList1_1: [],
        // sheetList1_2: [],
        // sheetList2: [],
        // sheetList2_1: [],
        // sheetList3: [],
        // sheetList3_1: [],
        // sheetList4: [],
        // sheetList5: {},
        // sheetList6: {},
        // sheetList7: {},
        // 第三版
        sheetList9:[],
        sheetList10:{},
        sheetList11:{},
        year: 2020,
        type: 1,
        isDelete: 1,
        loading: "",
      }
    },
    watch: {
      areaSelect: {
        handler(newValue, oldValue) {
          let obj = {
            year: this.form.year,
            areaId: this.form.areaSelect.areaId ? this.form.areaSelect.areaId : this.accountInfo.areaId
          };
          // this.getReleaseRecordRs(obj);
        },
        deep: true,
      }
    },
    computed: {
      params() {
        let obj = {
          areaId: this.form.areaSelect.areaId ? this.form.areaSelect.areaId : this.accountInfo.areaId,
          areaName: this.form.areaSelect.areaName ? this.form.areaSelect.areaName : this.accountInfo.areaName,
          areaLvl: this.form.areaSelect.areaLvl ? this.form.areaSelect.areaLvl : this.accountInfo.areaLvl,
          year: this.form.year
        }
        return obj
      },
      areaSelect() {
        return this.form.areaSelect
      }
    },
    created() {
      this.init()

    },
    methods: {
      errorUpload(err, file, fileList) {
        console.log(err);
        this.loading.close();
      },
      progress(event, file, fileList) {
        this.loading = this.$loading({
          lock: true,
          text: '正在导入',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
      },
      //导入成功的回调
      importTarget(response, file, fileList) {
        this.alertError(response);
        this.loading.close();
        if (response.code == 0) {
          this.$message({
            type: "success",
            message: "导入成功"
          })
          let obj = {
            year: this.form.year,
            areaId: this.form.areaSelect.areaId ? this.form.areaSelect.areaId : this.accountInfo.areaId
          };
          // this.getReleaseRecordRs(obj);
          this.form.recordId = response.content;
          this.activeName = "first"
          let params = {
            areaId: this.form.areaSelect.areaId ? this.form.areaSelect.areaId : this.accountInfo.areaId,
            testYear: this.form.year,
            type: 1
          }
          this.getReleaseDataBySheet(params)
        }

      },
      exportModal() {
        let token = getCookie('token')
        let areaId = this.form.areaSelect.areaId ? this.form.areaSelect.areaId : this.accountInfo.areaId;
        let areaLvl = this.form.areaSelect.areaLvl ? this.form.areaSelect.areaLvl : this.accountInfo.areaLvl;
        // 根据不同模式切换不同的路径
        if (process.env.NODE_ENV == 'development') {
          window.location.href = prefixAPI.loc + "/api/releaseSecond/downTemplate?areaId=" + areaId + "&areaLvl=" + areaLvl +
            "&token=" + token;
        } else if (process.env.NODE_ENV == 'production') {
          window.location.href = prefixAPI.hp + "/api/releaseSecond/downTemplate?areaId=" + areaId + "&areaLvl=" + areaLvl +
            "&token=" + token;
        }
      },
      //年份改变清空区域
      changeYear() {
        this.$refs.cascader.clear();
      },
      //下达按钮是否展示
      recordChange(val) {
        this.recordsList.map((item, index) => {
          if (item.id == val) {
            this.isDelete = item.isDelete
          }
        })
      },
      // 查询
      search() {
        let params = {
          testYear: this.form.year ? this.form.year : this.yearList[0],
          type: this.type,
          areaId: this.form.areaSelect.areaId ? this.form.areaSelect.areaId : this.accountInfo.areaId,
        };
        this.getReleaseDataBySheet(params)
      },
      //下达
      doRelease() {
        $budgetAPI.doRelease({
          recordId: this.form.recordId ? this.form.recordId : ""
        }, res => {
          this.alertError(res);
          if (res.code == 0) {
            this.$message({
              type: 'success',
              message: res.message
            })
          }
        }, err => {

        })
      },
      init() {
        this.accountInfo = JSON.parse(getSessionStorage('accountInfo'));
        //获取下达记录列表
        let obj = {
          year: this.form.year,
          areaId: this.form.areaSelect.areaId ? this.form.areaSelect.areaId : this.accountInfo.areaId
        }
        // this.getReleaseRecordRs(obj);
        if (this.$route.query.areaId) {
          // let row = this.$route.query.row;
          let query = this.$route.query;
          this.form = {
            year: query.recordYear,
            areaSelect: {
              areaId: query.areaId,
              areaLvl: query.areaLvl,
              areaName: query.areaName
            },
            recordId: query.id,
          }
          let params = {
            testYear: this.form.year,
            type: 1,
            areaId: this.form.areaSelect.areaId,
          }
          this.getReleaseDataBySheet(params)
        } else {

          this.form.areaSelect.areaId = this.accountInfo.areaId;
          this.form.areaSelect.areaLvl = this.accountInfo.areaLvl;
          this.form.areaSelect.areaName = this.accountInfo.areaName;
          setTimeout(() => {
            let params = {
              testYear: this.form.year,
              type: 1,
              areaId: this.accountInfo.areaId,
            }

            this.getReleaseDataBySheet(params)
          }, 1000);
        }




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
      //获取下达记录
      getReleaseRecordRs(params) {
        $budgetAPI.getReleaseRecordRs(params, res => {
          this.alertError(res);
          if (res.code == 0) {
            this.recordsList = res.content;
            this.form.recordId = "";
            if (res.content) {
              this.form.recordId = res.content[0].id;
              this.isDelete = res.content[0].isDelete;
            }
          }
        }, err => {

        })
      },
      //获取表格数据
      getReleaseDataBySheet(params) {
        this.year = params.year;
        switch (params.type) {
          case 0:
            this.$refs.tab9.tableLoading = true;
            break;
          case 1:
            this.$refs.tab10tableLoading = true;
            break;
          case 2:
            this.$refs.tab11tableLoading = true;
            break;
        }
        // 预算下达详情记录列表（新版）
        // $budgetAPI.getReleaseRecord(params, res => {
        //   this.alertError(res);
        //   if (res.code == 0) {
        //     this.fileName = res.content.recordName;
        //     switch (params.type) {
        //       case 1:
        //         this.$refs.tab9.tableLoading = false;
        //         this.sheetList5 = res.content.content;
        //         break;
        //       case 2:
        //         this.$refs.tab10.ableLoading = false;
        //         this.sheetList6 = res.content.content;
        //         break;
        //       case 3:
        //         this.$refs.tab11.tableLoading = false;
        //         this.sheetList7 = res.content.content;
        //         break;
        //     }
        //   }
        // }, err => {

        // });
        // 预算下达详情记录列表（第三版）
        $budgetAPI.getReleaseRecordThree(params, res => {
          this.alertError(res);
          if (res.code == 0) {
            this.fileName = res.content.recordName;
            switch (params.type) {
              case 1:
                this.$refs.tab9.tableLoading = false;
                this.sheetList9 = res.content.content;
                break;
              case 2:
                this.$refs.tab10.tableLoading = false;
                this.sheetList10 = res.content.content;
                break;
              case 3:
                this.$refs.tab11.tableLoading = false;
                this.sheetList11 = res.content.content;
                break;
            }
          }
        }, err => {

        })
      },
      //区域改变
      indexChange(val) {
        // this.getReleaseRecordRs();
      },
      handleClick(tab, event) {
        let params = {
          testYear: this.form.year ? this.form.year : this.yearList[0],
          type: null,
          areaId: this.form.areaSelect.areaId ? this.form.areaSelect.areaId : this.accountInfo.areaId,
        };
        if (tab.name == 'first') {
          params.type = 1;
          this.type = 1;
          this.getReleaseDataBySheet(params);
        }
        if (tab.name == 'second') {
          params.type = 2;
          this.type = 2;
          this.getReleaseDataBySheet(params);
        }
        if (tab.name == 'third') {
          params.type = 3;
          this.type = 3;
          this.getReleaseDataBySheet(params);
        }
        // if(tab.name == 'fourth'){
        //   params.type = 3;
        //   this.type = 3;
        //   this.getReleaseDataBySheet(params);
        // }
        // if(tab.name == 'fifth'){
        //   params.type = 4;
        //   this.type = 4;
        //   this.getReleaseDataBySheet(params);
        // }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .budgetDelivery {
    .table-content {
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

        .upload-demo {
          margin: 0 15px;
        }
      }
    }
  }
</style>
