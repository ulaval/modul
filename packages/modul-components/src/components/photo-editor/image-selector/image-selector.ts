import { PluginObject } from 'vue';
import Component from 'vue-class-component';
import { Emit, Prop, Watch } from 'vue-property-decorator';
import { MFile, MFileStatus } from '../../../utils/file/file';
import uuid from '../../../utils/uuid/uuid';
import { ModulVue } from '../../../utils/vue/vue';
import { MAvatarSize } from '../../avatar/avatar';
import { MButtonSkin } from '../../button/button';
import { MModalSize } from '../../modal/modal';
import { IMAGE_SELECTOR_NAME } from '../component-names';
import WithRender from './image-selector.html?style=./image-selector.scss';

@WithRender
@Component
export class MImageSelector extends ModulVue {

    @Prop({ default: '' })
    urlPhoto: string;

    @Prop({ default: false })
    open: boolean;

    @Prop({ default: () => [] })
    allowedExtensions: string[];

    i18nTitleModal: string = this.$i18n.translate('m-photo-editor:title');
    i18nChoosePhoto: string = this.$i18n.translate('m-photo-editor:choose-photo');
    i18nCancel: string = this.$i18n.translate('m-photo-editor:cancel');
    i18nDelete: string = this.$i18n.translate('m-photo-editor:delete');

    modalSize: MModalSize = MModalSize.Small;
    avatarSize: MAvatarSize = MAvatarSize.LARGE;
    primaryButton: MButtonSkin.Primary = MButtonSkin.Primary;
    secondaryButton: MButtonSkin.Secondary = MButtonSkin.Secondary;
    storeName: string = '';
    test: string = '';

    @Watch('open', { immediate: true })
    manageStoreName(): void {
        if (this.open) {
            this.storeName = uuid.generate();
        } else {
            this.$file.clear(this.storeName);
        }
    }

    replaceImage(): void {
        const newImage: MFile | undefined = this.$file.files(this.storeName)[0];
        if (newImage) {
            const url: string = URL.createObjectURL(newImage.file);
            newImage.url = url;
            this.test = url;
            this.$emit('replace-image', newImage);
        }
    }

    @Emit('delete')
    deleteImage(): void { }

    cancel(): void {
        this.$emit('update:open', false);
    }

    get imageSelected(): MFile | undefined {
        const images: MFile[] = this.$file.files(this.storeName).filter((f: MFile) => f.status === MFileStatus.READY || f.status === MFileStatus.COMPLETED || f.status === MFileStatus.UPLOADING);
        return images.length > 0 ? images[images.length - 1] : undefined;
    }

}

const ImageSelectorPlugin: PluginObject<any> = {
    install(v, options): void {
        v.prototype.$log.debug(IMAGE_SELECTOR_NAME, 'plugin.install');
        v.component(IMAGE_SELECTOR_NAME, MImageSelector);
    }
};

export default ImageSelectorPlugin;
