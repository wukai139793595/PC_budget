<template>
    <div style="height:68px;">
		<div class="header">
			<div class="logo">
				<h1><router-link to="/budget/home"><i class="iconfont icon-logo_zhongguodianxin"></i><span>经营预算管理系统</span></router-link></h1>
			</div>
			<div class="userInfo">
				<!-- <el-tooltip effect="dark" content="全屏" placement="bottom">
					<screenfull class="screenfull right-menu-item"></screenfull>
				</el-tooltip> -->

				<div class="avatar-container" style="cursor:pointer;">
					<el-dropdown trigger="click">
						<div class="avatar-wrapper">
							<i class="iconfont icon-user"></i>
							<div class="username-wrapper">
								<span class="user-name">{{name}}</span>
								<i class="el-icon-caret-bottom"></i>
							</div>
						</div>
						<el-dropdown-menu class="user-dropdown" slot="dropdown">
							<router-link class='inlineBlock' to="/user/profile">
								<el-dropdown-item>个人中心</el-dropdown-item>
							</router-link>
							<el-dropdown-item @click.native="modUserPwd">
								<span style="display:block;">修改密码</span>
							</el-dropdown-item>
						</el-dropdown-menu>
					</el-dropdown>
				</div>

				<div class="userTip">
					<el-badge :value="8" class="item">
						<i class="iconfont icon-tishi"></i>
					</el-badge>
				</div>
				<div class="logout" @click="logout">
					<i class="iconfont icon-quit"  title="退出"></i>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
// import Screenfull from './screenfull';
import { delCookie } from '@/common/js/cookie';
import{getSessionStorage,removeSessionStorage} from "@/common/js/storage";
//  import respassword from '/components/um_channel';
    export default {
        data () {
            return {
				      name:getSessionStorage('userName'),
            }
		},
		components: {
			// Screenfull
		},
		created(){
			this.init();
		},
		methods: {
			init(){
				// this.name = window.sessionStorage.getItem("SysUserCode");
			},

			logout() {
				window.sessionStorage.removeItem("SysUserCode");
				delCookie('token');
        removeSessionStorage("accountInfo");
        removeSessionStorage("SysUserCode");
        removeSessionStorage("userName");
				this.$router.push({path:'/login'})
			},

			modUserPwd() {
				  this.$router.push({ path: "/b2i/modUserPwd" });
				  //console.log("!!!!!!",  this.$router.push({ path: "/resUserPwd" }))
			}
		},
    }
</script>

<style lang="scss" scoped>

.header {
	height: 68px;
	line-height: 68px;
	padding:0 0 0 20px;
	background: #3d89e5;
	position: fixed;
	left:0;
	top:0;
	width:100%;
	z-index: 100;
	.logo {
		float:left;
		h1 {
			font-size: 24px;
			.iconfont {
				vertical-align: middle;
				display: inline-block;
				margin-top:-5px;
				font-size: 32px;
			}
			span {
				position: relative;
				margin:0 0 0 15px;
				padding-left:10px;
				&:before {
					content:"";
					position: absolute;
					left:0;
					top:-2px;
					bottom:-2px;
					width:1px;
					opacity: 0.5;
					background: -moz-linear-gradient(top, #3a85e1 0%, #fff 50%, #3a85e1 100%);
					background: -webkit-gradient(linear, top, bottom, color-stop(0%,#3a85e1), color-stop(100%,#3a85e1));
					background: -webkit-linear-gradient(top, #3a85e1 0%, #fff 50%,#3a85e1 100%);
					background: -o-linear-gradient(top, #3a85e1 0%, #fff 50%,#3a85e1 100%);
					background: -ms-linear-gradient(top, #3a85e1 0%, #fff 50%,#3a85e1 100%);
					background: linear-gradient(to bottom, #3a85e1 0%, #fff 50%,#3a85e1 100%);
				}
			}
			a {
				color:#fff;
			}
		}
	}
	.userInfo {
		float:right;
		color:#fff;
		font-size: 16px;
		.right-menu-item {
			display:inline-block;
			vertical-align: middle;
			margin:3px 10px 0 0;
			line-height: normal;
		}
		.iconfont {
			display: inline-block;
			margin-top:-2px;
			vertical-align: middle;
			color:#fff;
		}
		.avatar-container {
			display: inline-block;
			.icon-user {
				background-color:#e4e6e6;
				width:30px;
				height:30px;
				border-radius: 50%;
				line-height: 30px;
				text-align:center;
				font-size: 16px;
				color:#b0beca;
				margin-right:5px;
			}
			a {
				margin-left:20px;
				color:#fff;
			}
			.username-wrapper {
				display: inline-block;
			}
			.user-name,.el-icon-caret-bottom {
				color:#fff;
			}
		}
		.userTip {
			margin:0 10px 0 5px;
			padding:0 10px;
			display: inline;
			line-height:22px;
			cursor: pointer;
			.iconfont {
				font-size:20px;
			}
			&:hover {
				.iconfont {
					color:#ccc;
				}
			}
		}
		.logout {
			display: inline-block;
			width:64px;
			text-align: center;
			border-left:1px solid #8abcf3;
			cursor: pointer;
			.iconfont {
				padding:0 10px;
				font-size:18px;
			}
			&:hover {
				.iconfont {
					color:#ccc;
				}
			}
		}

	}
}
</style>
