<template>
  <div class="line">
    <el-menu
      :default-active="activeIndex2"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <!--<el-menu-item index="1"></el-menu-item>-->
      <el-menu-item
        index="2"
        style="margin-left: 150px"
        @click="clickItem('search')"
      >
        <router-link to="/search"> Search </router-link>
      </el-menu-item>
      <el-menu-item index="3" @click="clickItem('application')">
        <router-link to="/application"> Applications </router-link>
      </el-menu-item>
      <el-menu-item index="4" @click="clickItem('publishing')">
        <router-link to="/publishing"> My publishing </router-link>
      </el-menu-item>
      <!--  <el-menu-item index="4" disabled>MY publishing</el-menu-item>-->
      <el-menu-item index="5" @click="clickItem('reservation')">
        <router-link to="/reservation"> New reservation </router-link>
      </el-menu-item>
      <el-menu-item
        index="6"
        style="margin-left: 200px"
        @click="clickItem('message')"
      >
        <img
          src="../assets/xiaoxi.png"
          style="width: 40px; height: 40px; margin-right: 10px"
        />
        <router-link to="/message"> Messages </router-link>
      </el-menu-item>

      <el-submenu index="8">
        <template #title>
          <el-avatar
            class="avatar"
            :size="medium"
            :src="circleUrl"
            style="margin-right: 10px"
            @click="clickItem('editprofile')"
          >
          </el-avatar>
          My account
        </template>
        <el-menu-item index="8-1" @click="clickItem('profile')">
          My profile
        </el-menu-item>
        <el-menu-item
          v-if="this.role === 'admin'"
          index="8-2"
          @click="clickItem('admin')"
        >
          Admin
        </el-menu-item>
        <el-menu-item index="8-3" @click="Logout()">Log out</el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>
<script>
import { mapMutations } from "vuex";
import { mapGetters } from "vuex";
import HomeDataService from "../services/HomeDataService";
export default {
  name: "Navbar",
  data() {
    return {
      activeIndex: "1",
      activeIndex2: "1",
      circleUrl:
        "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
      role: "",
    };
  },
  methods: {
    ...mapMutations(["delToken"]),
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    Logout() {
      this.$router.push("/login");
      this.$store.commit("delToken");
    },
    clickItem(link) {
      this.$router.push("/" + link);
    },
  },
  created() {
    //如果有userId就读取用户的头像
    if (this.$store.getters.userid > 0) {
      this.userId = this.$store.getters.userid;
      let list = localStorage.getItem("token");
      this.role = JSON.parse(list).roles[0];

      HomeDataService.retrievePicByUserId(this.userId).then((response) => {
        this.circleUrl = response.data._links.content.href;
      });
    }
  },
};
</script>

<style>
.avatar:hover {
  opacity: 70%;
}
</style>
