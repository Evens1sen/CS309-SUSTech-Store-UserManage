<template>
    <el-table
        :data="tableData"
        border
        style="width: 100%">
      <el-table-column
          fixed
          prop="uid"
          label="UID"
          width="150">
      </el-table-column>
      <el-table-column
          prop="nickName"
          label="用户昵称"
          width="120">
      </el-table-column>
      <el-table-column
          prop="gender"
          label="性别"
          width="50">
      </el-table-column>
      <el-table-column
          prop="email"
          label="邮箱"
          width="200">
      </el-table-column>
      <el-table-column
          prop="mobile"
          label="手机"
          width="120">
      </el-table-column>
      <el-table-column
          prop="credit"
          label="信誉值"
          width="100">
      </el-table-column>
      <el-table-column
          prop="updateTime"
          label="最后更新时间"
          width="120">
      </el-table-column>
      <el-table-column
          fixed="right"
          label="操作"
          width="250">
        <template slot-scope="scope">
          <!--            <el-button @click="edit(scope.row)" type="text" size="small">修改</el-button>-->
          <el-button @click="kick(scope.row)" type="text" size="small">强制下线</el-button>
          <el-button @click="disable(scope.row)" type="text" size="small">封号</el-button>
          <el-button @click="untieDisable(scope.row)" type="text" size="small">解封</el-button>
          <el-button @click="deleteUser(scope.row)" type="text" size="small">注销</el-button>
        </template>
      </el-table-column>
    </el-table>
</template>

<script>
export default {
  methods: {
    deleteUser(row) {
      const _this = this
      axios.delete('http://localhost:8181/user/deleteById/' + row.uid).then(function (resp) {
        _this.$alert('《' + row.nickName + '》删除成功！', '消息', {
          confirmButtonText: '确定',
          callback: action => {
            window.location.reload()
          }
        })
      })
    },
    edit(row) {
      this.$router.push({
        path: '/update',
        query: {
          id: row.id
        }
      })
    },
    kick(row) {
      const _this = this
      axios.put('http://localhost:8181/user/kickout/' + row.uid).then(function (resp) {
        _this.$alert('《' + row.uid + '》强制下线成功！', '消息', {
          confirmButtonText: '确定',
          callback: action => {
            window.location.reload()
          }
        })
      })
    },
    disable(row) {
      const _this = this
      _this.$prompt('请输入封号时间 (小时)', '消息', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(({value}) => {
        alert(value)
        axios.put('http://localhost:8181/user/disable/' + row.uid + '/' + value).then(function (resp) {
          _this.$alert('《' + row.uid + '》封号' + value + '小时', '消息', {
            confirmButtonText: '确定',
            callback: action => {
              window.location.reload()
            }
          })
        })
      })
    },
    untieDisable(row) {
      const _this = this
      axios.put('http://localhost:8181/user/untieDisable/' + row.uid).then(function (resp) {
        _this.$alert('《' + row.uid + '》解封成功！', '消息', {
          confirmButtonText: '确定',
          callback: action => {
            window.location.reload()
          }
        })
      })
    }
  },

  data() {
    return {
      tableData: [{}]
    }
  },

  created() {
    const _this = this
    axios.get('http://localhost:8181/user/list').then(function (resp) {
      console.log(resp)
      _this.tableData = resp.data
    })
  }
}
</script>
