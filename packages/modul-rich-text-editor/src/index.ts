export { RICH_TEXT_EDITOR_NAME } from './components/component-names';
export { MRichTextEditor, RichTextEditorPlugin } from './components/rich-text-editor/rich-text-editor';
export { RichTextLicensePlugin, RichTextLicensePluginOptions } from './components/rich-text-editor/rich-text-license-plugin';

export enum MRichTextEditorOption {
    IMAGE,
    IMAGE_HIDE_FLOAT_LAYOUT
}

export type MRichTextEditorOptions = MRichTextEditorOption[];
