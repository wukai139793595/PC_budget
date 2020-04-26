<template>
  <div class="budgetDelivery-tab5">
    <div class="tableBox">
      <el-table v-loading="tableLoading" :data="tableData" height="60vh"
                style="width: 100%" class="tableTh28" border stripe ref="table"
      >
        <el-table-column  prop="val1" label="单位" width="100" :show-overflow-tooltip="true" fixed class-name="fixedColumn"></el-table-column>
        <el-table-column  prop="val2" label="年度预算" class-name="right-money"></el-table-column>
        <el-table-column label="月度预算">
          <el-table-column prop="val3" label="1月" class-name="right-money"></el-table-column>
          <el-table-column prop="val4" label="2月" class-name="right-money"></el-table-column>
          <el-table-column prop="val5" label="3月" class-name="right-money"></el-table-column>
          <el-table-column prop="val6" label="4月" class-name="right-money"></el-table-column>
          <el-table-column prop="val7" label="5月" class-name="right-money"></el-table-column>
          <el-table-column prop="val8" label="6月" class-name="right-money"></el-table-column>
          <el-table-column prop="val9" label="7月" class-name="right-money"></el-table-column>
          <el-table-column prop="val10" label="8月" class-name="right-money"></el-table-column>
          <el-table-column prop="val11" label="9月" class-name="right-money"></el-table-column>
          <el-table-column prop="val12" label="10月" class-name="right-money"></el-table-column>
          <el-table-column prop="val13" label="11月" class-name="right-money"></el-table-column>
          <el-table-column prop="val14" label="12月" class-name="right-money"></el-table-column>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
  export default {
    name: "budgetDelivery-tab5",
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
            val10:"",
            val11:"",
            val12:"",
            val13:"",
            val14:"",
          };
          item.map((child,idx)=>{
            this.$set(obj,'val' + (idx + 1),child);
          });
          this.tableData.push(obj);
        });
        setTimeout(()=>{
          this.$refs.table.doLayout();
        },500);
      }
    },
    data(){
      return{
        tableLoading:false,
        tableData:[]
      }
    }
  }
</script>

<style scoped>

</style>
