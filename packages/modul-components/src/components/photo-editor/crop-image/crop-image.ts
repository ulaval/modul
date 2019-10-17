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

@WithRender
@Component
export class MCropImage extends ModulVue {

    @Prop({ default: '' })
    urlImage: string;

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

    bind(): void {
        let el: HTMLElement = this.$refs.croppieContainer;
        this.croppie = new Croppie(el, {
            viewport: { width: MAvatarSize.LARGE, height: MAvatarSize.LARGE, type: 'circle' },
            boundary: { width: 300, height: 300 },
            enableOrientation: true
        });

        this.croppie.bind({
            url: this.urlImage
        });
    }

    click(): void {
        this.croppie.result({
            format: 'jpeg',
            type: 'blob'
        }).then((rep: MFile) => {
            this.$emit('upload', rep);
        });
    }

}

const CropImagePlugin: PluginObject<any> = {
    install(v, options): void {
        v.prototype.$log.debug(CROP_IMAGE_NAME, 'plugin.install');
        v.component(CROP_IMAGE_NAME, MCropImage);
    }
};

export default CropImagePlugin;
