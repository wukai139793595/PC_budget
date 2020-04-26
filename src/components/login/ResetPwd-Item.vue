<template>
  <el-container class="login-container-item">
    <el-card class="animated flipInY">
      <h2>
        <span class="back" @click="handleForForgetPwd">返回登录&gt;</span> 修改密码
      </h2>
      <el-form :rules="rules" :model="loginForm" ref="loginForm">
        <el-form-item label prop="pwd">
          <span class="svg-container svg-container_password">
            <i class="iconfont icon-mima"></i>
          </span>
          <el-input type="password" placeholder="新密码" :maxlength="30" v-model.trim="loginForm.pwd" ref="pwd"></el-input>
        </el-form-item>
        <el-form-item label prop="repeatPwd">
          <span class="svg-container svg-container_password">
            <i class="iconfont icon-mima"></i>
          </span>
          <el-input
            type="password"
            placeholder="重复新密码"
            :maxlength="30"
            v-model.trim="loginForm.repeatPwd"
            @keyup.enter.native="onLogin"
            ref="pwdMsg"
          ></el-input>
        </el-form-item>
        <br />
        <br />
        <br />
        <br />
        <el-button
          class="blueBtn"
          type="primary"
          @click="onLogin('loginForm')"
          :loading="loading"
        >完成</el-button>
      </el-form>
    </el-card>
  </el-container>
</template>
<script>
// import { setStore, getStore } from "@/common/js/storage";
import { setCookie, delCookie } from "@/common/js/cookie";
import { mapActions } from "vuex";

// import particles from "particles.js";

import { $loginAPI } from "@/api";

export default {
  props:['loginInfo'],
  components: {},
  data() {
    // pwd 验证
    let reg = /^(?![a-zA-Z]+$)(?![A-Z0-9]+$)(?![A-Z\\W_!@#$%^&*`~()-+=]+$)(?![a-z0-9]+$)(?![a-z\\W_!@#$%^&*`~()-+=]+$)(?![0-9\\W_!@#$%^&*`~()-+=]+$)[a-zA-Z0-9\\W_!@#$%^&*`~()-+=]{3,}$/
    const validatePwd = (rule, value, callback) => {
      if (reg.test(value)) {
        callback();
      } else {
        callback(new Error("数字、小写字母、大写字母、特殊符号至少3类"));
      }

    };
    // repeatPwd 验证
    const validateRepeatPwd = (rule, value, callback) => {
      if (reg.test(value)) {
        callback();
      } else {
        callback(new Error("数字、小写字母、大写字母、特殊符号至少3类"));
      }
    };
    return {
      // 粒子开关
      toggleParticles: false,
      loginForm: {
        pwd: "",
        repeatPwd: ""
      },
      loading: false,
      rules: {
        pwd: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { required: true, trigger: "blur", validator: validatePwd },
          { required: true, trigger: "change", validator: validatePwd },
          { min: 8 , trigger: "blur", message: "密码不能小于8位"}
        ],
        repeatPwd: [
          { required: true, message: "请重复输入密码", trigger: "blur" },
          { required: true, trigger: "blur", validator: validateRepeatPwd },
          { required: true, trigger: "change", validator: validateRepeatPwd },
          { min: 8 , trigger: "blur", message: "密码不能小于8位"}
        ]
      },
      getUser: false
    };
  },
  created() {},
  methods: {
    ...mapActions(["login"]),
    // 用户名输入框回车后切换到密码输入框
    goToPwdInput() {
      this.$refs.pwd.$el.getElementsByTagName("input")[0].focus();
    },

    // 更改密码操作
    
    onLogin() {
      var self = this;
      if (this.loginForm.pwd != this.loginForm.repeatPwd) {
        this.$message.error("两次输入密码不一致");
        return;
      }
      self.$refs.pwd.$el.getElementsByTagName("input")[0].blur();
      self.$refs.loginForm.validate(valid => {
        let loginInfo = self.loginInfo;
        let { username, imageCode, randomCode } = loginInfo;
        if (valid) {
          // self.handleGetUser();

          self.loading = true;
          $loginAPI.updatePassword(
            {
              userName: username,
              userPwd: self.$md5(self.loginForm.pwd+'1314') ,
              randomCode,
              imageCode
            },
            res => {
              self.loading = false;
              if (res.code == 0) {
                self.$message(res.message);
                self.$emit("chagePwd", 1);
              } else {
                self.$emit("chagePwd", 2);
                self.$emit("changeInfo",{ username:'', imageCode:'', randomCode:''})
              }
            },
            err => {
              self.loading = false;
            }
          );
          
        } else {
          return false;
        }
      });
    },
    handleForForgetPwd() {
      this.$emit("chagePwd", 1);
    }
  },
  watch: {},
  mounted() {
    if (window.localStorage.getItem("getUser") == "true") {
      this.getUser = true;
    } else {
      this.getUser = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.login-container-item {
  .el-card {
    position: absolute;
    top: 50%;
    right: 15%;
    margin: -200px 0 0 -130px;
    width: 360px;
    // height: 400px;
    background: #fff;
    padding: 0 5px;
    h2 {
      margin: 8px 0 15px;
      font-size: 18px;
      font-weight: bold;
      border-left: 2px #3f8ce8 solid;
      line-height: 20px;
      padding-left: 10px;
      .back {
        cursor: pointer;
        float: right;
        color: #3f8ce8;
        font-size: 14px;
        font-weight: normal;
      }
    }
    .el-input /deep/ .el-input__inner {
      text-indent: 40px;
      height: 40px;
      line-height: 40px;
    }
    .svg-container {
      position: absolute;
      top: 0;
      left: 0px;
      width: 40px;
      text-align: center;
      display: inline-block;
      color: #889aa4;
      z-index: 10;
      &:after {
        content: "";
        position: absolute;
        right: 0;
        top: 5px;
        bottom: 3px;
        width: 1px;
        opacity: 0.3;
        background: -moz-linear-gradient(top, #fff 0%, #bababa 50%, #fff 100%);
        background: -webkit-gradient(
          linear,
          top,
          bottom,
          color-stop(0%, #737980),
          color-stop(100%, #fff)
        );
        background: -webkit-linear-gradient(
          top,
          #fff 0%,
          #bababa 50%,
          #fff 100%
        );
        background: -o-linear-gradient(top, #fff 0%, #bababa 50%, #fff 100%);
        background: -ms-linear-gradient(top, #fff 0%, #bababa 50%, #fff 100%);
        background: linear-gradient(to bottom, #fff 0%, #bababa 50%, #fff 100%);
      }
      .icon-phone {
        font-size: 20px;
      }
    }
    .el-button--primary {
      width: 100%;
    }
    .getPwd {
      padding-right: 120px;
      position: relative;
      .getPwdBtnLay {
        position: absolute;
        right: -120px;
        top: 0;
        width: 110px;
        .getPwdBtn {
          padding: 14px 0;
          background: #eee;
          border: #eee;
          color: #666;
          font-size: 12px;
          text-align: center;
          &:curr {
            color: #999;
          }
        }
      }
    }
    .getforgetPwd {
      margin: -5px 0 20px;
      font-size: 13px;
      .el-col-12:last-child {
        text-align: right;
      }
    }
    .blueBtn {
      height: 47px;
      padding: 0;
    }
  }
}
</style>
