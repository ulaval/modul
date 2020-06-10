
import { PluginObject } from 'vue';
import { Component, Emit, Prop, Watch } from 'vue-property-decorator';
import { FormatMode } from '../../utils/i18n/i18n';
import { ModulVue } from '../../utils/vue/vue';
import { I18N_NAME, LIMIT_ELEMENTS, LINK_NAME } from '../component-names';
import { MI18n } from '../i18n/i18n';
import { MLink, MLinkMode } from '../link/link';
import WithRender from './limit-elements.html?style=./limit-elements.scss';

@WithRender
@Component({
    components: {
        [LINK_NAME]: MLink,
        [I18N_NAME]: MI18n
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

    internalOpen: boolean = this.open;

    readonly mLinkModeButton: MLinkMode = MLinkMode.Button;
    readonly i18nCloseLabelDefault: string = this.$i18n.translate('m-limit-elements:show-less-label');

    @Emit('list-opened')
    onListOpened(): void { }

    @Emit('list-closed')
    onListClosed(): void { }

    get i18nOpenLabel(): string {
        return this.openLabel || this.$i18n.translate('m-limit-elements:show-more-label', { nbElements: this.numberOfExtraElements }, undefined, undefined, undefined, FormatMode.Sprintf);
    }

    get i18nCloseLabel(): string {
        return this.closeLabel || this.i18nCloseLabelDefault;
    }

    get i18nLinkLabel(): string {
        return this.internalOpen ? this.i18nCloseLabel : this.i18nOpenLabel;
    }

    get limitedElements(): any[] {
        return this.isLinkDisplay ? this.elements.slice(0, this.limit) : this.elements.slice(0, this.limit + 1);
    }

    get numberOfExtraElements(): number {
        return this.elements.length - this.limit;
    }

    get isLimitedElementDisplay(): boolean {
        return !this.internalOpen;
    }

    get isExtraElementDisplay(): boolean {
        return this.internalOpen && this.isLinkDisplay;
    }

    get isLinkDisplay(): boolean {
        return this.elements.length > this.limit + 1;
    }

    toggleOpen(): void {
        this.internalOpen = !this.internalOpen;
        this.$emit('update:open', this.internalOpen);
        if (this.internalOpen) {
            this.onListOpened();
        } else {
            this.onListClosed();
        }
    }

    @Watch('open')
    updateOpen(): void {
        this.internalOpen = this.open;
    }
}

const LimitElementsPlugin: PluginObject<any> = {
    install(v, options): void {
        v.component(LIMIT_ELEMENTS, MLimitElements);
    }
};

export default LimitElementsPlugin;
