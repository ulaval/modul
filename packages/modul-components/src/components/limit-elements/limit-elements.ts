
import { PluginObject } from 'vue';
import { Component, Emit, Prop, Watch } from 'vue-property-decorator';
import { FormatMode } from '../../utils/i18n/i18n';
import { ModulVue } from '../../utils/vue/vue';
import { LIMIT_ELEMENTS } from '../component-names';
import { MLink, MLinkMode } from '../link/link';
import WithRender from './limit-elements.html?style=./limit-elements.scss';

@WithRender
@Component({
    components: {
        MLink
    }
})
export class MLimitElements extends ModulVue {
    @Prop({ required: true })
    readonly elements!: any[];

    @Prop({ default: 2 })
    readonly limit!: number;

    @Prop({ default: false })
    readonly open!: boolean;

    @Prop()
    readonly openLabel!: string;

    @Prop()
    readonly closeLabel!: string;

    public internalOpen: boolean = this.open;

    public readonly mLinkModeButton: MLinkMode = MLinkMode.Button;
    public readonly i18nCloseLabelDefault: string = this.$i18n.translate('m-limit-elements:show-less-label');

    @Emit('list-opened')
    public onListOpened(): void { }

    @Emit('list-closed')
    public onListClosed(): void { }

    public get i18nOpenLabel(): string {
        return this.openLabel || this.$i18n.translate('m-limit-elements:show-more-label', { nbElements: this.numberOfExtraElements }, undefined, undefined, undefined, FormatMode.Sprintf);
    }

    public get i18nCloseLabel(): string {
        return this.closeLabel || this.i18nCloseLabelDefault;
    }

    public get i18nLinkLabel(): string {
        return this.internalOpen ? this.i18nCloseLabel : this.i18nOpenLabel;
    }

    public get limitedElements(): any[] {
        return this.isLinkDisplay ? this.elements.slice(0, this.limit) : this.elements.slice(0, this.limit + 1);
    }

    public get numberOfExtraElements(): number {
        return this.elements.length - this.limit;
    }

    public get isLimitedElementDisplay(): boolean {
        return !this.internalOpen;
    }

    public get isExtraElementDisplay(): boolean {
        return this.internalOpen && this.isLinkDisplay;
    }

    public get isLinkDisplay(): boolean {
        return this.elements.length > this.limit + 1;
    }

    public toggleOpen(): void {
        this.internalOpen = !this.internalOpen;
        this.$emit('update:open', this.internalOpen);
        if (this.internalOpen) {
            this.onListOpened();
        } else {
            this.onListClosed();
        }
    }

    @Watch('open')
    public updateOpen(): void {
        this.internalOpen = this.open;
    }
}

const LimitElementsPlugin: PluginObject<any> = {
    install(v, options): void {
        v.component(LIMIT_ELEMENTS, MLimitElements);
    }
};

export default LimitElementsPlugin;
