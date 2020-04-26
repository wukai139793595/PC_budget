<template>
<!--  <div style="height:100%" :class="[{'main-app':$route.name != 'home'}]">-->
    <div  :class="[{'main-app':$route.name != 'home'}]">
<!--    <el-scrollbar  style="height:100%">-->
    <transition :name="transitionName" mode="out-in">
        <keep-alive>
          <router-view v-if="$route.meta.keepAlive" class="child-view"></router-view>
        </keep-alive>
    </transition>
    <transition :name="transitionName" mode="out-in">
        <router-view v-if="!$route.meta.keepAlive" class="child-view"></router-view>
    </transition>
<!--    </el-scrollbar>-->
  </div>
</template>

<script>
  export default {
    name: 'app-main',
    data() {
      return {
        desc: '这里是右侧主界面',
        transitionName: 'slide-left'
      }
    }
  }
</script>

<style lang="scss" scoped>
.main-app {
  box-shadow: 5px 5px 10px rgba(0,0,0,0.3);
  border-radius: 2px 0 0 0;
  padding: 10px 20px;
  background:#fff;
	min-height:100%;
  margin:4px 0 0 4px;
	overflow: auto;
}
.child-view {
   width:100%;
   transition: all .2s cubic-bezier(.55,0,.1,1);
}
.slide-left-enter, .slide-right-leave-active {
   opacity: 0;
  //  -webkit-transform: translate(50px, 0);
  //  transform: translate(50px, 0);
}
.slide-left-leave-active, .slide-right-enter {
   opacity: 0;
  //  -webkit-transform: translate(-50px, 0);
  //  transform: translate(-50px, 0);
}
</style>
<style lang="scss">
</style>
