import SwitchButton from '@/components/SwitchButton'
export default {
    name: 'PluginCard',
    props: {
        plugin: {
            default: {}
        }
    },
    components: { SwitchButton },
    data() {
        return {
            switch: this.plugin.status === 'active'
        }
    },
    methods: {
        updateSwitch(val) {
            this.switch = val;
            this.updateStatus();
        },
        updateStatus() {
            this.$emit('updatePluginStatus', {
                pluginId: this.plugin.id,
                status: this.plugin.status === 'active' ? 'inactive' : 'active'
            })
        }
    }
}