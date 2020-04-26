<template>
  <div class="budgetDelivery-tab2">
    <div class="tableBox">
      <el-table v-loading="tableLoading" :data="tableData" height="56vh"
                style="width: 100%" class="tableTh28" border stripe ref="table1"
      >
        <el-table-column  prop="val1" label="年度目标" width="120" class-name="firstProject "  :show-overflow-tooltip="true"></el-table-column>
        <el-table-column  prop="val2" label="年度目标" width="120" class-name="secondProject  right-money"  ></el-table-column>
        <el-table-column label="分月预算">
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
    name: "budgetDelivery-tab2",
    props:{
      sheetList1:{
        type:Array,
        default:[]
      },
      sheetList2:{
        type:Array,
        default:[]
      },
      sheetList3:{
        type:Array,
        default:[]
      },
    },
    watch:{
      sheetList1(val){
        this.tableData = [];
        val.map((item,index)=>{
          let obj = {
            val1:"",
            val2:"",
            val3:"",
            val4:"",
            val5:"",
            val6:"",
          };
          item.map((child,idx)=>{
            this.$set(obj,'val' + (idx + 1),child);
          });
          this.tableData.push(obj);
        });
      },
      sheetList2(val){
        this.tableData1 = [];
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
          this.tableData1.push(obj);
        });
        setTimeout(()=>{
          this.$refs.table.doLayout();
          this.$refs.table1.doLayout();
        },500);

      },
      sheetList3(val){
        this.tableData2 = [];
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
          };
          item.map((child,idx)=>{
            this.$set(obj,'val' + (idx + 1),child);
          });
          this.tableData2.push(obj);
        });
      },

    },
    data(){
      return{
        tableLoading:false,
        tableData:[],
        tableData1:[],
        tableData2:[],

      }
    },

  }
</script>

<style lang="scss">
  .firstProject,.secondProject{
    .cell{
      color: #000;
      font-weight: 700;
    }
  }
  .firstProject.is-leaf {
    position: relative;
    border-right: 1px solid #d7e5fb!important;
    .cell{
      color: #d7e5fb;
    }
  }
  .secondProject.is-leaf {
    overflow: visible;
    .cell{
      transform: translateX(-50%);
    }
  }
</style>
