import Vue, { PluginObject } from 'vue';
import { Component, Emit, Prop, Watch } from 'vue-property-decorator';
import { MediaQueries } from '../../mixins/media-queries/media-queries';
import { ModulVue } from '../../utils/vue/vue';
import { MButton } from '../button/button';
import { INPLACE_EDIT_NAME } from '../component-names';
import { MOverlay } from '../overlay/overlay';
import { MAccordionTransition } from '../transitions/accordion-transition/accordion-transition';
import WithRender from './inplace-edit.html?style=./inplace-edit.scss';

@WithRender
@Component({
    components: {
        MAccordionTransition,
        MButton,
        MOverlay
    },
    mixins: [MediaQueries]
})
export class MInplaceEdit extends ModulVue {

    @Prop()
    public readonly editMode: boolean;

    @Prop()
    public readonly error: boolean;

    @Prop()
    public readonly waiting: boolean;

    @Prop()
    public readonly padding: string;

    @Prop()
    public readonly editModePadding: string;

    @Prop({
        default: () => (Vue.prototype).$i18n.translate('m-inplace-edit:modify')
    })
    public readonly title: string;

    private internalEditMode: boolean = false;
    private mqMounted: boolean;

    @Emit('ok')
    public emitOk(event: MouseEvent): void { }

    @Emit('cancel')
    public emitCancel(event: MouseEvent): void { }

    @Emit('click')
    public emitClick(event: MouseEvent): void { }

    @Emit('mobile-after-open')
    public emitMobileAfterOpen(): void { }

    @Emit('mobile-after-close')
    public emitMobileAfterClose(): void { }

    @Watch('editMode', { immediate: true })
    public onEditModeChange(value: boolean): void {
        this.internalEditMode = value;
    }

    @Watch('isMqMaxS')
    public onIsMqMaxSChange(value: boolean, old: boolean): void {
        if (this.mqMounted) {
            this.propEditMode = false;
        }
    }

    protected mounted(): void {
        // should be in next tick to skip the media query initial trigger on mounted
        this.$nextTick(() => this.mqMounted = true);
    }

    public get propEditMode(): boolean {
        return this.internalEditMode;
    }

    public set propEditMode(value: boolean) {
        this.internalEditMode = value;
        this.$emit('update:editMode', value);
    }

    public get propPadding(): string {
        if (!this.propEditMode && this.padding) {
            return `padding: ${this.padding}`;
        } else if (this.propEditMode && this.editModePadding) {
            return `padding: ${this.editModePadding}`;
        } else {
            return '';
        }
    }

    public onConfirm(event: MouseEvent): void {
        if (this.propEditMode) {
            this.emitOk(event);
        }
    }

    public onCancel(event: MouseEvent): void {
        if (this.propEditMode) {
            this.propEditMode = false;
            this.emitCancel(event);
        }
    }
}

const InplaceEditPlugin: PluginObject<any> = {
    install(v, options): void {
        v.component(INPLACE_EDIT_NAME, MInplaceEdit);
    }
};

export default InplaceEditPlugin;
