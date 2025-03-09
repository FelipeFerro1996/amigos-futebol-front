import { type RouteLocationNormalized, type NavigationGuardNext, createRouter, createWebHistory } from 'vue-router';
import routes from './routes';
import { useAuth } from 'src/composables/useAuth';

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Middleware de autenticação
router.beforeEach((to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
  const { token } = useAuth();
  const isAuthenticated = !!token.value;

  // Impede usuários logados de acessarem a página de login
  if (to.meta.requiresGuest && isAuthenticated) {
    return next('/');
  }

  // Impede usuários não logados de acessarem páginas protegidas
  if (to.meta.requiresAuth && !isAuthenticated) {
    return next('/login');
  }

  next();
});

export default router;
