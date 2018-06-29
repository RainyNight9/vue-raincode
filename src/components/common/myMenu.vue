<template>
  <div class="myMenu">
    <el-row class="tac">
      <el-col :span="24">
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b">
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>高德地图</span>
            </template>
            <el-menu-item-group>
              <template slot="title">分组一</template>
              <el-menu-item index="1-1-1" @click="goMenu('/home')">坐标连线</el-menu-item>
              <el-menu-item index="1-1-2" @click="goMenu('/gaodesdk')">高德sdk</el-menu-item>
              <el-menu-item index="1-1-3" @click="goMenu('/tripShare')">车程分享</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="分组2">
              <el-menu-item index="1-3">选项3</el-menu-item>
            </el-menu-item-group>
            <el-submenu index="1-4">
              <template slot="title">选项4</template>
              <el-menu-item index="1-4-1">选项1</el-menu-item>
            </el-submenu>
          </el-submenu>


          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span>组件测试</span>
            </template>
            <el-menu-item-group>
              <template slot="title">分组一</template>
              <el-menu-item index="2-1" @click="goMenu('/sliders')">多个滑动</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="分组2">
              <el-menu-item index="2-3">选项3</el-menu-item>
            </el-menu-item-group>
            <el-submenu index="2-4">
              <template slot="title">选项4</template>
              <el-menu-item index="2-4-1">选项1</el-menu-item>
            </el-submenu>
          </el-submenu>


          <el-menu-item index="4" disabled>
            <i class="el-icon-document"></i>
            <span slot="title">导航三</span>
          </el-menu-item>
          <el-menu-item index="5">
            <i class="el-icon-setting"></i>
            <span slot="title">导航四</span>
          </el-menu-item>
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    name: 'myMenu',
    props: ['menuList'],
    created() {
    },
    mounted() {
    },
    methods: {
      goMenu(path) {
        this.$router.push({path: path});
      },
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
    },
  };
</script>
<style scoped>
  .myMenu{
    position: fixed;
    top: 60px;
    left: 0;
    width:260px;
    height: 100vh;
    background-color: rgb(84, 92, 100);
  }
</style>
