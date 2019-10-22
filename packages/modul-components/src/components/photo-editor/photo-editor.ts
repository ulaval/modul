import { PluginObject } from 'vue';
import Component from 'vue-class-component';
import { Prop, Watch } from 'vue-property-decorator';
import { MFile } from '../../utils/file/file';
import { ModulVue } from '../../utils/vue/vue';
import { PHOTO_EDITOR_NAME } from '../component-names';
import CropImagePlugin from './crop-image/crop-image';
import ImageSelectorPlugin from './image-selector/image-selector';
import WithRender from './photo-editor.html?style=./photo-editor.scss';

@WithRender
@Component
export class MPhotoEditor extends ModulVue {

    @Prop({ default: '' })
    urlPhoto: string;

    @Prop({ default: false })
    open: boolean;

    @Prop({ default: () => ['jpg', 'gif', 'png'] })
    allowedExtensions: string[];

    imageToCrop: MFile = {} as MFile;
    cropImageOpen: boolean = false;
    selectImageOpen: boolean = false;

    @Watch('open', { immediate: true })
    initialize(): void {
        if (this.open) {
            this.selectImageOpen = true;
        } else {
            this.selectImageOpen = false;
        }

        this.imageToCrop = {} as MFile;
        this.cropImageOpen = false;
    }

    enableCrop(image: MFile): void {
        this.imageToCrop = image;
        this.cropImageOpen = true;
        this.selectImageOpen = false;
    }

    saveImage(imageFile: File): void {
        this.imageToCrop.file = imageFile;
        this.imageToCrop.url = URL.createObjectURL(this.imageToCrop.file);
        this.$emit('save-image', this.imageToCrop);
        this.close();
    }

    close(): void {
        this.cropImageOpen = false;
        this.selectImageOpen = false;
        this.$emit('update:open', false);
    }

    get readyToCrop(): boolean {
        return !!this.imageToCrop.url;
    }

}

const PhotoEditorPlugin: PluginObject<any> = {
    install(v, options): void {
        v.prototype.$log.debug(PHOTO_EDITOR_NAME, 'plugin.install');
        v.use(ImageSelectorPlugin);
        v.use(CropImagePlugin);
        v.component(PHOTO_EDITOR_NAME, MPhotoEditor);
    }
};

export default PhotoEditorPlugin;
