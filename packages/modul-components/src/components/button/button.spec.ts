import { createLocalVue, mount, Wrapper } from '@vue/test-utils';
import Vue, { VueConstructor } from 'vue';
import { MButton } from './button';

describe('MButton', () => {
    let localVue: VueConstructor<Vue>;

    beforeEach(() => {
        localVue = createLocalVue();
    });

    it('should emit click event when clicked', () => {
        const btn: Wrapper<MButton> = mount(MButton, {
            localVue: localVue
        });

        btn.find('button').trigger('click');

        expect(btn.emitted('click')).toBeTruthy();
    });
});
