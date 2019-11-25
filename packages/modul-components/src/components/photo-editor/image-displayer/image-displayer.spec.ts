import { createLocalVue, mount, RefSelector, Wrapper } from '@vue/test-utils';
import Vue, { VueConstructor } from 'vue';
import { addMessages } from '../../../../tests/helpers/lang';
import FilePlugin from '../../../utils/file/file';
import { AVATAR_NAME, ICON_BUTTON_NAME } from '../../component-names';
import { MImageDisplayer } from './image-displayer';

const REF_DELETE_BUTTON: RefSelector = { ref: 'deleteButton' };


const getStubs: any = () => {
    return {
        [AVATAR_NAME]: '<div></div>',
        [ICON_BUTTON_NAME]: '<a></a>'
    };
};

describe('MImageDisplayer', () => {
    let localVue: VueConstructor<Vue>;
    let wrapper: Wrapper<MImageDisplayer>;

    beforeEach(() => {
        localVue = createLocalVue();
        localVue.use(FilePlugin);
        addMessages(localVue, ['components/photo-editor/photo-editor.lang.en.json']);

        wrapper = mount(MImageDisplayer, {
            localVue,
            stubs: getStubs(),
            propsData: {
                urlPhoto: 'url.com'
            }
        });
    });

    describe(`when canceling`, () => {

        it('should manage the event "click" to delete the image', async () => {
            wrapper.setMethods({ deleteImage: jest.fn() });

            wrapper.find(REF_DELETE_BUTTON).vm.$emit('click');

            expect(wrapper.vm.deleteImage).toHaveBeenCalledWith();
        });

        it(`should emit delete-image`, () => {
            wrapper.vm.deleteImage();

            expect(wrapper.emitted('delete-image')).toBeDefined();
        });

    });
});
