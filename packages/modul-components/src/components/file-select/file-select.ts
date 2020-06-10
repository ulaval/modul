import { PluginObject } from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import { InputState } from '../../mixins/input-state/input-state';
import FilePlugin, { DEFAULT_STORE_NAME } from '../../utils/file/file';
import uuid from '../../utils/uuid/uuid';
import { ModulVue } from '../../utils/vue/vue';
import { MButton, MButtonIconPosition, MButtonSkin } from '../button/button';
import { BUTTON_NAME, FILE_SELECT_NAME, I18N_NAME, VALIDATION_MESSAGE_NAME } from '../component-names';
import { MI18n } from '../i18n/i18n';
import { MValidationMessage } from '../validation-message/validation-message';
import WithRender from './file-select.html?style=./file-select.scss';

@WithRender
@Component({
    components: {
        [BUTTON_NAME]: MButton,
        [I18N_NAME]: MI18n,
        [VALIDATION_MESSAGE_NAME]: MValidationMessage
    },
    mixins: [InputState]
})
export class MFileSelect extends ModulVue {
    @Prop()
    public label: string;
    @Prop({
        default: MButtonSkin.Secondary,
        validator: value =>
            value === MButtonSkin.Primary || value === MButtonSkin.Secondary
    })
    public skin: MButtonSkin;
    @Prop()
    public disabled: boolean;
    @Prop()
    public waiting: boolean;
    @Prop()
    public fullSize: boolean;
    @Prop()
    public iconName: string;
    @Prop({
        default: MButtonIconPosition.Left,
        validator: value =>
            value === MButtonIconPosition.Left ||
            value === MButtonIconPosition.Right
    })
    public iconPosition: MButtonIconPosition;
    @Prop({ default: '12px' })
    public iconSize: string;
    @Prop()
    public multiple: boolean;
    @Prop({
        default: DEFAULT_STORE_NAME
    })
    public storeName: string;

    @Prop({ default: false })
    public keepStore: boolean;

    @Prop({ default: () => [] })
    public allowedExtensions: string[];

    $refs: {
        inputFile: HTMLInputElement;
    };

    private id: string = `mFileSelect-${uuid.generate()}`;

    private destroyed(): void {
        if (!this.keepStore) {
            this.$file.destroy(this.storeName);
        }
    }

    private onClick(event: Event): void {
        this.$refs.inputFile.click();
        this.$emit('click', event);
        this.$refs.inputFile.blur();
    }

    private onFocus(event: Event): void {
        this.$emit('focus');
    }

    private onBlur(event: Event): void {
        this.$emit('blur');
    }

    private async processFile(event: Event): Promise<void> {
        const file: FileList | null = this.$refs.inputFile.files;
        if (file) {
            await this.$file.add(file, this.storeName);
            this.$emit('file-selected');
        }
        this.$refs.inputFile.value = '';
    }

    private get hasLabel(): boolean {
        return !!this.label;
    }

    get extensions(): string {
        return this.allowedExtensions.map((ext: string) => (ext.startsWith('.') ? '' : '.') + ext).join(', ');
    }
}

const FileSelectPlugin: PluginObject<any> = {
    install(v, options): void {
        v.use(FilePlugin);
        v.component(FILE_SELECT_NAME, MFileSelect);
    }
};

export default FileSelectPlugin;
