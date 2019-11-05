import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import { ModulVue } from '../../../utils/vue/vue';
import { MAvatar, MAvatarSize } from '../../avatar/avatar';
import WithRender from './image-displayer.html?style=./image-displayer.scss';

@WithRender
@Component({
    components: { MAvatar }
})
export class MImageDisplayer extends ModulVue {

    @Prop({ default: '' })
    urlPhoto: string;

    avatarSize: MAvatarSize = MAvatarSize.LARGE;

}
