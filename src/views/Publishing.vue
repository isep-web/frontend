<template>
  <div style="width: 70%; margin-left: 15%; margin-top: 30px">
    <el-row :gutter="40">
      <el-col
        :xs="24"
        :sm="12"
        :md="8"
        :xl="8"
        v-for="index in numberOfHouses"
        :key="index"
        style="margin-bottom: 40px"
      >
        <el-card :body-style="{ padding: '0px' }">
          <div style="height: 150px">
            <img :src="houses[index - 1].photo" style="height: 100%" />
          </div>

          <div style="padding: 14px">
            <span>{{ houses[index - 1].title }}</span>
            <div class="bottom" style="padding: 10px">
              <el-button
                type="warning"
                class="button"
                size="mini"
                style="width: 70px; margin-left: -20%; margin-right: 5%"
                round
                @click="editHouse(houses[index - 1].houseId)"
                >Edit</el-button
              >
              <el-button
                type="danger"
                class="button"
                size="mini"
                style="width: 70px; margin-right: -20%"
                round
                @click="deleteHouse(houses[index - 1].houseId, index - 1)"
                >Delete</el-button
              >
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col
        :xs="24"
        :sm="12"
        :md="8"
        :xl="8"
        style="margin-bottom: 40px; height: 100%"
      >
        <button class="addButton" @click="editHouse(-1)">
          <i class="el-icon-plus" style="font-size: 40px"></i>
        </button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { ElMessage } from "element-plus";
import HomeDataService from "../services/HomeDataService";
import { mapGetters } from "vuex";
export default {
  name: "Publishing",
  data() {
    return {
      id: Number,
      numberOfHouses: 0,
      houses: null,
    };
  },
  methods: {
    refreshHouses() {
      HomeDataService.retrieveAllHome(-1).then((response) => {
        console.log(response.data);
        this.houses = response.data._embedded.houses;
        // console.log(this.houses);
        // this.numberOfHouses = houses.length;
        this.numberOfHouses = 0;
        //在所有houses中筛选该用户的house
        for (let i = 0; i < this.houses.length; i++) {
          if (this.houses[i].userId === parseInt(this.id)) {
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
        }
      });
    },
    editHouse(houseId) {
      this.$router.push({ name: "HomeAdd", params: { houseId: houseId } });
    },
    deleteHouse(houseId, index) {
      HomeDataService.deleteHouse(houseId).then((response) => {
        console.log("111");
        console.log(response);
        if (response.status === 204) {
          ElMessage.success({
            dangerouslyUseHTMLString: true,
            message:
              'deleted <strong style="color:green">' +
              this.houses[index].title +
              "</strong>",
            type: "success",
            center: true,
          });
        } else {
          ElMessage.error("filed to delete");
        }
        this.houses = null;
        this.numberOfHouses = 0;
        this.refreshHouses();
      });
    },
    getHouseId(url) {
      return parseInt(url.split("/").pop());
    },
  },
  created() {
    this.id = this.$store.getters.userid;
    console.log(this.id);
    this.refreshHouses();
    if (this.$route.params.houseName !== undefined) {
      this.houses = null;
      this.refreshHouses();
      ElMessage.success({
        dangerouslyUseHTMLString: true,
        message:
          'success on <strong style="color:green">' +
          this.$route.params.houseName +
          "</strong>",
        type: "success",
        center: true,
      });
    }
  },
};
</script>

<style>
.addButton {
  margin-top: 40%;
  width: 60px;
  height: 60px;
  background-color: white;
  border-radius: 50%;
  border: 3px solid #42b983;
  color: #42b983;
}
.addButton:hover {
  background-color: #42b983;
  color: white;
}
img {
  -webkit-user-drag: none;
  /* 所有图片不能被拖动 */
}
</style>
