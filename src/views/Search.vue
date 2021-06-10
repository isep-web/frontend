<template>
  <div class="container" style="text-align: left">
    <div class="row clearfix">
      <div class="col-md-4 column">
        <h3>Search</h3>
        <br />
        <el-form ref="form" :model="form" label-width="100px">
          <el-form-item label="Title">
            <el-input v-model="form.title"></el-input>
          </el-form-item>
          <el-form-item label="Guest">
            <el-input-number
              v-model="form.guestNumber"
              @change="handleChange"
              :min="1"
              :max="10"
            ></el-input-number>
          </el-form-item>
          <el-form-item label="Area(㎡)">
            <el-slider
              v-model="form.area"
              range
              :min="10"
              :max="200"
            ></el-slider>
          </el-form-item>
          <el-form-item label="Amenities">
            <el-checkbox-group v-model="form.amenities">
              <el-checkbox label="1" name="TV">TV</el-checkbox>
              <el-checkbox label="2" name="WiFi">WiFi</el-checkbox>
              <el-checkbox label="3" name="A/C">A/C</el-checkbox>
              <el-checkbox label="4" name="Cook">Cook</el-checkbox>
              <el-checkbox label="5" name="Bathtub">Bathtub</el-checkbox>
              <el-checkbox label="6" name="Heating system"
                >Heating system</el-checkbox
              >
              <el-checkbox label="7" name="Swimming">Swimming</el-checkbox>
              <el-checkbox label="8" name="Elevator">Elevator</el-checkbox>
            </el-checkbox-group>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="onSubmit('form')"
              >Search</el-button
            >
            <el-button>Reset</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="col-md-1 column"></div>
      <div class="col-md-7 column">
        <h3>Results</h3>
        <br />
        <div class="col-md-6" v-for="house in results" :key="house.title">
          <div class="thumbnail">
            <img :src="house.cover" />
            <div class="caption">
              <div>
                <h4>{{ house.title }}</h4>
                <p style="color: #666666">
                  <span class="glyphicon glyphicon-map-marker"></span>
                  {{ house.location }}
                </p>
                <p style="color: #999999">
                  {{ house.guestNumber }} guests <br />
                </p>
                <span v-for="amenity in house.amenities" :key="amenity.name">
                  - {{ amenity }} </span
                ><br /><br />
              </div>
              <div style="text-align: center">
                <el-button type="primary" @click="viewHouse(house.houseId)"
                  >View details</el-button
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SearchHouseService from "@/services/SearchHouseService";
import HouseDataService from "@/services/HomeDataService";
import axios from "axios";
export default {
  name: "Search",
  data() {
    return {
      id: Number,
      form: {
        title: "",
        location: "",
        guestNumber: 0,
        amenities: [],
        area: [60, 200],
      },
      houses: [{}],
      results: [{}],
    };
  },
  methods: {
    onSubmit(form) {
      this.results = [];
      this.$refs[form].validate((valid) => {
        if (valid) {
          console.log(this.form);
          console.log(this.form.guestNumber);
          console.log(this.form.amenities.toString());
          console.log(this.form.area[0]);
          console.log(this.form.area[1]);
          console.log(this.form.title);
          SearchHouseService.search(
            this.form.amenities.toString(),
            this.form.guestNumber.toString(),
            this.form.area[0].toString(),
            this.form.area[1].toString(),
            this.form.title.toString()
          ).then((response) => {
            console.log(response.data);
            console.log(response.data.length);
            for (let i = 0; i < response.data.length; i++) {
              HouseDataService.retrieveAllHome(response.data[i]).then(
                (response) => {
                  this.results[i] = response.data;
                  this.results[i].houseId = this.getHouseId(
                    this.results[i]._links.self.href
                  );
                  this.getHousePic(this.results[i].houseId).then((r) => {
                    //console.log(r.data);
                    this.results[i].pictures = r.data._embedded.pictures;
                    if (this.results[i].pictures.length != 0) {
                      this.results[i].cover =
                        this.results[i].pictures[0]._links.content.href;
                    } else {
                      this.results[i].cover = "";
                    }
                  });
                  //小卡片上的amenities
                  let ahref = this.results[i]._links.amenities.href;
                  let a = [];
                  SearchHouseService.retrieveAllHousesAmenities(ahref).then(
                    (r) => {
                      for (
                        let j = 0;
                        j < r.data._embedded.amenities.length;
                        j++
                      ) {
                        a[j] = r.data._embedded.amenities[j].name;
                      }
                      this.results[i].amenities = [];
                      for (let k = 0; k < a.length; k++) {
                        this.results[i].amenities.push(a[k]);
                      }
                    }
                  );
                }
              );
            }
            console.log(this.results);
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
      console.log("submit!");
    },
    refreshSearchResult() {
      SearchHouseService.retrieveAllHouses().then((response) => {
        //console.log(response.data._embedded.houses);
        this.houses = response.data._embedded.houses;
        //console.log(this.houses);

        let length = response.data._embedded.houses.length;

        for (let x = 0; x < length; x++) {
          this.houses[x].houseId = this.getHouseId(
            this.houses[x]._links.self.href
          );
          this.getHousePic(this.houses[x].houseId).then((r) => {
            //console.log(r.data);
            this.houses[x].pictures = r.data._embedded.pictures;
            if (this.houses[x].pictures.length != 0) {
              this.houses[x].cover =
                this.houses[x].pictures[0]._links.content.href;
            } else {
              this.houses[x].cover = "";
            }
          });
        }

        for (let i = 0; i < length; i++) {
          //console.log(response.data._embedded.houses[i]._links.amenities.href);
          let ahref = response.data._embedded.houses[i]._links.amenities.href;
          let a = [];
          SearchHouseService.retrieveAllHousesAmenities(ahref).then((r) => {
            for (let j = 0; j < r.data._embedded.amenities.length; j++) {
              a[j] = r.data._embedded.amenities[j].name;
            }
            this.houses[i].amenities = [];
            for (let k = 0; k < a.length; k++) {
              this.houses[i].amenities.push(a[k]);
            }
          });
        }
        console.log(this.houses);
        this.results = this.houses;
      });
    },
    handleChange(value) {
      console.log(value);
    },
    viewHouse(houseId) {
      this.$router.push({ path: "/homeDetail", query: { houseId: houseId } });
    },
    getHouseId(url) {
      return parseInt(url.split("/").pop());
    },
    getHousePic(houseId) {
      return axios.get("http://localhost:17698/houses/" + houseId + "/photos");
    },
  },
  created() {
    this.refreshSearchResult();
  },
  computed: {
    filteredHouses() {
      return this.houses.filter((house) => {
        return house.guestNumber >= this.form.guestNumber;
      });
    },
  },
};
</script>

<style scoped>
@import url(https://unpkg.com/bootstrap@3.3.5/dist/css/bootstrap.min.css);
</style>
