<template>
  <div class="rank-list">
      <h2>{{ title }}</h2>
      <el-table 
        :data="tableData" 
        style="width: 100%"
        highlight-current-row>
        <el-table-column property="index" label="排行" min-width="50"></el-table-column>
        <el-table-column property="name" label="图书" min-width="200"></el-table-column>
        <el-table-column property="price" label="售价" min-width="120"></el-table-column>
        <el-table-column property="salesVolumn" label="销量" min-width="120"></el-table-column>
      </el-table>
      <el-pagination
        background
        :page-size="10"
        layout="total, prev, pager, next, jumper"
        :total="tableLength"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        style="float: right; margin: 20px 0;">
      </el-pagination>
    </div>
</template>
<script>
  export default {
    name: 'rank-list',
    props: {
      title: String,
      rankListData: Array
    },
    data () {
      return {
        tableLength: 0,
        currentPage: 1,
        tableData: []
      }
    },
    methods: {
      handleCurrentChange (val) {
        this.tableData = this.pagination(val, 10, this.rankListData).map((row, id) => { row.index = id + (this.currentPage - 1) * 10 + 1; return row;});
      },
      pagination (pageNo, pageSize, array) {
        var offset = (pageNo - 1) * pageSize;
        return (offset + pageSize >= array.length) ? array.slice(offset, array.length) : array.slice(offset, offset + pageSize);
      }
    },
    mounted () {
      this.tableLength = this.rankListData.length;
      this.tableData = this.pagination(1, 10, this.rankListData).map((row, id) => { row.index = id + (this.currentPage - 1) * 10 + 1; return row;});
    }
  }
</script>

<style scoped>

</style>
