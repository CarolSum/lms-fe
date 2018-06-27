<template>
  <div id="app">
    <el-container style="height: 100%;">
      <el-header>
        <top-bar></top-bar>
      </el-header>
      <el-container>
        <el-aside>
          <aside-nav :isCollapse="isCollapse"></aside-nav>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import AsideNav from './components/AsideNav.vue';
import TopBar from './components/TopBar.vue';

export default {
  name: 'app',
  components: {
    AsideNav,
    TopBar
  },
  data () {
    return {
      isCollapse: false
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
}
</style>
