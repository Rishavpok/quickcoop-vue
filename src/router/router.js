import { createRouter, createWebHistory } from 'vue-router';
import dashboard from "@/pages/dashboard/components/Dashboard.vue";
import login from "@/pages/login/components/Login.vue";
import JatakForm from "@/jatak/components/JatakForm.vue";

const routes = [
    {
        path: '/dashboard',
        name: 'dashboard',
        component: dashboard,
        meta : { requiresAuth: true },
    },
    {
        path: '/login',
        name: 'login',
        component: () => import("@/pages/login/components/Login.vue"),
    },
    {
        path: '/ja-tak',
        name: 'ja-tak',
        component: () => import("@/jatak/components/JatakLayout.vue"),

        children: [
            {
                path: 'create',
                name: 'create',
                component : () => import("@/jatak/components/JatakCreate.vue")
            }
        ]
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})


router.beforeEach((to, from, next) => {
    const isLoggedIn = !!localStorage.getItem('auth_token') // your auth check

    if (to.meta.requiresAuth && !isLoggedIn) {
        next({ name: 'login' }) // redirect if not logged in
    } else {
        next() // proceed if logged in or route doesn't require auth
    }
})

export default router