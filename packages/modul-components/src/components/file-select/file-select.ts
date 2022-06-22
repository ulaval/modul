import { PluginObject } from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import { InputState } from '../../mixins/input-state/input-state';
import { Enums } from '../../utils/enums/enums';
import FilePlugin, { DEFAULT_STORE_NAME } from '../../utils/file/file';
import uuid from '../../utils/uuid/uuid';
import { ModulVue } from '../../utils/vue/vue';
import { MButton, MButtonIconPosition, MButtonSkin } from '../button/button';
import { FILE_SELECT_NAME } from '../component-names';
import { MValidationMessage } from '../validation-message/validation-message';
import WithRender from './file-select.html?style=./file-select.scss';

@WithRender
@Component({
    components: {
        MButton,
        MValidationMessage
    },
    mixins: [InputState]
})
export class MFileSelect extends ModulVue {
    @Prop()
    public readonly label: string;

    @Prop({
        default: MButtonSkin.Secondary,
        validator: value => Enums.toValueArray(MButtonSkin).includes(value)
    })
    public readonly skin: MButtonSkin;

    @Prop()
    public readonly disabled: boolean;

    @Prop()
    public readonly waiting: boolean;

    @Prop()
    public readonly fullSize: boolean;

    @Prop()
    public readonly iconName: string;

    @Prop({
        default: MButtonIconPosition.Left,
        validator: value => Enums.toValueArray(MButtonIconPosition).includes(value)
    })
    public readonly iconPosition: MButtonIconPosition;

    @Prop({ default: '12px' })
    public readonly iconSize: string;

    @Prop()
    public readonly multiple: boolean;

    @Prop({
        default: DEFAULT_STORE_NAME
    })
    public readonly storeName: string;

    @Prop({ default: false })
    public readonly keepStore: boolean;

    @Prop({ default: () => [] })
    public readonly allowedExtensions: string[];

    public $refs: {
        inputFile: HTMLInputElement;
    };

    public id: string = `mFileSelect-${uuid.generate()}`;

    protected destroyed(): void {
        if (!this.keepStore) {
            this.$file.destroy(this.storeName);
        }
    }

    public onClick(event: Event): void {
        this.$refs.inputFile.click();
        this.$emit('click', event);
        this.$refs.inputFile.blur();
    }

    public onFocus(event: Event): void {
        this.$emit('focus');
    }

    public onBlur(event: Event): void {
        this.$emit('blur');
    }

    public async processFile(event: Event): Promise<void> {
        const file: FileList | null = this.$refs.inputFile.files;
        if (file) {
            await this.$file.add(file, this.storeName);
            this.$emit('file-selected');
        }
        this.$refs.inputFile.value = '';
    }

    public get extensions(): string {
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
