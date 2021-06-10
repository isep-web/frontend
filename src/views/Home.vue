<template>
  <p>hhdhhhdhdhh</p>
  <h1>{{ $store.state.count }}</h1>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Home",
  methods: {
    loadComments() {
      let list = localStorage.getItem("token");
      console.log(list);
      console.log("idnei" + this.$store.getters.userid);
    },
  },
  created() {
    this.loadComments();
    console.log("id" + this.$store.getters.userid);
  },
};
</script>

<style scoped></style>
