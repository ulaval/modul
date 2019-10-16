import Croppie from 'croppie';
import { PluginObject } from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import { MFile } from '../../../utils/file/file';
import { ModulVue } from '../../../utils/vue/vue';
import { CROP_IMAGE_NAME } from '../../component-names';
import WithRender from './crop-image.html?style=./crop-image.scss';

require('croppie/croppie.css');

@WithRender
@Component
export class MCropImage extends ModulVue {

    @Prop({ default: '' })
    urlImage: string;

    croppie: Croppie = undefined;

    $refs: {
        croppieContainer: HTMLElement;
    };

    mounted(): void {
        let el: any = this.$refs.croppieContainer as any;
        this.croppie = new Croppie(el, {
            viewport: { width: 100, height: 100 },
            boundary: { width: 300, height: 300 },
            enableOrientation: true
        });

        this.bind();
    }

    bind(): void {
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
