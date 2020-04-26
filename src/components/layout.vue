<template>
	<div  style="height:100%">
      <navbar></navbar>
      <sidebar @leftNavState="handleleftNavState"></sidebar>
      <div class="guestViewContent" :class="{'leftNavSmall':leftNavState}">
        <app-main></app-main>
      </div>
	</div>
</template>

<script type="text/javascript">
import { mapState } from "vuex";

import Navbar from './navbar'
import Sidebar from './sidebar'
import AppMain from './app-main'
import Watermark from '@/common/js/watermark';  //加水印
import {
    setSessionStorage,
    getSessionStorage,
    removeSessionStorage
} from "@/common/js/storage";

export default {
	// 递归调用  方便调试
	name: 'app-view',
	components: {
		Navbar,
		Sidebar,
		AppMain
	},
	data () {
		return {
			leftNavState:false,
			currNav:'1',
			navData:[
				{
					id:1,
					name:'组织树管理',
					link:'/b2i/organizationTree'
				},
				{
					id:2,
					name:'菜单管理',
					link:'/b2i/home'
				},
				{
					id:3,
					name:'营销渠道管理',
					link:'/b2i/home'
				},
				{
					id:4,
					name:'营销工号管理',
					link:'/b2i/home'
				},
				{
					id:5,
					name:'逻辑树管理',
					link:'/b2i/home'
				},
				{
					id:6,
					name:'角色管理',
					link:'/b2i/home'
				},
				{
					id:7,
					name:'字典管理',
					link:'/b2i/home'
				}

			],
        name:JSON.parse(getSessionStorage('accountInfo')).waterMark,
      // screenHeight: document.documentElement.clientHeight // 屏幕高度
		}
	},
    // watch: {
    //     'screenHeight': function (val) { // 监听屏幕高度变化
    //         var oIframe = document.getElementById('maindiv')
    //         // alert(this.$store.getters.screenHeight)
    //         oIframe.style.height = (Number(val)) + 'px'
    //     }
    // },
	computed:{
		...mapState({
			// isShow() {
			// 	return this.$store.state.sidebar.isShow
			// }
		})

	},
	methods: {
		handleleftNavState(flag){
			this.leftNavState = flag;
		},
	},
    mounted() {
        Watermark.set(this.name)
    }
}
</script>
<style lang="scss" scoped>
@import '../assets/css/mixin.scss';
.guestViewContent {
	// position:absolute;
	// left:0; right:0; top:0; bottom:0;
	// width:100%;
	width: calc(100% - 200px);
	margin-left:200px;
	height:calc(100% - 83px);
	// margin-top:15px;
	position: relative;
	// overflow: auto;
	&.leftNavSmall {
		width: calc(100% - 64px);
		margin-left:64px;
		// width: calc(100% - 50px);
		// margin-left:50px;
	}
}

</style>
