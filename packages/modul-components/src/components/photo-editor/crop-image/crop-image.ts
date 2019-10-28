import Croppie, { CroppieOptions } from 'croppie';
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

@WithRender
@Component
export class MCropImage extends ModulVue {

    @Prop({ required: true })
    image: MFile;

    croppie: Croppie | undefined = undefined;

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
            } as CroppieOptions);

            this.bind();
        }
    }

    bind(): void {
        if (this.image.url) {
            this.croppie!.bind({
                url: this.image.url
            });
        }
    }

    crop(): void {
        if (this.croppie) {
            this.croppie.result({
                format: this.imageWithTransparency ? MExportFormat.PNG : MExportFormat.JPG,
                type: 'blob',
                circle: false
            }).then((imageCropped: Blob) => {
                this.$emit('image-cropped', this.createImageFile(imageCropped));
            });
        }
    }

    createImageFile(imageCropped: Blob): File {
        return new File(
            [imageCropped],
            this.image.name
        );
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
