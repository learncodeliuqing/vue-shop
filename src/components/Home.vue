<template>
  <div>
    <el-button type="info" @click="logout">退出</el-button>
  </div>
</template>
<script>
export default {
  methods: {
    logout () {
      // 清空tokenz
      window.sessionStorage.clear()
      // 跳转到登录页面
      this.$router.push('/login')
      console.log('跳转到')
    }
  }
}
</script>

<style lang="stylus" scoped></style>
