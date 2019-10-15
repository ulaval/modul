import Vue, { PluginObject } from 'vue';
import Component from 'vue-class-component';
import { Emit, Model, Prop, Watch } from 'vue-property-decorator';
import { WYSIWYG_NAME } from '../component-names';
import InputStylePlugin from '../input-style/input-style';
import WithRender from './wysiwyg.html?style=./wysiwyg.scss';

@WithRender
@Component
export class MWysiwyg extends Vue {
    @Model('input')
    @Prop()
    public value: string;

    @Prop()
    public label: string;

    @Prop()
    public error: boolean;

    @Prop()
    public errorMessage: string;

    @Emit('input')
    public emitInput(value: string): void { }

    public isFocused: boolean = false;
    public internalValue: string = '';
    private observer: MutationObserver;

    public $refs: {
        body: HTMLElement
    };

    @Watch('value', { immediate: true })
    public onValueChange(): void {
        this.$nextTick(() => {
            this.internalValue = this.value;

            if (this.$refs.body.innerHTML === this.value) {
                return;
            }

            this.$refs.body.innerHTML = this.value;
        });
    }

    protected mounted(): void {
        this.observer = new MutationObserver(() => {
            this.onChange();
        });

        if (this.$refs.body) {
            this.observer.observe(this.$refs.body, { subtree: true, childList: true, characterData: true });
        }
    }

    public get hasErrorOrHasErrorMessage(): boolean {
        return this.error || !!this.errorMessage;
    }

    public execCommand(command: string, value?: any): void {
        document.execCommand(command, false, value || '');
    }

    public onChange(): void {
        this.internalValue = this.$refs.body.innerHTML;
        this.emitInput(this.$refs.body.innerHTML);
    }

    public link(): void {
        const url: string | null = prompt(`Entrez l'URL`);
        document.execCommand('createLink', false, url || undefined);
    }

    public onClick(): void {
        this.$refs.body.focus();
    }

    public onFocus(): void {
        this.isFocused = true;
    }

    public onBlur(): void {
        this.isFocused = false;
    }
}

const MWysiwygPlugin: PluginObject<any> = {
    install(v, options): void {
        v.prototype.$log.debug(WYSIWYG_NAME, 'plugin.install');
        v.use(InputStylePlugin);
        v.component(WYSIWYG_NAME, MWysiwyg);
    }
};

export default MWysiwygPlugin;
