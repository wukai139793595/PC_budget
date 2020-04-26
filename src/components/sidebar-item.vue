<template>
  <div>
      <el-submenu v-if="item.children && item.children.length > 0" :index="item.path" >
        <template slot="title">
          <i class="iconfont" :class="item.icon"></i><span slot="title">{{item.name}}</span>
        </template>

        <template v-for="child of item.children">
          <sidebar-item :item="child" :base-path="resolvePath(child.path)" v-if="child.children && child.children.length>0" />
          <el-menu-item v-else :route="child.path" :index="child.path">{{child.name}}</el-menu-item>
        </template>
      </el-submenu>


      <el-menu-item v-else :index="item.path" :route="{'path':resolvePath(item.path)}">
        <i class="iconfont" :class="item.icon"></i><span slot="title">{{item.name}}</span>
      </el-menu-item>

  </div>
</template>
<script>
  import path from 'path'
  export default {
    name: 'sidebar-item',
    components: {
      
    },
    props: {
      // 一级路由对象
      item: {
        type: Object,
        required: true
      },
      basePath: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        onlyOneChild: null
      }
    },
    methods: {
      hasOneShowingChildren(children, parent) {
        // 把 children 里面没有 hidden 属性的元素，收集起来，看看有哪些
        // 1、后面要来判断，children 里面是不是只有一个
        // 2、亦或者没有 【比如 '/login' 这个 route 就没有 children】
        // 3、亦或者 children 里面的子路由大于1个
        const showingChildren = children.filter(item => {
          if(item.hidden) {
            return false
          } else {
            // 这个地方就一直循环下去，至于是不是只有一个child，在后面会判断
            this.onlyOneChild = item
            return true
          }
        })
        // 只有 1 个，符合我们这个函数的目的，返回 true
        if(showingChildren.length === 1) {
          return true
        }

        // 如果最终没有任何结果的话，就显示父元素路由
        if(showingChildren.length === 0) {
          this.onlyOneChild = {
            ...parent,
            path: '',
            noShowingChild: true
          }
          return true
        }

        return false
      },
      resolvePath(routePath) {
        // console.log(path.resolve(this.basePath, routePath))
        return path.resolve(this.basePath, routePath)
      }
    },
    created() {
      // console.log(this.basePath)
    }
  }
</script>


<style lang="scss">
// .router-link-exact-active.curr li {
//   background:#418ee9;
//   span {
//     color:#fff;
//   }
// }
// .el-menu-item.is-active {
//   color:#fff;
// }
.el-menu-item i.iconfont,
.el-submenu__title i.iconfont {
  display:inline-block;
  width:28px;
  font-size: 18px;
}
.el-submenu__title:hover,
.el-menu-item:hover {
  position: relative;
  &:before {
    content:"";
    position: absolute;
    left:0;
    top:0;
    bottom:0;
    border-left:5px solid #3d88e4;
  }
}
.el-submenu .el-menu-item {
  padding-left:48px!important;
  height: 45px!important;
  line-height: 45px!important;
}
.el-menu--collapse .el-menu-item span,
.el-menu--collapse .el-submenu>.el-submenu__title span {
    height: 0;
    width: 0;
    overflow: hidden;
    visibility: hidden;
    display: inline-block;
}
.el-menu-item,.el-submenu__title {
  color:#cdd1d6!important;
}
.el-menu-item.is-active {
  background:#418ee9!important;
  color:#fff!important;
}
</style>
