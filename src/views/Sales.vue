<template>
    <div>
      <div style="margin-top: 15px; margin-right: 50px;">
        <el-input placeholder="请输入内容" v-model="searchKey" class="input-with-select">
          <el-select v-model="select" slot="prepend" placeholder="请选择">
            <el-option label="书名" value="1"></el-option>
            <el-option label="分类" value="2"></el-option>
            <el-option label="价格" value="3"></el-option>
          </el-select>
          <el-button slot="append" icon="el-icon-search" @click="onSearch"></el-button>
        </el-input>
      </div>
      <div class="search-result">
        <h2>搜索结果：</h2>
        <el-table :data="searchDataWithCount" style="width: 100%">
          <el-table-column label="书名" min-width="120" prop="bookName"></el-table-column>
          <el-table-column label="出版社" min-width="120" prop="press"></el-table-column>
          <el-table-column label="价格" min-width="50" prop="price"></el-table-column>
          <el-table-column label="库存" min-width="50" prop="stock"></el-table-column>
          <el-table-column label="购买数量" min-width="100">
            <template slot-scope="scope">
               <div class="cart-count">
                <span class="cart-control-minus" @click="handleCount(scope.row, -1)">-</span>
                {{ scope.row.count }}
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

export default {
  name: 'sales',
  data () {
    return {
      searchKey: '',
      select: '',
      searchData: []
    }
  },
  computed: {
    searchDataWithCount () {
      return this.searchData.map(item => {
        return Object.assign({}, item, { count: 1});
      })
    }
  },
  methods: {
    onSearch () {
      if(!this.select || !this.searchKey) return;
      console.log(`search ${this.searchKey}`);
      setTimeout(() => {
        this.searchData = _searchData;
      }, 500);
    },
    handlePurchase (index, row) {
      console.log(index);
      console.log(row);
      row.stock -= row.count;
    },
    handleCount (row, num) {
      if(row.count === 1 && num === -1) return;
      row.count += num;
      console.log(row.count);
    }
  }
}    
</script>

<style>
  .el-select .el-input {
    width: 130px;
  }
  .input-with-select .el-input-group__prepend {
    background-color: #fff;
  }
  .search-result h2{
    font-size: 20px;
    font-weight: normal;
    border-bottom: 1px solid #e6e6e6;
  }
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
