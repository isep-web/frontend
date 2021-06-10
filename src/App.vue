<template>
  <div>
    <div>
      <navbar v-if="!$route.meta.showNav"></navbar>
    </div>
    <!--    <div id="nav">-->
    <!--      <router-link to="/">Home</router-link>-->
    <!--      |-->
    <!--      <router-link to="/about">About</router-link>-->
    <!--      |-->
    <!--      <router-link to="/search">Search</router-link>-->
    <!--      |-->
    <!--      <router-link to="/homeAdd">My home</router-link>-->
    <!--      |-->
    <!--      <router-link to="/publishing">Publishing</router-link>-->
    <!--      |-->
    <!--      <router-link to="/application">Application</router-link>-->
    <!--      |-->
    <!--      <router-link to="/reservation">Reservation</router-link>-->
    <!--      |-->
    <!--      <router-link to="/message">Message</router-link>-->
    <!--      |-->
    <!--      <router-link to="/register">Register</router-link>-->
    <!--      |-->
    <!--      <router-link to="/login">Login</router-link>-->

    <!--    </div>-->
    <router-view />
  </div>
</template>
<script>
import { Options, Vue } from "vue-class-component";
import navbar from "@/components/Navbar.vue";

@Options({
  components: {
    navbar,
  },
})
export default class App extends Vue {}
</script>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
