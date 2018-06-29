<template>
  <div id="app">
    <my-nav></my-nav>
    <my-menu :menuList="menuList"></my-menu>
    <router-view></router-view>
  </div>
</template>

<script>
  import myMenu from '../components/common/myMenu.vue';
  import myNav from '../components/common/myNav.vue';

  export default {
    name: 'gaode',
    components: {myMenu, myNav},
    data() {
      return {
        menuList: [
          {id: 1, name: '高德地图'},
          {id: 2, name: '高德地图'},
          {id: 3, name: '高德地图'},
        ],
      };
    },
  };
</script>

<style>
  #app {
    font-family: 'Arial', sans-serif, Avenir, Helvetica;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    margin-top: 0;
    min-width:1200px;
  }
  #app .page{
    margin: 80px 20px 0 280px;
  }
</style>
