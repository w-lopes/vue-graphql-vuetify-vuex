import Vue from 'vue';
import VueRouter from 'vue-router';
import MainPage from '@/components/pages/MainPage';
import ProjectsPage from '@/components/pages/ProjectsPage';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'MainPage',
    component: MainPage
  },
  {
    path: '/projects',
    name: 'ProjectsPage',
    component: ProjectsPage
  },
];

const router = new VueRouter({
  mode: 'history',
  routes
});

export default router;
