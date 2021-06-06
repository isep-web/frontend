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
        <el-input v-model="ruleForm.userName"></el-input>
      </el-form-item>
      <el-form-item label="Password" prop="password">
        <el-input
          placeholder="请输入密码"
          v-model="ruleForm.password"
          show-password
        ></el-input>
      </el-form-item>
    </el-form>

    <div class="checkbox">
      <input type="checkbox" value="remember-me" />
      <label>Remember me</label>
    </div>

    <el-form-item>
      <el-button
        type="primary"
        @click="submitForm('ruleForm')"
        style="width: 150px"
        >Submit</el-button
      >
    </el-form-item>

    <div class="bottom_text">
      Don't have an account?
      <router-link to="/register">Sign up!</router-link><br /><br />
      <a href="#">Forget password?</a>
    </div>
  </el-card>
</template>

<script>
// import UserDataService from "../services/UserDataService";
export default {
  data() {
    return {
      ruleForm: {
        userName: "",
        password: "",
      },
      rules: {
        password: [
          {
            pattern:
              /^(?![\d]+$)(?![a-zA-Z]+$)(?![^\da-zA-Z]+$)([^\u4e00-\u9fa5\s]){6,20}$/,
            required: true,
            message: "名称必填",
            trigger: "blur",
          },
          {
            max: 30,
            message: "名称长度不能超过30位",
          },
        ],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        const info = {};
        Object.assign(info, this.ruleForm);
        if (valid) {
          this.$router.push({ name: "Profile" });
          // UserDataService.retrieveAllUser(info).then((response) => {
          //   console.log(response);
          //   console.log(JSON.stringify(this.ruleForm));
          //   let resuser =response.data._embedded.users;
          //   console.log("resuser"+resuser.length);

          // for (let i = 0; i < resuser.length; i++) {
          //   console.log(resuser[i].userName);
          //   if(resuser[i].userName===this.ruleForm.userName){
          //     if(resuser[i].password==this.ruleForm.password){
          //       //账号密码正确
          //       this.userId = resuser[i]._links.self.href.split("/").pop();
          //       console.log("this userId is " + this.userId);
          //       this.$router.push({name: 'Home'});
          //
          //     }else {alert("password error")}
          //   }
          // }
          // })
        }

        // this.$router.push({name: 'Login'});
        else {
          console.log("error submit!!");
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
