<template>
  <div>
    <div class="contentTopTitle">
      <div class="fl">
        <div class="title">预算指引</div>
      </div>
      <div class="fr">
        <el-button size="small" icon="el-icon-edit" type="primary" plain @click="$router.push({path:'/budget/buildGuide'})">新建指引</el-button>
      </div>
    </div>

    <div>
      <el-form :inline="true" :model="form" label-width="50px" class="formList">
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
        <el-form-item label="名称">
          <el-input v-model="form.guideName" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="年份">
          <el-date-picker
            v-model="form.year"
            type="year"
            placeholder="选择年">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button size="small" type="primary" @click="handleSearch">查询</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div class="tableBox">
      <el-table v-loading="tableLoading" :data="tableData" style="width:100%" class="tableTh28" height="73vh" stripe>
        <el-table-column type="index" label="序号" min-width="50"></el-table-column>
        <el-table-column prop="areaName" label="区域" min-width="130"></el-table-column>
        <el-table-column prop="targetName" label="指引文件名称" min-width="150" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column label="状态" min-width="80">
          <template slot-scope="scope">
            <span class="bgBox" :class="{
                        'yellowBg':scope.row.status == 0,
                        'greenBg':scope.row.status == 1,
                        }"></span>
                        <span>
                        {{listState(scope.row.status)}}
                        </span>
          </template>
        </el-table-column>
        <el-table-column prop="userName" label="创建人" min-width="100"></el-table-column>
        <el-table-column prop="updateTimeStr" label="修改时间" min-width="180"></el-table-column>
        <el-table-column label="操作" min-width="180" class-name="iconColor" >
          <template slot-scope="scope">
            <el-tooltip class="item" effect="dark" content="查看" placement="bottom">
              <i class="iconfont icon-chakan" @click="$router.push({path:'/budget/seeGuide',query:{targetId:scope.row.targetId}})"></i>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="修改" placement="bottom">
              <i :class="['iconfont','icon-bianji','is-disabled']" v-if="scope.row.status == '1' "></i>
              <i :class="['iconfont','icon-bianji']" v-else @click="$router.push({path:'/budget/correctGuide',query:{targetId:scope.row.targetId}})"></i>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="导出" placement="bottom">
              <i class="iconfont icon-daochu" @click="guideExport(scope.row.targetId)"></i>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="发布" placement="bottom" >
              <i :class="['iconfont','icon-fabu','is-disabled']" v-if="scope.row.status == '1' "></i>
              <i :class="['iconfont','icon-fabu']" v-else @click="release(scope.row.targetId)"></i>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="删除" placement="bottom">
              <i class="iconfont icon-shanchu"  @click="delGuide(scope.row.targetId)"></i>
            </el-tooltip>

          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
  import {$budgetAPI} from '@/api/';
  import {getSessionStorage} from "../../common/js/storage";
  import prefixAPI from "../../api/prefixAPI";
  import Watermark from '@/common/js/watermark';  //加水印
  import {getCookie} from "@/common/js/cookie.js"
  export default {
    data() {
      return {
        form: {
          guideName:"",
          areaId: "",
          year:""
        },
        pageSize: 10,
        currentPage: 1,
        dataTotal: 100,
        tableData: [],
        tableLoading: false,
        accountInfo:{},
        areaList:[],
        currentForm:{},

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
      async handleSearch() {
        this.currentPage = 1;
        this.currentForm = {
          areaId:this.form.areaId,
          year:this.form.year,
          guideName:this.form.guideName,
        };
        this.getGuideList(this.currentForm);
      },
      listState(state){
        if(state == 0) {
          return '未发布'
        }
        if(state == 1) {
          return '已发布'
        }
      },
      //翻页操作
      handleCurrentChange(cpage) {
        this.currentPage = cpage;
        this.handleSearch();
      },
      //指引导出
      guideExport(targetId){
        // 根据不同模式切换不同的路径
        let token = getCookie('token')
        if (process.env.NODE_ENV == 'development') {
          window.location.href = prefixAPI.loc + "/api/guide/export?targetId=" + targetId + "&token=" + token;
        } else if (process.env.NODE_ENV == 'production') {
          window.location.href = prefixAPI.hp + "/api/guide/export?targetId=" + targetId + "&token=" + token;
        }

      },
      //删除指引
      delGuide(targetId){
        this.$confirm('此操作将删除该条数据，是否继续？','提示',{
          confirmButtonText:'确定',
          cancelButtonText:'取消',
          type:"warning"
        }).then(()=>{
          $budgetAPI.delGuide({
            targetId:targetId,
          },res =>{
            this.alertError(res);
            if(res.code == 0){
              this.$message({
                type:"success",
                message:"删除成功",
              });
              this.getGuideList(this.currentForm)
            }
          },err =>{

          })
        }).catch(() =>{
          this.$message({
            type:"info",
            message:"已取消删除"
          })
        })
      },
      //发布指引
      release(targetId){
        this.$confirm('是否发布该文件？','提示',{
          confirmButtonText:'确定',
          cancelButtonText:'取消',
          type:"warning"
        }).then(()=>{
          $budgetAPI.release({
            targetId:targetId
          },res =>{
            this.alertError(res);
            if(res.code == 0){
              this.$message({
                type:"success",
                message:"发布成功",
              });
              this.getGuideList(this.currentForm);
            }
          },err =>{

          })
        }).catch(() =>{
          this.$message({
            type:"info",
            message:"已取消发布"
          })
        })

      },
      //获取指引列表
      getGuideList(params){
        this.tableLoading = true;
        $budgetAPI.getGuideList(params,res =>{
          this.tableLoading = false;
          this.alertError(res);
          this.tableData = res.content;
        },err =>{

        })
      },
      //根据层级获取区域树
      getCompanyByLvl(){
        $budgetAPI.getCompanyByLvl({
          lvl:this.accountInfo.areaLvl,
          areaId:this.accountInfo.areaId
        },res =>{
          this.alertError(res);
          this.areaList = res.content;
        },err =>{

        })
      },
      //初始化页面数据
      init(){

        let params = {
          areaId:this.accountInfo.areaId,
          guideName:"",
          year: ""
        };
        //存储初始化时的form
        this.currentForm  = params;
        this.getGuideList(params);
        this.getCompanyByLvl();
      }
    },
  }
</script>

<style lang="scss" scoped>
  span.bgBox {
      border-radius:50%;
      display: inline-block;
      width: 5px;
      height: 5px;
      overflow: hidden;
      vertical-align: middle;
  }
  .iconColor{
    .iconfont{
      color: #b3b3b5;
      margin-right: 10px;
      cursor: pointer;
      &:hover{
        color: #3a85e1;
      }
    }
    .is-disabled{
      cursor: not-allowed;

    }
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

</style>
