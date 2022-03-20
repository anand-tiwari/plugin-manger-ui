import pluginApi from '@/api/plugins'

const state = () => ({
    pluginsResponse: {},
    filteredPlugin: {},
    isLoading: false
})

export const mutations = {
    setLoading(state, val) {
        state.isLoading = val
    },
    updatePlugins(state, val) {
        state.pluginsResponse = Object.assign({}, val)
    },
    updateFilteredPlugin(state, { plugins, selectedTab }) {
        state.filteredPlugin[selectedTab] = plugins
    }
}

const getFilteredPluginOnSelectedTab = (data, tabData) => {
    const foundPlugins = []
    Object.entries(data.plugins).forEach((obj) => {
        const key = obj[0];
        const value = {...obj[1] };
        let found = false
        value.id = key
        if (tabData.active.indexOf(key) > -1) {
            value.status = 'active'
            found = true
        } else if (tabData.inactive.indexOf(key) > -1) {
            value.status = 'inactive'
            found = true
        }
        if (tabData.disabled.indexOf(key) > -1) {
            value.disabled = 'disabled'
            found = true
        }
        if (found) foundPlugins.push(value)
    })
    return foundPlugins;
}


const actions = {
    fetchPlugin({ commit, dispatch }, { success, fail }) {
        commit('setLoading', true)
        pluginApi.getPlugins().then(response => {
            commit('setLoading', false)
            const selectedTab = response.data.data.tabs[0]
            dispatch('updatePlugins', { data: response.data.data, selectedTab: selectedTab })
            success && success(selectedTab)
        }).catch(res => commit('setLoading', false))
    },
    postPlugins({ commit }, { data }) {
        pluginApi.postPlugins(data)
    },
    updatePlugins({ commit }, { data, selectedTab, success, fail }) {
        commit('updatePlugins', data)
        const tabData = data.tabdata[selectedTab]
        const foundPlugins = getFilteredPluginOnSelectedTab(data, tabData)
        commit('updateFilteredPlugin', { plugins: foundPlugins, selectedTab })
    },
    updateSelectedTabPluign({ commit, getters }, { selectedTab }) {
        const data = getters.pluginsResponse
        const foundPlugins = getFilteredPluginOnSelectedTab(data, data.tabdata[selectedTab])
        commit('updateFilteredPlugin', { plugins: foundPlugins, selectedTab })
    },
    setLoading({ commit }, data) {
        commit('setLoading', data)
    }
}

const getters = {
    pluginsResponse: state => state.pluginsResponse,
    plugins: state => state.filteredPlugin,
    isLoading: state => state.isLoading,
    tabs: state => state.pluginsResponse.tabs,
    tabdata: state => state.pluginsResponse.tabdata
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}