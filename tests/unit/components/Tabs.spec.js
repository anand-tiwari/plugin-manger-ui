import PluginCards from '@/components/PluginCards.vue'
import TabsPage from '@/pages/TabsPage.vue'
import Tabs from '@/components/Tabs.vue'
import { mount } from '@vue/test-utils'
import { createStore } from 'vuex'
import { createRouter, createWebHistory } from 'vue-router'
import { nextTick } from 'vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [{
        path: '/',
        component: TabsPage,
        children: [{
            path: ':id',
            component: PluginCards
        }]
    }]
})

const plugin = {
    namespaced: true,
    state: {
        pluginsResponse: {
            tabs: ['tab1', 'tab2'],
            tabdata: {
                tab1: {
                    "title": "Marketing",
                    "icon": "icon-marketing",
                    "active": ["plugin1"],
                    "disabled": ["plugin3"],
                    "inactive": ["plugin5", "plugin6"]
                },
                tab2: {
                    "title": "Finance",
                    "icon": "icon-finance",
                    "active": ["plugin1"],
                    "disabled": ["plugin9"],
                    "inactive": ["plugin10"]
                },
            }
        }
    },
    mutations: {},
    actions: {},
    getters: {
        tabs: state => state.pluginsResponse.tabs,
        tabdata: state => state.pluginsResponse.tabdata
    }
}

const store = createStore({
    state: {},
    mutations: {},
    actions: {},
    modules: {
        plugin
    }
})

describe('PluginCards.vue', () => {
    let wrapper, vm
    beforeAll(async() => {
        router.push('/tab1')
        await router.isReady()
        wrapper = mount(Tabs, {
            global: {
                plugins: [store, router]
            },
            propsData: {
                selectedTab: 'tab1'
            },
            shallow: true
        })
        vm = wrapper.vm
    })

    test('PluginCards Initialized well', () => {
        expect(wrapper).toBeTruthy()
    })


    test('[METHOD] getIcon', () => {
        expect(vm.getIcon('tab1')).toEqual('icon-marketing')
        expect(vm.getIcon('tab2')).toEqual('icon-finance')
    })

    test('[METHOD] getTabLevel', () => {
        expect(vm.getTabLevel('tab1')).toEqual('Marketing')
        expect(vm.getTabLevel('tab2')).toEqual('Finance')
    })

    test('[METHOD] tabClick', async() => {
        vm.tabClick('tab1')
        await nextTick()
        expect(vm.$route.params.id).toEqual('tab1')
    })
})