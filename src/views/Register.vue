<template>
  <el-card class="box-card">
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <h1>Sign up.</h1>
      <h4 style="margin-bottom: 20px">Register with your personal data</h4>
      <el-form-item label="Username" prop="notnull">
        <el-input v-model="ruleForm.username"></el-input>
      </el-form-item>

      <!--      <el-form-item label="Gender" style="text-align: left">-->
      <!--        <el-radio v-model="ruleForm.gender" label="1">Female</el-radio>-->
      <!--        <el-radio v-model="ruleForm.gender" label="2">Male</el-radio>-->
      <!--      </el-form-item>-->
      <el-form-item label="Email" prop="notnull">
        <el-input
          placeholder="input your email"
          v-model="ruleForm.email"
        ></el-input>
      </el-form-item>
      <el-form-item label="Phone" prop="notnull">
        <el-input
          placeholder="input your phone"
          v-model="ruleForm.phone"
        ></el-input>
      </el-form-item>
      <el-form-item label="Password" prop="password">
        <el-input
          placeholder="input your password"
          v-model="ruleForm.password"
          show-password
        ></el-input>
      </el-form-item>
      <el-form-item label="Confirm" prop="comfirmpassword">
        <el-input
          placeholder="input your password"
          v-model="ruleForm.comfirmpassword"
          show-password
        ></el-input>
      </el-form-item>
    </el-form>

    <!--    <div class="checkbox">-->
    <!--      <input type="checkbox" value="remember-me">-->
    <!--      <label>Remember me</label>-->
    <!--    </div>-->

    <el-form-item>
      <el-button
        type="primary"
        @click="submitForm('ruleForm')"
        style="width: 150px"
        >Submit</el-button
      >
    </el-form-item>

    <div class="bottom_text">
      Have an account?
      <router-link to="/login">Sign In!</router-link><br /><br />
    </div>
  </el-card>
</template>

<script>
import UserDataService from "../services/UserDataService";

export default {
  data() {
    return {
      ruleForm: {
        username: "",
        password: "",
        comfirmpassword: "",
        gender: "",
        email: "",
        phone: "",
      },
      rules: {
        notnull: [
          {
            required: true,
            message: "can not be empty",
            trigger: "blur",
          },
        ],
        password: [
          {
            pattern:
              /^(?![\d]+$)(?![a-zA-Z]+$)(?![^\da-zA-Z]+$)([^\u4e00-\u9fa5\s]){6,20}$/,
            required: true,
            message:
              "please enter a password with upper and lower letters and at least a number",
            trigger: "blur",
          },
          {
            max: 30,
            message: "max length of password is 30",
          },
        ],
        comfirmpassword: [
          {
            required: true,
            message: "confirm your password",
            trigger: "blur",
          },
          {
            validator: (rule, value, callback) => {
              if (value === "") {
                callback(new Error("please type your pasword again"));
              } else if (value !== this.ruleForm.password) {
                callback(new Error("Passwords do not match"));
              } else {
                callback();
              }
            },
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        const encry = {};
        encry.username = this.ruleForm.username;
        encry.password = this.ruleForm.password;
        encry.email = this.ruleForm.email;
        encry.phone = this.ruleForm.phone;

        if (valid) {
          // UserDataService.postuser(info).then((response) => {
          //   console.log(response);
          //   this.userId = response.data._links.self.href.split("/").pop();
          //   console.log("this userId is " + this.userId);
          //   this.ruleForm.userId = this.userId;
          //   console.log(JSON.stringify(this.ruleForm));
          // });

          UserDataService.registerpost(encry).then((response) => {
            console.log(response);
            alert("Success register");
          });
          this.$router.push({ name: "Login" });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
  // created() {
  // },
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
