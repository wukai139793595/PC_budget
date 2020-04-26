<template>
  <div class="seeGuide">
    <div class="contentTopTitle">
      <div class="fl">
        <div class="title">{{targetName}}</div>
      </div>
      <div class="fr">
        <el-button size="small" plain @click="$router.go(-1)">返回</el-button>
      </div>
    </div>
    <div class="areaInfo">
      <span>区域名称：{{areaName}}</span>
      <span>区域编码：{{areaId}}</span>
    </div>
    <div class="tableBox">
      <el-table v-loading="tableLoading" :data="tableData"
                style="width: 100%" class="tableTh28" border height="67vh" stripe
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
    <div class="fujian"  v-if="files && files.length > 0">
      <p>附件</p>
      <div class="list">
        <div v-for="(item,index) in files" :key="index" class="list-item" @click="downLoad(item.id)">
          <img v-if="item.attachType == 'DOC' " src="~@/assets/images/common/WORD.png" alt="" width="21">
          <img v-if="item.attachType == 'EXCEL' " src="~@/assets/images/common/excel.png" alt="" width="21">
          <span>{{item.attachName}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {$budgetAPI} from '@/api';
  import prefixAPI from "@/api/prefixAPI";
  export default {
    name: "seeGuide",
    data() {
      return {
        tableData: [],
        tableLoading: false,
        targetName: "",
        areaId: "",
        areaName: "",
        files:[]
      }
    },
    methods: {
      init() {
        this.tableLoading = true;
        $budgetAPI.guideDetail({
          targetId: this.$route.query.targetId
        }, res => {
          this.tableLoading = false;
          this.alertError(res);
          this.tableData = res.content.guideLineDetail;
          this.targetName = res.content.targetName;
          this.areaId = res.content.areaId;
          this.areaName = res.content.areaName;
          this.files = res.content.files;
        }, err => {

        })
      },
      downLoad(val){
        if (process.env.NODE_ENV == 'development') {
          window.location.href = prefixAPI.loc + "/api/guide/downloadFiles?fileId=" + val;
        } else if (process.env.NODE_ENV == 'production') {
          window.location.href = prefixAPI.hp + "/api/guide/downloadFiles?fileId=" + val;
        }
      }
    },
    mounted() {
      this.init()
    }
  }
</script>
<style scoped lang="scss">
  .seeGuide {
    .areaInfo {
      span {
        display: inline-block;
        margin-right: 15px;
        height: 30px;
        line-height: 30px;

      }
    }
    .fujian{
      margin-top: 30px;
      .list{
        border: 1px solid #e6e6e6;
        padding: 21px 15px;
        display: flex;
        flex-wrap:wrap;
        .list-item{
          width: 22%;
          margin-right: 20px;
          cursor: pointer;
          img{
            vertical-align: middle;
          }
          span{
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
  .seeGuide{

  }
</style>
