<template>
  <div class="login-container">
    <div class="login-form">
      <el-tabs v-model="activeName">
        <el-tab-pane label="用户名注册" name="first">
          <el-form
            ref="loginForm"
            :model="registerForm"
            :rules="registerRules"
            auto-complete="on"
            label-position="left"
          >
            <!-- <div class="title-container">
        <h3 class="title">登录</h3>
      </div> -->

            <el-form-item prop="username">
              <span class="svg-container">
                <i class="el-icon-user-solid" />
              </span>
              <el-input
                ref="username"
                v-model="registerForm.username"
                placeholder="用户名"
                name="username"
                type="text"
                tabindex="1"
                auto-complete="on"
              />
            </el-form-item>

            <el-form-item prop="password">
              <span class="svg-container">
                <i class="el-icon-lock" />
              </span>
              <el-input
                :key="passwordType"
                ref="password"
                v-model="registerForm.password"
                :type="passwordType"
                placeholder="密码（6-20位）"
                name="password"
                tabindex="2"
                auto-complete="on"
              />
              <span class="show-pwd" @click="showPwd">
                <i
                  :class="
                    passwordType === 'password'
                      ? 'el-icon-view'
                      : 'el-icon-minus'
                  "
                />
              </span>
            </el-form-item>

            <el-form-item prop="passwordRepeat">
              <span class="svg-container">
                <i class="el-icon-lock" />
              </span>
              <el-input
                :key="passwordType"
                ref="passwordRepeat"
                v-model="registerForm.passwordRepeat"
                :type="passwordType"
                placeholder="确认密码（6-20位）"
                name="passwordRepeat"
                tabindex="3"
                auto-complete="on"
                @keyup.enter.native="handleRegister"
              />
              <span class="show-pwd" @click="showPwd">
                <i
                  :class="
                    passwordType === 'password'
                      ? 'el-icon-view'
                      : 'el-icon-minus'
                  "
                />
              </span>
            </el-form-item>

            <el-form-item prop="email">
              <span class="svg-container">
                <i class="el-icon-message" />
              </span>
              <el-input
                ref="email"
                v-model="registerForm.email"
                placeholder="邮箱（选填）"
                name="email"
                type="text"
                tabindex="4"
                auto-complete="on"
              />
            </el-form-item>

            <el-form-item prop="phone">
              <span class="svg-container">
                <i class="el-icon-mobile-phone" />
              </span>
              <el-input
                ref="phone"
                v-model="registerForm.phone"
                placeholder="手机号（选填）"
                name="phone"
                type="text"
                tabindex="4"
                auto-complete="on"
              />
            </el-form-item>

            <!-- <el-form-item id="remember"> -->
            <div id="remember">
              <el-checkbox v-model="checked">记住我</el-checkbox>
              <el-button type="text" style="float: right; padding: 0px"
                >忘记密码</el-button
              >
            </div>
            <!-- </el-form-item> -->

            <el-button
              :loading="loading"
              type="primary"
              style="width: 100%; margin-bottom: 30px"
              @click.native.prevent="handleRegister"
              >注册</el-button
            >

            <!-- <div class="tips">
        <span style="margin-right:20px;">username: admin</span>
        <span> password: any</span>
      </div> -->
          </el-form>
        </el-tab-pane>

        <el-tab-pane label="手机验证码注册" name="second">
          <el-form
            ref="loginFormPhone"
            :model="loginFormPhone"
            :rules="loginRules"
            auto-complete="on"
            label-position="left"
            hide-required-asterisk
          >
            <el-form-item prop="username">
              <span class="svg-container">
                <i class="el-icon-user-solid" />
              </span>
              <el-input
                ref="username"
                v-model="loginFormPhone.username"
                placeholder="手机号"
                name="username"
                type="text"
                tabindex="1"
                auto-complete="on"
              />
            </el-form-item>

            <div style="margin: 22px 0px; text-align: left">
              <el-form-item prop="password" id="valicode">
                <div slot="label" style="color: white">..</div>
                <span class="svg-container">
                  <i class="el-icon-lock" />
                </span>
                <el-input
                  :key="passwordType"
                  ref="password"
                  v-model="loginFormPhone.password"
                  placeholder="验证码"
                  name="password"
                  tabindex="2"
                  auto-complete="on"
                  @keyup.enter.native="handleLoginPhone"
                />
                <!-- <span class="show-pwd" @click="showPwd">
                <i
                  :class="
                    passwordType === 'password'
                      ? 'el-icon-view'
                      : 'el-icon-minus'
                  "
                />
              </span> -->
              </el-form-item>
              <div style="display: inline-block; text-align: right; width: 24%">
                <el-button
                  type="primary"
                  :disabled="valiDisabled"
                  @click="handleValiClicked"
                  style="width: 90%"
                >
                  <span v-show="!valiDisabled">获取验证码</span>
                  <span v-show="valiDisabled">已发送({{ count }})</span>
                </el-button>
              </div>
            </div>

            <div id="remember">
              <el-checkbox v-model="checked">记住我</el-checkbox>
            </div>

            <el-button
              :loading="loading"
              type="primary"
              style="width: 100%; margin-bottom: 30px"
              @click.native.prevent="handleLoginPhone"
              >登录／注册</el-button
            >
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import { validUsername, validePhone } from "@/utils/validate";

export default {
  name: "Register",
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!validUsername(value)) {
        callback(new Error("请输入正确的用户名或邮箱"));
      } else {
        callback();
      }
    };
    const validatePhone = (rule, value, callback) => {
      if (!validePhone(value)) {
        callback(new Error("请输入正确的手机号"));
      } else {
        callback();
      }
    };
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error("密码不可小于6位"));
      } else if (value.length > 20) {
        callback(new Error("密码不可大于20位"));
      } else {
        callback();
      }
    };
    const validatePasswordRepeat = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error("密码不可小于6位"));
      } else if (value.length > 20) {
        callback(new Error("密码不可大于20位"));
      } else if (value !== this.registerForm.password) {
        // console.log(value,this.registerForm.password)
        callback(new Error("密码不同"));
      } else {
        callback();
      }
    };
    const validateVeriCode = (rule, value,callback)=>{
      if (value.length!==6) {
        callback(new Error("验证码为6位"))
      } else {
        callback()
      }
    }
    return {
      registerForm: {
        username: "lkx2",
        password: "123456",
        passwordRepeat: "123456",
        email: "",
        phone: "",
      },
      loginFormPhone: {
        username: "",
        password: "",
      },
      registerRules: {
        username: [
          { required: true, trigger: "blur", validator: validateUsername },
        ],
        password: [
          { required: true, trigger: "blur", validator: validatePassword },
        ],
        passwordRepeat: [
          {
            required: true,
            trigger: "blur",
            validator: validatePasswordRepeat,
          },
        ],
      },
      loginRules: {
        username: [
          { required: true, trigger: "blur", validator: validatePhone },
        ],
        password: [
          { required: true, trigger: "blur", validator: validateVeriCode },
        ],
      },
      loading: false,
      passwordType: "password",
      redirect: undefined,
      activeName: "first",
      checked: false,
      valiDisabled: false,
      timer: null,
      count: 60,
      TIME_COUNT: 60,
    };
  },
  watch: {
    $route: {
      handler: function (route) {
        this.redirect = route.query && route.query.redirect;
      },
      immediate: true,
    },
  },
  // computed: {
  //   getValiCode() {
  //   },
  // },
  methods: {
    showPwd() {
      if (this.passwordType === "password") {
        this.passwordType = "";
      } else {
        this.passwordType = "password";
      }
      this.$nextTick(() => {
        this.$refs.password.focus();
      });
    },
    handleRegister() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.loading = true;
          this.$store
            .dispatch("user/register", this.registerForm) //store里没写完
            .then(() => {
              this.redirect="/login"
              this.$router.push({ path: this.redirect || "/" });
              this.loading = false;
            })
            .catch(() => {
              this.loading = false;
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    handleLoginPhone() {
      this.$refs.loginFormPhone.validate((valid) => {
        if (valid) {
          this.loading = true;
          this.$store
            .dispatch("user/quickLogin", this.loginFormPhone)
            .then(() => {
              // console.log(response.body)
              this.$router.push({ path: this.redirect || "/" });
              this.loading = false;
            })
            .catch(() => {
              this.loading = false;
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    handleValiClicked() {
      if (!this.timer) {
        this.count = this.TIME_COUNT;
        // this.valiDisabled = true;
        this.timer = setInterval(() => {
          if (this.count > 0 && this.count <= this.TIME_COUNT) {
            // console.log(2);
            this.count--;
          } else {
            // console.log(3);
            clearInterval(this.timer);
            this.timer = null;
            this.valiDisabled = false;
          }
        }, 1000);
        // console.log(1);
      }
      console.log(this.loginFormPhone.username)
      this.$store
        .dispatch("user/getVeriCode", this.loginFormPhone.username)
        .then(() => {
          console.log(response.body)
          this.$router.push({ path: this.redirect || "/" });
          // this.loading = false;
        })
        .catch(() => {
          // this.loading = false;
        });
    },
  },
};
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #fff;
$light_gray: #e4e7ed;
$cursor: #333;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      // color: $light_gray;
      height: 47px;
      // caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid $light_gray;
    // background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
    margin: 22px 0px;
    // text-align: left;
  }
}
</style>

<style lang="scss" scoped>
$bg: #fff;
$dark_gray: #606266;
$light_gray: #eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 20vh 35px 10vh;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    // padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    text-align: center;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $dark_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}

#remember {
  border: transparent;
  text-align: left;
  line-height: 0px;
  margin: 22px 0;
}

#valicode {
  width: 75% !important;
  display: inline-block;
  margin: 0px;
  // float: left;
  text-align: center;
}
</style>
