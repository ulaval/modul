import ButtonPlugin from '@ulaval/modul-components/dist/components/button/button';
import { MModalSize } from '@ulaval/modul-components/dist/components/modal/modal';
import OverlayPlugin from '@ulaval/modul-components/dist/components/overlay/overlay';
import RadioGroupPlugin from '@ulaval/modul-components/dist/components/radio-group/radio-group';
import RadioPlugin from '@ulaval/modul-components/dist/components/radio/radio';
import { MRichText } from '@ulaval/modul-components/dist/components/rich-text/rich-text';
import TextfieldPlugin from '@ulaval/modul-components/dist/components/textfield/textfield';
import { InputManagement } from '@ulaval/modul-components/dist/mixins/input-management/input-management';
import FilePlugin, { MFile } from '@ulaval/modul-components/dist/utils/file/file';
import { FRENCH } from '@ulaval/modul-components/dist/utils/i18n/i18n';
import uuid from '@ulaval/modul-components/dist/utils/uuid/uuid';
import { ModulVue } from '@ulaval/modul-components/dist/utils/vue/vue';
import { MRichTextEditor } from '@ulaval/modul-rich-text-editor/dist/components/rich-text-editor/rich-text-editor';
import { RichTextLicensePlugin } from '@ulaval/modul-rich-text-editor/dist/components/rich-text-editor/rich-text-license-plugin';
import { MRichTextEditorOption, MRichTextEditorOptions } from '@ulaval/modul-rich-text-editor/dist/index';
import { PluginObject } from 'vue';
import { Component } from 'vue-property-decorator';
import WithRender from './rich-text-editor.sandbox.html';



@WithRender
@Component({
    components: { MRichTextEditor, MRichText }
})
export class MRichTextEditorSandBox extends ModulVue {
    public model: string = '';
    public imageModel: string = '';
    public imageNoLayoutModel: string = '';
    public modelTitle1: string = '';
    public modelTitle2: string = '';
    public modelTitle3: string = '';
    public focus: boolean = false;
    public error: boolean = false;
    public errorMessage: string = '';
    public validMessage: string = '';
    public helperMessage: string = '';
    public waiting: boolean = false;
    public disabled: boolean = false;
    public readonly: boolean = false;
    public afficherFormulairePleinePage: boolean = false;
    public fullScreenFormModel: string = '';
    public imageOptions: MRichTextEditorOptions = [MRichTextEditorOption.IMAGE];
    public imageNoLayoutOptions: MRichTextEditorOptions = [MRichTextEditorOption.IMAGE, MRichTextEditorOption.IMAGE_HIDE_FLOAT_LAYOUT];

    public initializedModel: string = '<p>Test text</p><p><strong>I should be bold</strong></p><p><em>I should be italic</em></p><p>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;I should be tabulated</p><p>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;And me even more</p><ol><li>Ordered list</li><li>Unordered list</li></ol>';
    public linksOpenInNewWindowModel = '<p>Tests de la La case à cocher « Ouvrir dans un nouvel onglet ».</p><ol><li>Elle est <strong>sélectionnée par défaut&nbsp;</strong>à la création d&#39;un <strong>nouveau&nbsp;</strong>lien externe.</li><li>Elle est <strong>sélectionnée&nbsp;</strong>lors de la modification d&#39;un lien existant, si l&#39;utilisateur l&#39;a laissé sélectionnée à la création du <a href="http://google.ca" rel="noopener noreferrer" target="_blank">lien</a>.</li><li>Par contre, elle <strong>n&#39;est pas&nbsp;</strong><strong>sélectionnée&nbsp;</strong>lors de la modification d&#39;un lien existant, si l&#39;utilisateur l&#39;avait désélectionnée à la création du <a href="http://google.ca">lien</a>.</li></ol></div>';
    public inputFocusTestInputType = '';

    public todos: { todo: string, done: boolean }[] = [];
    public currentTodo: { todo: string, done: boolean } = { todo: '', done: false };
    public resetValue: string = '';

    public fileList: { file: MFile, id: string }[] = [];
    radioValue: string = '2';

    public fullscreen: boolean = false;

    public alertTestSuccess(message: string): void {
        alert(message);
    }

    public addTodo(): void {
        this.todos.push({ todo: this.currentTodo.todo, done: this.currentTodo.done });
        this.currentTodo = { todo: this.resetValue, done: false };
    }

    public focusEditor(): void {
        (this.$refs['rteTestFocus'] as InputManagement).focusInput();
    }

    public resetModelPleinePage(): void {
        this.fullScreenFormModel = '';
    }

    protected imageReady(file: MFile, storeName: string): void {
        // would upload to a real server here and get back id
        this.$file.uploadTemp([file], storeName);
    }

    protected imageAdded(file: MFile, insertImage: (file: MFile, id: string) => void): void {
        // would use real id from server here
        const id: string = uuid.generate();
        this.fileList.push({ file, id });
        insertImage(file, id);
    }

    protected imageRemoved(id: string): void {
        // would delete on server here
        this.fileList = this.fileList.filter(file => file.id !== id);
    }

    public onFullscreen(fullscreenWasActivated: boolean): void {
        this.fullscreen = fullscreenWasActivated;
    }

    public get modalSize(): string {
        return this.fullscreen ? MModalSize.FullScreen : MModalSize.Regular;
    }
}
const RichTextEditorSandBoxPlugin: PluginObject<any> = {
    install(v): void {
        v.use(ButtonPlugin);
        v.use(OverlayPlugin);
        v.use(TextfieldPlugin);
        v.use(RadioGroupPlugin);
        v.use(RadioPlugin);
        v.use(FilePlugin);
        v.use(RichTextLicensePlugin, { key: `test`, curlang: FRENCH });
        v.component(`m-rich-text-editor-sandbox`, MRichTextEditorSandBox);
    }
};

export default RichTextEditorSandBoxPlugin;
