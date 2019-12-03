import Vue, { PluginObject } from 'vue';
import { Component, Emit, Prop, Watch } from 'vue-property-decorator';
import { MediaQueries } from '../../mixins/media-queries/media-queries';
import { ModulVue } from '../../utils/vue/vue';
import ButtonPlugin from '../button/button';
import { INPLACE_EDIT_NAME } from '../component-names';
import OverlayPlugin from '../overlay/overlay';
import AccordionTransitionPlugin from '../transitions/accordion-transition/accordion-transition';
import WithRender from './inplace-edit.html?style=./inplace-edit.scss';

@WithRender
@Component({
    mixins: [MediaQueries]
})
export class MInplaceEdit extends ModulVue {

    @Prop()
    public editMode: boolean;

    @Prop()
    public error: boolean;

    @Prop()
    public waiting: boolean;

    @Prop()
    public padding: string;

    @Prop()
    public editModePadding: string;

    @Prop({
        default: () => (Vue.prototype).$i18n.translate('m-inplace-edit:modify')
    })
    public title: string;

    private internalEditMode: boolean = false;
    private mqMounted: boolean;

    @Emit('ok')
    emitOk(event: MouseEvent): void { }

    @Emit('cancel')
    emitCancel(event: MouseEvent): void { }

    @Emit('click')
    emitClick(event: MouseEvent): void { }

    @Emit('mobile-after-open')
    emitMobileAfterOpen(): void { }

    @Emit('mobile-after-close')
    emitMobileAfterClose(): void { }

    @Watch('editMode', { immediate: true })
    onEditModeChange(value: boolean): void {
        this.internalEditMode = value;
    }

    @Watch('isMqMaxS')
    onIsMqMaxSChange(value: boolean, old: boolean): void {
        if (this.mqMounted) {
            this.propEditMode = false;
        }
    }

    protected mounted(): void {
        // should be in next tick to skip the media query initial trigger on mounted
        this.$nextTick(() => this.mqMounted = true);
    }

    get propEditMode(): boolean {
        return this.internalEditMode;
    }

    set propEditMode(value: boolean) {
        this.internalEditMode = value;
        this.$emit('update:editMode', value);
    }

    get propPadding(): string {
        if (!this.propEditMode && this.padding) {
            return `padding: ${this.padding}`;
        } else if (this.propEditMode && this.editModePadding) {
            return `padding: ${this.editModePadding}`;
        } else {
            return '';
        }
    }

    onConfirm(event: MouseEvent): void {
        if (this.propEditMode) {
            this.emitOk(event);
        }
    }

    onCancel(event: MouseEvent): void {
        if (this.propEditMode) {
            this.propEditMode = false;
            this.emitCancel(event);
        }
    }
}

const InplaceEditPlugin: PluginObject<any> = {
    install(v, options): void {
        v.use(AccordionTransitionPlugin);
        v.use(OverlayPlugin);
        v.use(ButtonPlugin);
        v.component(INPLACE_EDIT_NAME, MInplaceEdit);
    }
};

export default InplaceEditPlugin;
