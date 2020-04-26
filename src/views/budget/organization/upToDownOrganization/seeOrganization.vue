<template>
  <div class="seeOrganization">
    <div class="contentTopTitle">
      <div class="fl">
        <div class="title">查看编制</div>
      </div>
      <div class="fr">
        <el-button size="small" plain @click="$router.go(-1)">返回</el-button>
      </div>
    </div>
    <div class="table-content">
      <div class="table-header">
        <p class="table-title"><span></span>{{$route.query.fileName}}</p>
      </div>
    </div>
    <div class="tableBox">
      <el-table v-loading="tableLoading" :data="tableData" style="width: 100%" class="tableTh28" border stripe height="71vh" ref="table">
        <el-table-column label="区域树" fixed prop="areaName" width="150" class-name="area fixedColumn" :show-overflow-tooltip="true">
          <template slot-scope="scope">
            <span :class=" 'indent' + scope.row.areaLvl ">
              <i :class="scope.row.icon" @click="addOrMinus(scope.row,scope.$index)"></i>
              {{scope.row.areaName}}
            </span>
          </template>
        </el-table-column>
        <el-table-column label="房间数（户）" prop="val1"></el-table-column>
        <el-table-column label="人口数（户）" prop="val2"></el-table-column>
        <el-table-column label="企业数（户）" prop="val3"></el-table-column>
        <el-table-column label="分项收入预算">
          <el-table-column label="组网专线">
            <el-table-column>
              <el-table-column label="组网专线用户到达数" prop="val4"></el-table-column>
            </el-table-column>
            <el-table-column>
              <el-table-column label="组网专线净增（户）" prop="val15"></el-table-column>
            </el-table-column>
            <el-table-column>
              <el-table-column label="组网专线渗透率（%）" prop="val6"></el-table-column>
            </el-table-column>
            <el-table-column>
              <el-table-column label="组网专线ARPU" prop="val7"></el-table-column>
            </el-table-column>
            <el-table-column>
              <el-table-column label="组网专线收入" prop="val8"></el-table-column>
            </el-table-column>
          </el-table-column>
          <el-table-column label="宽带业务">
            <el-table-column label="普通宽带（含闪讯）">
              <el-table-column label="普通宽带用户到达数" prop="val9"></el-table-column>
              <el-table-column label="普通宽带渗透率（%）" prop="val10"></el-table-column>
              <el-table-column label="普通宽带新增（户）" prop="val11"></el-table-column>
              <el-table-column label="普通宽带离网（户）" prop="val12"></el-table-column>
              <el-table-column label="普通宽带净增（户）" prop="val13"></el-table-column>
              <el-table-column label="普通宽带ARPU" prop="val14"></el-table-column>
              <el-table-column label="普通宽带收入" prop="val15"></el-table-column>
            </el-table-column>
            <el-table-column label="互联网专线（含商务专线）">
              <el-table-column label="互联网专线到达数" prop="val16"></el-table-column>
              <el-table-column label="互联网专线渗透率（%）" prop="val17"></el-table-column>
              <el-table-column label="互联网专线新增（户）" prop="val18"></el-table-column>
              <el-table-column label="互联网专线离网（户）" prop="val19"></el-table-column>
              <el-table-column label="互联网专线净增（户）" prop="val20"></el-table-column>
              <el-table-column label="互联网专线ARPU" prop="val21"></el-table-column>
              <el-table-column label="互联网专线收入" prop="val22"></el-table-column>
            </el-table-column>
          </el-table-column>
          <el-table-column label="移动业务（不含移动CIT">
            <el-table-column>
              <el-table-column label="移动用户到达数" prop="val23"></el-table-column>
            </el-table-column>
            <el-table-column>
              <el-table-column label="移动用户渗透率（%）" prop="val24"></el-table-column>
            </el-table-column>
            <el-table-column>
              <el-table-column label="移动新增（户）" prop="val25"></el-table-column>
            </el-table-column>
            <el-table-column>
              <el-table-column label="移动离网（户）" prop="val26"></el-table-column>
            </el-table-column>
            <el-table-column>
              <el-table-column label="移动净增（户）" prop="val27"></el-table-column>
            </el-table-column>
            <el-table-column>
              <el-table-column label="移动ARPU" prop="val28"></el-table-column>
            </el-table-column>
            <el-table-column>
              <el-table-column label="移动收入" prop="val29"></el-table-column>
            </el-table-column>
            <el-table-column>
              <el-table-column label="其中：物联网收入" prop="val30"></el-table-column>
            </el-table-column>
            <el-table-column>
              <el-table-column label="物联网收入增长率" prop="val31"></el-table-column>
            </el-table-column>
          </el-table-column>
          <el-table-column lable="ITV业务">
            <el-table-column>
              <el-table-column label="ITV用户到达数（户）" prop="val32"></el-table-column>
            </el-table-column>
            <el-table-column>
              <el-table-column label="ITV用户渗透率" prop="val33"></el-table-column>
            </el-table-column>
            <el-table-column>
              <el-table-column label="ITV净增（户）" prop="val34"></el-table-column>
            </el-table-column>
            <el-table-column>
              <el-table-column label="ITV用户ARPU" prop="val35"></el-table-column>
            </el-table-column>
            <el-table-column>
              <el-table-column label="ITV收入" prop="val36"></el-table-column>
            </el-table-column>
          </el-table-column>
          <el-table-column label="固话业务">
            <el-table-column>
              <el-table-column label="固话收入" prop="val37"></el-table-column>
            </el-table-column>
            <el-table-column>
              <el-table-column label="固话收入变化" prop="val38"></el-table-column>
            </el-table-column>
          </el-table-column>
          <el-table-column label="智能组网">
            <el-table-column>
              <el-table-column label="智能组网收入" prop="val39"></el-table-column>
            </el-table-column>
            <el-table-column>
              <el-table-column label="智能组网收入变化" prop="val40"></el-table-column>
            </el-table-column>
          </el-table-column>
          <el-table-column label="号百">
            <el-table-column>
              <el-table-column label="号百收入" prop="val41"></el-table-column>
            </el-table-column>
            <el-table-column>
              <el-table-column label="号百收入变化" prop="val42"></el-table-column>
            </el-table-column>
          </el-table-column>
          <el-table-column label="ICT">
            <el-table-column>
              <el-table-column label="ICT收入" prop="val43"></el-table-column>
            </el-table-column>
            <el-table-column>
              <el-table-column label="ICT收入变化" prop="val44"></el-table-column>
            </el-table-column>
          </el-table-column>
          <el-table-column label="IDC">
            <el-table-column>
              <el-table-column label="IDC收入" prop="val45"></el-table-column>
            </el-table-column>
            <el-table-column>
              <el-table-column label="IDC收入变化" prop="val46"></el-table-column>
            </el-table-column>
          </el-table-column>
          <el-table-column label="其他">
            <el-table-column>
              <el-table-column label="其他收入" prop="val47"></el-table-column>
            </el-table-column>
            <el-table-column>
              <el-table-column label="其他收入变化" prop="val48"></el-table-column>
            </el-table-column>
          </el-table-column>
        </el-table-column>
        <el-table-column label="总收入" prop="val49"></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
  import { $budgetAPI } from '@/api'
  import {getSessionStorage} from "@/common/js/storage";
  export default {
    name: "seeOrganization",
    data() {
      return {
        tableData: [],
        tableLoading: false,
        accountInfo:{}
      }
    },
    created() {
      this.showEditData();
    },
    methods: {
      //增加或展开行
      addOrMinus(row,index){
        if(row.icon == 'el-icon-plus'){
          let params = {
            areaId: row.areaId,
            year: row.year,
          };
          this.getSubEditData(params,index);
          row.icon = 'el-icon-minus';
          return false
        }
        if(row.icon == 'el-icon-minus'){
          let i = 0;
          this.tableData.map((item,index)=>{
            if(item.parentId == row.areaId){
              i++;
            }
          });
          this.tableData.splice(index + 1,i);
          row.icon = 'el-icon-plus';
        }
      },
      showEditData(){
        this.tableLoading = true;
        this.accountInfo = JSON.parse(getSessionStorage('accountInfo'));
        let areaLvl = this.accountInfo.areaLvl;
        $budgetAPI.showEditData({
          detailId:this.$route.query.detailId,
          type:1
        },res=>{
          this.alertError(res);
          if(res.code == 0){
            res.content.map((item,index)=>{
              if(item.areaLvl == 5){
                this.$set(item,'icon','')
              }
              if(item.areaLvl == areaLvl){
                this.$set(item,'icon','el-icon-minus')
              }
              if(item.areaLvl > areaLvl && item.areaLvl != 5){
                this.$set(item,'icon','el-icon-plus')
              }
              if(index == 0  && item.areaLvl != 5){
                this.$set(item,'icon','el-icon-minus')
              }
              this.tableData.push(item);
            });
          }
          setTimeout(()=>{
            this.$refs.table.doLayout();
          },500);
          this.tableLoading = false
        },err=>{

        })
      },
      getSubEditData(params,rowIndex){
        // this.tableLoading = true;
        let areaLvl = this.accountInfo.areaLvl;
        $budgetAPI.getSubEditData(params,res=>{
          this.alertError(res);
            let i = 0;
            if(res.content.length > 0){
              res.content.map((item,index)=>{
                  if(item.areaLvl == 5){
                    this.$set(item,'icon',null)
                  }
                  if(item.areaLvl == areaLvl){
                    this.$set(item,'icon','el-icon-minus')
                  }
                  if(item.areaLvl > areaLvl && item.areaLvl != 5){
                    this.$set(item,'icon','el-icon-plus')
                  }
                  i++;
                  this.tableData.splice(rowIndex + i,0,item)
              });
              this.tableLoading = false;
            }else{
              // this.$message('当前层级下没有数据');
              // this.tableLoading = false
            }
          setTimeout(()=>{
            this.$refs.table.doLayout();
          },500);
        },err=>{

        })
      }
    }
  }
</script>

<style  lang="scss">
  .seeOrganization{

    .table-content{
      margin-top: 10px;
      .table-header{
        display: flex;
        justify-content: space-between;
        .table-title{
          font-size: 14px;
          font-weight: bold;
          height: 30px;
          line-height: 30px;
          span{
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
    }
    th.el-table_1_column_1.area{
      text-align: center!important;
    }
    .area{
      text-align: left !important;

      span.indent2{
        padding-left: 2px;
      }
      span.indent3{
        padding-left: 16px;
      }
      span.indent4{
        padding-left: 32px;
      }
      span.indent5{
        padding-left: 48px;
        i{
          border:0;
        }
      }
      i{
        cursor: pointer;
        border:1px solid #3a85e1;
        padding: 1px;
        border-radius:2px;
        margin-right: 2px;
        color: #3a85e1;
      }
    }
  }

</style>
