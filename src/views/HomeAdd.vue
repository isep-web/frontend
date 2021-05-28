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
        <el-form-item label="Guest" prop="guestNumber">
          <el-input-number
            v-model="ruleForm.guestNumber"
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
          <el-checkbox-group v-model="ruleForm.constraints">
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
        <el-button
          type="primary"
          @click="submitForm('ruleForm')"
          style="margin-left: -100px"
          >Submit</el-button
        >
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
        area: 0,
        guestNumber: 0,
        description: "",
        amenities: [],
        constraints: [],
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
      HomeDataService.retrieveAllHome(1).then((response) => {
        console.log(response.data);
        this.ruleForm.title = response.data.title;
        // this.ruleForm.fileList = JSON.parse(response.data.picture);
        console.log(this.ruleForm.fileList);
      });
      HomeDataService.retrieveAllAmenities(1).then((response) => {
        console.log(response.data._embedded.amenities);
        for (let i = 0; i < response.data._embedded.amenities.length; i++) {
          this.img_click(response.data._embedded.amenities[i].name);
          console.log(response.data._embedded.amenities[i].name);
        }
      });
      HomeDataService.retrieveAllConstraints(1).then((response) => {
        console.log(response.data._embedded.constraints);
        for (let i = 0; i < response.data._embedded.constraints.length; i++) {
          this.img_click(response.data._embedded.constraints[i].name);
          console.log(response.data._embedded.constraints[i].name);
        }
      });
      HomeDataService.retrieveAllServices(1).then((response) => {
        console.log(response.data._embedded.services);
        for (let i = 0; i < response.data._embedded.services.length; i++) {
          this.img_click(response.data._embedded.services[i].name);
          console.log(response.data._embedded.services[i].name);
        }
      });
    },

    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        const info = {};
        Object.assign(info, this.ruleForm);
        delete info.amenities;
        delete info.constraints;
        delete info.services;
        info.location = JSON.stringify(this.ruleForm.location);
        info.userId = 1;

        console.log(info);
        if (valid) {
          HomeDataService.postHome(info).then((response) =>
            console.log(response)
          );
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    img_click(id) {
      const checkImage = document.getElementById(id + "img");
      let ruleArray = null;
      //区分 amenity 和 constraint
      if (id[0] === "a") {
        ruleArray = this.ruleForm.amenities;
      } else {
        ruleArray = this.ruleForm.constraints;
      }
      let i = ruleArray.indexOf(id);
      if (i > -1) {
        checkImage.className = "gray";
        ruleArray.splice(i, 1);
        return;
      }
      checkImage.className = " ";
      ruleArray.push(id);
      console.log(ruleArray);
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
      const reader = new FileReader();
      reader.readAsDataURL(file.url);
      // this.ruleForm.fileList.push(file.url);
      console.log(file.url);
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
