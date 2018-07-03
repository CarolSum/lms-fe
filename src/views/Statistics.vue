<template>
    <div>
      <el-tabs v-model="activeName" :tab-position="'top'" type="border-card"  @tab-click="handleClick">
        <el-tab-pane label="进货统计" name="purchase-statistics">
          <h2>进货统计: </h2>
          <el-table :data="purchaseTable" border style="width: 100%">
            <el-table-column prop="bookname" label="书名" min-width="100"></el-table-column>
            <el-table-column prop="purchase_price" label="进货价格" min-width="70"></el-table-column>
            <el-table-column prop="purchase_quantity" label="进货数量" min-width="70"></el-table-column>
            <el-table-column prop="purchase_date" label="进货日期" min-width="120"></el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="退货统计" name="return-statistics">
          <h2>退货统计: </h2>
          <el-table :data="returnTable" border style="width: 100%">
            <el-table-column prop="bookname" label="书名" min-width="100"></el-table-column>
            <el-table-column prop="price" label="价格" min-width="70"></el-table-column>
            <el-table-column prop="quantity" label="退货数量" min-width="70"></el-table-column>
            <el-table-column prop="refund_date" label="退货日期" min-width="120"></el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="销售记录" name="sales-records">
          <div class="total">
            <h2>统计情况：</h2>
            <el-table :data="salesTable" border show-summary :summary-method="getSummaries" style="width: 100%">
              <el-table-column prop="bookname" label="书名" min-width="100"></el-table-column>
              <el-table-column prop="price" label="价格" min-width="70"></el-table-column>
              <el-table-column prop="quantity" label="销售数量" min-width="70"></el-table-column>
              <el-table-column prop="sale_date" label="销售日期" min-width="120"></el-table-column>
            </el-table>
          </div>
        </el-tab-pane>
        <el-tab-pane label="销售排行" name="ranklist">
          <rank-list :title="'销量排行榜'"></rank-list>
        </el-tab-pane>
      </el-tabs>
    </div>
</template>

<script>
import rankListData from '../mock-data/statistic.js';
import RankList from '../components/RankList.vue';
import api from '../utils/api.js';

export default {
  name: 'statistics',
  components: {
    RankList
  },
  data () {
    return {
      activeName: 'ranklist',
      purchaseTable: [],
      returnTable: [],
      salesTable: []
    }
  },
  methods: {
    handleClick(tab, event) {
      // console.log(tab, event);
    },
    getSummaries (param) {
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '合计';
          return;
        }
        if(index === 1) {
          const values = data.map(item => Number(item['price']));
          const values2 = data.map(item => Number(item['quantity']));
          let tnum = 0;
          for(var i = 0; i < values.length; i++){
            tnum += Number(values[i]) * Number(values2[i]);
          }
          sums[index] = tnum + ' 元';
          return;
        }

        const values = data.map(item => Number(item[column.property]));
        if (!values.every(value => isNaN(value))) {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr);
            if (!isNaN(value)) {
              return prev + curr;
            } else {
              return prev;
            }
          }, 0);
          sums[index] += ' 元';
        } else {
          sums[index] = 'N/A';
        }
      });

      return sums;
    }
  },
  async mounted () {
    await api.get('/statistic/sales').then(res => {
      this.salesTable = res.data.data.sales;
      if(this.salesTable.length === 0){
        this.$message.info('暂无销售记录~');
      }
    })
    await api.get('/statistic/refunds').then(res => {
      this.returnTable = res.data.data.refunds;
      if(this.returnTable.length === 0) {
        this.$message.info('暂无退货记录~');
      }
    })
    await api.get('/statistic/purchases').then(res => {
      this.purchaseTable = res.data.data.purchases;
      if(this.purchaseTable.length === 0) {
        this.$message.info('暂无进货记录~');
      }
    })
  }
}
</script>

<style scoped>
  .total span{
    padding: 0 10px;
  }
</style>
