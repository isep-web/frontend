<template>
  <div class="container" style="text-align: left">
    <div class="row clearfix">
      <div class="col-md-2 column"></div>
      <div class="col-md-8 column">
        <h1 style="text-align: center">UserId:{{ userId }}</h1>
        <el-table
          :data="
            tableData.filter(
              (data) =>
                !search ||
                data.title.toLowerCase().includes(search.toLowerCase()) ||
                data.houseId.toString().includes(search)
            )
          "
          style="width: 100%"
          :default-sort="{ prop: 'houseId', order: 'descending' }"
        >
          <el-table-column type="expand">
            <template #default="props">
              <el-form label-position="left" inline class="demo-table-expand">
                <el-form-item label="House Id:">
                  {{ props.row.houseId }}
                </el-form-item>
                <el-form-item label="Title:">
                  {{ props.row.title }}
                </el-form-item>
                <el-form-item label="Guest Number:">
                  {{ props.row.guestNumber }}
                </el-form-item>
                <br />
                <el-form-item label="Location:">
                  {{ props.row.location }}
                </el-form-item>
                <br />
                <el-form-item label="Amenities:">
                  {{ props.row.amenities }}
                </el-form-item>
                <br />
                <el-form-item label="Constraints:">
                  {{ props.row.constraints }}
                </el-form-item>
                <br />
                <el-form-item label="Services:">
                  {{ props.row.services }}
                </el-form-item>
                <br />
                <el-form-item label="Description:">
                  {{ props.row.description }}
                </el-form-item>
                <br />
                <el-form-item label="Pictures:">
                  <span v-for="pic in props.row.pictures" :key="pic">
                    <img :src="pic" style="width: 25%" />
                  </span>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>

          <el-table-column prop="houseId" label="Id" sortable width="80">
          </el-table-column>

          <el-table-column prop="title" label="Title" sortable width="100">
          </el-table-column>

          <el-table-column prop="location" label="Location"> </el-table-column>

          <el-table-column align="right">
            <template #header>
              <el-input
                v-model="search"
                size="mini"
                placeholder="Input the id or username to search"
              />
            </template>

            <template #default="scope">
              <el-button
                size="mini"
                type="primary"
                @click="viewHouses(scope.$index, scope.row)"
                >View Houses</el-button
              >
              <el-popconfirm
                confirm-button-text="Confirm"
                confirm-button-type="warning"
                cancel-button-text="Cancel"
                icon="el-icon-info"
                icon-color="red"
                title="Are you sure to delete this house?"
                @confirm="handleDelete(scope.$index, scope.row)"
              >
                <template #reference>
                  <el-button size="mini" type="danger">Delete</el-button>
                </template>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="col-md-2 column"></div>
    </div>
  </div>
</template>

<script>
import AdminService from "@/services/AdminService";
import HouseDataService from "@/services/HomeDataService";
import HomeDataService from "@/services/HomeDataService";
import { ElMessage } from "element-plus";

export default {
  data() {
    return {
      visible: false,
      userId: Number,
      tableData: [
        {
          houseId: "1",
          title: "title",
          guestNumber: "10",
          location: "France, Paris, 75014",
          description: "description",
          amenities: [],
          constraints: [],
          services: [],
          pictures: [],
        },
      ],
      search: "",
    };
  },
  methods: {
    viewHouses(index, row) {
      console.log(index, row);
      this.$router.push({
        path: "/homeDetail",
        query: { houseId: row.houseId },
      });
    },
    handleDelete(index, row) {
      console.log(index, row);
      console.log(row.houseId);
      HomeDataService.deleteHouse(row.houseId).then((response) => {
        if (response.status === 204) {
          ElMessage.success({
            dangerouslyUseHTMLString: true,
            message:
              'deleted <strong style="color:green">' + row.title + "</strong>",
            type: "success",
            center: true,
          });
        } else {
          ElMessage.error("filed to delete");
        }
        this.refreshAdminHouse(this.userId);
      });
    },
    refreshAdminHouse(userId) {
      AdminService.getAllHousesOfOneUser(userId).then((response) => {
        console.log(response.data);
        this.tableData = response.data._embedded.houses;
        //console.log(this.tableData[0]._links.self.href);
        for (let i = 0; i < this.tableData.length; i++) {
          let a = [];
          let c = [];
          let s = [];
          let p = [];
          this.tableData[i].houseId = this.getHouseId(
            this.tableData[i]._links.self.href
          );
          //console.log(this.tableData[i].houseId);

          let houseIdTemp = this.tableData[i].houseId;

          HouseDataService.retrieveAllAmenities(houseIdTemp).then((r) => {
            //console.log(r.data);
            for (let j = 0; j < r.data._embedded.amenities.length; j++) {
              a.push(r.data._embedded.amenities[j].name);
            }
            //console.log(a);
          });
          HouseDataService.retrieveAllConstraints(houseIdTemp).then((r) => {
            for (let k = 0; k < r.data._embedded.constraints.length; k++) {
              c.push(r.data._embedded.constraints[k].name);
            }
          });
          HouseDataService.retrieveAllServices(houseIdTemp).then((r) => {
            for (let n = 0; n < r.data._embedded.services.length; n++) {
              s.push(r.data._embedded.services[n].name);
            }
          });
          //读取房间图片
          HouseDataService.retrievePicByHouseId(houseIdTemp).then((r) => {
            for (let m = 0; m < r.data._embedded.pictures.length; m++) {
              p.push(r.data._embedded.pictures[m]._links.content.href);
            }
          });

          this.tableData[i].amenities = a;
          this.tableData[i].constraints = c;
          this.tableData[i].services = s;
          this.tableData[i].pictures = p;
          //console.log(this.tableData[i].amenities);
        }
      });
    },
    getHouseId(url) {
      return parseInt(url.split("/").pop());
    },
  },
  created() {
    this.userId = this.$route.query.userId;
    console.log(this.userId);
    this.refreshAdminHouse(this.userId);
  },
};
</script>

<style scoped>
@import url(https://unpkg.com/bootstrap@3.3.5/dist/css/bootstrap.min.css);
</style>
