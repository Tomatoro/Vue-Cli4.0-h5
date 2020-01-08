// 随时考路由
export default [
  {
    path: '/anytime-exam',
    component: () => import(/* webpackChunkName: 'anytime-exam' */ '../../../views/anytime-exam'),
    children: [
      // 考试列表
      {
        name: 'anytime-exam-list',
        path: '',
        component: () => import(/* webpackChunkName: 'exam-list' */ '../../../views/anytime-exam/exam-list'),
        meta: {
          withoutLayout: true
        }
      },
      // 创建考试
      {
        name: 'anytime-exam-create',
        path: 'create',
        component: () => import(/* webpackChunkName: 'exam-create' */ '../../../views/anytime-exam/exam-create'),
        meta: {
          withoutLayout: true
        }
      },
      // 开始考试
      {
        props: true,
        name: 'anytime-exam-activate',
        path: 'activate/:id',
        component: () => import(/* webpackChunkName: 'exam-activate' */ '../../../views/anytime-exam/exam-activate'),
        meta: {
          withoutLayout: true
        }
      }
    ]
  }
];
