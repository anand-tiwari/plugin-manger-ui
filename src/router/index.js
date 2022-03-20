import { createRouter, createWebHistory } from 'vue-router'
import TabsPage from '@/pages/TabsPage.vue'
import PluginCards from '@/components/PluginCards.vue'

const routes = [{
    path: '/',
    name: 'TabsPage',
    component: TabsPage,
    children: [{
        path: ':id',
        component: PluginCards
    }]
}]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router