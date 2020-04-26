<template>
  <div class="tab1">
    <div class="table-header">
      <p class="table-title"><span></span>表名</p>
      <div class="fr btn-right">
        <el-button size="small" style="margin-left: 10px" >测算</el-button>
        <el-button size="small" style="margin-left: 10px" type="primary">保存</el-button>
      </div>
    </div>
    <div>
      <p class="p-title">测算结果</p>
      <div class="tableBox" >
        <el-table border :data="tableData1" class="tableTh28">
          <el-table-column label="指标" fixed class-name="fixedColumn" prop="val0" width="200"></el-table-column>
          <el-table-column  v-for="(item,index) in titleList" :key="index" :prop=" 'val' + (index+1)" :label="item"></el-table-column>
        </el-table>
      </div>
    </div>

    <div>
      <p class="p-title">2019年移动净增收入</p>
      <div class="tableBox" >
        <el-table border :data="tableData2" class="tableTh28">
          <el-table-column label="指标" fixed class-name="fixedColumn" prop="val0" width="200"></el-table-column>
          <el-table-column  v-for="(item,index) in titleList" :key="index" :prop=" 'val' +  (index+1)" :label="item"></el-table-column>
        </el-table>
      </div>
    </div>
    <div>
      <p class="p-title">移动历史新增量</p>
      <div class="tableBox" >
        <el-table border :data="tableData3" class="tableTh28">
          <el-table-column label="指标" fixed class-name="fixedColumn" prop="val0" width="200"></el-table-column>
          <el-table-column  v-for="(item,index) in titleList" :key="index" :prop=" 'val' +  (index+1)" :label="item"></el-table-column>
        </el-table>
      </div>
    </div>
    <div>
      <p class="p-title">政企渠道发展能力</p>
      <div class="tableBox" >
        <el-table border :data="tableData4" class="tableTh28">
          <el-table-column label="指标" fixed class-name="fixedColumn" prop="val0" width="200"></el-table-column>
          <el-table-column  v-for="(item,index) in titleList" :key="index" :prop=" 'val' +  (index+1)" :label="item"></el-table-column>
        </el-table>
      </div>
    </div>
    <div>
      <p class="p-title">公众渠道发展能力</p>
      <div class="tableBox" >
        <el-table border :data="tableData5" class="tableTh28">
          <el-table-column label="指标" fixed class-name="fixedColumn" prop="val0" width="200"></el-table-column>
          <el-table-column  v-for="(item,index) in titleList" :key="index" :prop=" 'val' +  (index+1)" :label="item"></el-table-column>
        </el-table>
      </div>
    </div>
    <div>
      <p class="p-title">开发渠道发展能力</p>
      <div class="tableBox" >
        <el-table border :data="tableData6" class="tableTh28">
          <el-table-column label="指标" fixed class-name="fixedColumn" width="200" prop="val0"></el-table-column>
          <el-table-column  v-for="(item,index) in titleList" :key="index" :prop=" 'val' +  (index+1)" :label="item"></el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "tab1",
    data(){
      return{
        tableData1:[
          {
            val0:"18年增长率",
            val1:"",
            val2:"13.4%",
            val3:"",
            val4:"5.8%",
            val5:"-1.1%",
            val6:"-13.0%",
            val7:"7.0%",
            val8:"15.1%",
            val9:"27.9%",
            val10:"14.8%",
            val11:"",
            val12:"13.2%",
            val13:"24.6%",
            val14:"-3.6%",
            val15:"10.0%",
            val16:"12.2%",
            val17:"35.7%",
            val18:"12.3%",
            val19:"-3.4%",
            val20:"-4.5%",
          },
          {
            val0:"2019年收入增长率",
            val1:"",
            val2:"14.2%",
            val3:"",
            val4:"16.23%",
            val5:"15.58%",
            val6:"18.79%",
            val7:"15.67%",
            val8:"17.51%",
            val9:"23.4%",
            val10:"14.25%",
            val11:"",
            val12:"14.39%",
            val13:"18.7%",
            val14:"18.73%",
            val15:"16.22%",
            val16:"12.99%",
            val17:"20.82%",
            val18:"16.84%",
            val19:"3.00%",
            val20:"12.00%",
          },
          {
            val0:"2019年移动净增收入",
            val1:"",
            val2:"33018",
            val3:"",
            val4:"2083.9",
            val5:"2219.4668",
            val6:"5040.53",
            val7:"2621.85",
            val8:"29473.99",
            val9:"3546.61",
            val10:"2201.36",
            val11:"",
            val12:"4977.15",
            val13:"6862.33",
            val14:"1482.27",
            val15:"1280.51",
            val16:"859.519",
            val17:"1309.81",
            val18:"581.28",
            val19:"104",
            val20:"216",
          },
          {
            val0:"2019年移动收入到达",
            val1:"",
            val2:"265168",
            val3:"",
            val4:"14919.8",
            val5:"16463.596",
            val6:"31871.3",
            val7:"19353.6",
            val8:"19752.6",
            val9:"18705.6",
            val10:"17652",
            val11:"",
            val12:"13.17652",
            val13:"17652",
            val14:"17652",
            val15:"117652",
            val16:"17652",
            val17:"17652%",
            val18:"17652",
            val19:"176524",
            val20:"17652",
          },
        ],
        tableData2:[
          {val0:"2019年移动净增量（不含高校）"},
          {val0:"2019年移动发展净增量占比（不含高校）"},
          {val0:"移动历史新增量"},
          {val0:"政企渠道发展能力"},
          {val0:"公众渠道发展能力"},
          {val0:"开放渠道发展能力"},
          {val0:"2018年移动存量用户到达"},
          {val0:"2019年存量用户ARPU预估备用"},
          {val0:"2018年移动收入（11-12月预估）"},
          {val0:"2019年移动净增量（不含高校）"},
          {val0:"2019年高校移动收入净增预估"},
        ],
        tableData3:[
          {val0:"移动历史新增量"},
          {val0:"2017新增"},
          {val0:"1810累计新增"},
          {val0:"按历年新增预测19年新增"},
          {val0:"校园历史新增"},
          {val0:"17快销卡新增"},
          {val0:"18快销卡新增"},
        ],
        tableData4:[
          {val0:"政企渠道发展能力"},
          {val0:"客户经理数量"},
          {val0:"服务客户数量"},
          {val0:"服务客户收入（剔除IDC、ICT）"},
        ],
        tableData5:[
          {val0:"公众渠道发展能力"},
          {val0:"区域过往份额"},
          {val0:"存增量宽带融合拉新发展量"},
          {val0:"客触岗人数（人力部）"},
          {val0:"房间数"},
          {val0:"人口数"},
          {val0:"主副卡活跃率"},
        ],
        tableData6:[
          {val0:"开放渠道发展能力"},
          {val0:"2017新增"},
          {val0:"网点数量"},
          {val0:"网点月均产量"},
        ],
        titleList:[
          "因子权重",
          "本地网",
          "",
          "上城",
          "下城",
          "西湖",
          "拱墅",
          "江干",
          "滨江",
          "下沙",
          "",
          "萧山",
          "余杭",
          "富阳",
          "临安",
          "桐庐",
          "建德",
          "淳安",
          "市政企",
          "省政企",
          ]
      }
    }
  }
</script>

<style scoped lang="scss">
  .p-title{
    font-size: 14px;
    font-weight: bold;
    margin-bottom: 10px;
    margin-top: 10px
  }
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
      margin-left: 5px;
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
</style>
