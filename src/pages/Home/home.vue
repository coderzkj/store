<template>
  <div>
    <TypeNav></TypeNav>
    <ListContainer></ListContainer>
    <TodayRecommend></TodayRecommend>
    <Rank></Rank>
    <Like></Like>
    <Floor v-for="carousel in getFloorList" :key="carousel.id" :col="carousel"></Floor>
    <Brand></Brand>
  </div>
</template>

<script>
import {mapState} from 'vuex'
//引入其余组件
import ListContainer from "@/pages/Home/listContainer/listContainer.vue";
import TodayRecommend from "@/pages/Home/todayRecommend/todayRecommend.vue";
import Rank from "@/pages/Home/rank/rank.vue";
import Like from "@/pages/Home/like/like.vue";
import Floor from "@/pages/Home/floor/floor.vue";
import Brand from "@/pages/Home/brand/brand.vue";
export default {
  name: "Home",
  components: {
    ListContainer,
    TodayRecommend,
    Rank,
    Like,
    Floor,
    Brand,
  },
  mounted() {
    this.$store.dispatch("getFloorList");
    // this.$store.dispatch("getUserInfo")
  },
  computed:{
    ...mapState({
      getFloorList:(state) =>{
        return state.home.getFloorList
      }
    })
  }
};
</script>

<style>
</style>