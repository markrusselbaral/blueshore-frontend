import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/album/HomeView.vue'
import LoginView from '../views/authentication/LoginView.vue'
import RegistrationView from '../views/authentication/RegistrationView.vue'
import AdminView from '../views/admin/AdminView.vue'
import useAuth from '@/composables/useAuth';

const { checkAuth, isLoading, error } = useAuth();

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { requiresAuth: true },
    },
    {
      path: '/create',
      name: 'create',
      component: RegistrationView,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/admin',
      name: 'register',
      component: AdminView,
    },
  ],
})


router.beforeEach(async (to, from, next) => {
  try {
    // Check if the route requires authentication
    if (to.matched.some((record) => record.meta.requiresAuth)) {
      const isAuthenticated = await checkAuth(); // Await authentication check
      if (!isAuthenticated) {
        return next({ name: "login" }); // Redirect if not authenticated
      }
    }
    next(); // Proceed to the requested route
  } catch (error) {
    console.error("Error during authentication check:", error);
    next({ name: "login" }); // Redirect to login on error
  }
});


export default router
