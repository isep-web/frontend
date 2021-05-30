<template>
  <div class="container" style="margin-top: 50px; text-align: left">
    <div class="block">
      <el-carousel trigger="click" height="500px">
        <el-carousel-item v-for="item in 4" :key="item">
          <h3 class="small">{{ item }}</h3>
        </el-carousel-item>
      </el-carousel>
    </div>

    <br />

    <div class="row clearfix">
      <div class="col-md-7 column">
        <div class="panel panel-info">
          <div class="panel-heading">
            <h3 class="panel-title">Home Description</h3>
          </div>
          <div class="panel-body">
            <h1>{{ houseData.title }}</h1>
            {{ houseData.description }}
          </div>
        </div>
        <div class="panel panel-info">
          <div class="panel-heading">
            <h3 class="panel-title">Amenities</h3>
          </div>
          <div class="panel-body">
            <span v-for="amenity in houseData.amenities" :key="amenity">
              - {{ amenity }}
            </span>
          </div>
        </div>
        <div class="panel panel-info">
          <div class="panel-heading">
            <h3 class="panel-title">Services</h3>
          </div>
          <div class="panel-body">
            <p>*You must provide</p>
            <span v-for="service in houseData.services" :key="service">
              - {{ service }} <br />
            </span>
          </div>
        </div>
        <div class="panel panel-info">
          <div class="panel-heading">
            <h3 class="panel-title">Limitations</h3>
          </div>
          <div class="panel-body">
            <p>*You must respect</p>
            <span v-for="constraint in houseData.constraints" :key="constraint">
              - {{ constraint }} <br />
            </span>
          </div>
        </div>
      </div>

      <div class="col-md-5 column">
        <div class="panel panel-info">
          <div class="panel-heading">
            <h3 class="panel-title">Confirm Guests and Dates</h3>
          </div>
          <div class="panel-body">
            <el-form ref="form" :model="form" text-align="center">
              <el-form-item label="Guest" label-width="100px">
                <el-input-number
                  v-model="form.guestNumber"
                  @change="handleChange"
                  :min="1"
                  :max="10"
                  style="width: 225px"
                ></el-input-number>
              </el-form-item>

              <el-form-item label="Check in" label-width="100px">
                <el-date-picker
                  v-model="form.startDate"
                  type="date"
                  align="right"
                  placeholder="Start Date"
                ></el-date-picker>
              </el-form-item>

              <el-form-item label="Check out" label-width="100px">
                <el-date-picker
                  v-model="form.endDate"
                  type="date"
                  align="right"
                  placeholder="End Date"
                ></el-date-picker>
              </el-form-item>

              <el-form-item style="text-align: center">
                <el-button type="primary" @click="onSubmit('form')"
                  >Apply Now!</el-button
                >
              </el-form-item>
            </el-form>
          </div>
        </div>

        <div class="panel panel-info">
          <div class="panel-heading">
            <h3 class="panel-title">Host Description</h3>
          </div>
          <div class="panel-body">
            <img alt="140x140" src="" class="img-circle" width="50px" />
            <h3>{{ userData.displayName }}</h3>
            <br />
            <label>Languages spoken</label>
            <p>{{ userData.language }}</p>
            <br />
            <label>Intro</label>
            <p>{{ userData.description }}</p>
            <br />
            <div style="text-align: center">
              <el-button type="primary" @click="open">Contact Host</el-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HouseDataService from "@/services/HomeDataService";
import ApplyHouseService from "@/services/ApplyHouseService";
import axios from "axios";
export default {
  name: "HomeDetail",
  data() {
    return {
      houseId: Number,
      houseData: {
        userId: 0,
        userName: "",
        title: "",
        location: "",
        area: 0,
        guestNumber: 1,
        description: "",
        amenities: [],
        services: [],
        constraints: [],
      },
      userData: {
        displayName: "",
        email: "",
        phone: "",
        gender: "",
        language: "",
        description: "",
        icon: "",
        location: "",
      },
      form: {
        houseId: 0,
        guestNumber: 1,
        startDate: "",
        endDate: "",
        sourceUserId: 0,
        targetUserId: 0,
      },
    };
  },
  methods: {
    refreshHouse(houseId) {
      HouseDataService.retrieveAllHome(houseId).then((response) => {
        console.log(response.data);
        this.houseData.userId = response.data.userId;
        this.houseData.title = response.data.title;
        this.houseData.location = response.data.location;
        this.houseData.area = response.data.area;
        this.houseData.guestNumber = response.data.guestNumber;
        this.houseData.description = response.data.description;
        console.log(response.data.userId);
        this.getUserName(response.data.userId).then((response) => {
          console.log(response.data);
          this.userData.displayName = response.data.displayName;
          this.userData.email = response.data.email;
          this.userData.phone = response.data.phone;
          this.userData.gender = response.data.gender;
          this.userData.language = response.data.language;
          this.userData.description = response.data.description;
          this.userData.icon = response.data.icon;
          this.userData.location = response.data.location;
        });
        console.log(this.houseData);
        console.log(this.userData);
      });
      HouseDataService.retrieveAllAmenities(houseId).then((response) => {
        //console.log(response.data);
        for (let i = 0; i < response.data._embedded.amenities.length; i++) {
          this.houseData.amenities[i] =
            response.data._embedded.amenities[i].name;
          //console.log(this.houseData.amenities[i]);
        }
      });
      HouseDataService.retrieveAllServices(houseId).then((response) => {
        //console.log(response.data);
        for (let i = 0; i < response.data._embedded.services.length; i++) {
          this.houseData.services[i] = response.data._embedded.services[i].name;
        }
      });
      HouseDataService.retrieveAllConstraints(houseId).then((response) => {
        //console.log(response.data);
        for (let i = 0; i < response.data._embedded.constraints.length; i++) {
          this.houseData.constraints[i] =
            response.data._embedded.constraints[i].name;
        }
      });
    },
    onSubmit(form) {
      //test sourceUserId
      this.form.sourceUserId = 2;
      this.form.houseId = this.houseId;
      this.form.targetUserId = this.houseData.userId;
      this.$refs[form].validate((valid) => {
        if (valid) {
          console.log(JSON.stringify(this.form));
          ApplyHouseService.postApplication(this.form).then((response) => {
            console.log(response.data);
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
      console.log("submit!");
    },
    open() {
      this.$prompt("Input your message", "Contact host", {
        confirmButtonText: "Send",
        cancelButtonText: "Cancel",
      })
        .then(({ value }) => {
          this.$message({
            type: "success",
            message: "Massage sent successfully!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "Cancel sending message!",
          });
        });
    },
    handleChange(value) {
      console.log(value);
    },
    getUserName(userId) {
      return axios.get("http://localhost:17698/users/" + userId);
    },
  },
  created() {
    this.houseId = this.$route.params.houseId;
    console.log(this.houseId);
    this.refreshHouse(this.houseId);
  },
};
</script>

<style scoped>
@import url(https://unpkg.com/bootstrap@3.3.5/dist/css/bootstrap.min.css);
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
}
.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}
.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>
