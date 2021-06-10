<template>
  <el-card class="box-card">
    <h1>Log in.</h1>
    <h4 style="margin-bottom: 20px">
      Log in with your data that you entered during your register
    </h4>

    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="Username">
        <el-input v-model="ruleForm.usernameOrEmailOrPhone"></el-input>
      </el-form-item>
      <!--      <el-form-item label="Password" prop="password">-->
      <el-form-item label="Password">
        <el-input
          placeholder="Please input your password"
          v-model="ruleForm.password"
          show-password
        ></el-input>
      </el-form-item>

      <div class="checkbox">
        <input
          type="checkbox"
          value="remember-me"
          v-model="ruleForm.remember"
        />
        <label>Remember me</label>
      </div>
    </el-form>

    <!--    <div class="checkbox">-->
    <!--      <input type="checkbox" value="remember-me" v-model="ruleForm.remember"/>-->
    <!--      <label>Remember me</label>-->
    <!--    </div>-->

    <el-form>
      <el-form-item>
        <el-button
          type="primary"
          @click="submitForm('ruleForm')"
          style="width: 150px"
          >Submit
        </el-button>
      </el-form-item>
    </el-form>

    <div class="bottom_text">
      Don't have an account?
      <router-link to="/register">Sign up!</router-link>
      <br /><br />
      <a href="#">Forget password?</a>
    </div>
  </el-card>
</template>

<script>
// import { mapMutations } from "vuex";
// import { mapState } from "vuex";
import store from "@/store/index.ts";
import { Base64 } from "js-base64";
import UserDataService from "../services/UserDataService";

export default {
  data() {
    return {
      ruleForm: {
        usernameOrEmailOrPhone: "",
        password: "",
        remember: true,
      },
      // rules: {
      //   password: [
      //     {
      //       pattern:
      //         /^(?![\d]+$)(?![a-zA-Z]+$)(?![^\da-zA-Z]+$)([^\u4e00-\u9fa5\s]){6,20}$/,
      //       required: true,
      //       message: "名称必填",
      //       trigger: "blur",
      //     },
      //     {
      //       max: 30,
      //       message: "名称长度不能超过30位",
      //     },
      //   ],
      // },
    };
  },
  methods: {
    // ...mapMutations(["setToken"]),
    // ...mapMutations(["setId"]),
    // ...mapMutations(['userid']),
    // ...mapMutations(['role']),
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        const info = {};
        Object.assign(info, this.ruleForm);
        // console.log(info);
        if (valid) {
          UserDataService.authpost(info).then((response) => {
            let token = response.data.data.token;
            console.log(token);
            //1.token三段
            let str = token.split(".");
            str = str[str.length - 2];
            //2.进行base64解密
            let destr = Base64.decode(str);
            // console.log(destr);
            //3.设置token
            localStorage.setItem("token", token);
            store.commit("setToken", token);
            // this.setToken({ token: destr });
            let result = JSON.parse(destr);
            // console.log(result);
            console.log("roles" + result.roles);
            //4.设置id
            let userid = result.jti;
            // console.log("id" + result.jti);
            store.commit("setId", userid);
            store.commit("setRole", result.roles[0]);
            //5.区分user,admin
            this.roles = result.roles;
            let flag = 0;
            for (let i = 0; i < this.roles.length; i++) {
              // console.log(this.roles[i]);
              if (this.roles[i] === "admin") {
                flag = 1;
              }
            }
            if (flag === 1) {
              this.$router.push({ name: "Admin" });
            } else {
              this.$router.push({ name: "Home" });
            }
          });
        } else {
          alert("error submit!!");
          return false;
        }
      });
    },
  },
};
</script>

<style scoped>
body {
  background: #eaecf0;
}

.box-card {
  width: 50%;
  margin-left: 25%;
  margin-bottom: 20px;
  margin-top: 20px;
  /*text-align: left;*/
  padding-top: 20px;
}

p {
  margin-bottom: 50px;
}

@import url(https://unpkg.com/bootstrap@3.3.5/dist/css/bootstrap.min.css);
</style>
