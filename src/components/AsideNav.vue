<template>
  <div style="height: 100%;">
    <el-menu class="aside-menu" :collapse="isCollapse" router>
      <el-menu-item index="/purchase">
          <i class="el-icon-menu"></i>
          <span slot="title">进货</span>
      </el-menu-item>
      <el-menu-item index="/returns">
          <i class="el-icon-menu"></i>
          <span slot="title">退货</span>
      </el-menu-item>
      <el-menu-item index="/statistic">
          <i class="el-icon-document"></i>
          <span slot="title">统计</span>
      </el-menu-item>
      <el-menu-item index="/sales">
          <i class="el-icon-setting"></i>
          <span slot="title">销售</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<style>
.aside-menu{
  height: 100%;
}
.aside-menu{
  margin: 0;
}
</style>

<script>
  export default {
    name:'aside-nav',
    props: {
      isCollapse: Boolean
    }
  }
</script>