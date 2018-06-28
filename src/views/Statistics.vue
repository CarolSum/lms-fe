<template>
    <div>
      <div class="total">
        <h2>统计情况：</h2>
        <span>销售总额: {{ totalSales }}</span>
        <span>销售总量: {{ totalAmount }}</span>
      </div>
      <rank-list :title="'排行榜'" :rankListData="tableData"></rank-list>
    </div>
</template>

<script>
import rankListData from '../mock-data/statistic.js';
import RankList from '../components/RankList.vue';

export default {
  name: 'statistics',
  components: {
    RankList
  },
  data () {
    return {
      totalSales: 30009,
      totalAmount: 2000,
      tableData: rankListData,
    }
  }
}    
</script>

<style scoped>
  .total h2{
    font-size: 20px;
    font-weight: normal;
    border-bottom: 1px solid #e6e6e6;
  }
  .total span{
    padding: 0 10px;
  }
</style>
