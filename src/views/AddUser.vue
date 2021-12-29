<template>
  <el-form style="width: 60%" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">

    <el-form-item label="UID" prop="uid">
      <el-input v-model="ruleForm.uid"></el-input>
    </el-form-item>

    <el-form-item label="Email" prop="email">
      <el-input v-model="ruleForm.email"></el-input>
    </el-form-item>

    <el-form-item label="Nickname" prop="nickName">
      <el-input v-model="ruleForm.nickName"></el-input>
    </el-form-item>

    <el-form-item label="Password" prop="password">
      <el-input v-model="ruleForm.password"></el-input>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
      <el-button @click="resetForm('ruleForm')">重置</el-button>
    </el-form-item>

  </el-form>
</template>

<script>
export default {
  data() {
    return {
      ruleForm: {
        uid: '',
        email: '',
        nickName: '',
        password: ''
      },
      rules: {
        uid: [
          {required: true, message: '用户id不能为空', trigger: 'blur'}
        ],
        nickName: [
          {required: true, message: '用户昵称不能为空', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '密码不能为空', trigger: 'blur'}
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      const _this = this
      this.$refs[formName].validate((valid) => {
        if (valid) {
          axios.post('http://localhost:8181/user/register', this.ruleForm).then(function (resp) {
            _this.$alert('《' + _this.ruleForm.uid + '》添加成功！', '消息', {
              confirmButtonText: '确定',
              callback: action => {
                _this.$router.push('/UserManage')
              }
            })
          })
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
}
</script>

