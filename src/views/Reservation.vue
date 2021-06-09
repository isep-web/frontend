<template>
  <div style="width: 70%; margin-left: 15%; margin-top: 30px">
    <template v-for="res in this.reservations" :key="res">
      <el-card
        v-if="res.accepted === 0"
        style="text-align: left; margin-bottom: 30px"
      >
        <span>{{ res.applicantName }}</span>
        <el-divider></el-divider>
        <el-row gutter="20">
          <el-col :span="8">
            <img :src="res.photo" style="width: 100%" />
          </el-col>
          <el-col :span="10">
            <p style="font-weight: bolder">House: {{ res.houseTitle }}</p>
            <p style="font-weight: bolder; margin-top: 20px">
              Guests: {{ res.guestNumber }}
            </p>
            <p style="font-size: 10px">
              Date: {{ res.startDate }} ~ {{ res.endDate }}
            </p>
          </el-col>
          <el-col :span="6" style="text-align: center">
            <el-button
              type="warning"
              round
              style="margin-top: 10%; margin-bottom: 10%; height: 30%"
              @click="setReservations(res._links.self.href.split('/').pop(), 1)"
              >Accept</el-button
            >
            <br />
            <el-button
              type="info"
              round
              style="height: 30%"
              @click="
                setReservations(res._links.self.href.split('/').pop(), -1)
              "
              >Reject</el-button
            >
          </el-col>
        </el-row>
      </el-card>
      <el-card
        v-else-if="res.accepted === 1"
        style="text-align: left; margin-bottom: 30px; background-color: #e8e8e8"
      >
        <span>{{ res.applicantName }}</span>
        <el-divider></el-divider>
        <el-row gutter="20">
          <el-col :span="8">
            <img :src="res.photo" style="width: 100%; opacity: 50%" />
          </el-col>
          <el-col :span="10">
            <p style="font-weight: bolder">House: {{ res.houseTitle }}</p>
            <p style="font-weight: bolder; margin-top: 20px">
              Guests: {{ res.guestNumber }}
            </p>
            <p style="font-size: 10px">
              Date: {{ res.startDate }} ~ {{ res.endDate }}
            </p>
          </el-col>
          <el-col :span="6" style="text-align: center">
            <p style="color: #de7b00; font-weight: bolder; margin-top: 20%">
              Accepted
            </p>
          </el-col>
        </el-row>
      </el-card>
    </template>
  </div>
</template>

<script>
import { ElMessage } from "element-plus";
import HomeDataService from "../services/HomeDataService";
export default {
  name: "Application",
  data() {
    return {
      userId: Number,

      reservations: null,
    };
  },
  methods: {
    refreshApps() {
      HomeDataService.retrieveAllReservations(this.userId).then((response) => {
        // console.log(response.data._embedded.applications);
        this.reservations = response.data._embedded.applications;
        for (let i = 0; i < this.reservations.length; i++) {
          //添加每个申请对应的house的title到数据里
          HomeDataService.getByLink(
            this.reservations[i]._links.house.href
          ).then((res) => {
            this.reservations[i].houseId = res.data._links.self.href
              .split("/")
              .pop();
            this.reservations[i].houseTitle = res.data.title;
            //请求房间图片
            HomeDataService.retrievePicByHouseId(
              this.reservations[i].houseId
            ).then((res) => {
              if (res.data._embedded.pictures.length) {
                this.reservations[i].photo =
                  res.data._embedded.pictures[0]._links.self.href;
              } else {
                this.reservations[i].photo = "";
              }
            });
          });
          //添加收到的每个申请的srcUser信息到数据里
          HomeDataService.getByLink(
            this.reservations[i]._links.sourceUser.href
          ).then((res) => {
            this.reservations[i].applicantName = res.data.displayName;
          });
        }
      });
    },
    setReservations(appId, status) {
      let msg;
      if (status === 1) {
        msg = "accept";
      } else {
        msg = "reject";
      }
      let json = JSON.parse('{"accepted": ' + status + "}");
      this.$confirm("Do you want to " + msg + " this application?", "Warning", {
        confirmButtonText: "Yes",
        cancelButtonText: "No really",
        type: "warning",
      })
        .then(() => {
          HomeDataService.patchApp(appId, json).then((response) => {
            if (response.status === 200) {
              ElMessage.success({
                dangerouslyUseHTMLString: true,
                message: msg + " application successfully",
                type: "success",
                center: true,
              });
            } else {
              ElMessage.error("filed to " + msg);
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
    this.userId = 1;
    this.refreshApps();
  },
};
</script>

<style scoped></style>
