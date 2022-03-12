<template>
  <div id="app">
    <Header></Header>
    <router-view></router-view>
    <Footer v-show="this.$route.meta.show"></Footer>
  </div>
</template>

<script>
import Header from "./components/Header/header.vue";
import Footer from "./components/Footer/footer.vue";
export default {
  name: "App",
  components: {
    Header,
    Footer,
  },
  created() {
    //获取三级联动数据 并且只获取一次
    this.$store.dispatch("cateGoryList");
  },
};
</script>

<style>
</style>
