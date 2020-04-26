<template>
  <div class="home">
    <!-- 管理员界面 -->
    <div  v-if="role == 'manager' ">
      <manager></manager>
    </div>
    <!-- 非管理员展示页面 -->
    <div :class="['fixed_nav_main',{'top':role == 'manager' && !fixed},{'fixed':fixed}]" id="fixedNav">
      <ul class="fixed_nav_tabs">
        <li
          v-for="(item,index) in titleList"
          :key="index"
          :class="{'active':ins == index}"
          @click="activeState(index)"
        >
          <img
            src="~@/assets/images/common/pos.png"
            alt
            style="vertical-align:middle;margin-right:5px"
            v-if="ins == index"
          />
          <span v-else style="display:inline-block;width:17px;height:18px"></span>
          {{item.name}}
        </li>
      </ul>
    </div>

    <!--整体评价-->
    <div :class="['radar',{'scorllTop':fixed}]" id="radar" >
      <global></global>
    </div>

    <!-- 量收趋势 -->
    <div class="liangsqs" id="liangsqs">
      <liangsqs></liangsqs>
    </div>

    <div class="liangsqs2" >
      <liangsqs2></liangsqs2>
    </div>

    <!--收入预估  -->
    <div class="income_tracking" id="income_tracking">
      <incomingTracking></incomingTracking>
    </div>
  </div>
</template>

<script>
import { $budgetAPI } from "@/api";
import manager from "@/views/workSpace/managerView"
import global from "@/views/workSpace/globalAssessment"
import liangsqs from "@/views/workSpace/liangsqs"
import liangsqs2 from "@/views/workSpace/liangsqs2"
import incomingTracking from "@/views/workSpace/incomingTracking"

import {
  setSessionStorage,
  getSessionStorage,
  removeSessionStorage
} from "@/common/js/storage";

export default {
  data() {
    return {
      role: "manager",
      // role: "",
      ins: 0,
      titleList: [
        { name: "整体评价" },
        { name: "量收趋势" },
        { name: "收入预估" }
      ],
      fixed:false,
      offsetTop:null,
    };
  },
  components: {
    manager,
    global,
    liangsqs,
    liangsqs2,
    incomingTracking,
  },
  created() {
    
  },
  mounted() {
     window.addEventListener("scroll", this.handleScroll);
     this.$nextTick(() => {
        this.offsetTop = document.querySelector("#fixedNav").offsetTop;
      });
  },
  destroyed() {
      window.removeEventListener("scroll", this.handleScroll);
    },
  methods: {
    handleScroll() {
        let scrollTop =
          window.pageYOffset ||
          document.documentElement.scrollTop ||
          document.body.scrollTop;
          console.log()
        this.fixed = scrollTop > this.offsetTop? true : false;
      },
    activeState(val) {
      this.ins = val;
      if(val == 0){
        document.querySelector("#radar").scrollIntoView(false);
      }
      if(val == 1){
        document.querySelector("#liangsqs").scrollIntoView(false);
      }
      if(val == 2){
        document.querySelector("#income_tracking").scrollIntoView(false);
      } 
    },
  }
};
</script>

<style lang="scss" scoped>
.home {
  background-color: #f5f9ff;
  width: 100%;
  min-height: 100%;
  overflow: hidden;
  padding: 15px 15px 0 15px;
  position: relative;
  .fixed_nav_main {
    width: 99%;
    background-color: #ffffff;
    height: 50px;
    line-height: 50px;
    border: 1px solid #dee5f3;
    border-radius: 5px;
    &.fixed{
      width: calc(100% - 200px);
      border:0;
      z-index: 99;
      border-top: 1px solid transparent;
      border-bottom: 1px solid #dee5f3;
      border-radius: 0px;
      position:fixed;
      left:200px;
      top:68px;
    }
    &.top {
      margin: 10px 0;
    }
    .fixed_nav_tabs {
      width: 100%;
      display: flex;
      justify-content: space-around;
      align-items: center;
      font-size: 14px;
      columns: #333333;
      font-weight: 400;
      img {
        width: 12px;
        height: 18px;
      }
      li {
        height: 48px;
        line-height: 48px;
        cursor: pointer;
        &.active {
          color: #3a85e1;
          border-bottom: 3px solid #3a85e1;
        }
      }
    }
  }
  .radar{
    &.scorllTop{
      margin-top: 70px;
    }
  }
}
</style>