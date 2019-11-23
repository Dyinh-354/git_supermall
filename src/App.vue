<template>
  <div id="app">
   
    <!-- <router-link :to="{ name: '' }"></router-link> -->
    <!-- <router-link :to="{ name: 'category' }"></router-link> -->
    <keep-alive exclude="Detail">
      <router-view/>
    </keep-alive>
    <main-tab-bar></main-tab-bar>
  </div>
</template>

<script>

  import MainTabBar from './components/content/maintabbar/MainTabBar.vue'

  export default {
    name: "app",
    components: {
      MainTabBar
    }
  };
</script>

<style>
  @import "./assets/css/base.css";

</style>
