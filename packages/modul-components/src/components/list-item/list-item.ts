import Vue, { PluginObject } from 'vue';
import Component from 'vue-class-component';
import { Emit, Prop } from 'vue-property-decorator';
import { LIST_ITEM_NAME } from '../component-names';
import { MIconButton } from '../icon-button/icon-button';
import { MSpinner } from '../spinner/spinner';
import WithRender from './list-item.html?style=./list-item.scss';

@WithRender
@Component({
    components: {
        MSpinner,
        MIconButton
    }
})
export class MListItem extends Vue {
    @Prop()
    public readonly iconName: string;

    @Prop()
    public readonly iconHiddenText: string;

    @Prop()
    public readonly disabled: boolean;

    @Prop()
    public readonly waiting: boolean;

    @Prop({ default: false })
    public readonly fullWidth: boolean;

    @Prop({ default: false })
    public readonly fullHeight: boolean;

    @Prop({ default: false })
    public readonly borderTop: boolean;

    @Prop({ default: false })
    public readonly borderBottom: boolean;

    @Emit('click')
    public click(event: Event): void { }

    public get hasIcon(): boolean {
        return this.iconName !== '' && this.iconName !== undefined;
    }

    public get isWaiting(): boolean {
        return this.waiting && !this.disabled;
    }

}

const ListItemPlugin: PluginObject<any> = {
    install(v, options): void {
        v.component(LIST_ITEM_NAME, MListItem);
    }
};

export default ListItemPlugin;
