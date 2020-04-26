import Vue from 'vue'
import '@/assets/fonts/iconfont.css'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from '@/App'
import router from '@/router'
import store from '@/store'
import { Message } from 'element-ui';
import dxCascader from '@/components/cascader/dx-cascader.vue';
import echarts from 'echarts'
import md5 from 'js-md5'
// import 'jquery'
// import 'jquery.nicescroll'
Vue.config.productionTip = false
Vue.use(ElementUI);

Vue.component(dxCascader.name,dxCascader)
/**在生产环境下，才执行Mock代码**/
// if (process.env.NODE_ENV == 'development') {
// 	MockMachine.startMock();
// }
// 引入echarts

Vue.prototype.$echarts = echarts;
Vue.prototype.$md5 = md5;

import Vuebar from 'vuebar';
Vue.use(Vuebar);

Vue.prototype.alertError = function(res){
  if(res.code != '0'){
    Message({
      type:'error',
      message:res.message,
    });
    return false;
  }
};
import Moment from 'moment'
Vue.prototype.moment = Moment;

// 一段时间内不允许重复调用的函数
Function.prototype.delay = function(timeout){
    const t = this;
    return function(){
      if(!t.execed){
        t.apply(this,Array.prototype.slice.call(arguments))
        t.execed = true
        setTimeout(function(){
          t.execed = false
        },timeout || 3000)
      }else{
        return
      }
    }
  }
const IE11RouterFix = {
    methods: {
        hashChangeHandler: function() { this.$router.push(window.location.hash.substring(1, window.location.hash.length)); },
        isIE11: function() { return !!window.MSInputMethodContext && !!document.documentMode; }
    },
    mounted: function() { if ( this.isIE11() ) { window.addEventListener('hashchange', this.hashChangeHandler); } },
    destroyed: function() { if ( this.isIE11() ) { window.removeEventListener('hashchange', this.hashChangeHandler); } }
};

let vm = new Vue({
	router,
	store,
  mixins: [IE11RouterFix],
	render: h => h(App)
}).$mount('#app');
