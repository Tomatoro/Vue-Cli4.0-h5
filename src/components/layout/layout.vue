<template>
  <!-- global layout-->
  <div class="layout">
    <header class="layout-header">
      头部
    </header>

    <main class="layout-main">
      <template v-if="keepAlive">
        <keep-alive>
          <router-view />
        </keep-alive>
      </template>

      <template v-else>
        <router-view />
      </template>
    </main>

    <footer class="layout-footer">
      脚注
    </footer>
  </div>
</template>

<script>
  // ATTENTION: should define and import header/footer component from './components/*'
  export default {
    name: 'Layout',
    props: {
      keepAlive: {
        type: Boolean,
        default: false
      }
    }
  };
</script>

<style scoped lang="scss">
  .layout {

    // 头部
    .layout-header {

    }

    // 主体
    .layout-main {

    }

    // 脚注
    .layout-footer {

    }

  }
</style>
