<template>
  <div class="login">
    <van-button type="primary"
                :loading="loading"
                @click="handleLoginClick"
    >
      登录
    </van-button>
  </div>
</template>

<script>
  export default {
    name: 'Login',
    data() {
      return {
        loading: false
      };

    },
    computed: {
      // the route name that will redirect to after login successfully, default home
      to() {
        const { query: { to } } = this.$route;

        return to || 'home';

      }
    },
    methods: {
      handleLoginClick() {
        // TODO: login logic

        // redirect
        this.$router.replace({ name: this.to });

      }
    }
  };
</script>

<style scoped lang="scss">
  .login {

  }
</style>
