import Vue from 'vue';
import Component from 'vue-class-component';
import { Emit, Prop } from 'vue-property-decorator';
import { I18N_NAME } from '../../../filters/filter-names';
import { i18nFilter } from '../../../filters/i18n/i18n';
import { ICON_NAME } from '../../component-names';
import { MIcon } from '../../icon/icon';
import WithRender from './chip-add.html?style=./chip-add.scss';

enum MChipSize {
    Small = 'small',
    Large = 'large'
}

@WithRender
@Component({
    components: {
        [ICON_NAME]: MIcon
    },
    filters: {
        [I18N_NAME]: i18nFilter
    }
})
export default class MChipAdd extends Vue {
    @Prop()
    disabled: boolean;

    @Prop({ default: true })
    icon: boolean;

    @Prop({
        default: MChipSize.Large,
        validator: value =>
            value === MChipSize.Large ||
            value === MChipSize.Small
    })
    size: MChipSize;

    @Emit('click')
    public emitClick(): void { }

    @Emit('add')
    public emitAdd(): void { }

    public get iconSize(): string {
        return this.size === MChipSize.Small ? '13px' : '20px';
    }

    public onClick(event: Event): void {
        if (this.disabled) {
            return;
        }
        this.emitClick();
        this.emitAdd();
    }
}
