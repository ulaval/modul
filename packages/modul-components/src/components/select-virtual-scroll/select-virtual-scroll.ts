import Component from 'vue-class-component';
import { Emit, Model, Prop } from 'vue-property-decorator';
import virtualList from 'vue-virtual-scroll-list';
import { InputLabel } from '../../mixins/input-label/input-label';
import { InputManagement } from '../../mixins/input-management/input-management';
import { InputState } from '../../mixins/input-state/input-state';
import { InputWidth } from '../../mixins/input-width/input-width';
import { MediaQueries } from '../../mixins/media-queries/media-queries';
import uuid from '../../utils/uuid/uuid';
import { ModulVue } from '../../utils/vue/vue';
import { SELECT_NAME } from '../component-names';
import { MBaseSelect } from '../select/base-select/base-select';
import { MSelectItem } from '../select/select-item/select-item';
import { MOpacityTransition } from '../transitions/opacity-transition/opacity-transition';
import WithRender from './select-virtual-scroll.html?style=./select-virtual-scroll.scss';

@WithRender
@Component({
    components: {
        MBaseSelect,
        MOpacityTransition,
        MSelectItem,
        'virtual-list': virtualList
    },
    mixins: [
        InputState,
        MediaQueries,
        InputManagement,
        InputWidth,
        InputLabel
    ]
})
export class MSelectVirtualScroll extends ModulVue {

    public $refs: {
        baseSelect: MBaseSelect;
    };


    @Model('input')
    @Prop()
    public value: any;

    @Prop()
    public options: any[];

    @Prop({ default: false })
    public clearable: boolean;

    @Prop({ default: 52 }) // 208px / 4 -> base-select.scss
    public virtualScrollItemHeight: string;

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

    get isClearable(): boolean {
        return this.hasItems && this.clearable && this.as<InputManagement>().hasValue &&
            this.isSelectable;
    }

    get selectedItems(): any {
        if (this.value) {
            return [this.value];
        }
        return [];
    }

    get isSelectable(): boolean {
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
        if (event.key === 'Delete' && this.isClearable) {
            this.onReset();
        }
    }

    public toggleSelect(): void {
        this.$refs.baseSelect.togglePopup();
    }


}

