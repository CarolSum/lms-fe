<template>
    <div>
      <div style="margin-top: 15px; margin-right: 50px;">
        <el-input placeholder="请输入购买书籍" v-model="searchKey" class="input-with-select">
          <template slot="prepend">
            书名
          </template>
          <el-button slot="append" icon="el-icon-search" @click="handleSearch"></el-button>
        </el-input>
      </div>
      <div class="search-result">
        <h2>搜索结果：</h2>
        <el-table :data="searchDataWithCount" style="width: 100%">
          <el-table-column label="书名" min-width="120" prop="bookname"></el-table-column>
          <el-table-column label="价格" min-width="50" prop="price"></el-table-column>
          <el-table-column label="库存" min-width="50" prop="stocks"></el-table-column>
          <el-table-column label="购买数量" min-width="100">
            <template slot-scope="scope">
               <div class="cart-count">
                <span class="cart-control-minus" @click="handleCount(scope.row, -1)">-</span>
                {{ scope.row.quantity }}
                <span class="cart-control-add" @click="handleCount(scope.row, 1)">+</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini" type="primary" @click="handlePurchase(scope.$index, scope.row)">购买</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
</template>

<script>
import _searchData from '../mock-data/saleSearchData.js';
import api from '../utils/api.js';

export default {
  name: 'sales',
  data () {
    return {
      searchKey: '',
      searchData: []
    }
  },
  computed: {
    searchDataWithCount () {
      return this.searchData.map(item => {
        return Object.assign({}, item, { quantity: 1});
      })
    }
  },
  methods: {
    async handleSearch () {
      if(!this.searchKey) return;
      console.log(`search ${this.searchKey}`);

      await api.get('/book?name='+this.searchKey).then(res => {
        console.log(res);
        if(res.data.data.books.length === 0) {
          this.$notify({
            title: '查询失败',
            message: '书库中没有相关书籍~',
            type: 'info'
          })
        }else {
          this.searchData = res.data.data.books;
        }
      });

    },
    async handlePurchase (index, row) {
      if(row.quantity <= 0) return;
      const arr = [];
      arr.push(row);
      await api.post('/book/sale', {
        sales: arr
      }).then(res => {
        console.log(res);
        this.$notify({
          type: 'success',
          message: '成功售出书籍~',
          title: '操作成功'
        })
        row.stocks -= row.quantity;
      })
    },
    handleCount (row, num) {
      if(row.quantity === 1 && num === -1) return;
      row.quantity += num;
      console.log(row.quantity);
    }
  },
  mounted () {
    api.get('/book').then(res => {
      this.searchData = res.data.data.books;
    });
  }
}
</script>

<style scoped>
  .cart-control-minus,
  .cart-control-add{
    display: inline-block;
    margin: 0 4px;
    width: 24px;
    height: 24px;
    line-height: 22px;
    text-align: center;
    background: #f8f8f9;
    border-radius: 50%;
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
    cursor: pointer;
  }
</style>
