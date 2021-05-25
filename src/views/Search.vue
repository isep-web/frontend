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
              v-model="form.guest"
              @change="handleChange"
              :min="1"
              :max="10"
            ></el-input-number>
          </el-form-item>

          <el-form-item label="Area(㎡)">
            <el-slider v-model="form.area" range :min="10" :max="200">
            </el-slider>
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
            <el-checkbox-group v-model="form.limitations">
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
            <el-button type="primary" @click="onSubmit">Search</el-button>
            <el-button>Reset</el-button>
          </el-form-item>
        </el-form>
      </div>

      <div class="col-md-1 column"></div>

      <div class="col-md-7 column">
        <h3>Results</h3>
        <br />
        <SearchResult></SearchResult>
      </div>
    </div>
  </div>
</template>

<script>
import SearchResult from "@/components/SearchResult";

export default {
  name: "Search",
  components: {
    SearchResult,
  },
  data() {
    return {
      form: {
        location: "",
        guest: "",
        amenities: [],
        services: [],
        limitations: [],
        area: [60, 120],
      },
    };
  },
  methods: {
    onSubmit() {
      console.log("submit!");
    },
    handleChange(value) {
      console.log(value);
    },
  },
};
</script>

<style scoped>
@import url(https://unpkg.com/bootstrap@3.3.5/dist/css/bootstrap.min.css);
</style>
