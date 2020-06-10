import Vue, { PluginObject } from 'vue';
import Component from 'vue-class-component';
import { Emit, Prop } from 'vue-property-decorator';
import { I18N_NAME, ICON_BUTTON_NAME, LIST_ITEM_NAME, SPINNER_NAME } from '../component-names';
import { MI18n } from '../i18n/i18n';
import { MIconButton } from '../icon-button/icon-button';
import { MSpinner } from '../spinner/spinner';
import WithRender from './list-item.html?style=./list-item.scss';

@WithRender
@Component({
    components: {
        [I18N_NAME]: MI18n,
        [SPINNER_NAME]: MSpinner,
        [ICON_BUTTON_NAME]: MIconButton
    }
})
export class MListItem extends Vue {

    @Prop()
    public iconName: string;
    @Prop()
    public iconHiddenText: string;
    @Prop()
    public disabled: boolean;
    @Prop()
    public waiting: boolean;
    @Prop({ default: false })
    public fullWidth: boolean;
    @Prop({ default: false })
    public fullHeight: boolean;
    @Prop({ default: false })
    public borderTop: boolean;
    @Prop({ default: false })
    public borderBottom: boolean;

    @Emit('click')
    click(event: Event): void { }

    private get hasIcon(): boolean {
        return this.iconName !== '' && this.iconName !== undefined;
    }

    private get isWaiting(): boolean {
        return this.waiting && !this.disabled;
    }

}

const ListItemPlugin: PluginObject<any> = {
    install(v, options): void {
        v.component(LIST_ITEM_NAME, MListItem);
    }
};

export default ListItemPlugin;
