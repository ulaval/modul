import Croppie from 'croppie';
import 'croppie/croppie.css';
import { PluginObject } from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import { MFile } from '../../../utils/file/file';
import { ModulVue } from '../../../utils/vue/vue';
import { MAvatarSize } from '../../avatar/avatar';
import { CROP_IMAGE_NAME } from '../component-names';
import WithRender from './crop-image.html?style=./crop-image.scss';

enum MExportFormat {
    PNG = 'png',
    JPG = 'jpeg'
}

interface MCropImageViewport {
    width: number;
    height: number;
    type: string;
}

interface MCropImageBoundary {
    height: number;
}

interface MCropImageOptions {
    viewport: MCropImageViewport;
    boundary: MCropImageBoundary;
    enableOrientation: boolean;
}

@WithRender
@Component
export class MCropImage extends ModulVue {

    @Prop({ required: true })
    image: MFile;

    croppie: Croppie = undefined;

    $refs: {
        croppieContainer: HTMLElement;
    };

    mounted(): void {
        if (this.image.url) {
            let el: HTMLElement = this.$refs.croppieContainer;
            this.croppie = new Croppie(el, {
                viewport: {
                    width: MAvatarSize.LARGE,
                    height: MAvatarSize.LARGE,
                    type: 'circle'
                },
                boundary: {
                    height: 240
                },
                enableOrientation: true
            } as MCropImageOptions);

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
            format: this.imageWithTransparency ? MExportFormat.PNG : MExportFormat.JPG,
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
