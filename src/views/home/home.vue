<template>
  <div class="home">
    首页
    <ul class="home-entries">
      <li class="entry-item"
          v-for="(entry, index) in entries"
          :key="index"
          @click="handleEntryClick(entry.name)"
      >
        <!--<img class="item-icon" src="" alt="随时考图标">-->
        <h6 class="item-title">
          {{ entry.title }}
        </h6>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'Home',
    data() {
      return {
        entries: [
          {
            name: 'anytime', // 路由名称
            title: '随时考',
            icon: ''
          }
        ]
      };

    },
    methods: {
      handleEntryClick(routeName) {
        if (!routeName) return;

        this.$router.push({
          name: routeName
        });

      }
    }
  };
</script>

<style scoped lang="scss">
  .home {

  }
</style>
