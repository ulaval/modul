import { createLocalVue, mount, RefSelector, Wrapper } from '@vue/test-utils';
import Vue, { VueConstructor } from 'vue';
import { createMockFile } from '../../../tests/helpers/file';
import { addMessages } from '../../../tests/helpers/lang';
import FilePlugin from '../../utils/file/file';
import { BUTTON_NAME, FILE_SELECT_NAME, ICON_BUTTON_NAME, MODAL_NAME } from '../component-names';
import { CROP_IMAGE_NAME } from './component-names';
import { MPhotoEditor, MPhotoEditorMode } from './photo-editor';

const REF_MODAL: RefSelector = { ref: 'modal' };
const REF_DELETE_BUTTON: RefSelector = { ref: 'deleteButton' };
const REF_CROP_IMAGE: RefSelector = { ref: 'cropImage' };
const REF_CANCEL_BUTTON: RefSelector = { ref: 'cancelButton' };
const REF_FILE_SELECT: RefSelector = { ref: 'fileSelect' };
const REF_CROP_BUTTON: RefSelector = { ref: 'cropButton' };

const getStubs: any = () => {
    return {
        [BUTTON_NAME]: '<a></a>',
        [CROP_IMAGE_NAME]: '<div></div>',
        [FILE_SELECT_NAME]: '<div></div>',
        [ICON_BUTTON_NAME]: '<a></a>',
        [MODAL_NAME]: '<div><slot /><slot name="footer"></slot></div>'
    };
};

describe('MCropImage', () => {
    let localVue: VueConstructor<Vue>;
    let wrapper: Wrapper<MPhotoEditor>;

    beforeEach(() => {
        localVue = createLocalVue();
        localVue.use(FilePlugin);
        addMessages(localVue, ['components/photo-editor/photo-editor.lang.en.json']);

        wrapper = mount(MPhotoEditor, {
            localVue,
            stubs: getStubs()
        });

        wrapper.vm.$file.files = jest.fn().mockReturnValue([]);
    });

    describe(`when closing the modal`, () => {
        it('should manage event "close"', async () => {
            wrapper.setMethods({ close: jest.fn() });

            wrapper.find(REF_MODAL).vm.$emit('close');

            expect(wrapper.vm.close).toHaveBeenCalledWith();
        });

        it('should emit close', () => {
            wrapper.vm.close();

            expect(wrapper.emitted('close')).toBeDefined();
        });

    });

    describe(`when deleting`, () => {
        it('should manage event "deleteImage"', async () => {
            wrapper.setProps({ urlPhoto: 'url' });
            wrapper.setMethods({ deleteImage: jest.fn() });

            wrapper.find(REF_DELETE_BUTTON).vm.$emit('click');

            expect(wrapper.vm.deleteImage).toHaveBeenCalledWith();
        });

        describe(`while in selection mode`, () => {
            it('should emit delete', () => {
                wrapper.vm.deleteImage();

                expect(wrapper.emitted('delete')).toBeDefined();
            });
        });

        describe(`while in crop mode`, () => {
            it('should not  emit delete', () => {
                wrapper.vm.photoEditorMode = MPhotoEditorMode.CROP;

                wrapper.vm.deleteImage();

                expect(wrapper.emitted('delete')).toBeUndefined();
            });
        });

    });

    describe(`when cropping`, () => {

        beforeEach(() => {
            wrapper.vm.photoEditorMode = MPhotoEditorMode.CROP;
        });

        it('should manage the event "image-cropped"', async () => {
            wrapper.setMethods({ saveImage: jest.fn() });

            wrapper.find(REF_CROP_IMAGE).vm.$emit('image-cropped');

            expect(wrapper.vm.saveImage).toHaveBeenCalledWith();
        });

        it(`should emit "save" with the image cropped`, () => {
            const mockFile: File = createMockFile('test.jpg');

            wrapper.vm.saveImage(mockFile);

            expect(wrapper.emitted('save')[0]).toEqual([mockFile]);
        });

        it('should manage the click event', async () => {
            wrapper.vm.photoEditorMode = MPhotoEditorMode.CROP;
            wrapper.setMethods({ crop: jest.fn() });

            wrapper.find(REF_CROP_BUTTON).vm.$emit('click');

            expect(wrapper.vm.crop).toHaveBeenCalledWith();
        });

    });

    describe(`when canceling`, () => {

        it('should manage the event "click" to cancel', async () => {
            wrapper.setMethods({ cancel: jest.fn() });

            wrapper.find(REF_CANCEL_BUTTON).vm.$emit('click');

            expect(wrapper.vm.cancel).toHaveBeenCalledWith();
        });

        describe(`while selecting a new image`, () => {
            it('should close', () => {
                wrapper.vm.cancel();

                expect(wrapper.emitted('close')).toBeDefined();
            });
        });

        describe(`while cropping`, () => {
            it('should not close', () => {
                wrapper.vm.photoEditorMode = MPhotoEditorMode.CROP;

                wrapper.vm.cancel();

                expect(wrapper.emitted('update:open')).toBeUndefined();
            });
        });

    });

    describe(`when selecting a file`, () => {
        it('should manage the event "file-selected"', async () => {
            wrapper.setMethods({ replaceImage: jest.fn() });

            wrapper.find(REF_FILE_SELECT).vm.$emit('file-selected');

            expect(wrapper.vm.replaceImage).toHaveBeenCalledWith();
        });
    });

});
