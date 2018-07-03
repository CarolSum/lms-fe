<template>
    <div>
      <h2>退货</h2>
      <el-table :data="refundsTable" border>
        <el-table-column prop="bookname" label="退货书籍" min-width="70"></el-table-column>
        <el-table-column prop="quantity" label="退货数量" min-width="50"></el-table-column>
        <el-table-column label="操作" min-width="50">
          <template slot-scope="scope">
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="btn-group">
        <el-button type="danger" @click="addRefunds">添加</el-button>
        <el-button type="primary" @click="handleRefundsConfirm">提交</el-button>
      </div>
      <el-dialog title="添加退货书目" :visible.sync="addRefundsFormVisible">
        <el-form :model="addRefundsForm" label-width="80px">
           <el-form-item label="退货书籍">
            <el-select v-model="addRefundsForm.bid" placeholder="请选择需要退货的书籍">
              <el-option v-for="item in _metaRefundsTable" :key="item.bid" :label="item.bookname" :value="item.bid"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="退货数量">
            <el-input v-model="addRefundsForm.quantity" type="number"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="addRefundsFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="handleFormConfirm">确 定</el-button>
        </div>
      </el-dialog>
    </div>
</template>

<script>
import api from '../utils/api.js';

export default {
  name: 'returns',
  data () {
    return {
      _metaRefundsTable: [],
      refundsTable: [],
      addRefundsFormVisible: false,
      addRefundsForm: {
        bid: 0,
        quantity: 0
      }
    }
  },
  methods: {
    handleDelete (index, row) {
      this.refundsTable.splice(index, 1);
    },
    addRefunds () {
      this.addRefundsFormVisible = true;
      console.log(this.refundsTable);
    },
    handleFormConfirm () {
      console.log(this.addRefundsForm.quantity);
      if(this.addRefundsForm.quantity <= 0){
        this.$message.error('退货数量应大于0~请重新输入~');
        return;
      }
      // find book name
      let bookname = '';
      this._metaRefundsTable.forEach(item => {
        if(item.bid === this.addRefundsForm.bid) {
          bookname = item.bookname;
        }
      });
      this.refundsTable.push(Object.assign({}, this.addRefundsForm, { bookname: bookname}));
      this.addRefundsFormVisible = false;
    },
    async handleRefundsConfirm () {
      if(this.refundsTable.length === 0) {
        this.$notify({
          title: '发生错误',
          type: 'warning',
          message: '请添加退货书籍条目~'
        });
        return;
      }
      await api.post('/book/refund', {
        refunds: this.refundsTable
      }).then(res => {
        console.log(res);
      })
      this.$notify({
        title: '成功',
        message: '退货成功',
        type: 'success'
      })
      this.refundsTable.splice(0, this.refundsTable.length);
    }
  },
  async mounted () {
    await api.get('/book').then(res => {
      console.log(res);
      this._metaRefundsTable = res.data.data.books;
    });
  }
}
</script>

<style scoped>
.btn-group{
  margin: 10px 0px;
}


</style>
