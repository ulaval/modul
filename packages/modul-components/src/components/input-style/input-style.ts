import { PluginObject } from 'vue';
import Component from 'vue-class-component';
import { Emit, Prop, Watch } from 'vue-property-decorator';
import { InputState } from '../../mixins/input-state/input-state';
import { ModulVue } from '../../utils/vue/vue';
import { INPUT_STYLE_NAME } from '../component-names';
import { MSpinner } from '../spinner/spinner';
import WithRender from './input-style.html';
import './input-style.scss';

export const CSS_LABEL_DEFAULT_MARGIN: number = 12;

@WithRender
@Component({
    components: {
        MSpinner
    },
    mixins: [InputState]
})
export class MInputStyle extends ModulVue {
    @Prop({ default: '' })
    public label: string;

    @Prop()
    public labelFor: string;

    @Prop({ default: false })
    public labelUp: boolean;

    @Prop()
    public labelId?: string;

    @Prop({ default: false })
    public focus: boolean;

    @Prop({ default: false })
    public append: boolean;

    @Prop({ default: true })
    public empty: boolean;

    @Prop()
    public width: string;

    @Prop()
    public requiredMarker: boolean;

    @Prop()
    public readonly: boolean;

    @Prop({ default: false })
    public cursorPointer: boolean;

    public $refs: {
        root: HTMLElement,
        label: HTMLElement,
        body: HTMLElement,
        suffix: HTMLElement
    };

    public labelOffset: string = '';
    public suffixOffset: string | undefined = '0px';
    public animReady: boolean = false;

    protected created(): void {
        requestAnimationFrame(() => {
            this.animReady = true;
        });
    }

    protected mounted(): void {
        this.computeLabelOffset();
        this.computeSuffixOffset();
    }

    @Watch('isLabelUp')
    private computeLabelOffset(): void {
        if (this.label) {
            const labelOffset: number = this.$refs.label.clientHeight / 2;
            this.labelOffset = this.isLabelUp && labelOffset > CSS_LABEL_DEFAULT_MARGIN ? `${labelOffset}px` : '';
        } else {
            this.labelOffset = '';
        }
    }

    public async computeSuffixOffset(): Promise<void> {
        await this.$nextTick();
        if (this.label && this.$refs.suffix) {
            this.suffixOffset = this.$refs.suffix.clientWidth + 'px';
        } else {
            this.suffixOffset = undefined;
        }
    }

    public get isLabelUp(): boolean {
        return (this.hasValue || (this.isFocus && this.hasValue) || this.labelUp) && this.hasLabel;
    }

    public get showPrefix(): boolean {
        return this.hasLabel ? this.isFocus : true;
    }

    private get hasValue(): boolean {
        return this.hasDefaultSlot && !this.empty;
    }

    public get hasLabel(): boolean {
        return !!this.label && this.label !== '';
    }

    public get isFocus(): boolean {
        const focus: boolean = this.focus && this.as<InputState>().active;
        this.$emit('focus', focus);
        return focus;
    }

    public get hasDefaultSlot(): boolean {
        return !!this.$slots.default;
    }

    @Emit('click')
    public onClick(event): void { }

    @Emit('mousedown')
    public onMousedown(event): void { }

    @Emit('mouseup')
    public onMouseup(event): void { }
}

const InputStylePlugin: PluginObject<any> = {
    install(v, options): void {
        v.component(INPUT_STYLE_NAME, MInputStyle);
    }
};

export default InputStylePlugin;
