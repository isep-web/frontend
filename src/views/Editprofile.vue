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
      <!--      <el-row :gutter="0">-->
      <!--        <el-col :span="22">-->
      <!--          <el-form-item label="Username">-->
      <!--            <el-input v-model="ruleForm.username"></el-input>-->
      <!--          </el-form-item>-->
      <!--        </el-col>-->
      <!--      </el-row>-->

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
          <el-form-item label="Confirm" prop="comfirmpassword">
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
          >Submit
        </el-button>
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
            <el-input v-model="ruleForm2.sex"></el-input>
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
      <!--      <label></label>-->
      <p>Upload or modify your avatar</p>
      <label for="file">
        <img class="avatar" :src="imageUrl" />
      </label>
      <input
        id="file"
        name="file"
        type="file"
        accept="image/png,image/gif,image/jpeg"
        @change="handleChange($event)"
        style="display: none"
      />
      <!--      <el-upload-->
      <!--        class="avatar-uploader"-->
      <!--        action="https://jsonplaceholder.typicode.com/posts/"-->
      <!--        :show-file-list="false"-->
      <!--        :on-success="handleAvatarSuccess"-->
      <!--        :before-upload="beforeAvatarUpload"-->
      <!--      >-->
      <!--        <img v-if="imageUrl" :src="imageUrl" class="avatar" />-->
      <!--        <i v-else class="el-icon-plus avatar-uploader-icon"></i>-->
      <!--      </el-upload>-->
      <el-form-item>
        <el-button
          type="primary"
          @click="submitForm2('ruleForm2')"
          style="margin-left: 250px"
          >Submit
        </el-button>
      </el-form-item>
    </el-card>
  </el-form>
</template>

<script>
import UserDataService from "../services/UserDataService";
import { mapGetters } from "vuex";
import HomeDataService from "../services/HomeDataService";

export default {
  data() {
    return {
      imageHad: -1,
      imageUrl:
        "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
      userId: Number,
      avatarFile: null,
      ruleForm: {
        username: "",
        password: "",
        comfirmpassword: "",
        email: "",
        phone: "",
      },
      ruleForm2: {
        location: "",
        language: "",
        description: "",
        sex: "",
      },
      rules: {
        // password: [
        //   {
        //     pattern:
        //       /^(?![\d]+$)(?![a-zA-Z]+$)(?![^\da-zA-Z]+$)([^\u4e00-\u9fa5\s]){6,20}$/,
        //     // required: true,
        //     message: "名称必填",
        //     trigger: "blur",
        //   },
        //   {
        //     max: 30,
        //     message: "名称长度不能超过30位",
        //   },
        // ],
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
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        const info = {};
        info.phone = this.ruleForm.phone;
        info.email = this.ruleForm.email;
        console.log(info);
        if (valid) {
          //修改phone&email
          UserDataService.patchuser(this.userId, info).then((response) => {
            console.log(response.data);
            console.log(this.userId);
          });

          //修改password
          if (this.ruleForm.password != "") {
            const pass = {};
            pass.password = this.ruleForm.password;

            UserDataService.patchpassword(pass)
              .then((response) => {
                console.log(response.data);
                alert("success");
              })
              .then(() => {
                this.$router.push({ name: "Login" });
              });
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },

    submitForm2(formName) {
      this.$refs[formName].validate((valid) => {
        const info = {};
        Object.assign(info, this.ruleForm2);
        if (this.ruleForm2.sex === "female") {
          info.sex = 2;
        } else if (this.ruleForm2.sex === "male") {
          info.sex = 1;
        }
        info.location = JSON.stringify(this.ruleForm2.location);
        console.log(info);
        if (valid) {
          UserDataService.patchuser(this.$store.getters.userid, info).then(
            (response) => console.log(response)
          );
          //如果用户添加了头像文件，avatarFile不为空
          if (this.avatarFile) {
            //如果已经上传过头像，先删除头像
            if (this.imageHad > 0) {
              HomeDataService.deletePic(this.imageHad);
            }
            const fileData = {};
            const uid = {};
            uid.id = this.userId;
            fileData.user = uid;
            fileData.type = 0;
            HomeDataService.putHousePhotos(fileData).then((response) => {
              const picId = response.data._links.self.href.split("/").pop();
              HomeDataService.putPictureContent(picId, this.avatarFile).catch(
                () => {
                  this.timer = setTimeout(() => {
                    //设置延迟执行
                    console.log("ok");
                  }, 100);
                  location.reload();
                }
              );
            });
          }

          this.$router.push({ name: "Profile" });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },

    refreshUser() {
      UserDataService.retrieveAllUser(this.$store.getters.userid).then(
        (response) => {
          console.log("id" + this.$store.getters.userid);
          console.log(response.data);
          this.ruleForm2.displayName = response.data.displayName;
          this.ruleForm.email = response.data.email;
          this.ruleForm.phone = response.data.phone;
          this.ruleForm2.language = response.data.language;
          if (response.data.sex === 1) {
            this.ruleForm2.sex = "male";
          } else if (response.data.sex === 2) {
            this.ruleForm2.sex = "female";
          } else {
            this.ruleForm2.sex = response.data.sex;
          }
          this.ruleForm2.description = response.data.description;
          this.ruleForm2.location = JSON.parse(response.data.location);
        }
      );
      HomeDataService.retrievePicByUserId(this.userId).then((response) => {
        this.imageUrl = response.data._links.content.href;
        this.imageHad = response.data._links.self.href.split("/").pop();
      });
    },
    handleChange(e) {
      const file = e.target.files[0] || e.dataTransfer.files[0];
      let URL = window.URL || window.webkitURL; // 获取当前域名地址
      this.imageUrl = URL.createObjectURL(file);

      let param = new FormData(); //创建form对象
      param.append("file", file, file.name); //通过append向form对象添加数据

      this.avatarFile = param;
    },
    // handleAvatarSuccess(res, file) {
    //   this.imageUrl = URL.createObjectURL(file.raw);
    //   console.log(file);
    // },
    // beforeAvatarUpload(file) {
    //   const isJPG = file.type === "image/jpeg";
    //   const isLt2M = file.size / 1024 / 1024 < 2;
    //
    //   if (!isJPG) {
    //     this.$message.error("上传头像图片只能是 JPG 格式!");
    //   }
    //   if (!isLt2M) {
    //     this.$message.error("上传头像图片大小不能超过 2MB!");
    //   }
    //   return isJPG && isLt2M;
    // },
  },

  created() {
    this.userId = this.$store.getters.userid;
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
