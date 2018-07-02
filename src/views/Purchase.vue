<template>
  <div>
    <el-input placeholder="请输入进货书名" v-model="nameOfPurchase">
      <template slot="prepend">
        进货
      </template>
      <el-button slot="append" icon="el-icon-search" @click="handleSearchPurchaseBook"></el-button>
    </el-input>
    <h2>书目信息</h2>
    <el-table :data="bookInfo" border>
      <el-table-column prop="bookname" label="书名" min-width="50"></el-table-column>
      <el-table-column prop="price" label="单价" min-width="50"></el-table-column>
      <el-table-column prop="stocks" label="库存" min-width="50"></el-table-column>
      <el-table-column prop="sales" label="销量" min-width="50"></el-table-column>
    </el-table>
    <h2>供货商列表</h2>
    <el-table :data="supplierInfo" border stripe>
      <el-table-column prop="distributor_name" label="供应商" min-width="120"></el-table-column>
      <el-table-column prop="price" label="报价" min-width="180"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="handleOrderFormOpen(scope.row)">订购</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="进货确认" :visible.sync="orderFormVisible">
      <el-form :model="orderForm">
        <el-form-item label="进货数量" :label-width="formLabelWidth">
          <el-input v-model="orderForm.quantity" type="number" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="orderFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleOrderFormConfirm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {bookInfo, supplierInfo} from '../mock-data/purchaseBookInfo.js';
import axios from 'axios';
import api from '../utils/api.js';

export default {
  name: 'purchase',
  data () {
    return {
      nameOfPurchase: '',
      bookInfo: [],
      supplierInfo: [],
      orderFormVisible: false,
      orderForm: {
        market_id: 0,
        quantity: 0
      },
      formLabelWidth: '120px'
    }
  },
  methods: {
    handleSearchPurchaseBook () {
      if(!this.nameOfPurchase) return;
      console.log(`purchase: ${this.nameOfPurchase}`);
      setTimeout(() => {
        this.bookInfo = bookInfo;
        this.supplierInfo = supplierInfo;
      }, 500);

      api.get('/book').then(res => console.log(res));
    },
    handleOrderFormOpen (row) {
      this.orderForm.market_id = row.market_id;
      this.orderForm.quantity = 0;
      this.orderFormVisible = true;
    },
    handleOrderFormConfirm () {
      if(!this.orderForm.quantity || this.orderForm.quantity == '0'){
        this.orderFormVisible = false;
        return;
      };
      console.log(this.orderForm);
      // 类型检查?
      this.orderFormVisible = false;
    }
  }
}    
</script>

<style>

</style>
