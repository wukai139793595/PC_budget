<template>
  <div>
    <div class="contentTopTitle">
      <div class="fl">
        <div class="title">{{channelType.VP009010}}-分渠道</div>
      </div>
      <div class="fr">
        <el-button size="small" plain @click="$router.go(-1)">返回</el-button>
      </div>
    </div>
    <div class="content">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="全渠道" name="first">
          <tab1 :tab_list="tab1_list" :title="channelType[product]" :table_title="title1"/>
        </el-tab-pane>
        <el-tab-pane label="实体渠道" name="second">
          <tab1 :tab_list="tab2_list" :title="channelType[product]" :table_title="title2"/>
        </el-tab-pane>
        <el-tab-pane label="政企渠道" name="third">
          <tab1 :tab_list="tab3_list" :title="channelType[product]" :table_title="title3"/>
        </el-tab-pane>
        <el-tab-pane label="电子渠道" name="fourth">
          <tab1 :tab_list="tab4_list" :title="channelType[product]" :table_title="title4"/>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import tab1 from "./groupChannel_tab1";


import { $budgetAPI } from "@/api";
export default {
  data() {
    return {
      activeName: "first",
      title1:"全渠道",
      title2:"实体渠道",
      title3:"政企渠道",
      title4:"电子渠道",
      channelType: {
        VP009010: "移动",
        VP009011: "宽带",
        VP009012: "天翼高清"
      },
      channelApi: {
        VP009010: "findMobileIndexByChannel",
        VP009011: "findEntityIndexByChannel",
        VP009012: "findTianyiHighIndexByChannel"
      },
      tab1_list: [],
      tab2_list: [],
      tab3_list: [],
      tab4_list: []
    };
  },
  components: {
    tab1
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      let { year, areaId, product } = this.$route.query;
      this.year = year;
      this.areaId = areaId;
      this.product = product;
      $budgetAPI[this.channelApi[product]](
        {
          year,
          areaId
        },
        res => {
          if (res.code === 0) {
            let content = res.content;
            content.forEach(item => {
              switch (item.indexCode) {
                case "VP009010":
                case "VP009011":
                case "VP009012":
                  this.tab1_list = item.list;
                  break;
                case "VP009001":
                case "VP009004":
                case "VP009007":
                  this.tab2_list = item.list;
                  break;
                case "VP009002":
                case "VP009005":
                case "VP009008":
                  this.tab3_list = item.list;
                  break;
                case "VP009003":
                case "VP009006":
                case "VP009009":
                  this.tab4_list = item.list;
                  break;
              }
            });
          }else{
            this.alertError(res);
          }
        },
        err => {
          this.alertError(err);
        }
      );
    },
    handleClick(tab,event) {
      

    }
  }
};
</script>

<style lang="scss" scoped>
</style>