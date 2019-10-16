import { PluginObject } from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import uuid from '../../utils/uuid/uuid';
import { ModulVue } from '../../utils/vue/vue';
import { MAvatarSize } from '../avatar/avatar';
import { MButtonSkin } from '../button/button';
import { PHOTO_EDITOR_NAME } from '../component-names';
import { MModalSize } from '../modal/modal';
import WithRender from './photo-editor.html?style=./photo-editor.scss';

@WithRender
@Component
export class MPhotoEditor extends ModulVue {

    @Prop({ default: '' })
    urlPhoto: string;

    @Prop({ default: false })
    open: boolean;

    @Prop({ default: () => [] })
    allowedExtensions: string[];

    i18nTitleModal: string = this.$i18n.translate('m-photo-editor:title');
    i18nChoosePhoto: string = this.$i18n.translate('m-photo-editor:choose-photo');
    i18nCancel: string = this.$i18n.translate('m-photo-editor:cancel');
    i18nSave: string = this.$i18n.translate('m-photo-editor:save');

    modalSize: MModalSize = MModalSize.Small;
    avatarSize: MAvatarSize = MAvatarSize.LARGE;
    primaryButton: MButtonSkin.Primary = MButtonSkin.Primary;
    secondaryButton: MButtonSkin.Secondary = MButtonSkin.Secondary;
    storeName: string = uuid.generate();

}

const PhotoEditorPlugin: PluginObject<any> = {
    install(v, options): void {
        v.prototype.$log.debug(PHOTO_EDITOR_NAME, 'plugin.install');
        v.component(PHOTO_EDITOR_NAME, MPhotoEditor);
    }
};

export default PhotoEditorPlugin;
