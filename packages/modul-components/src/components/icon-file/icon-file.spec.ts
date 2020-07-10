import { createLocalVue, mount, Wrapper } from '@vue/test-utils';
import Vue, { VueConstructor } from 'vue';
import IconFilePlugin, { MIconFile } from './icon-file';


describe('MIconFile', () => {
    let localVue: VueConstructor<Vue>;

    beforeEach(() => {
        localVue = createLocalVue();
        localVue.use(IconFilePlugin);
    });

    it('should emit click event when icon-file is clicked', () => {
        const iconFile: Wrapper<MIconFile> = mount(MIconFile, {
            localVue: localVue,
            propsData: {
                extension: 'pdf'
            }
        });

        iconFile.trigger('click');

        expect(iconFile.emitted('click')).toBeTruthy();
    });
});
