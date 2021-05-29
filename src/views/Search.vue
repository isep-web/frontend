<template>
  <div class="container" style="margin-top: 50px; text-align: left">
    <div class="row clearfix">
      <div class="col-md-4 column">
        <h3>Search</h3>
        <br />
        <el-form ref="form" :model="form" label-width="100px">
          <el-form-item label="Location">
            <el-input v-model="form.location"></el-input>
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
              <el-checkbox label="TV" name="tv"></el-checkbox>
              <el-checkbox label="AC" name="ac"></el-checkbox>
              <el-checkbox label="WIFI" name="wifi"></el-checkbox>
              <el-checkbox label="Kitchen" name="kitchen"></el-checkbox>
              <el-checkbox label="Washer" name="washer"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="Services">
            <p>*You must provide</p>
            <el-checkbox-group v-model="form.services">
              <el-checkbox label="Keep pets" name="pet"></el-checkbox>
              <el-checkbox label="Watering plants" name="plant"></el-checkbox>
              <el-checkbox label="Clean the house" name="clean"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="Limitations">
            <p>*You must respect</p>
            <el-checkbox-group v-model="form.constraints">
              <el-checkbox
                label="No smoking in the accommodation"
                name="no_smoking"
              ></el-checkbox>
              <el-checkbox
                label="No noise after 23h"
                name="no_noise"
              ></el-checkbox>
              <el-checkbox label="No children" name="no_children"></el-checkbox>
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
        <div
          class="col-md-6"
          v-for="house in filteredHouses"
          v-bind:key="house.title"
        >
          <div class="thumbnail">
            <img src="{{house.picture}}" alt="" />
            <div class="caption">
              <h4>{{ house.title }}</h4>
              <p style="color: #666666">
                <span class="glyphicon glyphicon-map-marker"></span>
                {{ house.location }}
              </p>
              <p style="color: #999999">
                {{ house.guestNumber }} guests <br />
              </p>
              <span
                v-for="amenity in house.amenities"
                v-bind:key="amenity.name"
              >
                - {{ amenity }} </span
              ><br /><br />
              <p>
                <a href="#" class="btn btn-primary" role="button">
                  View details
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//import SearchResult from "@/components/SearchResult";
import SearchHouseService from "@/services/SearchHouseService";

export default {
  name: "Search",
  components: {
    // SearchResult,
  },

  data() {
    return {
      form: {
        location: "",
        guestNumber: 0,
        amenities: [],
        services: [],
        constraints: [],
        area: [60, 120],
      },
      houses: [{}],
    };
  },

  methods: {
    onSubmit(form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          console.log(this.form);
          console.log(this.form.guestNumber);
          console.log(this.form.amenities.slice(0));
        } else {
          console.log("error submit!!");
          return false;
        }
      });
      console.log("submit!");
    },

    refreshSearchResult() {
      /*      SearchHouseService.retrieveAllHouses().then((response) => {
        console.log(response.data._embedded.houses);
        this.houses = response.data._embedded.houses;
        console.log(this.houses);
      });
 */
      let a = [];
      //this.houses.amenities = [];
      SearchHouseService.retrieveAllHouses().then((response) => {
        console.log(response.data._embedded.houses);
        this.houses = response.data._embedded.houses;
        console.log(this.houses);

        let length = response.data._embedded.houses.length;
        for (let i = 0; i < length; i++) {
          //console.log(response.data._embedded.houses[i]._links.amenities.href);
          let ahref = response.data._embedded.houses[i]._links.amenities.href;

          SearchHouseService.retrieveAllHousesAmenities(ahref).then((r) => {
            for (let j = 0; j < r.data._embedded.amenities.length; j++) {
              a[j] = r.data._embedded.amenities[j].name;
            }
            this.houses[i].amenities = [];
            for (let k = 0; k < a.length; k++) {
              this.houses[i].amenities.push(a[k]);
              console.log(a[k]);
            }
            // this.houses[i].amenities = a;

            console.log(this.houses[i].amenities);
          });
          console.log(this.houses[i].amenities);
        }

        console.log(this.houses);
        console.log(this.houses[0].amenities);
        console.log(this.houses[0].guestNumber);
      });
    },

    handleChange(value) {
      console.log(value);
    },
  },
  created() {
    this.refreshSearchResult();
  },
  computed: {
    filteredHouses() {
      return this.houses.filter((house) => {
        return house.guestNumber === this.form.guestNumber;
        // return house.amenities.filter((amenity) => {
        //   return amenity.name === this.form.amenities.slice(0);
        // });
      });
    },
  },
};
</script>

<style scoped>
@import url(https://unpkg.com/bootstrap@3.3.5/dist/css/bootstrap.min.css);
</style>
