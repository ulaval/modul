import { createLocalVue, mount, Wrapper } from '@vue/test-utils';
import Vue, { VueConstructor } from 'vue';
import { createMockFile } from '../../../../tests/helpers/file';
import { MFile, MFileStatus } from '../../../utils/file/file';
import CropImagePlugin, { MCropImage } from './crop-image';

describe('MCropImage', () => {
    let localVue: VueConstructor<Vue>;

    const FILE_NAME: string = 'name.jpg';
    const image: MFile = {
        uid: 'id',
        extension: 'jpg',
        name: FILE_NAME,
        status: MFileStatus.READY,
        progress: 0,
        file: createMockFile(FILE_NAME),
        url: 'http://image.jpg'
    };

    beforeEach(() => {
        localVue = createLocalVue();
        localVue.use(CropImagePlugin);
    });

    describe(`when cropping`, () => {
        it('should emit image-cropped with the right image', async () => {
            const wrapper: Wrapper<MCropImage> = mount(MCropImage, {
                localVue: localVue,
                propsData: {
                    image
                }
            });
            let mockFile: File = createMockFile(FILE_NAME);

            wrapper.setMethods({ createImageFile: jest.fn().mockReturnValue(mockFile) });
            wrapper.vm.croppie!.result = jest.fn().mockResolvedValue(new Blob([new ArrayBuffer(1)]));
            wrapper.vm.crop();

            await wrapper.vm.$nextTick();

            expect(wrapper.emitted('image-cropped')[0]).toEqual([mockFile]);
        });
    });

});
