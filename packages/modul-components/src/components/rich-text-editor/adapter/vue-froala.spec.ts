import { mount, Wrapper } from '@vue/test-utils';
import { VueFroala } from './vue-froala';


let wrapper: Wrapper<VueFroala>;
let froala: any;

describe('VueFroala', () => {
    beforeEach(() => {
        wrapper = mount(VueFroala);
        froala = wrapper.vm;
    });

    it('should be empty', () => {
        expect(froala.isEmpty).toBeTruthy();
    });
});
