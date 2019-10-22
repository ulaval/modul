import { PluginObject } from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import { ModulVue } from '../../../utils/vue/vue';
import { MAvatarSize } from '../../avatar/avatar';
import { IMAGE_SELECTOR_NAME } from '../component-names';
import WithRender from './image-selector.html?style=./image-selector.scss';

@WithRender
@Component
export class MImageSelector extends ModulVue {

    @Prop({ default: '' })
    urlPhoto: string;

    avatarSize: MAvatarSize = MAvatarSize.LARGE;

}

const ImageSelectorPlugin: PluginObject<any> = {
    install(v, options): void {
        v.prototype.$log.debug(IMAGE_SELECTOR_NAME, 'plugin.install');
        v.component(IMAGE_SELECTOR_NAME, MImageSelector);
    }
};

export default ImageSelectorPlugin;
