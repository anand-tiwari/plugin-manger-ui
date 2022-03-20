import PluginCard from '@/components/PluginCard'
import { mapActions, mapGetters } from 'vuex'

export default {
    name: 'PluginCards',
    components: { PluginCard },
    computed: {
        ...mapGetters('plugin', ['plugins', 'pluginsResponse']),
        selectedTab() {
            return this.$route.params.id
        },
        filteredPluginTab() {
            return this.plugins[this.selectedTab] || []
        }
    },
    methods: {
        ...mapActions('plugin', ['updatePlugins', 'postPlugins']),
        updatePluginStatus({ pluginid, status }) {
            const respones = {...this.pluginsResponse }
            if (status === 'active') {
                respones.tabdata[this.selectedTab].inactive = respones.tabdata[this.selectedTab].inactive.filter(e => e !== pluginid)
                respones.tabdata[this.selectedTab].active = [...(respones.tabdata[this.selectedTab].active), pluginid]
            } else {
                respones.tabdata[this.selectedTab].active = respones.tabdata[this.selectedTab].active.filter(e => e !== pluginid)
                respones.tabdata[this.selectedTab].inactive = [...(respones.tabdata[this.selectedTab].inactive), pluginid]
            }
            this.updatePlugins({
                data: respones,
                selectedTab: this.selectedTab
            })
            this.postPlugins({ data: respones })
        }
    }
}