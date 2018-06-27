<template>
  <el-container class="top-bar-container">
    <el-menu mode="horizontal" class="top-bar-menu">
      <div class="logo">
        <router-link to="/home">图书管理系统</router-link>
      </div>
      <el-menu-item index="1">
        <i class="el-icon-share"></i>
        <span>分享</span>
      </el-menu-item>
      <el-menu-item index="2">
        <i class="el-icon-news"></i>
        <span>登录/注册</span>
      </el-menu-item>
    </el-menu>
  </el-container>
</template>

<script>
export default {
  name: 'top-bar',
  props: {
    isCollapse: Boolean
  },
  methods: {
      changeCollapse () {
        this.isCollapse = !this.isCollapse;  
      }
  }
}    
</script>

<style scoped>
.top-bar-container{
  margin: 0 30px;
}
.top-bar-container a{
  text-decoration: none;
  color: #9f9f9f;
}

.logo{
  display: inline-block;
  text-align: center;
  line-height: 60px;
  height: 60px;
  font-size: 20px;
}
.top-bar-menu{
  width: 100%;
}

.el-menu--horizontal>.el-menu-item{
  float: right;
}
</style>
