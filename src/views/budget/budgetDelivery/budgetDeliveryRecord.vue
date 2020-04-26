<template>
  <div>
    <div class="contentTopTitle">
      <div class="fl">
        <div class="title">下达记录</div>
      </div>
      <div class="fr">
        <el-button size="small"  @click="$router.go(-1)">返回</el-button>
      </div>
    </div>
    <div>
      <el-form :inline="true" :model="form" class="formList">
        <el-form-item label="选择区域:" label-width="90px">
          <!-- <el-select v-model="form.areaSelect"  value-key="areaId" placeholder="请选择" >
            <el-option
              v-for="(item,index) in areaList"
              :key="item.areaId"
              :label="item.areaName"
              :value="item">
            </el-option>
          </el-select> -->
          <prop-cascader :area_id.sync="form.areaSelect.areaId" :area_lvl.sync="form.areaSelect.areaLvl" :area_name.sync="form.areaSelect.areaName"></prop-cascader>
          <!-- <dx-cascader :area_id.sync="form.areaSelect.areaId" :area_lvl.sync="form.areaSelect.areaLvl"/> -->
        </el-form-item>

        <el-form-item label="名称:" label-width="60px">
          <el-input v-model="form.fileName" placeholder="请输入"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button size="small" type="primary" @click="handleSearch()">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="tableBox">
      <el-table v-loading="tableLoading" :data="tableData" style="width: 100%" class="tableTh28" height="73vh" border stripe>
        <el-table-column type="index" width="50" label="序号"></el-table-column>
        <el-table-column  prop="areaName" label="区域" width="150"></el-table-column>
        <el-table-column  prop="recordName" label="名称" width=""></el-table-column>
        <el-table-column  prop="createTime" label="时间" width="180" :formatter="dateFormat"></el-table-column>
        <el-table-column  label="操作" width="210">
          <template slot-scope="scope">
            <el-link type="primary" @click="handleSee(scope.row,scope.$index)">查看</el-link>
            <el-link type="danger" @click="del(scope.row,scope.$index)">删除</el-link>
            <el-link type="primary" @click="exportModal(scope.row.id)">导出</el-link>
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
import {$budgetAPI} from '@/api';
import {getSessionStorage} from "@/common/js/storage"
import {getCookie} from "@/common/js/cookie"
import prefixAPI from "@/api/prefixAPI";
import propCascader from "@/components/cascader/prop-cascader.vue";
  export default {
    data(){
      return{
        form: {
          fileName:undefined,
          areaSelect: {
            areaId:"",
            areaLvl:""
          }
        },
        tableData:[],
        areaList:[],
        tableTemp:[],
        tableLoading:false,
        pageSize: 10,
        currentPage: 1,
        dataTotal:100,
      }
    },
    created(){
      this.accountInfo = JSON.parse(getSessionStorage('accountInfo'));
      // this.form.areaSelect.areaId = this.accountInfo.areaId;
      // this.form.areaSelect.areaLvl = this.accountInfo.areaLvl;
      this.form.areaSelect.areaId = this.$route.query.areaId;
      this.form.areaSelect.areaLvl = this.$route.query.areaLvl;
      this.form.areaSelect.areaName = this.$route.query.areaName;
      this.init();
    },
    components: {
      propCascader
    },
    methods:{
      //时间格式化
      dateFormat(row, column, cellValue, index) {
        return this.moment(cellValue).format("YYYY-MM-DD HH:mm:ss");
      },
      exportModal(val){
           // 根据不同模式切换不同的路径
           let token = getCookie('token')
        if (process.env.NODE_ENV == 'development') {
          window.location.href = prefixAPI.loc + "/api/releaseSecond/export?recordId=" + val + "&token=" + token;
        } else if (process.env.NODE_ENV == 'production') {
          window.location.href = prefixAPI.hp + "/api/releaseSecond/export?recordId=" + val + "&token=" + token;
        }
      },
      init(){

        this.accountInfo = JSON.parse(getSessionStorage('accountInfo'));
        this.getCompanyByLvl();
        let params = {
          recordName:"",
          // areaId:this.accountInfo.areaId,
          areaId:this.form.areaSelect.areaId,
        };
        this.getList(params);
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
      //获取下达列表
      getList(params){
        $budgetAPI.getList(params,res=>{
          this.alertError(res);
          if(res.code == 0){
            this.tableData = res.content;
          }
        },err =>{

        })
      },


      async handleSearch(){
        let params = {
          recordName: this.form.fileName,
          areaId:this.form.areaSelect.areaId
        }
        this.getList(params);
      },
      //
      handleSee(row,index){
        this.$router.push({path:"/budget/budgetDelivery",query:{...row}});
      },
      del(row,index){
        this.$confirm('此操作将删除该条数据，是否继续？','提示',{
          confirmButtonText:'确定',
          cancelButtonText:'取消',
          type:"warning"
        }).then(()=>{
          $budgetAPI.doDelete({
            recordId:row.id,
          },res =>{
            this.alertError(res);
            if(res.code == 0){
              this.$message({
                type:"success",
                message:"删除成功",
              });
              let params = {
                recordName: this.form.fileName,
                areaId:this.form.areaSelect.areaId
              }
              this.getList(params)
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

    },


  }
</script>

<style lang="scss" scoped>

</style>
