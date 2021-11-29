// tslint:disable:deprecation

import Component from 'vue-class-component';
import { Emit, Prop } from 'vue-property-decorator';
import { ElementQueries } from '../../mixins/element-queries/element-queries';
import { InputLabel } from '../../mixins/input-label/input-label';
import { InputManagement, InputManagementData } from '../../mixins/input-management/input-management';
import { InputState, InputStateInputSelector } from '../../mixins/input-state/input-state';
import { InputWidth } from '../../mixins/input-width/input-width';
import { MFile } from '../../utils/file/file';
import { FormatMode } from '../../utils/i18n/i18n';
import uuid from '../../utils/uuid/uuid';
import { ModulVue } from '../../utils/vue/vue';
import { INPUT_STYLE_NAME, RICH_TEXT_EDITOR_NAME, VALIDATION_MESSAGE_NAME } from '../component-names';
import { FileUploadCustomValidation } from '../file-upload/file-upload';
import { MInputStyle } from '../input-style/input-style';
import { MValidationMessage } from '../validation-message/validation-message';
import VueFroala from './adapter/vue-froala';
import { MRichTextEditorDefaultOptions } from './rich-text-editor-options';
import WithRender from './rich-text-editor.html?style=./rich-text-editor.scss';

const RICH_TEXT_LICENSE_KEY: string = 'm-rich-text-license-key';

@WithRender
@Component({
    components: {
        Froala: VueFroala,
        [INPUT_STYLE_NAME]: MInputStyle,
        [VALIDATION_MESSAGE_NAME]: MValidationMessage
    },
    mixins: [
        InputState,
        InputManagement,
        InputWidth,
        InputLabel,
        ElementQueries
    ]
})
export class MRichTextEditor extends ModulVue implements InputManagementData, InputStateInputSelector {

    selector: string = '.fr-element.fr-view';
    internalValue: string;

    @Prop({ default: '' })
    public value: string;

    @Prop({ default: 1 })
    public minRows: number;

    @Prop({ default: '0' })
    public toolbarStickyOffset: string;

    @Prop()
    public scrollableContainer: string | undefined;

    @Prop({
        default: 5,
        validator: (level: number) => {
            return level >= 1 && level <= 6;
        }
    })
    public firstHeaderLevel: number;

    @Prop({
        default: 6,
        validator: (level: number) => {
            return level >= 1 && level <= 6;
        }
    })
    public lastHeaderLevel: number;

    @Prop({ default: false })
    public showCharacterCount: boolean;

    @Prop()
    public characterCountMax: number;

    @Prop({ default: false })
    public showParagraphAlignmentButtons: boolean;

    @Prop({ default: false })
    public showUnderlineButton: boolean;

    @Prop({ default: false })
    public showStrikeThroughButton: boolean;

    @Prop({ default: false })
    public showImageButton: boolean;

    @Prop({ default: false })
    public showImageFloatLayout: boolean;

    @Prop({ default: false })
    public titleAvailable: boolean; // temporary

    /**
     * Prop required to enable custom validation on images uploaded into the rich text.
     */
    @Prop()
    public imageUploadCustomValidation?: FileUploadCustomValidation;

    @Prop({ default: () => `mRichText-${uuid.generate()}` })
    public readonly id: string;

    public $refs: {
        input: HTMLElement
    };

    public customTranslations: { [key: string]: string } = {
        'Update': this.$i18n.translate('m-inplace-edit:modify'),
        'URL': this.$i18n.translate('m-rich-text-editor:URL')
    };

    private i18nHeaderTitle: string = this.$i18n.translate('m-rich-text-editor:title');
    private i18nHeaderSubtitle: string = this.$i18n.translate('m-rich-text-editor:subtitle');

    mounted(): void {
        this.testSelectorProps();

        if (!this.headerLevelValid) {
            throw new Error(`${RICH_TEXT_EDITOR_NAME}: first-header-level must be inferior or equal to last-header-level`);
        }
    }

    public get internalOptions(): any {
        let propOptions: any = {
            // Hack to "hide" the default froala placeholder text
            placeholderText: this.as<InputManagement>().placeholder || ' ',
            toolbarStickyOffset: this.calculateToolbarStickyOffset(),
            scrollableContainer: this.getScrollableContainer(),
            imageHideFloatLayout: this.showImageFloatLayout,
            charCounterCount: this.showCharacterCount || !!this.characterCountMax,
            charCounterMax: !this.characterCountMax ? -1 : this.characterCountMax
        };

        return Object.assign(this.getOptions(), propOptions);
    }

    public get froalaLicenseKey(): string {
        return this.$license.getLicense<string>(RICH_TEXT_LICENSE_KEY) || '';
    }

    private get headerLevelValid(): boolean {
        return this.firstHeaderLevel <= this.lastHeaderLevel;
    }

    public getOptions(): MRichTextEditorDefaultOptions {
        const richTextEditorOptions: MRichTextEditorDefaultOptions = new MRichTextEditorDefaultOptions(this.froalaLicenseKey, this.$i18n.currentLang());

        if (this.showImageButton) {
            richTextEditorOptions.pluginsEnabled.push('image');
            // toolbar for desktop devices
            richTextEditorOptions.toolbarButtons.moreRich.buttons.push('insertImage');
            // for mobile devices
            richTextEditorOptions.toolbarButtonsXS.moreRich.buttons.push('insertImage');
        }

        if (this.titleAvailable) {
            richTextEditorOptions.paragraphStyles = this.manageHeaderLevels();

            // toolbar for desktop devices
            richTextEditorOptions.toolbarButtons.moreText.buttons.splice(0, 0, 'paragraphStyle');
            // for mobile devices
            richTextEditorOptions.toolbarButtonsXS.moreText.buttons.splice(0, 0, 'paragraphStyle');
        }

        if (this.showUnderlineButton) {
            // toolbar for desktop devices
            richTextEditorOptions.toolbarButtons.moreText.buttons.splice(richTextEditorOptions.toolbarButtons.moreText.buttons.length - 2, 0, 'underline');
            // for mobile devices
            richTextEditorOptions.toolbarButtonsXS.moreText.buttons.splice(richTextEditorOptions.toolbarButtons.moreText.buttons.length - 2, 0, 'underline');
        }

        if (this.showStrikeThroughButton) {
            // toolbar for desktop devices
            richTextEditorOptions.toolbarButtons.moreText.buttons.splice(richTextEditorOptions.toolbarButtons.moreText.buttons.length - 2, 0, 'strikeThrough');
            // for mobile devices
            richTextEditorOptions.toolbarButtonsXS.moreText.buttons.splice(richTextEditorOptions.toolbarButtons.moreText.buttons.length - 2, 0, 'strikeThrough');
        }

        if (this.showParagraphAlignmentButtons) {
            // toolbar for desktop devices
            richTextEditorOptions.toolbarButtons.moreParagraph.buttons.splice(0, 0, 'align');
            // for mobile devices
            richTextEditorOptions.toolbarButtonsXS.moreParagraph.buttons.splice(0, 0, 'align');
        }

        if (this.showCharacterCount || this.characterCountMax) {
            richTextEditorOptions.pluginsEnabled.push('charCounter');
        }

        return richTextEditorOptions;
    }

    public manageHeaderLevels(): any {

        let headersLevel: any = {};
        headersLevel[''] = this.$i18n.translate('m-rich-text-editor:normal-level');

        if (this.firstHeaderLevel === this.lastHeaderLevel) {
            // One level of header
            headersLevel['rte-h' + this.firstHeaderLevel + this.getClassLevel(1)] = this.i18nHeaderTitle;
        } else if (this.lastHeaderLevel - this.firstHeaderLevel === 1) {
            // Two levels of header
            headersLevel['rte-h' + this.firstHeaderLevel + this.getClassLevel(1)] = this.i18nHeaderTitle;
            headersLevel['rte-h' + this.lastHeaderLevel + this.getClassLevel(2)] = this.i18nHeaderSubtitle;
        } else {
            // Multiple levels of header
            let levelNumber: number = 1;
            for (let headerLevel: number = this.firstHeaderLevel; headerLevel <= this.lastHeaderLevel; headerLevel++) {
                headersLevel['rte-h' + headerLevel + this.getClassLevel(levelNumber)] = this.$i18n.translate('m-rich-text-editor:title-level', { headerLevel: levelNumber }, 1, undefined, undefined, FormatMode.Sprintf);
                levelNumber++;
            }
        }

        return headersLevel;
    }
    private getClassLevel(level: number): string {
        const classLevel: string = ' rte_h_level';
        return classLevel + level;
    }

    public getSelectorErrorMsg(prop: string): string {
        return `${RICH_TEXT_EDITOR_NAME}: No element has been found with the selector given in the ${prop} prop.`;
    }

    protected refreshModel(newValue: string): void {
        this.$emit('input', newValue);
    }

    protected calculateToolbarStickyOffset(): number | undefined {
        if (this.toolbarStickyOffset) {
            if (this.isNumber(this.toolbarStickyOffset)) {
                return Number(this.toolbarStickyOffset);
            } else {
                const element: HTMLElement | null = document.querySelector(this.toolbarStickyOffset);
                return element!.offsetHeight;
            }
        }
    }

    private isNumber(value: string): boolean {
        return /^-*\d+$/.test(this.toolbarStickyOffset);
    }

    protected getScrollableContainer(): string {
        // The froala version 3 don't support 'scrollableContainer' with undefined value. By default is 'body'.
        return this.scrollableContainer || 'body';
    }

    protected testSelectorProps(): void {
        let propInError: string | undefined;
        if (this.scrollableContainer) {
            if (!document.querySelector(this.scrollableContainer)) {
                propInError = 'scrollable-container';
            }
        }

        if (this.toolbarStickyOffset && !this.isNumber(this.toolbarStickyOffset)) {
            if (!document.querySelector(this.toolbarStickyOffset)) {
                propInError = 'toolbar-sticky-offset';
            }
        }

        if (propInError) {
            throw new Error(this.getSelectorErrorMsg(propInError));
        }
    }

    @Emit('fullscreen')
    onFullscreen(fullscreenWasActived: boolean): void { }

    @Emit('image-ready')
    protected imageReady(file: MFile, storeName: string): void {
    }

    @Emit('image-added')
    protected imageAdded(file: MFile, insertImage: (file: MFile, id: string) => void): void {
    }

    @Emit('image-removed')
    protected imageRemoved(id: string, storeName: string): void {
    }
}

