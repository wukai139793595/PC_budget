<template>
  <el-container class="login-container">
    <div class="el-header">
      <h1><i class="iconfont icon-logo_zhongguodianxin"></i><span>经营预算管理系统</span></h1>
    </div>
    <div class="el-login-container">
      <div class="el-login-containerPic"></div>
      <login v-if="flag==1" @chagePwd="chagePwd"></login>
      <forgetPwd v-if="flag==2" @chagePwd="chagePwd" @changeInfo="changeInfo"></forgetPwd>
      <resetPwd v-if="flag==3" @chagePwd="chagePwd" :loginInfo="loginInfo" @changeInfo="changeInfo"></resetPwd>
    </div>
  </el-container>
</template>
<script>
// import { setStore, getStore } from "@/common/js/storage";
import { setCookie, delCookie } from "@/common/js/cookie";
import login from "@/components/login/Login-Item";
import forgetPwd from "@/components/login/ForgetPwd-Item";
import resetPwd from "@/components/login/ResetPwd-Item";
// import { getSessionStorage } from "@/common/js/storage";
import Watermark from '@/common/js/watermark';  //加水印
import { $budget } from '@/api';

export default {
  components: {
    login,
    forgetPwd,
    resetPwd
  },
  data() {
    return {
      flag:1,
      loginInfo:{
        username:'',
        imageCode:'',
        randomCode:''
      }
    };
  },
    beforeCreate () {
        document.querySelector('body').setAttribute('style', 'height:100%;');
        document.querySelector('html').setAttribute('style', 'height:100%;')
    },
    //销毁前清除
    beforeDestroy () {
        document.querySelector('body').removeAttribute('style')
        document.querySelector('html').removeAttribute('style')
    },
  methods: {
    chagePwd(state){
      this.flag = state;
    },
    // 修改密码的用户账号，图片验证码，短信验证码
    changeInfo(val) {
      this.loginInfo = val;
    }
  },
  watch: {

  },
    mounted() {
        Watermark.set('')
    },
};
</script>

<style lang="scss" scoped>
  body, html {
    background-color: #f4f4f4;
    position: relative;
    height: 100%;
  }
.login-container {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color:#fff;
  // background: mix(#424b50, #000) url('../../static/image/login/login-bg.jpg') center no-repeat;
  // background-size: cover;
  overflow: hidden;
  .el-header {
    height:85px;
    line-height:85px;
    h1 {
      font-size: 32px;
			.iconfont {
        font-size: 35px;
        color:#00479d;
				display:inline-block;
				vertical-align: middle;
				margin-top:-2px;
			}
			span {
				position: relative;
				margin:0 0 0 20px;
				padding-left:20px;
				&:before {
					content:"";
					position: absolute;
					left:0;
					top:-2px;
					bottom:-2px;
					width:1px;
					opacity: 0.5;
					background: -moz-linear-gradient(top, #fff 0%, #bababa 50%, #fff 100%);
					background: -webkit-gradient(linear, top, bottom, color-stop(0%,#737980), color-stop(100%,#fff));
					background: -webkit-linear-gradient(top, #fff 0%, #bababa 50%,#fff 100%);
					background: -o-linear-gradient(top, #fff 0%, #bababa 50%,#fff 100%);
					background: -ms-linear-gradient(top, #fff 0%, #bababa 50%,#fff 100%);
					background: linear-gradient(to bottom, #fff 0%, #bababa 50%,#fff 100%);
				}
			}
    }
  }
  .el-login-container {
    position: absolute;
    left:0;
    top:85px;
    right:0;
    bottom:0;
    background: -moz-linear-gradient(top, #c1dbfe 0%, #498fe5 100%);
    background: -webkit-gradient(linear, left, right, color-stop(0%,#c1dbfe), color-stop(100%,#498fe5));
    background: -webkit-linear-gradient(left, #c1dbfe 0%,#498fe5 100%);
    background: -o-linear-gradient(left, #c1dbfe 0%,#498fe5 100%);
    background: -ms-linear-gradient(left, #c1dbfe 0%,#498fe5 100%);
    background: linear-gradient(to right, #c1dbfe 0%,#498fe5 100%);
    .el-login-containerPic {
      position: absolute;
      z-index: 1;
      left:2%;
      bottom:-8%;
      height:90%;
      width:50%;
      background: url('../../static/image/login/login-bg.png') 10% 100% no-repeat;
      background-size: contain;
    }
  }

}
</style>
