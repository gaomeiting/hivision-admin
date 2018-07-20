import Vue from 'vue'
import store from '../store'
import Router from 'vue-router'
const Singer = resolve => require(['@/components/singer/singer'], resolve);
const SingerDetail = resolve => require(['@/components/singer-detail/singer-detail'], resolve);

Vue.use(Router)


const routes = [

    {
        path: '/',
        redirect: '/singer'
    }, {
        path: '/singer',
        component: Singer
    },

    {
        path: '/singer',
        component: Singer,
        meta: {
            requireAuth: true,
        }
    }, {
        path: '/singer/:id',
        component: SingerDetail
    }

]

const router = new Router({
    routes: routes
})


export default router