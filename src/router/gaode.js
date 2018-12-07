import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const home = (resolve) => { // 首页
  import('@/components/gaode/home.vue').then((module) => {
    resolve(module);
  });
};
const gaodesdk = (resolve) => { // 高德sdk
  import('@/components/gaode/gaodesdk.vue').then((module) => {
    resolve(module);
  });
};
const sliders = (resolve) => { // 多个滑动slider
  import('@/components/slider/sliders.vue').then((module) => {
    resolve(module);
  });
};
const tripShare = (resolve) => { // tripShare
  import('@/components/gaode/tripShare.vue').then((module) => {
    resolve(module);
  });
};
const jsView = (resolve) => { // jsView
  import('@/components/gaode/jsView.vue').then((module) => {
    resolve(module);
  });
};

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/home',
      component: home,
    },
    {
      name: 'home',
      path: '/home',
      component: home,
    },
    {
      name: 'gaodesdk',
      path: '/gaodesdk',
      component: gaodesdk,
    },
    {
      name: 'sliders',
      path: '/sliders',
      component: sliders,
    },
    {
      name: 'tripShare',
      path: '/tripShare',
      component: tripShare,
    },
    {
      name: 'jsView',
      path: '/jsView',
      component: jsView,
    },
  ],
});
