<template>
    <div>
      <div class="total">
        <h2>统计情况：</h2>
        <span>销售总额: {{ totalSales }}</span>
        <span>销售总量: {{ totalAmount }}</span>
      </div>
      <div class="rank-list">
        <h2>排行榜</h2>
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
    </div>
</template>

<script>
import rankListData from '../mock-data/statistic.js';
export default {
  name: 'statistics',
  data () {
    return {
      totalSales: 30009,
      totalAmount: 2000,
      tableData: rankListData,
      tableLength: rankListData.length,
      currentPage: 1
    }
  },
  methods: {
    handleCurrentChange (val) {
      // 更新表格内容
      this.tableData = this.pagination(val, 10, rankListData).map((row, id) => { row.index = id + (this.currentPage - 1) * 10 + 1; return row;});
    },
    pagination (pageNo, pageSize, array) {
      var offset = (pageNo - 1) * pageSize;
      return (offset + pageSize >= array.length) ? array.slice(offset, array.length) : array.slice(offset, offset + pageSize);
    }
  },
  mounted () {
    this.tableData = this.pagination(1, 10, rankListData).map((row, id) => { row.index = id + (this.currentPage - 1) * 10 + 1; return row;});
  }
}    
</script>

<style scoped>
  .total h2, .rank-list h2{
    font-size: 20px;
    font-weight: normal;
    border-bottom: 1px solid #e6e6e6;
  }
  .total span{
    padding: 0 10px;
  }
</style>
