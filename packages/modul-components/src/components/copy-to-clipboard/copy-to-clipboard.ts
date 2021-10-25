import ClipboardJs from 'clipboard';
import { PluginObject } from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import { InputManagement } from '../../mixins/input-management/input-management';
import { InputState } from '../../mixins/input-state/input-state';
import { InputMaxWidth } from '../../mixins/input-width/input-width';
import { InputSelectable } from '../../utils/input/input';
import ToastServicePlugin from '../../utils/toast/toast-service.plugin';
import { ModulVue } from '../../utils/vue/vue';
import { COPY_TO_CLIPBOARD_FEEDBACK_NAME, COPY_TO_CLIPBOARD_NAME, TEXTFIELD_NAME } from '../component-names';
import { MTextfield } from '../textfield/textfield';
import { MCopyToClipboardFeedback } from './copy-to-clipboard-feedback';
import WithRender from './copy-to-clipboard.html';
import './copy-to-clipboard.scss';

interface CopyToClipboardInputProps {
    value: any;
    selection: string;
    readonly: boolean;
}

export interface CopyToClipboardInputSupport extends InputSelectable, CopyToClipboardInputProps {
    value: any;
    selection: string;
}

class DefaultCopyToClipboardPropsValue implements CopyToClipboardInputProps {
    readonly: boolean;

    constructor(public selection: string = '', public value: string = '') { }
}

function copyToClipboard(text: string): Promise<void> {
    return new Promise((resolve, reject) => {
        const fakeElement: HTMLButtonElement = document.createElement('button');
        const clipboard: ClipboardJs = new ClipboardJs(fakeElement, {
            text(): string { return text; },
            action(): 'copy' { return 'copy'; },
            container: document.body
        });

        clipboard.on('success', (result: any) => {
            clipboard.destroy();
            resolve(result);
        });

        clipboard.on('error', (result: any) => {
            clipboard.destroy();
            reject(result);
        });

        fakeElement.click();
    });
}

@WithRender
@Component({
    components: {
        [TEXTFIELD_NAME]: MTextfield
    },
    mixins: [InputManagement, InputState]
})
export class MCopyToClipboard extends ModulVue {
    @Prop({
        default: '',
        required: true
    })
    value: string;

    @Prop({
        default: true
    })
    public readonly: boolean;

    fieldMaxWidth: InputMaxWidth = InputMaxWidth.None;
    labelCopyBtn: string = this.$i18n.translate('m-copy-to-clipboard:copy');
    selectedText: string = '';

    get inputProps(): CopyToClipboardInputProps {
        return { ...this.$props, ...new DefaultCopyToClipboardPropsValue(this.selectedText, this.value) };
    }

    get showButton(): boolean {
        return !(!!this.as<InputState>().disabled || !!this.as<InputState>().waiting);
    }

    get buttonHandlers(): { [key: string]: (value: string) => void } {
        return {
            click: this.copyText
        };
    }

    selectText(): void {
        requestAnimationFrame(() => {
            this.selectedText = '';
            this.$nextTick(() => {
                this.selectedText = this.value;
            });
        });
    }

    copyText(): void {
        copyToClipboard(this.value);
        this.$emit('copy');
    }
}

const CopyToClipboardPlugin: PluginObject<any> = {
    install(v): void {
        v.use(ToastServicePlugin);
        v.component(COPY_TO_CLIPBOARD_NAME, MCopyToClipboard);
        v.component(COPY_TO_CLIPBOARD_FEEDBACK_NAME, MCopyToClipboardFeedback);
    }
};

export default CopyToClipboardPlugin;
