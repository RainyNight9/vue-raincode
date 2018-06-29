<template>
  <div class="page">
    <h3 class="title">{{ msg }}</h3>

    <div class="amap-page-container">
      <el-amap vid="amapDemo"  :center="center" :amap-manager="amapManager" :zoom="zoom" :events="events" class="amap-demo">
      </el-amap>

      <div class="toolbar">
        <button @click="add()">add marker</button>
      </div>
    </div>
  </div>
</template>

<script>
  // NPM 方式
   import {AMapManager} from 'vue-amap';
  // CDN 方式
  let amapManager = AMapManager;
  export default {
    data: function() {
      return {
        msg: '高德sdk',
        zoom: 12,
        center: [121.59996, 31.197646],
        amapManager,
        events: {
          init(o) {
            let marker = new AMap.Marker({
              position: [121.59996, 31.197646],
            });

            marker.setMap(o);
          },
        },
      };
    },
    methods: {
      add() {
        let o = amapManager.getMap();
        let marker = new AMap.Marker({
          position: [121.59996, 31.177646],
        });

        marker.setMap(o);
      },
    },
  };
</script>

<style>
  .amap-demo {
    height: 500px;
  }
</style>
