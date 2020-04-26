<template>
  <div class="sidebar" :class="{'sidebarSmall':isCollapse}">
    <el-scrollbar style="height:100%;">
      <div class="sidebarTop">
        <i class="iconfont icon-suojin" :class="{'is-collapse':isCollapse}" @click="setNav"></i>
      </div>
      <el-menu
        class="el-menu-vertical-demo"
        mode="vertical"
        :unique-opened="true"
        @open="handleOpen"
        @close="handleClose"
        :collapse="isCollapse"
        background-color="#364056"
        text-color="#fff"
        :router="true"
        :default-active="$route.path"
        active-text-color="#f90"
      >
        <sidebar-item v-for="item of navData" :key="item.id" :item="item" :base-path="item.path"></sidebar-item>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import SidebarItem from "./sidebar-item";
import { $budget } from "@/api";

export default {
  components: {
    SidebarItem
  },
  data() {
    return {
      isCollapse: false,
      navDataHome: "/",
      navData: [
        {
          id: 1,
          name: "个人工作台",
          path: "/budget/home",
          icon: "icon-gongzuotai",
          children: []
        },
        {
          id: 2,
          name: "指标库",
          icon: "icon-zhibiao",
          path: "/budget/quotaWarehouse"
        },
        {
          id: 3,
          name: "预算指引",
          icon: "icon-zhiying-",
          path: "/budget/budgetGuide"
        },
        {
          id: 4,
          name: "预算编制",
          path: "/##4",
          icon: "icon-jisuanqi",
          children: [
            {
              id: 41,
              name: "自下而上的空间编制",
              path: "/budget/upToDownOrganization"
            },
            {
              id: 42,
              name: "自下而上的编制",
              path: "/budget/newUpToDownOrganization"
            },
            {
              id: 43,
              name: "预测验证",
              path: "/budget/forecastVerification"
            },
            //   {
            // 	id: 44,
            // 	name: "自上而下的空间预测",
            // 	path: "/budget/budgetDecomposition"
            //   },
            {
              id: 45,
              name: "自上而下的趋势预测",
              path: "/budget/upToDownTrend"
            },
            {
              id: 46,
              name: "TOB-TOC 预算编制",
              path: "/budget/TOBTOC"
            }
          ]
        },
        {
          id: 5,
          name: "预算下达",
          icon: "icon-yusuan",
          path: "/budget/budgetDelivery"
        },
        {
          id: 6,
          name: "预算跟踪",
          path: "##6",
          icon: "icon-genzong",
          children: [
            {
              id: 41,
              name: "总体经营评价",
              path: "/budget/operationEvaluation"
            },
            {
              id: 42,
              name: "业务量指标",
              path: "/budget/trafficIndicators"
            },
            {
              id: 43,
              name: "收入跟踪",
              path: "/budget/incomeTracking"
            },
            //   {
            // 	id: 43,
            // 	name: "分套餐收入跟踪",
            // 	path: "/budget/pointMeal"
            //   },
            {
              id: 44,
              name: "销售费用跟踪",
              path: "/budget/sellTracking"
            },
            {
              id: 45,
              name: "通信主业明细表",
              path: "/budget/detailTable"
            },
            {
              id: 46,
              name: "预算编制汇总",
              path: "/budget/compilationSummary"
            },
          ]
        },
        {
          id: 7,
          name: "收入预估",
          path: "##7",
          icon: "icon-shouru",
          children: [
            {
              id: 71,
              name: "收入预估",
              path: "/budget/incomeForecast"
            },
            {
              id: 72,
              name: "计费系统日账",
              path: "/budget/chargeSystem"
            },
            {
              id: 73,
              name: "导入预估",
              path: "/budget/forecastImport"
            }
          ]
        }
      ]
    };
  },
  computed: {},
  mounted() {
    // this.init();
  },
  methods: {
    handleOpen(key, keyPath) {
      // console.log("handleOpen", key, keyPath);
    },
    handleClose(key, keyPath) {
      // console.log("handleClose", key, keyPath);
    },
    // 初始化 获取左侧菜单
    init() {
      $b2i.getNavTree(
        {},
        res => {
          console.log(res);

          if (res.code != "0000") {
            this.navData = [];
            return false;
          }
          this.navData = res.data;
        },
        err => {}
      );
    },
    setNav() {
      this.isCollapse = !this.isCollapse;
      this.$emit("leftNavState", this.isCollapse);
    }
  }
};
</script>

<style lang="scss" scoped>
.sidebar {
  position: fixed;
  left: 0;
  top: 68px;
  bottom: 0;
  width: 200px;
  background: #364056;
  color: #fff;
  overflow: hidden;
  transition: all 0.2s;
  &.el-scrollbar__wrap{
    overflow: hidden;
  }
  &.sidebarSmall {
    width: 64px;
    // width: 50px;
    .sidebarTop {
      text-align: center;
    }
  }
  .sidebarTop {
    height: 40px;
    line-height: 40px;
    background: #262d3c;
    margin-right: 2px;
    text-align: right;
    .iconfont {
      padding: 0 15px;
      font-size: 18px;
      display: inline-block;
      vertical-align: middle;
      cursor: pointer;
    }
    .is-collapse {
      transform: rotate(180deg);
    }
  }
}
</style>

<style lang="scss">
.el-menu {
  background: none !important;
  background-color: none !important;
  border: none;
}
.el-menu--collapse {
  width: 64px;
  // width: 50px;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
}
// .el-tooltip{
// 	padding: 0 15px!important;
// }
// .el-submenu__title{
// 	padding-left: 15px!important;
// }
</style>
