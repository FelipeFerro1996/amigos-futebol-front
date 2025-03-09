import type { RouteRecordRaw } from 'vue-router';
import MainLayout from 'layouts/MainLayout.vue';
import HomePage from 'src/pages/HomePage.vue';
import ListaJogadoresPage from 'src/pages/ListaJogadoresPage.vue';
import LoginPage from 'src/pages/LoginPage.vue';
import ErrorNotFound from 'pages/ErrorNotFound.vue';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: MainLayout,
    children: [
      {
        path: '',
        name: 'Home',
        component: HomePage,
        meta: { icon: 'home', caption: 'Página inicial', requiresAuth: true },
      },
      {
        path: 'jogadores',
        name: 'Jogadores',
        component: ListaJogadoresPage,
        meta: { icon: 'person', caption: 'Lista de jogadores', requiresAuth: true },
      },
    ],
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginPage,
    meta: { requiresGuest: true }, // Apenas para visitantes (impede usuários logados)
  },
  {
    path: '/:catchAll(.*)*',
    component: ErrorNotFound,
  },
];

export default routes;
