import { mapActions, mapGetters } from 'vuex'
export default {
    name: 'Tabs',
    props: ['selectedTab'],
    computed: {
        ...mapGetters('plugin', ['tabs', 'tabdata'])
    },
    methods: {
        getIcon(tab) {
            return this.tabdata[tab].icon
        },
        getTabLevel(tab) {
            return this.tabdata[tab].title
        },
        tabClick(tab) {
            this.$router.push(`/${tab}`)
            this.$emit('selectTab', tab)
        }
    }
}