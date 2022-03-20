import Tabs from '@/components/Tabs'
import SwitchButton from '@/components/SwitchButton'
import { mapActions, mapGetters } from 'vuex'
import Spinner from '@/components/Spinner'

export default {
    name: 'TagsPage',
    components: { Tabs, SwitchButton, Spinner },
    data() {
        return {
            isAllPluginEnable: true,
            selectedTab: ""
        }
    },
    computed: {
        ...mapGetters('plugin', ['pluginsResponse', 'isLoading', 'tabdata']),
        pluginHeading() {
            return this.tabdata[this.selectedTab] && this.tabdata[this.selectedTab].title + ' Plugins'
        }
    },
    created() {
        this.fetchData()
    },
    methods: {
        ...mapActions('plugin', ['updatePlugins', 'updateSelectedTabPluign', 'fetchPlugin', 'postPlugins']),
        fetchData() {
            this.fetchPlugin({
                success: (selectedTab) => {
                    this.selectedTab = selectedTab;
                    this.$router.push(`/${selectedTab}`)
                }
            })
        },
        selectTab(selectedTab) {
            this.selectedTab = selectedTab
            this.updateSelectedTabPluign({ selectedTab: this.selectedTab })
        },
        toggleAllPluginEnableBtn(isAllPluginEnable) {
            const tabs = this.pluginsResponse.tabs;
            const tabdata = this.pluginsResponse.tabdata;
            this.isAllPluginEnable = isAllPluginEnable;
            if (isAllPluginEnable === false) {
                tabs.forEach((key, value) => {
                    tabdata[key]['disabled'] = [...(tabdata[key]['active']), ...(tabdata[key]['inactive']), ...(tabdata[key]['disabled'])]
                })
            } else {
                tabs.forEach((key, value) => {
                    const exceptDisabled = [...(tabdata[key]['active']), ...(tabdata[key]['inactive'])]
                    tabdata[key]['disabled'] = tabdata[key]['disabled'].filter(pluginId => !exceptDisabled.some(rm => pluginId == rm))
                })
            }

            const res = {...this.pluginsResponse, tabs, tabdata }
            this.updatePlugins({
                data: res,
                selectedTab: this.selectedTab
            })
            this.postPlugins({ data: res })
        }
    }
}