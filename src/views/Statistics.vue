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
          <el-table-column type="index" min-width="50"></el-table-column>
          <el-table-column property="name" label="图书" min-width="200"></el-table-column>
          <el-table-column property="price" label="售价" min-width="120"></el-table-column>
          <el-table-column property="salesVolumn" label="销量" min-width="120"></el-table-column>
        </el-table>
        <el-pagination
          background
          :page-sizes="[5, 10, 15, 20]"
          :page-size="10"
          layout="total, sizes, prev, pager, next, jumper"
          :total="tableLength"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
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
      tableLength: rankListData.length
    }
  },
  methods: {
    handleSizeChange (val) {
      // 更新表格每页数据

    },
    handleCurrentChange () {
      // 更新表格内容
    }
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
