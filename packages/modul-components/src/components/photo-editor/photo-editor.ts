import Component from 'vue-class-component';
import { Prop, Watch } from 'vue-property-decorator';
import { MFile } from '../../utils/file/file';
import { FormatMode } from '../../utils/i18n/i18n';
import uuid from '../../utils/uuid/uuid';
import { ModulVue } from '../../utils/vue/vue';
import { MButtonSkin } from '../button/button';
import { MIconButtonSkin } from '../icon-button/icon-button';
import { MMessage, MMessageState } from '../message/message';
import { MModalSize } from '../modal/modal';
import { MCropImage } from './crop-image/crop-image';
import { MImageDisplayer } from './image-displayer/image-displayer';
import WithRender from './photo-editor.html?style=./photo-editor.scss';

export enum MPhotoEditorMode {
    SELECT = 'select',
    CROP = 'crop'
}

@WithRender
@Component({
    components: {
        MMessage,
        MImageDisplayer,
        MCropImage
    }
})
export class MPhotoEditor extends ModulVue {

    @Prop({ default: '' })
    urlPhoto: string;

    @Prop({ default: false })
    open: boolean;

    @Prop({ default: () => ['jpg', 'gif', 'png'] })
    allowedExtensions: string[];

    @Prop({ default: uuid.generate() })
    storeName: string;

    @Prop({ default: false })
    savingInProgress: boolean;

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
    messageState: MMessageState = MMessageState.Error;
    imageToCrop: MFile = {} as MFile;

    @Watch('open', { immediate: true })
    initialize(): void {
        this.imageToCrop = {} as MFile;
        this.photoEditorMode = MPhotoEditorMode.SELECT;
    }

    replaceImage(): void {
        if (this.imageSelected && this.validFile) {
            this.imageToCrop = this.imageSelected;
            this.imageToCrop.url = URL.createObjectURL(this.imageSelected.file);
            this.photoEditorMode = MPhotoEditorMode.CROP;
        }
    }

    saveImage(imageCropped: File): void {
        this.$emit('save', imageCropped);
    }

    deleteImage(): void {
        if (this.selectMode) {
            this.$emit('delete');
        } else {
            this.initialize();
        }
    }

    cancel(): void {
        if (this.selectMode) {
            this.close();
        } else {
            this.initialize();
        }
    }

    close(): void {
        this.$emit('close');
    }

    crop(): void {
        this.$refs.cropImage.crop();
    }

    get showDeleteButton(): boolean {
        return !!this.urlPhoto || this.cropMode;
    }

    get selectMode(): boolean {
        return this.photoEditorMode === MPhotoEditorMode.SELECT;
    }

    get cropMode(): boolean {
        return this.photoEditorMode === MPhotoEditorMode.CROP;
    }

    get imageSelected(): MFile | undefined {
        const images: MFile[] = this.$file.files(this.storeName);
        return images.length > 0 ? images[images.length - 1] : undefined;
    }

    get validFile(): boolean {
        if (this.imageSelected) {
            return this.allowedExtensions.includes(this.imageSelected.extension);
        }
        return true;
    }

    get i18nFileError(): string {
        return this.$i18n.translate('m-photo-editor:error-file', { extensions: this.allowedExtensions.join(', ').toUpperCase() }, 1, undefined, undefined, FormatMode.Sprintf);
    }

}

