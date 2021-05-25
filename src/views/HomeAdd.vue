<template>
  <div>
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-card class="box-card">
        <el-form-item label="Title" prop="title">
          <el-input v-model="ruleForm.title"></el-input>
        </el-form-item>
        <el-form-item label="Address" prop="location">
          <el-input v-model="ruleForm.location"></el-input>
        </el-form-item>
        <el-form-item label="Area(㎡)">
          <el-input v-model="ruleForm.area"></el-input>
        </el-form-item>
        <el-form-item label="Guest" prop="guest">
          <el-input-number
            v-model="ruleForm.guest"
            :min="1"
            :max="10"
          ></el-input-number>
        </el-form-item>
      </el-card>
      <el-card class="box-card">
        <el-form-item label="Description">
          <el-input
            type="textarea"
            v-model="ruleForm.description"
            maxlength="50"
            show-word-limit
            :autosize="{ minRows: 3, maxRows: 6 }"
          ></el-input>
        </el-form-item>
      </el-card>
      <el-card class="box-card">
        <el-form-item label="Amenities">
          <el-checkbox-group v-model="ruleForm.amenities">
            <el-row :gutter="20">
              <el-col :xs="12" :sm="6" :md="6" :xl="6">
                <el-checkbox
                  label="a1"
                  name="amenities"
                  id="a1"
                  style="display: none"
                ></el-checkbox>
                <img
                  src="../assets/amenities/TV.png"
                  alt="checked"
                  id="a1img"
                  class="gray"
                  style="width: 80%"
                  @click="img_click('a1')"
                />
              </el-col>
              <el-col :xs="12" :sm="6" :md="6" :xl="6">
                <el-checkbox
                  label="a2"
                  name="amenities"
                  id="a2"
                  style="display: none"
                ></el-checkbox>
                <img
                  src="../assets/amenities/wifi.png"
                  alt="checked"
                  id="a2img"
                  class="gray"
                  style="width: 80%"
                  @click="img_click('a2')"
                />
              </el-col>
              <el-col :xs="12" :sm="6" :md="6" :xl="6">
                <el-checkbox
                  label="a3"
                  name="amenities"
                  id="a3"
                  style="display: none"
                ></el-checkbox>
                <img
                  src="../assets/amenities/AC.png"
                  alt="checked"
                  id="a3img"
                  class="gray"
                  style="width: 80%"
                  @click="img_click('a3')"
                />
              </el-col>
              <el-col :xs="12" :sm="6" :md="6" :xl="6">
                <el-checkbox
                  label="a4"
                  name="amenities"
                  id="a4"
                  style="display: none"
                ></el-checkbox>
                <img
                  src="../assets/amenities/cook.png"
                  alt="checked"
                  id="a4img"
                  class="gray"
                  style="width: 80%"
                  @click="img_click('a4')"
                />
              </el-col>
              <el-col :xs="12" :sm="6" :md="6" :xl="6">
                <el-checkbox
                  label="a5"
                  name="amenities"
                  id="a5"
                  style="display: none"
                ></el-checkbox>
                <img
                  src="../assets/amenities/bathtub.png"
                  alt="checked"
                  id="a5img"
                  class="gray"
                  style="width: 80%"
                  @click="img_click('a5')"
                />
              </el-col>
              <el-col :xs="12" :sm="6" :md="6" :xl="6">
                <el-checkbox
                  label="a6"
                  name="amenities"
                  id="a6"
                  style="display: none"
                ></el-checkbox>
                <img
                  src="../assets/amenities/heating.png"
                  alt="checked"
                  id="a6img"
                  class="gray"
                  style="width: 80%"
                  @click="img_click('a6')"
                />
              </el-col>
              <el-col :xs="12" :sm="6" :md="6" :xl="6">
                <el-checkbox
                  label="a7"
                  name="amenities"
                  id="a7"
                  style="display: none"
                ></el-checkbox>
                <img
                  src="../assets/amenities/swimming.png"
                  alt="checked"
                  id="a7img"
                  class="gray"
                  style="width: 80%"
                  @click="img_click('a7')"
                />
              </el-col>
              <el-col :xs="12" :sm="6" :md="6" :xl="6">
                <el-checkbox
                  label="a8"
                  name="amenities"
                  id="a8"
                  style="display: none"
                ></el-checkbox>
                <img
                  src="../assets/amenities/elevator.png"
                  alt="checked"
                  id="a8img"
                  class="gray"
                  style="width: 80%"
                  @click="img_click('a8')"
                />
              </el-col>
            </el-row>
          </el-checkbox-group>
        </el-form-item>
      </el-card>

      <el-card class="box-card">
        <el-form-item label="House Rules">
          <el-checkbox-group v-model="ruleForm.amenities">
            <el-row :gutter="20">
              <el-col :xs="12" :sm="6" :md="6" :xl="6">
                <el-checkbox
                  label="b1"
                  name="amenities"
                  id="b1"
                  style="display: none"
                ></el-checkbox>
                <img
                  src="../assets/amenities/smoke.png"
                  alt="checked"
                  id="b1img"
                  class="gray"
                  style="width: 80%"
                  @click="img_click('b1')"
                />
              </el-col>
              <el-col :xs="12" :sm="6" :md="6" :xl="6">
                <el-checkbox
                  label="b2"
                  name="amenities"
                  id="b2"
                  style="display: none"
                ></el-checkbox>
                <img
                  src="../assets/amenities/pet.png"
                  alt="checked"
                  id="b2img"
                  class="gray"
                  style="width: 80%"
                  @click="img_click('b2')"
                />
              </el-col>
              <el-col :xs="12" :sm="6" :md="6" :xl="6">
                <el-checkbox
                  label="b3"
                  name="amenities"
                  id="b3"
                  style="display: none"
                ></el-checkbox>
                <img
                  src="../assets/amenities/plant.png"
                  alt="checked"
                  id="b3img"
                  class="gray"
                  style="width: 80%"
                  @click="img_click('b3')"
                />
              </el-col>
              <el-col :xs="12" :sm="6" :md="6" :xl="6"> </el-col>
            </el-row>
          </el-checkbox-group>
        </el-form-item>
      </el-card>

      <el-card class="box-card">
        <label>Photo of your home</label>
        <p>
          Add photos of your home and increase your chances of finalizing an
          exchange.
        </p>
        <el-form-item style="margin-left: -50px">
          <div style="margin-bottom: -20px">
            <el-upload
              action="#"
              list-type="picture-card"
              accept=".jpg, .jpeg, .png"
              :auto-upload="false"
              :on-change="handleChange"
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemove"
              :limit="6"
              :on-exceed="handleExceed"
            >
              <template #default>
                <i class="el-icon-plus"></i>
              </template>
            </el-upload>
            <el-dialog v-model="dialogVisible">
              <img style="width: 100%" :src="dialogImageUrl" alt="" />
            </el-dialog>
          </div>
        </el-form-item>
      </el-card>

      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')"
          >Submit</el-button
        >
        <el-button @click="resetForm('ruleForm')">Reset</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import HomeDataService from "../services/HomeDataService";
export default {
  data() {
    return {
      ruleForm: {
        title: "",
        location: "",
        area: "",
        guest: 0,
        description: "",
        amenities: [],
        fileList: [],
      },
      rules: {
        title: [
          {
            required: true,
            message: "Please enter the title!",
            trigger: "blur",
          },
          {
            min: 3,
            max: 10,
            message: "The length should be 3 - 10.",
            trigger: "blur",
          },
        ],
        location: [
          {
            required: true,
            message: "Please enter the address!",
            trigger: "blur",
          },
          { min: 5, message: "Enter the correct address.", trigger: "blur" },
        ],

        guest: [
          {
            required: true,
            message: "Please enter!",
            trigger: ["blur", "change"],
          },
        ],
      },
      dialogImageUrl: "",
      dialogVisible: false,
    };
  },
  methods: {
    refreshHome() {
      HomeDataService.retrieveAllHome().then((response) => {
        console.log(response.data.title);
        this.ruleForm.title = response.data.title;
      });
    },

    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(this.ruleForm);
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    img_click(id) {
      const checkImage = document.getElementById(id + "img");

      let i = this.ruleForm.amenities.indexOf(id);
      if (i > -1) {
        checkImage.className = "gray";
        this.ruleForm.amenities.splice(i, 1);
        return;
      }
      checkImage.className = " ";
      this.ruleForm.amenities.push(id);
    },
    handleRemove(file) {
      console.log(file);
      let i = 0;
      for (; i < this.ruleForm.fileList.length; i++) {
        if (file.name === this.ruleForm.fileList[i].name) {
          break;
        }
      }
      this.ruleForm.fileList.splice(i, 1);
      console.log(this.ruleForm.fileList);
    },
    handleChange(file) {
      this.ruleForm.fileList.push(file);
    },
    handleExceed(file) {
      this.$message.warning(`You can only post 6 photos of your home.`);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
      console.log("hello!", file.url);
      console.log(this.dialogImageUrl);
    },
  },
  created() {
    this.refreshHome();
  },
};
</script>

<style>
.box-card {
  width: 60%;
  margin-left: 20%;
  margin-bottom: 20px;
  margin-top: 20px;
  text-align: left;
  padding-top: 20px;
}
.gray {
  -webkit-filter: grayscale(100%);
  -moz-filter: grayscale(100%);

  -o-filter: grayscale(100%);

  filter: grayscale(100%);
}
img {
  -webkit-user-drag: none;
  /* 所有图片不能被拖动 */
}
</style>
