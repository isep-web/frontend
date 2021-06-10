<template>
  <div class="container">
    <div class="row clearfix">
      <div class="col-md-12 column">
        <div class="row clearfix" style="border-bottom: 1px dashed #000">
          <div class="col-md-2 column">
            <img
              alt="140x140"
              :src="avatarURL"
              class="img-circle"
              style="width: 100px; height: 100px; margin-bottom: 10px"
            />
          </div>

          <div class="col-md-4 column">
            <p style="font-size: 20px; text-align: left">
              {{ users.displayName }}
            </p>
            <p style="color: #666666; margin-top: 30px; text-align: left">
              <span class="glyphicon glyphicon-map-marker"></span>
              {{ users.location }}
            </p>
          </div>

          <div class="col-md-6 column" style="text-align: left">
            <button
              type="button"
              class="btn btn-default"
              style="margin-top: 50px"
            >
              <router-link to="/editprofile"> Edit my profile</router-link>
            </button>
          </div>
        </div>

        <div class="col-md-6 column" style="margin-top: 60px; float: left">
          <h4 style="text-align: left">Languages spoken</h4>
          <p style="text-align: left">
            <!--              English,Chinese-->
            {{ users.language }}
          </p>
        </div>

        <div class="col-md-6 column" style="margin-top: 60px">
          <h4 style="text-align: left">Description</h4>
          <p style="text-align: left">
            {{ users.description }}
          </p>
        </div>

        <!--        <div class="col-md-2 column" style="float: left"></div>-->
        <div
          class="col-md-12 column"
          style="text-align: left; margin-top: 50px"
        >
          <h4>Home</h4>
        </div>
        <div
          class="col-md-4 column"
          style="float: left; margin-top: 30px"
          v-for="house in houses"
          :key="house.title"
        >
          <!--          <h4 >Home</h4>-->
          <div class="thumbnail">
            <div style="height: 150px">
              <img :src="house.photo" style="height: 100%" />
            </div>

            <div class="caption">
              <h4>{{ house.title }}</h4>
              <p style="color: #666666">
                <span class="glyphicon glyphicon-map-marker"></span>
                {{ house.location }}
              </p>
              <p style="color: #999999">
                {{ house.guestNumber }} guests <br />
              </p>
              <!--              <span v-for="amenity in house.amenities" v-bind:key="amenity.name">-->
              <!--        - {{amenity.name}}-->
              <!--             </span>-->
              <br />
              <br />
              <p>
                <a
                  :href="'/homeDetail?houseId=' + house.houseId"
                  class="btn btn-primary"
                  role="button"
                >
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
import HomeDataService from "../services/HomeDataService";
import UserDataService from "../services/UserDataService";
import store from "@/store/index";
import { mapGetters } from "vuex";

export default {
  name: "Profile",
  data() {
    return {
      id: Number,
      numberOfHouses: 0,
      users: [],
      houses: [],
      userId: Number,
      avatarURL:
        "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
    };
  },

  methods: {
    refreshuser() {
      console.log(store.state);
      UserDataService.retrieveAllUser(this.userId) //HARDCODED
        .then((response) => {
          // console.log(this.userId);
          this.users = response.data;
          console.log(response.data);
        });
      HomeDataService.retrievePicByUserId(this.userId).then((response) => {
        this.avatarURL = response.data._links.content.href;
      });
    },
    refreshhouse() {
      HomeDataService.retrieveAllHouse() //HARDCODED
        .then((response) => {
          // console.log(response.data);
          this.houses = response.data._embedded.houses;
          console.log(this.houses);
          this.numberOfHouses = 0;

          for (let i = 0; i < this.houses.length; i++) {
            // console.log(this.houses[i]);
            if (this.houses[i].userId === this.userId) {
              this.numberOfHouses++;

              this.houses[i].houseId = this.getHouseId(
                this.houses[i]._links.self.href
              );
              HomeDataService.retrievePicByHouseId(this.houses[i].houseId).then(
                (res) => {
                  if (res.data._embedded.pictures.length) {
                    this.houses[i].photo =
                      res.data._embedded.pictures[0]._links.self.href;
                  }
                }
              );
            } else {
              this.houses.splice(i, 1);
              i--;
            }
            // console.log(this.houses);
          }
        });
    },
    getHouseId(url) {
      return parseInt(url.split("/").pop());
    },
  },

  created() {
    this.userId = this.$store.getters.userid;
    this.refreshhouse();
    this.refreshuser();
  },
};
</script>

<style scoped>
.container {
  border-radius: 30px;
  box-shadow: 0px 0px 7px rgb(147, 147, 147);
  margin-top: 50px;
  padding: 20px 10px 10px 10px;
}

@import url(https://unpkg.com/bootstrap@3.3.5/dist/css/bootstrap.min.css);
</style>
