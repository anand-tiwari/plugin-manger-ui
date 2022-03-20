import PluginCards from '@/components/PluginCards.vue'
import TabsPage from '@/pages/TabsPage.vue'
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
        plugins: {
            tab1: [{
                description: "Enim cillum tempor veniam do laboris excepteur laborum fugiat aute magna cillum.",
                id: "plugin1",
                status: "active",
                title: "Plugin 1",
            }],
            tab2: [{
                description: "Enim cillum tempor veniam do laboris excepteur laborum fugiat aute magna cillum.",
                id: "plugin1",
                status: "active",
                title: "Plugin 1",
            }]
        },
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
    actions: {
        updatePlugins: jest.fn(),
        postPlugins: jest.fn()
    },
    getters: {
        plugins: state => state.plugins,
        pluginsResponse: state => state.pluginsResponse
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

    const updatePluginsSpy = jest.spyOn(plugin.actions, 'updatePlugins')
    const postPluginsSpy = jest.spyOn(plugin.actions, 'postPlugins')

    beforeAll(async() => {
        router.push('/tab1')
        await router.isReady()
        wrapper = mount(PluginCards, {
            global: {
                plugins: [store, router]
            },
            data() {
                return {

                }
            },
            shallow: true
        })
        vm = wrapper.vm
    })

    test('PluginCards Initialized well', () => {
        expect(wrapper).toBeTruthy()
    })


    test('[METHOD] updatePluginStatus', () => {
        vm.updatePluginStatus({ pluginId: 'plugin1', status: 'active' })
        expect(updatePluginsSpy).toHaveBeenCalled()
        expect(postPluginsSpy).toHaveBeenCalled()
    })

    test('[COMPUTED] selectedTab', async() => {
        expect(vm.selectedTab).toEqual('tab1')
        await router.push('/tab2')
        await nextTick()
        expect(vm.selectedTab).toEqual('tab2')
    })
})