import { PluginObject } from 'vue';
import Component from 'vue-class-component';
import { ModulVue } from '../../utils/vue/vue';
import { PHOTO_EDITOR_NAME } from '../component-names';
import { MModalSize } from '../modal/modal';
import WithRender from './photo-editor.html?style=./photo-editor.scss';

@WithRender
@Component
export class MPhotoEditor extends ModulVue {

    modalSize: MModalSize = MModalSize.Small;


}

const PhotoEditorPlugin: PluginObject<any> = {
    install(v, options): void {
        v.prototype.$log.debug(PHOTO_EDITOR_NAME, 'plugin.install');
        v.component(PHOTO_EDITOR_NAME, MPhotoEditor);
    }
};

export default PhotoEditorPlugin;
