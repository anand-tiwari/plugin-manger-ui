import Tabs from '@/components/Tabs'
import SwitchButton from '@/components/SwitchButton'
import { mapActions, mapGetters } from 'vuex'
import Spinner from '@/components/Spinner'

export default {
    name: 'TagsPage',
    components: { Tabs, SwitchButton, Spinner },
    data() {
        return {
            isAllPluginEnabled: true,
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
                success: (selectedTab, isAllPluginEnabled) => {
                    this.selectedTab = selectedTab;
                    this.isAllPluginEnabled = isAllPluginEnabled;
                    this.$router.push(`/${selectedTab}`)
                }
            })
        },
        selectTab(selectedTab) {
            this.selectedTab = selectedTab
            this.updateSelectedTabPluign({ selectedTab: this.selectedTab })
        },
        toggleAllPluginEnableBtn(allPluginStatus) {
            const tabs = this.pluginsResponse.tabs;
            const tabdata = this.pluginsResponse.tabdata;
            this.isAllPluginEnabled = allPluginStatus;
            if (allPluginStatus === false) {
                tabs.forEach((key, value) => {
                    tabdata[key]['disabled'] = [...(tabdata[key]['active']), ...(tabdata[key]['inactive']), ...(tabdata[key]['disabled'])]
                })
            } else {
                tabs.forEach((key, value) => {
                    const exceptDisabled = [...(tabdata[key]['active']), ...(tabdata[key]['inactive'])]
                    tabdata[key]['disabled'] = tabdata[key]['disabled'].filter(pluginId => !exceptDisabled.some(rm => pluginId == rm))
                })
            }

            const res = {...this.pluginsResponse, tabs, tabdata, isAllPluginEnabled: this.isAllPluginEnabled }
            this.updatePlugins({
                data: res,
                selectedTab: this.selectedTab
            })
            this.postPlugins({ data: res })
        }
    }
}