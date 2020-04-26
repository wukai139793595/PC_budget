<template>
  <el-container class="login-container-item">
    <el-card class="animated flipInY">
      <h2>
        <!-- <el-radio-group v-model="loginWay">
          <el-radio-button label="00">密码登录</el-radio-button>
          <el-radio-button label="02" size="mini">验证码登录</el-radio-button>
        </el-radio-group> -->
        <template v-if="loginWay=='00'">
          <span>
            密码登录
          </span>
          <span @click="loginWay='02'">
            验证码登录 >
          </span>
        </template>
        <template v-if="loginWay=='02'">
          <span>
            验证码登录
          </span>
          <span @click="loginWay='00'">
            密码登录 >
          </span>
        </template>
      </h2>
      <el-form :rules="rules" :model="loginForm" ref="loginForm">
        <el-form-item label prop="username" style="position:relative">
          <span class="svg-container svg-container_user">
            <i class="iconfont icon-phone"></i>
          </span>
          <el-input
            type="text"
            placeholder="账号"
            name="username"
            ref="username"
            v-model="loginForm.username"
            @keyup.enter.native="goToPwdInput"
          ></el-input>
        </el-form-item>
        <keep-alive>
          <el-form-item label prop="pwd" v-if="loginWay==='00'">
            <span class="svg-container svg-container_password">
              <i class="iconfont icon-mima"></i>
            </span>
            <el-input
              type="password"
              :maxlength="30"
              placeholder="密码"
              v-model="loginForm.pwd"
              ref="pwd"
            ></el-input>
          </el-form-item>
        </keep-alive>
        <keep-alive>
          <el-form-item label class="getPwd" prop="randomCode" v-if="loginWay==='02'">
            <span class="svg-container svg-container_password">
              <i class="iconfont icon-yanzhengma"></i>
            </span>
            <el-input
              type="text"
              placeholder="短信验证码"
              v-model="loginForm.randomCode"
              @keyup.enter.native="onLogin"
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
        </keep-alive>
        <el-row class="getforgetPwd">
          <el-col :span="12">
            <el-checkbox v-model="getUser">记住用户名</el-checkbox>
          </el-col>
          <el-col :span="12">
            <el-link @click="handleForForgetPwd" type="info">?忘记密码</el-link>
          </el-col>
        </el-row>
        <el-button
          class="blueBtn"
          type="primary"
          @click="onLogin('loginForm')"
          :loading="loading"
        >登录</el-button>
      </el-form>
    </el-card>
  </el-container>
</template>
<script>
// import { setStore, getStore } from "@/common/js/storage";
import { setCookie, delCookie } from "@/common/js/cookie";
import { setSessionStorage } from "@/common/js/storage";
import { mapActions } from "vuex";

// import particles from "particles.js";

import { $loginAPI } from "@/api";

export default {
  components: {},
  data() {
    // username 验证
    const validateUsername = (rule, value, callback) => {
      //手机号正则
      // var mPattern = /^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,5-9]))\d{8}$/;
      //用户名正则，4到16位（字母，数字，下划线，减号）
      // var uPattern = /^[a-zA-Z0-9_-]{4,16}$/;
      if (value.length < 2) {
        callback(new Error("请输入正确的用户名"));
      } else {
        callback();
      }
    };
    // pwd 验证
    const validatePwd = (rule, value, callback) => {
      // 开发环境的验证
      // if (process.env.NODE_ENV === "development") {
        if (value.length < 8) {
          callback(new Error("密码不能小于8位"));
        } else {
          callback();
        }
      // } else if (process.env.NODE_ENV === "production") {  //生产环境的验证
      //   if (value.length < 6) {
      //     callback(new Error("密码不能小于6位"));
      //   } else {
      //     callback();
      //   }
      // }
    };
    // 短信证码
    const validateRandomCode = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error("短信验证码不能小于6位"));
      } else {
        callback();
      }
    };
    return {
      loginWay: "00",
      // 粒子开关
      toggleParticles: false,
      loginForm: {
        username: "",
        pwd: "",
        randomCode: ""
      },
      loading: false,
      rules: {
        username: [
          { required: true, message: "请输入账号", trigger: "blur" },
          { required: true, trigger: "blur", validator: validateUsername },
          { required: true, trigger: "change", validator: validateUsername }
        ],
        pwd: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { required: true, trigger: "blur", validator: validatePwd },
          { required: true, trigger: "change", validator: validatePwd }
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
  created() {
    // 初始化时读取localStorage用户信息
    //   if (loadFromLocal('remember', false)) {
    //     this.loginForm.username = loadFromLocal('username', '')
    //     this.loginForm.pwd = loadFromLocal('password', '')
    //   } else {
    //     this.loginForm.username = ''
    //     this.loginForm.pwd = ''
    //   }
  },
  methods: {
    ...mapActions(["login"]),
    // 用户名输入框回车后切换到密码输入框
    goToPwdInput() {
      this.$refs.pwd.$el.getElementsByTagName("input")[0].focus();
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
            res => {
              if (res.code == 0) {
                self.countDown();
              } else {
                alert(res.message);
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
          this.$message("请输入账号");
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

    // 登录操作
    onLogin() {
      let loginWay = this.loginWay;
      let param = {};
      let validArr = [];
      this.$refs.pwd.$el.getElementsByTagName("input")[0].blur();
        //账号密码登录
      if (loginWay == "00") {
        // 测试环境登录
        // if (process.env.NODE_ENV === 'development') {
        //   param = {
        //     loginType: loginWay,
        //     userName: this.loginForm.username,
        //     userPwd: this.loginForm.pwd
        //     // userPwd: this.loginForm.pwd
        //   };
        // } else if (process.env.NODE_ENV === 'production'){  //生产环境
          param = {
            loginType: loginWay,
            userName: this.loginForm.username,
            userPwd: this.$md5(this.loginForm.pwd + "1314")
            // userPwd: this.loginForm.pwd
          // };
        }
        validArr = ["username", "pwd"];
      } else {
        //账号和短信验证码登录
        param = {
          loginType: loginWay,
          userName: this.loginForm.username,
          randomCode: this.loginForm.randomCode
        };
        validArr = ["username", "randomCode"];
      }
      Promise.all(
        validArr.map(item => {
          let p = new Promise((resolve, reject) => {
            this.$refs.loginForm.validateField(item, valid => {
              resolve(valid);
            });
          });
          return p;
        })
      ).then(res => {
        let resArr = res.filter(item => item);
        if (!resArr.length) {
          this.handleGetUser();
          this.loading = true;
          //开发环境登录
          // if (process.env.NODE_ENV === "development") {      
          //   // $loginAPI.sysLogin(
          //   $loginAPI.signIn(
          //     param,
          //     res => {
          //       let data = res;
          //       if (data.code == "0") {
          //         // 保存token
          //         setCookie("token", res.content.token);
          //         setSessionStorage("accountInfo", res.content.userInfo);
          //         window.sessionStorage.setItem(
          //           "SysUserCode",
          //           this.loginForm.username
          //         );
          //         window.sessionStorage.setItem(
          //           "userName",
          //           res.content.userName
          //         );
          //         this.$router.push({ path: "/budget/home" });
          //         return false;
          //       }
          //       // 失败
          //       this.loading = false;
          //       alert(data.message);
          //     },
          //     err => {
          //       this.loading = false;
          //     }
          //   );
          // } else if (process.env.NODE_ENV === 'production'){     //生产环境登录
            $loginAPI.sysLogin(
              // $loginAPI.signIn(
              param,
              res => {
                let data = res;
                if (data.code == "0") {
                  // 保存token
                  setCookie("token", res.content.token);
                  setSessionStorage("accountInfo", res.content.userInfo);
                  window.sessionStorage.setItem(
                    "SysUserCode",
                    this.loginForm.username
                  );
                  window.sessionStorage.setItem(
                    "userName",
                    res.content.userName
                  );
                  this.$router.push({ path: "/budget/home" });
                  return false;
                }
                // 失败
                this.loading = false;
                alert(data.message);
              },
              err => {
                this.loading = false;
              }
            );
          }
        // }
      });

      // this.$refs.loginForm.validate(valid => {
      //   if (valid) {
      //     this.handleGetUser();
      //     this.loading = true;

      //     // ajax提交
      //     $loginAPI.sysLogin(
      //       // $loginAPI.signIn(
      //       param,
      //       res => {
      //         let data = res;
      //         if (data.code == "0") {
      //           // 保存token
      //           setCookie("token", res.content.token);
      //           setSessionStorage("accountInfo", res.content.userInfo);
      //           window.sessionStorage.setItem(
      //             "SysUserCode",
      //             this.loginForm.username
      //           );
      //           window.sessionStorage.setItem("userName", res.content.userName);
      //           this.$router.push({ path: "/budget/home" });
      //           return false;
      //         }
      //         // 失败
      //         this.loading = false;
      //         alert(data.message);
      //       },
      //       err => {
      //         this.loading = false;
      //       }
      //     );
      //   } else {
      //     return false;
      //   }
      // });
    },
    // 记住用户名
    handleGetUser() {
      window.localStorage.setItem("getUser", this.getUser);
      if (this.getUser) {
        window.localStorage.setItem("userAccount", this.loginForm.username);
      } else {
        window.localStorage.removeItem("userAccount");
      }
    },
    handleForForgetPwd() {
      this.$emit("chagePwd", 2);
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
      display: flex;
      justify-content: space-between;
      align-items: center;
      span:first-child{
        color: #222222;
        font-size: 20px;
        font-weight: 600;
      }
      span:last-child{
        color: #408ee9;
        font-size: 16px;
        cursor: pointer;
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
