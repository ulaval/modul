import { PluginObject } from 'vue';
import Component from 'vue-class-component';
import { Prop, Watch } from 'vue-property-decorator';
import { MFile } from '../../utils/file/file';
import uuid from '../../utils/uuid/uuid';
import { ModulVue } from '../../utils/vue/vue';
import { MButtonSkin } from '../button/button';
import { PHOTO_EDITOR_NAME } from '../component-names';
import { MIconButtonSkin } from '../icon-button/icon-button';
import { MModalSize } from '../modal/modal';
import CropImagePlugin, { MCropImage } from './crop-image/crop-image';
import ImageDisplayerPlugin from './image-displayer/image-displayer';
import WithRender from './photo-editor.html?style=./photo-editor.scss';

// Changer en MPhotoEditorSteps?
enum MPhotoEditorMode {
    SELECT = 'select',
    CROP = 'crop'
}

@WithRender
@Component
export class MPhotoEditor extends ModulVue {

    @Prop({ default: '' })
    urlPhoto: string;

    @Prop({ default: false })
    open: boolean;

    @Prop({ default: () => ['jpg', 'gif', 'png'] })
    allowedExtensions: string[];

    @Prop({ default: uuid.generate() })
    storeName: string;

    $refs: {
        cropImage: MCropImage
    };

    i18nTitleModal: string = this.$i18n.translate('m-photo-editor:title');
    i18nChoosePhoto: string = this.$i18n.translate('m-photo-editor:choose-photo');
    i18nSave: string = this.$i18n.translate('m-photo-editor:save');
    i18nCancel: string = this.$i18n.translate('m-photo-editor:cancel');
    i18nDelete: string = this.$i18n.translate('m-photo-editor:delete');

    modalSize: MModalSize = MModalSize.Small;
    skinDelete: MIconButtonSkin = MIconButtonSkin.Dark;
    primaryButton: MButtonSkin.Primary = MButtonSkin.Primary;
    secondaryButton: MButtonSkin.Secondary = MButtonSkin.Secondary;
    photoEditorMode: MPhotoEditorMode = MPhotoEditorMode.SELECT;
    imageToCrop: MFile = {} as MFile;

    @Watch('open', { immediate: true })
    initialize(): void {
        this.photoEditorMode = MPhotoEditorMode.SELECT;
    }

    replaceImage(): void {
        if (this.imageSelected) {
            this.imageToCrop = this.imageSelected;
            this.imageToCrop.url = URL.createObjectURL(this.imageSelected.file);
            this.photoEditorMode = MPhotoEditorMode.CROP;
        }
    }

    confirmImage(imageCropped: File): void {
        if (this.imageSelected) {
            const imageToSave: MFile = this.imageSelected;
            imageToSave.url = URL.createObjectURL(imageToSave.file);

            this.$emit('save-image', imageToSave);
        }
    }

    // createImage(imageCropped: File): void {
    //     const fileList: FileList = {} as FileList;
    //     fileList[0] = imageCropped;

    //     this.$file.add(fileList, this.storeName);

    //     if (this.imageSelected) {
    //         this.$file.upload(
    //             this.imageSelected.uid,
    //             { url: URL.createObjectURL(imageCropped) } as MFileUploadOptions,
    //             this.storeName);
    //     }
    // }

    deleteImage(): void {
        if (this.modeSelect) {
            this.$emit('delete');
        } else {
            this.initialize();
        }
    }

    cancel(): void {
        if (this.modeSelect) {
            this.close();
        } else {
            this.initialize();
        }
    }

    close(): void {
        this.$emit('update:open', false);
    }

    crop(): void {
        this.$refs.cropImage.crop();
    }

    get modeSelect(): boolean {
        return this.photoEditorMode === MPhotoEditorMode.SELECT;
    }

    get imageSelected(): MFile | undefined {
        const images: MFile[] = this.$file.files(this.storeName);
        return images.length > 0 ? images[images.length - 1] : undefined;
    }

}

const PhotoEditorPlugin: PluginObject<any> = {
    install(v, options): void {
        v.prototype.$log.debug(PHOTO_EDITOR_NAME, 'plugin.install');
        v.use(ImageDisplayerPlugin);
        v.use(CropImagePlugin);
        v.component(PHOTO_EDITOR_NAME, MPhotoEditor);
    }
};

export default PhotoEditorPlugin;
