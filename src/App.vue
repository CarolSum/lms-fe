<template>
  <div id="app">
    <el-container style="height: 100%;">
      <el-header>
        <top-bar @update:isCollapse="changeCollapse"></top-bar>
      </el-header>
      <el-container>
        <el-aside :width="asideWidth">
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
      isCollapse: false,
      asideWidth: '300px'
    }
  },
  methods: {
    changeCollapse () {
      if(this.isCollapse) {
        this.asideWidth = '300px';
      }else {
        this.asideWidth = '64px';
      }
      this.isCollapse = !this.isCollapse;
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
.el-select .el-input {
  width: 130px;
}
.input-with-select .el-input-group__prepend {
  background-color: #fff;
}
h2 {
  font-size: 20px;
  font-weight: normal;
  border-bottom: 1px solid #e6e6e6;
}
</style>
