export default {
    name: 'SwitchButton',
    emit: ['onUpdate:modelValue'],
    props: {
        modelValue: {
            type: Boolean,
            required: true
        }
    },
    computed: {
        backgroundStyles() {
            return {
                'success-green': this.modelValue,
                'disabled-red': !this.modelValue
            };
        },
        indicatorStyles() {
            return { transform: this.modelValue ? 'translateX(14px)' : 'translateX(0)' };
        }
    },
    methods: {
        toggle() {
            this.$emit('update:modelValue', !this.modelValue)
        }
    }
}