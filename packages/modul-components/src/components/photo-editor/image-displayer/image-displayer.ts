import Component from 'vue-class-component';
import { Emit, Prop } from 'vue-property-decorator';
import { ModulVue } from '../../../utils/vue/vue';
import { MAvatar, MAvatarSize } from '../../avatar/avatar';
import { ICON_BUTTON_NAME } from '../../component-names';
import { MIconButton, MIconButtonSkin } from '../../icon-button/icon-button';
import WithRender from './image-displayer.html?style=./image-displayer.scss';

@WithRender
@Component({
    components: {
        MAvatar,
        [ICON_BUTTON_NAME]: MIconButton
    }
})
export class MImageDisplayer extends ModulVue {

    @Prop({ default: '' })
    urlPhoto: string;

    avatarSize: MAvatarSize = MAvatarSize.LARGE;
    skinDelete: MIconButtonSkin = MIconButtonSkin.Dark;

    i18nDelete: string = this.$i18n.translate('m-photo-editor:delete');

    get showDeleteButton(): boolean {
        return !!this.urlPhoto;
    }

    @Emit('delete-image')
    deleteImage(): void { }

}
