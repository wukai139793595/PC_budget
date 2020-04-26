<template>
  <div class="budgetDelivery-tab1">
    <div class="tableBox">
      <el-table v-loading="tableLoading" :data="tableData" height="60vh"
                style="width: 100%" class="tableTh28" border stripe ref="table"
      >
        <el-table-column  prop="val1" label="单位" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column :label="year - 1 + '年完成（万元）'">
          <el-table-column prop="val2" label="预算" class-name="right-money"></el-table-column>
          <el-table-column prop="val3" label="实际完成" class-name="right-money"></el-table-column>
          <el-table-column prop="val4" label="预算完成率" ></el-table-column>
        </el-table-column>
        <el-table-column :label=" year + '年预算（万元）' ">
          <el-table-column prop="val5" label="增幅" ></el-table-column>
          <el-table-column prop="val6" label="梯队" ></el-table-column>
          <el-table-column prop="val7" label="目标值" class-name="right-money"></el-table-column>
          <el-table-column prop="val8" label="增量收入" class-name="right-money"></el-table-column>
          <el-table-column prop="val9" label="市场份额提升（%）" min-width="130"></el-table-column>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
  export default {
    name: "budgetDelivery-tab1",
    props:{
      sheetList:{
        type:Array,
        default:[]
      },
      year:{

      }
    },
    watch:{
      sheetList(val,oldVal){
        this.tableData = [];
        val.map((item,index)=>{
          let obj = {
              val1:"",
              val2:"",
              val3:"",
              val4:"",
              val5:"",
              val6:"",
              val7:"",
              val8:"",
              val9:"",
          };
          item.map((child,idx)=>{
            this.$set(obj,'val' + (idx + 1),child);
          });
          setTimeout(()=>{
            this.$refs.table.doLayout();
          },1000);
          this.tableData.push(obj);
        });
      }
    },
    data(){
      return{
        tableLoading:false,
        tableData:[],
        obj:{
          val1:"",
          val2:"",
          val3:"",
          val4:"",
          val5:"",
          val6:"",
          val7:"",
          val8:"",
          val9:"",
        }
      }
    },

  }
</script>

<style scoped>

</style>
