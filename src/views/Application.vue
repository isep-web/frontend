<template>
  <div style="width: 70%; margin-left: 15%; margin-top: 30px">
    <el-row :gutter="40">
      <el-col
        :xs="24"
        :sm="12"
        :md="8"
        :xl="8"
        v-for="app in this.apps"
        :key="app"
        style="margin-bottom: 40px"
      >
        <template v-if="app.accepted === -1">
          <el-card
            :body-style="{ padding: '0px' }"
            style="background-color: #efefef"
          >
            <div style="height: 150px">
              <img :src="app.photo" style="height: 100%; opacity: 70%" />
            </div>

            <div style="line-height: 8px">
              <p style="margin-top: 10px; font-weight: bolder">
                {{ app.houseTitle }}
              </p>
              <p style="font-size: 12px">Guests: {{ app.guestNumber }}</p>
              <p style="font-size: 10px">Check in: {{ app.startDate }}</p>
              <p style="font-size: 10px">Check out: {{ app.endDate }}</p>
              <p style="color: #de7b00">Rejected</p>
              <el-button
                type="info"
                round
                style="margin-bottom: 15px; width: 50%"
                @click="cancelApp(app._links.self.href.split('/').pop())"
                >Cancel</el-button
              >
            </div>
          </el-card>
        </template>
        <template v-else-if="1">
          <el-card :body-style="{ padding: '0px' }">
            <div style="height: 150px">
              <img :src="app.photo" style="height: 100%" />
            </div>

            <div style="line-height: 8px">
              <p style="margin-top: 10px; font-weight: bolder">
                {{ app.houseTitle }}
              </p>
              <p style="font-size: 12px">Guests: {{ app.guestNumber }}</p>
              <p style="font-size: 10px">Check in: {{ app.startDate }}</p>
              <p style="font-size: 10px">Check out: {{ app.endDate }}</p>
              <p style="color: #de7b00" v-if="app.accepted === 0">
                Waiting for the confirmation
              </p>
              <p style="color: #de7b00" v-if="app.accepted === 1">Accepted</p>
              <el-button
                type="warning"
                round
                style="margin-bottom: 15px; width: 50%"
                @click="cancelApp(app._links.self.href.split('/').pop())"
                >Cancel</el-button
              >
            </div>
          </el-card>
        </template>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { ElMessage } from "element-plus";
import HomeDataService from "../services/HomeDataService";
import { mapGetters } from "vuex";
export default {
  name: "Application",
  data() {
    return {
      userId: Number,

      apps: null,
    };
  },
  methods: {
    refreshApps() {
      HomeDataService.retrieveAllApps(this.userId).then((response) => {
        // console.log("applications");
        // console.log(response.data._embedded.applications);
        this.apps = response.data._embedded.applications;
        for (let i = 0; i < this.apps.length; i++) {
          //添加每个申请对应的house的title和id到数据里
          HomeDataService.getByLink(this.apps[i]._links.house.href).then(
            (res) => {
              this.apps[i].houseTitle = res.data.title;
              this.apps[i].houseId = res.data._links.self.href.split("/").pop();
              //添加每个房间的图片
              HomeDataService.retrievePicByHouseId(this.apps[i].houseId).then(
                (res) => {
                  if (res.data._embedded.pictures.length) {
                    this.apps[i].photo =
                      res.data._embedded.pictures[0]._links.self.href;
                  } else {
                    this.apps[i].photo = "";
                  }
                }
              );
            }
          );
        }
        console.log(this.apps);
      });
    },
    cancelApp(appId) {
      this.$confirm("Do you want to cancel this application?", "Warning", {
        confirmButtonText: "Yes",
        cancelButtonText: "No",
        type: "warning",
      })
        .then(() => {
          HomeDataService.deleteApp(appId).then((response) => {
            if (response.status === 204) {
              ElMessage.success({
                dangerouslyUseHTMLString: true,
                message: "cancel application successfully",
                type: "success",
                center: true,
              });
            } else {
              ElMessage.error("filed to cancel");
            }
            this.refreshApps();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "cancelled",
          });
        });
    },
  },
  created() {
    this.userId = this.$store.getters.userid;
    this.refreshApps();
  },
};
</script>

<style scoped></style>
