import Croppie from 'croppie';
import { PluginObject } from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import { MFile } from '../../../utils/file/file';
import { ModulVue } from '../../../utils/vue/vue';
import { MAvatarSize } from '../../avatar/avatar';
import { MButtonSkin } from '../../button/button';
import { MModalSize } from '../../modal/modal';
import { CROP_IMAGE_NAME } from '../component-names';
import WithRender from './crop-image.html?style=./crop-image.scss';

require('croppie/croppie.css');

enum MResultFormat {
    PNG = 'png',
    JPG = 'jpeg'
}

@WithRender
@Component
export class MCropImage extends ModulVue {

    @Prop({ required: true })
    image: MFile;

    @Prop({ default: false })
    open: boolean;

    i18nTitleModal: string = this.$i18n.translate('m-photo-editor:title');
    i18nCancel: string = this.$i18n.translate('m-photo-editor:cancel');
    i18nSave: string = this.$i18n.translate('m-photo-editor:save');

    croppie: Croppie = undefined;
    primaryButton: MButtonSkin.Primary = MButtonSkin.Primary;
    secondaryButton: MButtonSkin.Secondary = MButtonSkin.Secondary;
    modalSize: MModalSize = MModalSize.Small;

    $refs: {
        croppieContainer: HTMLElement;
    };

    // gérer annuler

    initialize(): void {
        if (this.image.url) {
            let el: HTMLElement = this.$refs.croppieContainer;
            this.croppie = new Croppie(el, {
                viewport: { width: MAvatarSize.LARGE, height: MAvatarSize.LARGE, type: 'circle' },
                boundary: { width: 300, height: 300 },
                enableOrientation: true
            });

            this.bind();
        }
    }

    bind(): void {
        this.croppie.bind({
            url: this.image.url
        });
    }

    crop(): void {
        this.croppie.result({
            format: this.imageWithTransparency ? MResultFormat.PNG : MResultFormat.JPG,
            type: 'blob',
            circle: false
        }).then((imageCropped: File) => {
            this.$emit('image-cropped', imageCropped);
        });
    }

    get imageWithTransparency(): boolean {
        return this.image.extension === 'png' || this.image.extension === 'gif';
    }

}

const CropImagePlugin: PluginObject<any> = {
    install(v, options): void {
        v.prototype.$log.debug(CROP_IMAGE_NAME, 'plugin.install');
        v.component(CROP_IMAGE_NAME, MCropImage);
    }
};

export default CropImagePlugin;
