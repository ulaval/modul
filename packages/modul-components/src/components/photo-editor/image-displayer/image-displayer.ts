import { PluginObject } from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import { ModulVue } from '../../../utils/vue/vue';
import { MAvatarSize } from '../../avatar/avatar';
import { IMAGE_DISPLAYER_NAME } from '../component-names';
import WithRender from './image-displayer.html?style=./image-displayer.scss';

@WithRender
@Component
export class MImageDisplayer extends ModulVue {

    @Prop({ default: '' })
    urlPhoto: string;

    avatarSize: MAvatarSize = MAvatarSize.LARGE;

}

const ImageDisplayerPlugin: PluginObject<any> = {
    install(v, options): void {
        v.prototype.$log.debug(IMAGE_DISPLAYER_NAME, 'plugin.install');
        v.component(IMAGE_DISPLAYER_NAME, MImageDisplayer);
    }
};

export default ImageDisplayerPlugin;
