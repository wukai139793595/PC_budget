<template>
  <el-container class="login-container-item">
    <el-card class="animated flipInY">
      <h2>
        <span class="back" @click="handleForForgetPwd">返回登录&gt;</span> 忘记密码
      </h2>
      <el-form :rules="rules" :model="loginForm" ref="loginForm">
        <el-form-item label prop="username" style="position:relative">
          <span class="svg-container svg-container_user">
            <i class="iconfont icon-phone"></i>
          </span>
          <el-input
            type="text"
            placeholder="手机号码"
            name="username"
            ref="username"
            v-model="loginForm.username"
            @keyup.enter.native="goToPwdInput"
          ></el-input>
        </el-form-item>
        <el-form-item label class="getPwd" prop="imageCode">
          <span class="svg-container svg-container_password">
            <i class="iconfont icon-yanzhengma"></i>
          </span>
          <el-input type="text"  placeholder="图片验证码" v-model="loginForm.imageCode" ref="pwd"></el-input>
          <img
            class="pic-code"
            @click="picChangeHandle"
            :src="'/api/4a/createCodeImage?t='+nowTime"
            alt
          />
          <div class="getPwdBtnLay"></div>
        </el-form-item>
        <el-form-item label class="getPwd" prop="randomCode">
          <span class="svg-container svg-container_password">
            <i class="iconfont icon-yanzhengma"></i>
          </span>
          <el-input
            type="text"
            placeholder="短信验证码"
            v-model="loginForm.randomCode"
            @keyup.enter.native="getRandomCode"
            ref="pwdMsg"
          ></el-input>
          <div class="getPwdBtnLay">
            <el-button
              class="getPwdBtn"
              @click="getRandomCode"
              :class="{'curr':mobile.flag}"
              type="primary"
            >{{mobile.text}}</el-button>
          </div>
        </el-form-item>
        <el-button
          class="blueBtn"
          type="primary"
          @click="goToPwdInput('loginForm')"
          :loading="loading"
        >下一步</el-button>
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
  components: {},
  data() {
    // username 验证
    const validateUsername = (rule, value, callback) => {
      var mPattern = /^1(3|4|5|6|7|8|9)\d{9}$/;
      if (!mPattern.test(value)) {
        callback(new Error("请输入正确的手机号"));
      } else {
        callback();
      }
    };
    // pwd 验证
    const validateImageCode = (rule, value, callback) => {
      if (value.length < 4) {
        callback(new Error("验证码不能小于4位"));
      } else {
        callback();
      }
    };
    // pwd 验证
    const validateRandomCode = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error("短信验证码不能小于6位"));
      } else {
        callback();
      }
    };
    return {
      // 粒子开关
      toggleParticles: false,
      nowTime: Date.now(),
      loginForm: {
        username: "",
        imageCode: "",
        randomCode: ""
      },
      loading: false,
      rules: {
        username: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          { required: true, trigger: "blur", validator: validateUsername },
          { required: true, trigger: "change", validator: validateUsername }
        ],
        imageCode: [
          { required: true, message: "请输图片验证码", trigger: "blur" },
          { required: true, trigger: "blur", validator: validateImageCode },
          { required: true, trigger: "change", validator: validateImageCode },
          {max: 4, trigger: "blur", message:'验证码不能超过4位'},
          {min: 4, trigger: "blur", message: '验证码不能小于4位'}
        ],
        randomCode: [
          { required: true, message: "请输入短信验证码", trigger: "blur" },
          { required: true, trigger: "blur", validator: validateRandomCode },
          { required: true, trigger: "change", validator: validateRandomCode }
        ]
      },
      mobile: {
        flag: false,
        time: 120,
        text: "获取验证码"
      },
      getUser: false
    };
  },
  created() {},
  methods: {
    ...mapActions(["login"]),
    picChangeHandle() {
      this.nowTime = Date.now();
    },
    // 获取验证码
    getRandomCode() {
      let self = this;
      if (this.mobile.flag) {
        return false;
      }
      this.$refs.loginForm.validateField("username", valid => {
        if (!valid) {
          self.mobile.flag = true;
          self.mobile.text = "发送中...";

          delCookie("token");
          $loginAPI.getShortMessage(
            {
              username: this.loginForm.username
            },
            response => {
              if (response.code == 0) {
                self.countDown();
              } else {
                alert(response.message);
                self.mobile.flag = false;
                self.mobile.text = "发送验证码";
              }
            },
            err => {
              self.mobile.flag = false;
              self.mobile.text = "发送验证码";
            }
          );
        } else {
          this.$message('请输入账号')
        }
      });
    },

    // 发送验证码倒计时
    countDown() {
      if (this.mobile.time <= 0) {
        this.mobile.time = 120;
        this.mobile.flag = false;
        this.mobile.text = "重新发送";
        return false;
      }
      this.mobile.text = "已发送(" + this.mobile.time + "s)";
      this.mobile.time--;
      setTimeout(() => {
        this.countDown();
      }, 1000);
    },

    // 用户名输入框回车后切换到密码输入框
    goToPwdInput() {
      this.$refs.pwd.$el.getElementsByTagName("input")[0].blur();
      this.$refs.loginForm.validate(valid => {
        let { username, imageCode, randomCode } = this.loginForm;
        if (valid) {
          this.$emit("changeInfo", { username, imageCode, randomCode });
          this.$emit("chagePwd", 3);
        } else {
          return false;
        }
      });
    },
    handleGetUser() {
      window.localStorage.setItem("getUser", this.getUser);
      if (this.getUser) {
        window.localStorage.setItem("userAccount", this.loginForm.username);
      } else {
        window.localStorage.removeItem("userAccount");
      }
    },
    handleForForgetPwd() {
      this.$emit("chagePwd", 1);
    }
  },
  watch: {},
  mounted() {
    if (window.localStorage.getItem("getUser") == "true") {
      this.getUser = true;
      this.loginForm.username =
        window.localStorage.getItem("userAccount") || "";
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
      .pic-code {
        position: absolute;
        right: -100px;
        top: 0;
        width: 80px;
        height: 40px;
      }
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
