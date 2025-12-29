import { createRouter, createWebHistory } from 'vue-router';
import dashboard from "@/pages/dashboard/components/Dashboard.vue";
import login from "@/pages/login/components/Login.vue";
import JatakForm from "@/jatak/components/JatakForm.vue";

const routes = [
    {
        path: '/',
        redirect: '/dashboard',
    },
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
        meta: { requiresAuth: true },
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
    const token = localStorage.getItem('auth_token')

    const isLoggedIn =
        token && token !== 'null' && token !== 'undefined'

    const needsAuth = to.matched.some(r => r.meta.requiresAuth)

    // 🚫 If already logged in and trying to go to login → redirect
    if (to.name === 'login' && isLoggedIn) {
        next({ name: 'dashboard' })
        return
    }

    // 🔒 If route needs auth and user isn't logged in → redirect to login
    if (needsAuth && !isLoggedIn) {
        next({ name: 'login' })
        return
    }

    next()
})

export default router