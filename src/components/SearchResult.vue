<template>
  <p>Test view</p>
  <div class="col-md-6" v-for="house in houses" v-bind:key="house.title">
    <div class="thumbnail">
      <img src="{{house.picture}}" />
      <div class="caption">
        <h4>{{ house.title }}</h4>
        <p style="color: #666666">
          <span class="glyphicon glyphicon-map-marker"></span>
          {{ house.location }}
        </p>
        <p style="color: #999999">{{ house.guestNumber }} guests <br /></p>
        <span v-for="amenity in house.amenities" v-bind:key="amenity.name">
          - {{ amenity.name }}
        </span>
        <br />
        <br />
        <p>
          <a href="#" class="btn btn-primary" role="button"> View details </a>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import SearchResultService from "@/services/SearchResultService";
export default {
  name: "SearchResult",
  data() {
    return {
      houses: [],
    };
  },
  methods: {
    refreshSearchResult() {
      SearchResultService.retrieveAllHouses().then((response) => {
        console.log(response.data);
        this.houses = response.data._embedded.houses;
      });
    },
  },
  created() {
    this.refreshSearchResult();
  },
};
</script>

<style scoped></style>
