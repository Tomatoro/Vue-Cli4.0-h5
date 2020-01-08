import anytimeExamRoutes from './modules/anytime-exam';

// public routes
// prop 'meta.keepAlive' indicate whether enable route cache
// prop 'meta.withoutLayout' indicate whether disable layout(usually contains menu/nav ...), means what the route shows
//  is what you writes
// ATTENTION: any custom prop you defined must be a prop of meta object
const commonRoutes = [
  {
    name: 'login',
    path: '/login',
    component: () => import(/* webpackChunkName: 'login' */'../../views/login'),
    meta: {
      withoutLayout: true
    }
  },
  {
    name: 'home',
    alias: '',
    path: '/',
    component: () => import(/* webpackChunkName: 'home' */'../../views/home')
  }
];

export default commonRoutes.concat(anytimeExamRoutes);
