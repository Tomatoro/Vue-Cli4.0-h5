<template>
  <div id="app">
    <!-- without layout -->
    <template v-if="withoutLayout">
      <template v-if="keepAlive">
        <keep-alive>
          <router-view />
        </keep-alive>
      </template>

      <template v-else>
        <router-view />
      </template>
    </template>

    <!-- with layout -->
    <layout v-else
            :keep-alive="keepAlive"
    />
  </div>
</template>

<script>
  import { mapState } from 'vuex';
  import Layout from './components/layout';
  import NProgress from 'nprogress';
  import 'nprogress/nprogress.css';

  export default {
    name: 'App',
    components: {
      Layout
    },
    data() {
      return {
        keepAlive: false,
        withoutLayout: true
      };

    },
    computed: {
      ...mapState([
        'requestCount'
      ])
    },
    watch: {
      $route(n) {
        const {
          meta: {
            keepAlive,
            withoutLayout
          }
        } = n;

        this.keepAlive = !!keepAlive;
        this.withoutLayout = !!withoutLayout;

      },
      // the requesting count of current route mapped
      requestCount(n) {
        n > 0 ? NProgress.start() : NProgress.done();

      }
    }
  };
</script>

<style scoped lang="scss">
  #app {
    min-width: 100vw;
    min-height: 100vh;
  }
</style>
