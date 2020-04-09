import { shallowMount } from '@vue/test-utils'
import modal from '../../src/components/modal.vue'

describe('Modal.vue', () => {
  it('', () => {
    const wrapper = shallowMount(modal, {
      propsData: {
        open: false
      }
    })

    expect(wrapper.vm.$refs.modalDialog).toBe(undefined);
  })
})
