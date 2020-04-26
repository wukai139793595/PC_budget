<template>
  <div >
    <div class="contentTopTitle">
      <div class="fl">
        <div class="title">业务量指标</div>
      </div>
    </div>
    <div class="content" style="margin-top:3px">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="分产品" name="first">
          <points-products ref="tab1"></points-products>
        </el-tab-pane>
        <el-tab-pane label="分渠道" name="second">
          <points-channels ref="tab2"></points-channels>
        </el-tab-pane>
        <el-tab-pane label="新增趋势" name="third">
          <xz-trend ref="tab3"></xz-trend>
        </el-tab-pane>
        <el-tab-pane label="净增趋势" name="fourth">
          <jz-trend ref="tab4"></jz-trend>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
  import pointsProducts from "@/views/budget/tracking/pointsProducts";
  import pointsChannels from "@/views/budget/tracking/pointsChannels";
  import xzTrend from "@/views/budget/tracking/xzTrend";
  import jzTrend from "@/views/budget/tracking/jzTrend";
  import { getSessionStorage } from "@/common/js/storage";
  export default {
    components:{
      pointsProducts,
      pointsChannels,
      xzTrend,
      jzTrend
    },
    data(){
      return{
        activeName:"first",
      }
    },
    mounted(){
      this.$refs.tab1.init();
    },
    methods:{
      handleClick(tab,event){
        if(tab.name == "first"){
          this.$refs.tab1.init();
        }
        if(tab.name == "second"){
          this.$refs.tab2.init();
        }
        if(tab.name == "third"){
          this.$refs.tab3.init();
        }
        if(tab.name == "fourth"){
          this.$refs.tab4.init();
        }

      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
