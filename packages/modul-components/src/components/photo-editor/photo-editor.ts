import { PluginObject } from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import { MFile } from '../../utils/file/file';
import { ModulVue } from '../../utils/vue/vue';
import { PHOTO_EDITOR_NAME } from '../component-names';
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

    created(): void {
        this.selectImageOpen = this.open;
    }

    // on open => ouvrir image-selector

    enableCrop(image: MFile): void {
        this.imageToCrop = image;
        this.cropImageOpen = true;
        this.selectImageOpen = false;
    }

    saveImage(imageFile: File): void {
        this.imageToCrop.file = imageFile;
        this.imageToCrop.url = URL.createObjectURL(this.imageToCrop.file);
        this.$emit('save-image', this.imageToCrop);
    }

    cancelCrop(): void {
        this.imageToCrop = {} as MFile;
        this.selectImageOpen = true;
        this.cropImageOpen = false;
    }

    get readyToCrop(): boolean {
        return !!this.imageToCrop.url;
    }

}

const PhotoEditorPlugin: PluginObject<any> = {
    install(v, options): void {
        v.prototype.$log.debug(PHOTO_EDITOR_NAME, 'plugin.install');
        v.component(PHOTO_EDITOR_NAME, MPhotoEditor);
    }
};

export default PhotoEditorPlugin;
