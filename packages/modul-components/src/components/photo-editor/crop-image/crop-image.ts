import Croppie, { CroppieOptions } from 'croppie';
import 'croppie/croppie.css';
import EXIF from 'exif-js';
import Component from 'vue-class-component';
import { Emit, Prop } from 'vue-property-decorator';
import { MFile } from '../../../utils/file/file';
import UserAgentUtil from '../../../utils/user-agent/user-agent';
import { ModulVue } from '../../../utils/vue/vue';
import { MAvatarSize } from '../../avatar/avatar';
import { MIcon } from '../../icon/icon';
import WithRender from './crop-image.html';
import './crop-image.scss';

enum MExportFormat {
    PNG = 'png',
    JPG = 'jpeg'
}
window['EXIF'] = EXIF;

@WithRender
@Component({
    components: { MIcon }
})
export class MCropImage extends ModulVue {

    @Prop({ required: true })
    image: MFile;

    private croppie: Croppie | undefined = undefined;

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
                enableExif: true,
                boundary: {
                    height: UserAgentUtil.isMobile() ? 200 : 240
                }
            } as CroppieOptions);

            this.bind();
        }
    }

    beforeDestroy(): void {
        if (this.croppie) {
            this.croppie.destroy();
        }
    }

    bind(): void {
        if (this.image.url && this.croppie) {
            this.croppie.bind({
                url: this.image.url,
                zoom: 0
            });
        }
    }

    crop(): void {
        if (this.croppie) {
            this.croppie.result({
                format: this.imageExtension,
                type: 'blob',
                circle: false
            }).then((imageCropped: Blob) => {
                this.emitImageCropped(this.createImageFile(imageCropped));
            });
        }
    }

    createImageFile(imageCropped: Blob): File {
        return new File(
            [imageCropped],
            this.image.name
        );
    }

    @Emit('image-cropped')
    private emitImageCropped(imageCropped: File): void { }

    get imageExtension(): MExportFormat {
        return this.image.extension === 'png' || this.image.extension === 'gif' ? MExportFormat.PNG : MExportFormat.JPG;
    }

}
