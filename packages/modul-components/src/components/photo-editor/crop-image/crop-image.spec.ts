import { createLocalVue, mount, Wrapper } from '@vue/test-utils';
import Vue, { VueConstructor } from 'vue';
import { createMockFile } from '../../../../tests/helpers/file';
import { MFile, MFileStatus } from '../../../utils/file/file';
import { MCropImage } from './crop-image';

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
    });

    describe(`when cropping`, () => {
        it('should emit image-cropped with the right image', () => {
            const wrapper: Wrapper<MCropImage> = mount(MCropImage, {
                localVue: localVue,
                propsData: {
                    image
                }
            });
            let mockFile: File = createMockFile(FILE_NAME);

            wrapper.vm.emitImageCropped(mockFile);

            expect(wrapper.emitted('image-cropped')[0]).toEqual([mockFile]);
        });
    });

});
