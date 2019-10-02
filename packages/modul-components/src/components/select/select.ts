import Vue, { PluginObject } from 'vue';
import Component from 'vue-class-component';
import { Emit, Model, Prop } from 'vue-property-decorator';
import { InputLabel } from '../../mixins/input-label/input-label';
import { InputManagement } from '../../mixins/input-management/input-management';
import { InputState } from '../../mixins/input-state/input-state';
import { InputWidth } from '../../mixins/input-width/input-width';
import { MediaQueries } from '../../mixins/media-queries/media-queries';
import uuid from '../../utils/uuid/uuid';
import { ModulVue } from '../../utils/vue/vue';
import { SELECT_NAME } from '../component-names';
import I18nPlugin from '../i18n/i18n';
import { MBaseSelect } from './base-select/base-select';
import WithRender from './select.html?style=./select.scss';

const DROPDOWN_STYLE_TRANSITION: string = 'max-height 0.3s ease';
@WithRender
@Component({
    components: {
        MBaseSelect
    },
    mixins: [
        InputState,
        MediaQueries,
        InputManagement,
        InputWidth,
        InputLabel
    ]
})
export class MSelect extends ModulVue {

    @Model('input')
    @Prop()
    public value: any;

    @Prop()
    public options: any[];

    @Prop({ default: false })
    public clearSelection: boolean;

    @Prop({ default: true })
    public showArrowIcon: boolean;

    id: string = `${SELECT_NAME}-${uuid.generate()}`;
    open: boolean = false;

    @Emit('select-item')
    onSelect(option: any, index: number): void {
        this.as<InputManagement>().model = this.options[index];
    }

    @Emit('open')
    onOpen(): void {
    }

    @Emit('close')
    onClose(): void {
    }

    get hasItems(): boolean {
        return this.options && this.options.length > 0;
    }

    get isEmpty(): boolean {
        return this.as<InputManagement>().hasValue || (this.open) ? false : true;
    }

    get isClearShowing(): boolean {
        return this.hasItems && this.clearSelection && this.as<InputManagement>().hasValue;
    }

    get selectedItems(): any {
        if (this.value) {
            return [this.value];
        }
        return [];
    }

    get hasPointer(): boolean {
        return !this.as<InputState>().isDisabled &&
            !this.as<InputState>().isReadonly;
    }

    get internalLabelUp(): boolean {
        return !this.as<InputState>().isReadonly ? this.as<InputLabel>().labelUp : true;
    }

    get internalPlaceholder(): string {
        return !this.as<InputState>().isReadonly ? this.as<InputManagement>().placeholder : '';
    }

    public onReset(): void {
        this.as<InputManagement>().model = '';
    }

    public onKeyDownDelete(event: KeyboardEvent): void {
        if (event.key === 'Delete') {
            this.onReset();
        }
    }

}

const SelectPlugin: PluginObject<any> = {
    install(v, options): void {
        Vue.use(I18nPlugin);
        v.component(SELECT_NAME, MSelect);
    }
};

export default SelectPlugin;
