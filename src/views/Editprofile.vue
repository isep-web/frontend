<template>
  <el-form
    :model="ruleForm"
    :rules="rules"
    ref="ruleForm"
    label-width="100px"
    class="demo-ruleForm"
  >
    <el-card class="box-card">
      <h2 style="text-align: center">CONFIDENTIAL INFORMATION</h2>
      <p>
        Your telephone number, your email address and your last name will be
        communicated to another person (host or guest) only in the case of an
        exchange. The other information will not be disclosed and will remain
        private.
      </p>
      <el-row :gutter="0">
        <el-col :span="22">
          <el-form-item label="Username">
            <el-input v-model="ruleForm.userName"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="5">
        <el-col :span="11">
          <el-form-item label="Phone">
            <el-input v-model="ruleForm.phone"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="Email">
            <el-input v-model="ruleForm.email"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="0">
        <el-col :span="11">
          <el-form-item label="Password" prop="password">
            <el-input v-model="ruleForm.password" show-password></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="Comfirm Password" prop="comfirmpassword">
            <el-input
              v-model="ruleForm.comfirmpassword"
              show-password
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-form-item>
        <el-button
          type="primary"
          @click="submitForm('ruleForm')"
          style="margin-left: 250px"
          >Submit</el-button
        >
      </el-form-item>
    </el-card>
  </el-form>

  <el-form
    :model="ruleForm2"
    :rules="rules"
    ref="ruleForm2"
    label-width="100px"
    class="demo-ruleForm2"
  >
    <el-card class="box-card" style="padding-top: 0px">
      <h2 style="text-align: center">My profile</h2>
      <!--      <p>-->
      <!--        Your telephone number, your email address and your last name will be-->
      <!--        communicated to another person (host or guest) only in the case of an-->
      <!--        exchange. The other information will not be disclosed and will remain-->
      <!--        private.-->
      <!--      </p>-->

      <el-row :gutter="5">
        <el-col :span="11">
          <el-form-item label="Displayname">
            <el-input v-model="ruleForm2.displayName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="Gender">
            <el-input v-model="ruleForm2.gender"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="0">
        <el-col :span="11">
          <el-form-item label="Language">
            <el-input v-model="ruleForm2.language"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="Location">
            <el-input v-model="ruleForm2.location"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="Description">
        <el-input
          type="textarea"
          v-model="ruleForm2.description"
          maxlength="50"
          show-word-limit
          :autosize="{ minRows: 3, maxRows: 6 }"
        ></el-input>
      </el-form-item>
    </el-card>

    <el-card class="box-card">
      <label>Photo of your home</label>
      <p>Upload or modify your avatar</p>
      <el-upload
        class="avatar-uploader"
        action="https://jsonplaceholder.typicode.com/posts/"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
      >
        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
      <el-form-item>
        <el-button
          type="primary"
          @click="submitForm2('ruleForm2')"
          style="margin-left: 250px"
          >Submit</el-button
        >
      </el-form-item>
    </el-card>
  </el-form>
</template>

<script>
import UserDataService from "../services/UserDataService";

export default {
  data() {
    return {
      imageUrl: "",
      ruleForm: {
        userName: "",
        password: "",
        comfirmpassword: "",

        email: "",
        phone: "",
      },
      ruleForm2: {
        location: "",
        language: "",
        description: "",
        gender: "",
      },
      rules: {
        password: [
          {
            pattern:
              /^(?![\d]+$)(?![a-zA-Z]+$)(?![^\da-zA-Z]+$)([^\u4e00-\u9fa5\s]){6,20}$/,
            // required: true,
            message: "名称必填",
            trigger: "blur",
          },
          {
            max: 30,
            message: "名称长度不能超过30位",
          },
        ],
        comfirmpassword: [
          {
            // required:true,
            message: "确认密码",
            trigger: "blur",
          },
          {
            validator: (rule, value, callback) => {
              if (value !== this.ruleForm.password) {
                callback(new Error("两次输入密码不一致"));
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
    // submitForm(formName) {
    //   this.$refs[formName].validate((valid) => {
    //     const info = {
    //     };
    //     Object.assign(info, this.ruleForm);
    //     // info.location = JSON.stringify(this.ruleForm.location);
    //     if(this.ruleForm.password==""){
    //       delete info.password;
    //     }
    //     if(this.ruleForm.userName==""){
    //       delete info.userName;
    //     }
    //     console.log(info);
    //     if (valid) {
    //
    //       UserDataService.patchuser(info).then((response) =>
    //         console.log(response)
    //       );
    //       this.$router.push({name: 'Profile'});
    //     } else {
    //       console.log("error submit!!");
    //       return false;
    //     }
    //   });
    // },
    submitForm2(formName) {
      this.$refs[formName].validate((valid) => {
        const info = {};
        Object.assign(info, this.ruleForm2);
        info.location = JSON.stringify(this.ruleForm2.location);
        console.log(info);
        if (valid) {
          UserDataService.patchuser(info).then((response) =>
            console.log(response)
          );
          this.$router.push({ name: "Profile" });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },

    refreshUser() {
      UserDataService.retrieveAllUser().then((response) => {
        console.log(response.data);
        this.ruleForm2.displayName = response.data.displayName;
        this.ruleForm.email = response.data.email;
        this.ruleForm.phone = response.data.phone;
        this.ruleForm2.language = response.data.language;
        this.ruleForm2.gender = response.data.gender;
        this.ruleForm2.description = response.data.description;
        this.ruleForm2.location = JSON.parse(response.data.location);
      });
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      console.log(file);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
  },

  created() {
    this.refreshUser();
  },
};
</script>

<style scoped>
.box-card {
  width: 60%;
  margin-left: 20%;
  margin-bottom: 20px;
  margin-top: 20px;
  text-align: left;
  padding-top: 20px;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}

@import url("//unpkg.com/element-ui@2.15.1/lib/theme-chalk/index.css");
</style>
