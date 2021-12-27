<template>
    <div>
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
            width="120">
        </el-table-column>
        <el-table-column
            prop="email"
            label="邮箱"
            width="120">
        </el-table-column>
        <el-table-column
            prop="mobile"
            label="手机"
            width="120">
        </el-table-column>
        <el-table-column
            prop="credit"
            label="信誉值"
            width="120">
        </el-table-column>
        <el-table-column
            prop="updateTime"
            label="最后更新时间"
            width="120">
        </el-table-column>
        <el-table-column
            fixed="right"
            label="操作"
            width="100">
          <template slot-scope="scope">
            <el-button @click="edit(scope.row)" type="text" size="small">修改</el-button>
            <el-button @click="deleteUser(scope.row)" type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

    </div>
</template>

<script>
    export default {
        methods: {
            deleteUser(row){
                const _this = this
                axios.delete('http://localhost:8181/user/deleteById/'+row.uid).then(function(resp){
                    _this.$alert('《'+row.nickName+'》删除成功！', '消息', {
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
                    query:{
                        id:row.id
                    }
                })
            },

        },

        data() {
            return {
                tableData: [{
                }]
            }
        },

        created() {
          const _this = this
          axios.get('http://localhost:8181/user/list').then(function(resp){
            console.log(resp)
            _this.tableData = resp.data
          })
        }
    }
</script>
