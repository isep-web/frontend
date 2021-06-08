<template>
  <div class="container" style="text-align: left">
    <div class="row clearfix">
      <div class="col-md-2 column"></div>
      <div class="col-md-8 column">
        <el-table
          :data="
            tableData.filter(
              (data) =>
                !search ||
                data.displayName.toLowerCase().includes(search.toLowerCase()) ||
                data.id.toString().includes(search)
            )
          "
          style="width: 100%"
          :default-sort="{ prop: 'id', order: 'descending' }"
        >
          <el-table-column type="expand">
            <template #default="props">
              <el-form label-position="left" inline class="demo-table-expand">
                <el-form-item label="User Id:">
                  {{ props.row.id }}
                </el-form-item>
                <el-form-item label="User name:">
                  {{ props.row.displayName }}
                </el-form-item>
                <el-form-item label="Gender:">
                  {{ props.row.gender }}
                </el-form-item>
                <br />
                <el-form-item label="Language:">
                  {{ props.row.language }}
                </el-form-item>
                <el-form-item label="Email:">
                  {{ props.row.email }}
                </el-form-item>
                <el-form-item label="Phone:">
                  {{ props.row.phone }}
                </el-form-item>
                <br />
                <el-form-item label="Address:">
                  {{ props.row.location }}
                </el-form-item>
                <br />
                <el-form-item label="Description">
                  {{ props.row.description }}
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>

          <el-table-column prop="id" label="Id" sortable width="80">
          </el-table-column>

          <el-table-column prop="displayName" label="Name" sortable width="100">
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
                title="Are you sure to delete this user? (The user’s houses will also be deleted)"
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
import HomeDataService from "@/services/HomeDataService";
import { ElMessage } from "element-plus";
export default {
  data() {
    return {
      tableData: [
        {
          id: "1",
          displayName: "userName",
          email: "user@example.com",
          phone: "123456789",
          gender: "male",
          language: "english",
          description: "description",
          location: "France, Paris, 75014",
          houses: [],
        },
      ],
      search: "",
    };
  },
  methods: {
    viewHouses(index, row) {
      console.log(index, row);
      console.log(row.id);
      this.$router.push({ path: "/adminHouse", query: { userId: row.id } });
    },
    handleDelete(index, row) {
      console.log(index, row);
      console.log(row.houses);
      for (let i = 0; i < row.houses.length; i++) {
        HomeDataService.deleteHouse(row.houses[i]).then((response) => {
          if (response.status != 204) {
            ElMessage.error("filed to delete");
          }
        });
      }
      AdminService.deleteUser(row.id).then((response) => {
        if (response.status == 204) {
          ElMessage.success({
            dangerouslyUseHTMLString: true,
            message:
              'deleted <strong style="color:green">' +
              row.displayName +
              "</strong>",
            type: "success",
            center: true,
          });
        } else {
          ElMessage.error("filed to delete");
        }
        this.refreshAdmin();
      });
    },
    refreshAdmin() {
      AdminService.getAllUsers().then((response) => {
        console.log(response.data._embedded.users);
        this.tableData = response.data._embedded.users;
        let l = response.data._embedded.users.length;

        for (let i = 0; i < l; i++) {
          this.tableData[i].id = this.getUserId(
            this.tableData[i]._links.self.href
          );
          let a = [];
          AdminService.getAllHousesOfOneUser(this.tableData[i].id).then(
            (response) => {
              for (let j = 0; j < response.data._embedded.houses.length; j++) {
                a.push(
                  this.getHouseId(
                    response.data._embedded.houses[j]._links.self.href
                  )
                );
              }
              //console.log(a);
            }
          );
          this.tableData[i].houses = a;
        }
      });
    },
    getUserId(url) {
      return parseInt(url.split("/").pop());
    },
    getHouseId(url) {
      return parseInt(url.split("/").pop());
    },
  },
  created() {
    this.refreshAdmin();
  },
};
</script>

<style scoped>
@import url(https://unpkg.com/bootstrap@3.3.5/dist/css/bootstrap.min.css);
</style>
