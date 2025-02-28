import type { RouteRecordRaw } from 'vue-router';
import HomePage from 'src/pages/HomePage.vue';
import MainLayout from 'layouts/MainLayout.vue';
import ListaJogadoresPage from 'src/pages/ListaJogadoresPage.vue';

const routes: RouteRecordRaw[] = [
  {
    name:'Home',
    path: '/',
    component: MainLayout,
    meta: { icon: 'home', caption: 'Página inicial' },
    children: [
      { path: '', component: HomePage },
    ],
  },
  {
    name:'Jogadores',
    path: '/jogadores',
    component: MainLayout,
    meta: { icon: 'person', caption: 'Lista de jogadores' },
    children: [
      { path: '', component: ListaJogadoresPage },
    ],
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
