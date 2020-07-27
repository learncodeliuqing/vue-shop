<template>
  <div class="login_container">
    <!-- todo  -->
    <!-- 1. 登录盒子 -->
    <div class="login_box">
      <!-- 1.1 头像 -->
      <div class="avatar_logo">
        <img src="../assets/logo.png" alt="">
      </div>
      <!-- 1.2. 登录表单 -->
    <el-form :model="loginForm" ref="loginFormRef" :rules="loginFormRules" label-width="0px" class="login_form">
      <!-- 1.2.1 用户名 -->
      <el-form-item prop="username">
        <el-input v-model="loginForm.username" prefix-icon="iconfont icon-user" class="user"></el-input>
      </el-form-item>
      <!-- 1.2.2 密码 -->
      <el-form-item prop="password">
        <!-- 小图标 -->
        <el-input type="password" v-model="loginForm.password" prefix-icon="iconfont icon-3702mima" class="password"></el-input>
      </el-form-item>
      <!-- 1.2.3 按钮 -->
      <el-form-item class="btns">
        <el-button type="primary" @click="login">登录</el-button>
        <el-button type="info" @click="resetLoginForm">重置</el-button>
      </el-form-item>
    </el-form>
    </div>

  </div>
</template>

<script>
export default {
  data () {
    return {

      loginForm: {
        username: 'admin',
        password: '12356'
      },
      // 验证规则
      loginFormRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          {
            min: 3,
            max: 10,
            message: '登录名长度在3 到 10个字符',
            trigger: 'blur'
          }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur'},
          {
            min: 6, max: 15, message: '密码长度在6到15个字符', trigger: 'blur'
          }
        ]
      }

    }
  },
  methods: {
    // 表单重置
    resetLoginForm () {
      this.$refs.loginFormRef.resetFileds()
    },
    // 预验证
    login () {
      this.$refs.loginFormRef.validate(async valid => {
        console.log(this.loginFormRules)
        // 如果传递给valid参数的值为true, 则验证规则通过
        if (!valid) {
          // todo
          return this.$message.error('验证失败')
        }

        // 验证通过,发送请求. axios将后台返回值挂载到一个对象的data属性上
        /*
        登录验证接口
          • 请求路径：login
          • 请求方法：post
          • 请求参数
            参数名  参数说明  备注
            username    用户名  不能为空
            password  密码  不能为空
          • 响应参数
            参数名      参数说明    备注
            id          用户      ID
            rid         用户角色  ID
            username    用户名
            mobile      手机号
            email       邮箱
            token       令牌      基于jwt的令牌
          • 响应数据
          {
            "data": {
              "id": 500,
              "rid": 0,
              "username": "admin",
              "mobile": "123",
              "email": "123@qq.com",
              "token": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjUwMCwicmlkIjowLCJpYXQiOjE1MTI1NDQyOTksImV4cCI6MTUxMjYzMDY5OX0.eGrsrvwHm-tPsO9r_pxHIQ5i5L1kX9RX444uwnRGaIM"
             },
            "meta": {
              "msg": "登录成功",
              "status": 200
             }
          } */
        const { data: res } = await this.$http.post('/login', this.loginForm)
        if (res.meta.status !== 200) {
          return this.$message.error('登录失败' + res.meta.msg)
        }
        console.log(this.$message)
        // 请求成功, 保存响应中的token
        this.$message.success('登录成功')
        window.sessionStorage.setItem('token', res.data.token)
        // 导航到/home页面
        this.$router.push('/home')
      })
    }

  }
}
</script>

<style lang="stylus" scoped>
// 登录容器
.login_container
  background-color #2b5b6b
  height 100%
  position relative

// 登录盒子的样式
.login_box
  width 450px
  height 300px
  background #fff
  border-radius 3px
  position absolute
  left 50%
  top 50%
  transform translate(-50%, -50%)

  // 登录头像的样式
  .avatar_logo
    height 130px
    width 130px
    border 1px solid #eee
    border-radius 50%
    padding 10px
    box-shadow 0 0 10px #ddd
    position absolute
    left 50%
    transform translate(-50%, -50%)
    background-color #fff
    img
      width 100%
      height 100%
      border-radius 50%
      background-color #eee

  // 登录表单
  .login_form
    position absolute
    bottom 0
    width 100%
    padding 0 2px
    box-sizing border-box
</style>
