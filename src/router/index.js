import Vue from 'vue';
import VueRouter from 'vue-router';
import publicRoutes from './public';
import store from '../store';

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'hash',
  routes: publicRoutes,
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { x: 0, y: 0 };
  }
});

router.beforeEach((to, from, next) => {
  // reset request count
  store.commit('mttRequestCount', 0);

  const { matched } = to;

  if (!matched || !matched.length) {
    console.error('无效路由');

    return;
  }

  next();

});

export default router;
