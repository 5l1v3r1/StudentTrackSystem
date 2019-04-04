<template>
  <div class="login-container">
    <el-form
      :model="form"
      :rules="loginRules"
      class="login-form"
      auto-complete="on"
      label-position="left">

      <h3 class="title">Çetelem</h3>
      <el-form-item prop="username" >
        <span class="svg-container">
          <svg-icon name="user"/>
        </span>
        <el-input required v-model="form.username" placeholder="Kullanıcı Adı" name="username" ></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon name="password"/>
        </span>
        <el-input name="password"
                  v-model="form.password"
                  :type="pwdType"
                  @keyup.enter.native="Login"
                  auto-complete="on"
                  placeholder="Parola"/>
        <span class="show-pwd" @click="ShowPwd">
          <svg-icon :name="ShowPwIcon"/>
        </span>
      </el-form-item>
      <el-form-item>
        <el-button
          :loading="loading"
          type="primary"
          style="width:100%;"
          @click.native.prevent="Login"
        >Giriş Yap</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>


<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { AuthModule } from "@/store/auth.module";
import {Message} from "element-ui";


@Component
export default class Login extends Vue {


  private loading = false;

  private pwdType = 'password';

  private form = {
    username: 'kudretuğur',
    password: '123qweasd_1',
  };

  private validateUsername = (rule, value, callback) => {
    if (value === '') {
      callback(new Error('Kullanıcı Adı Boş Bırakılamaz!'))
    }
  };

  private validatePassword = (rule, value, callback) => {
    if (value === '') {
      callback(new Error('Parola Boş Bırakılamaz!'))
    }
  };

  private loginRules = {
    username: [{ required: true, trigger: 'blur', validator: this.validateUsername }],
    password: [{ required: true, trigger: 'blur', validator: this.validatePassword }]
  };

  private ShowPwd() {
    this.pwdType =
      this.pwdType === "password" ? "" : "password";
  }


  private async Login() {

    this.loading = true;
    AuthModule.Login(this.form).then(() => {
      this.$router.push({path: '/'});
      this.loading = false;
    }).catch(err => {
      this.loading = false;
    });

  }

  get ShowPwIcon() {
    return this.pwdType === "password" ? "eye-off" : "eye-on";
  }
}
</script>


<style lang="scss">
@import "src/styles/variables.scss";

.login-container {
  .el-input {
    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      color: $lightGray;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $loginBg inset !important;
        -webkit-box-shadow: 0 0 0px 1000px $loginBg inset !important;
        -webkit-text-fill-color: #fff !important;
      }
    }
  }
}
</style>

<style lang="scss" scoped>
@import "src/styles/variables.scss";

.login-container {
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: $loginBg;

  .login-form {
    position: absolute;
    left: 0;
    right: 0;
    width: 520px;
    max-width: 100%;
    padding: 35px 35px 15px 35px;
    margin: 120px auto;
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
  .el-input {
    display: inline-block;
    width: 85%;
  }
  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $darkGray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }
  .title {
    font-size: 26px;
    font-weight: 400;
    color: $lightGray;
    margin: 0px auto 40px auto;
    text-align: center;
    font-weight: bold;
  }
  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $darkGray;
    cursor: pointer;
    user-select: none;
  }
}
</style>

