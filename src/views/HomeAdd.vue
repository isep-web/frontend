<template>
  <div style="margin-top: 10px">
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
                  label="c1"
                  id="c1"
                  style="display: none"
                ></el-checkbox>
                <img
                  src="../assets/amenities/smoke.png"
                  alt="checked"
                  id="c1img"
                  class="gray"
                  style="width: 80%"
                  @click="img_click('c1')"
                />
              </el-col>
              <el-col :xs="12" :sm="6" :md="6" :xl="6">
                <el-checkbox
                  label="c2"
                  id="c2"
                  style="display: none"
                ></el-checkbox>
                <img
                  src="../assets/amenities/children.png"
                  alt="checked"
                  id="c2img"
                  class="gray"
                  style="width: 80%"
                  @click="img_click('c2')"
                />
              </el-col>
              <el-col :xs="12" :sm="6" :md="6" :xl="6">
                <el-checkbox
                  label="c3"
                  name="amenities"
                  id="c3"
                  style="display: none"
                ></el-checkbox>
                <img
                  src="../assets/amenities/pet.png"
                  alt="checked"
                  id="c3img"
                  class="gray"
                  style="width: 80%"
                  @click="img_click('c3')"
                />
              </el-col>
              <el-col :xs="12" :sm="6" :md="6" :xl="6"> </el-col>
            </el-row>
          </el-checkbox-group>
        </el-form-item>
      </el-card>

      <el-card class="box-card">
        <el-form-item label="Need To Do">
          <el-checkbox-group v-model="ruleForm.services">
            <el-row :gutter="20">
              <el-col :xs="12" :sm="6" :md="6" :xl="6">
                <el-checkbox
                  label="b1"
                  id="b1"
                  style="display: none"
                ></el-checkbox>
                <img
                  src="../assets/amenities/cleaning.png"
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
                  id="b2"
                  style="display: none"
                ></el-checkbox>
                <img
                  src="../assets/amenities/petsToFeed.png"
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
            <img
              class="housePic"
              v-for="picId in this.ruleForm.fileHad"
              :key="picId"
              :src="'http://localhost:17698/pictures/' + picId"
              @click="handleRemove(0, picId)"
            />
            <img
              class="housePic"
              v-for="num in 6 - this.ruleForm.fileHad.length"
              :key="num"
              :src="this.ruleForm.fileList[num - 1]"
              @click="handleRemove(1, num - 1)"
            />

            <label for="file" style="height: 150px">
              <i
                class="el-icon-circle-plus-outline"
                style="
                  font-size: 40px;
                  line-height: 200px;
                  vertical-align: middle;
                "
              ></i>
            </label>

            <input
              id="file"
              name="file"
              type="file"
              accept="image/png,image/gif,image/jpeg"
              @change="handleChange($event)"
              style="display: none"
            />
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
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      houseId: -1,
      ruleForm: {
        title: "",
        location: "",
        area: 0,
        guestNumber: 1,
        description: "",
        amenities: [],
        services: [],
        constraints: [],
        fileList: [],
        fileList2: [],
        fileHad: [],
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
      deletedPic: [],
    };
  },
  methods: {
    refreshHome() {
      //如果是新添房间，不需要读数据，return
      if (this.houseId < 0) {
        return;
      }
      //已存在房间，需要读取房间的数据
      HomeDataService.retrieveAllHome(this.houseId).then((response) => {
        console.log(response.data);
        this.ruleForm.title = response.data.title;
        this.ruleForm.location = JSON.parse(response.data.location);
        this.ruleForm.area = response.data.area;
        this.ruleForm.guestNumber = response.data.guestNumber;
        this.ruleForm.description = response.data.description;
        // this.ruleForm.fileList = JSON.parse(response.data.picture);
      });
      HomeDataService.retrieveAllAmenities(this.houseId).then((response) => {
        // console.log(response.data._embedded.amenities);
        for (let i = 0; i < response.data._embedded.amenities.length; i++) {
          this.img_click(response.data._embedded.amenities[i].detail);
          // console.log(response.data._embedded.amenities[i].detail);
        }
      });
      HomeDataService.retrieveAllConstraints(this.houseId).then((response) => {
        // console.log(response.data._embedded.constraints);
        for (let i = 0; i < response.data._embedded.constraints.length; i++) {
          this.img_click(response.data._embedded.constraints[i].detail);
          // console.log(response.data._embedded.constraints[i].name);
        }
      });
      HomeDataService.retrieveAllServices(this.houseId).then((response) => {
        // console.log(response.data._embedded.services);
        for (let i = 0; i < response.data._embedded.services.length; i++) {
          this.img_click(response.data._embedded.services[i].detail);
          // console.log(response.data._embedded.services[i].name);
        }
      });
      HomeDataService.retrievePicByHouseId(this.houseId).then((response) => {
        for (let i = 0; i < response.data._embedded.pictures.length; i++) {
          this.ruleForm.fileHad.push(
            response.data._embedded.pictures[i]._links.self.href
              .split("/")
              .pop()
          );
        }
        console.log(this.ruleForm.fileHad);
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
        info.userId = this.$store.getters.userid;

        console.log(info);
        if (valid) {
          //houseId < 0 表示是新建house
          if (this.houseId < 0) {
            //post上传 house 的信息 （除amenities， constraints， services）
            HomeDataService.postHome(info).then((response) => {
              this.houseId = response.data._links.self.href.split("/").pop();
              //上传house之后拿到houseId 再put amenities的数据
              // HomeDataService.putAmenities(
              //   this.houseId,
              //   this.rulesArrayToJson(this.ruleForm.amenities)
              // ).then((response) => {
              //   console.log("amenities");
              //   console.log(response.data);
              // });
              // HomeDataService.putConstraints(
              //   this.houseId,
              //   this.rulesArrayToJson(this.ruleForm.constraints)
              // );
              // HomeDataService.putServices(
              //   this.houseId,
              //   this.rulesArrayToJson(this.ruleForm.services)
              // );
              let rulesData = {};
              let amenitiesId = [];
              let constraintsId = [];
              let servicesId = [];
              for (let i = 0; i < this.ruleForm.amenities.length; i++) {
                amenitiesId.push({ id: this.ruleForm.amenities[i].slice(1) });
              }
              for (let i = 0; i < this.ruleForm.constraints.length; i++) {
                constraintsId.push({
                  id: this.ruleForm.constraints[i].slice(1),
                });
              }
              for (let i = 0; i < this.ruleForm.services.length; i++) {
                servicesId.push({ id: this.ruleForm.services[i].slice(1) });
              }
              rulesData.userId = this.$store.getters.userid;
              rulesData.amenities = amenitiesId;
              rulesData.constraints = constraintsId;
              rulesData.services = servicesId;
              HomeDataService.patchRules(this.houseId, rulesData);

              // 上传图片
              const fileData = {};
              const hid = {};
              hid.id = this.houseId;
              fileData.house = hid;
              // fileData.user = "http://localhost:17698/user/" + this.houseId;

              fileData.type = 1;
              // console.log(fileData);
              for (let i = 0; i < this.ruleForm.fileList2.length; i++) {
                HomeDataService.putHousePhotos(fileData).then((response) => {
                  const picId = response.data._links.self.href.split("/").pop();
                  HomeDataService.putPictureContent(
                    picId,
                    this.ruleForm.fileList2[i]
                  );
                });
              }

              // alert("添加成功");
              this.$router.push({
                name: "Publishing",
                params: { houseName: this.ruleForm.title },
              });
            });
          } else {
            //else表示修改house
            HomeDataService.putHouse(this.houseId, info).then((response) => {
              // HomeDataService.putAmenities(
              //   this.houseId,
              //   this.rulesArrayToJson(this.ruleForm.amenities)
              // );
              // HomeDataService.putConstraints(
              //   this.houseId,
              //   this.rulesArrayToJson(this.ruleForm.constraints)
              // );
              // HomeDataService.putServices(
              //   this.houseId,
              //   this.rulesArrayToJson(this.ruleForm.services)
              // );
              let rulesData = {};
              let amenitiesId = [];
              let constraintsId = [];
              let servicesId = [];
              for (let i = 0; i < this.ruleForm.amenities.length; i++) {
                amenitiesId.push({ id: this.ruleForm.amenities[i].slice(1) });
              }
              for (let i = 0; i < this.ruleForm.constraints.length; i++) {
                constraintsId.push({
                  id: this.ruleForm.constraints[i].slice(1),
                });
              }
              for (let i = 0; i < this.ruleForm.services.length; i++) {
                servicesId.push({ id: this.ruleForm.services[i].slice(1) });
              }
              rulesData.userId = this.$store.getters.userid;
              rulesData.amenities = amenitiesId;
              rulesData.constraints = constraintsId;
              rulesData.services = servicesId;
              HomeDataService.patchRules(this.houseId, rulesData);

              for (let i = 0; i < this.deletedPic.length; i++) {
                HomeDataService.deletePic(this.deletedPic[i]);
              }
              // 上传图片
              const fileData = {};
              const hid = {};
              hid.id = this.houseId;
              fileData.house = hid;
              // fileData.user = "http://localhost:17698/user/" + this.houseId;

              fileData.type = 1;
              // console.log(fileData);
              for (let i = 0; i < this.ruleForm.fileList2.length; i++) {
                HomeDataService.putHousePhotos(fileData).then((response) => {
                  const picId = response.data._links.self.href.split("/").pop();
                  HomeDataService.putPictureContent(
                    picId,
                    this.ruleForm.fileList2[i]
                  );
                });
              }
            });

            this.timer = setTimeout(() => {
              //设置延迟执行
              console.log("ok");
            }, 5000);
            // alert("修改成功");

            this.$router.push({
              name: "Publishing",
              params: { houseName: this.ruleForm.title },
            });
          }
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
      } else if (id[0] === "b") {
        ruleArray = this.ruleForm.services;
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
    handleRemove(type, index) {
      //0是指已有的图片，1是新添加的图片
      if (type === 1) {
        console.log(this.ruleForm.fileList);
        this.ruleForm.fileList.splice(index, 1);
      }
      if (type === 0) {
        this.ruleForm.fileHad.splice(this.ruleForm.fileHad.indexOf(index), 1);
        this.deletedPic.push(index);
      }

      // console.log(file);
      // let i = 0;
      // for (; i < this.ruleForm.fileList.length; i++) {
      //   if (file.name === this.ruleForm.fileList[i].name) {
      //     break;
      //   }
      // }
      // this.ruleForm.fileList.splice(i, 1);
      // console.log(this.ruleForm.fileList);
    },
    handleChange(e) {
      if (this.ruleForm.fileHad.length + this.ruleForm.fileList.length > 5) {
        this.$message.warning(`You can only post 6 photos of your home.`);
        return;
      }
      const file = e.target.files[0] || e.dataTransfer.files[0];
      let URL = window.URL || window.webkitURL; // 获取当前域名地址
      this.ruleForm.fileList.push(URL.createObjectURL(file));

      let param = new FormData(); //创建form对象
      param.append("file", file, file.name); //通过append向form对象添加数据

      this.ruleForm.fileList2.push(param);
      console.log(this.ruleForm.fileList);
    },

    rulesArrayToJson(array) {
      let rulesData = "[";
      for (let i = 0; i < array.length; i++) {
        if (i !== 0) {
          rulesData = rulesData + ",";
        }
        rulesData = rulesData + '{"id":' + array[i].slice(1) + "}";
      }
      rulesData = rulesData + "]";
      console.log(JSON.parse(rulesData));
      return JSON.parse(rulesData);
    },
  },
  created() {
    // this.houseId = this.$router.query.houseId;
    if (this.$route.params.houseId > 0) {
      this.houseId = this.$route.params.houseId;
    } else {
      this.houseId = -1;
    }
    this.refreshHome();
  },
};
</script>

<style>
.box-card {
  width: 60%;
  margin-left: 20%;
  margin-bottom: 20px;
  margin-top: 30px;
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
.housePic {
  width: 150px;
  padding: 10px;
  line-height: 200px;
  vertical-align: middle;
}
.housePic:hover {
  opacity: 50%;
}
</style>
