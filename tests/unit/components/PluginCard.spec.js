import PluginCard from '@/components/PluginCard.vue'
import { mount } from '@vue/test-utils'

describe('PluginCard.vue', () => {
    let wrapper, vm
    beforeAll(async() => {
        wrapper = mount(PluginCard, {
            global: {
                plugins: []
            },
            props: {
                plugin: {
                    status: 'active'
                }
            },
            data() {
                return {
                    switch: true
                }
            },
            shallow: true
        })
        vm = wrapper.vm
    })

    test('Initialized well', () => {
        expect(wrapper).toBeTruthy()
    })

    test('[METHOD] updateSwitch', () => {
        expect(vm.switch).toEqual(true)
        vm.updateSwitch(false)
        expect(vm.switch).toEqual(false)
    })
})